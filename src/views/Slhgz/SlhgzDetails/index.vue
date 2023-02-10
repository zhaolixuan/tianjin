<template>
  <div class="SlhgzDetails">
    <nav class="box details">
      <p class="title">工单详情</p>
      <van-cell-group>
        <van-field label="老年人姓名" :value="detailData.name" readonly />
        <van-field label="性别" :value="detailData.sex" readonly />
        <van-field label="年龄" :value="detailData.age" readonly />
        <van-field label="联系方式" :value="detailData.phoneNumber" readonly />
        <van-field
          label="所属街道社区"
          :value="detailData.community"
          readonly
        />
        <van-field label="详细地址" :value="detailData.adress" readonly />
        <van-field label="改造状态" :value="detailData.status" readonly />
      </van-cell-group>
    </nav>
    <!-- 适老化改造清单 -->
    <nav class="box details">
      <div class="title">
        <p>适老化改造清单</p>
        <span @click="selectDetailed(1)">选择设备清单 > </span>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="project_type" align="center" label="类别">
        </el-table-column>
        <el-table-column prop="project_name" align="center" label="名称">
        </el-table-column>
        <el-table-column prop="num" align="center" label="数量">
        </el-table-column>
        <el-table-column prop="installType" align="center" label="安装方式">
          <template slot-scope="scope">
            <span v-if="scope.row.installType == 'free'">免费</span>
            <span v-if="scope.row.installType == 'charge'">自费</span>
          </template>
        </el-table-column>
      </el-table>
    </nav>
    <!-- 智能化改造清单 {colume(installType)}-->
    <nav class="box details">
      <p class="title">
        智能化改造清单<span @click="selectDetailed(2)">选择设备清单 > </span>
      </p>
      <el-table :data="tablesData" border style="width: 100%">
        <el-table-column prop="project_type" align="center" label="类别">
        </el-table-column>
        <el-table-column prop="project_name" align="center" label="名称">
        </el-table-column>
        <el-table-column prop="num" align="center" label="数量">
        </el-table-column>
        <el-table-column
          prop="installType"
          align="center"
          label="安装方式"
        >
         <template slot-scope="scope">
            <span v-if="scope.row.installType == 'free'">免费</span>
            <span v-if="scope.row.installType == 'charge'">自费</span>
          </template>
        </el-table-column>
      </el-table>
    </nav>
    <!-- 改造前照片 -->
    <nav class="box details">
      <p class="title">改造前照片</p>
      <div class="uploaderbox">
        <SmUpload
          @beforeDelete="beforeDelete"
          :maxCount="3"
          @postImg="frontPostImg"
          :list="frontList"
        />
        <!-- :list="startServiceFilesList" -->
      </div>
    </nav>
    <!-- 改造后照片 -->
    <nav class="box details" :hidden="isHidden">
      <p class="title">改造后照片</p>
      <div class="uploaderbox">
        <SmUpload
          @beforeDelete="beforeDelete"
          :maxCount="3"
          @postImg="afterPostImg"
          :list="afterList"
        />
      </div>
    </nav>

    <!-- 协议照片 -->
    <nav class="box details" :hidden="isHidden">
      <p class="title">补充协议</p>
      <div class="uploaderbox">
        <SmUpload
          @beforeDelete="beforeDelete"
          :maxCount="3"
          @postImg="agreemenPostImg"
          :list="agreementList"
        />
      </div>
    </nav>

    <!-- 验收确认单 -->
    <nav class="box details" :hidden="isCheckHidden">
      <p class="title">验收确认单</p>
      <div class="uploaderbox">
        <SmUpload
          @beforeDelete="beforeDelete"
          :maxCount="1"
          @postImg="confirmPostImg"
          :list="confirmList"
        />
      </div>
    </nav>
    <Footer @handelOrder="handelOrder" :servertext="servertext" />
  </div>
</template>

<script>
import { removeAaary } from "@/utils/index";
import SmUpload from "@/components/common/SmUpload";
import Footer from "./component/footer.vue";
import eventBus from "@/utils/eventbus";
import {
  getSlhDetail,
  getSlhDetailedList,
  getSlhDetailedEditItem,
  getSlhPhotoList,
  uploadFill,
  setSlhAddItem,
  deleteFill,
} from "@/api/slhgz.js";
export default {
  data() {
    return {
      detailData: {},
      tableData: [],
      tablesData: [],
      fileList: [],
      servertext: "提交进入施工环节",
      oldModifyId: "",
      reformStatus: "待改造",
      isHidden: true,
      isCheckHidden: true,
      frontList: [],
      afterList: [],
      agreementList: [],
      confirmList: [],
    };
  },

  mounted() {
    // console.log(this.$route.query.dataList, this.$route.query.category);
    this.requestData();
  },
  components: {
    SmUpload,
    Footer,
  }, //每次激活时
  created() {},
  methods: {
    requestData() {
      let data = {
        id: this.$route.query.id,
      };
      getSlhDetail(data).then((res) => {
        this.detailData = res.data;
        this.oldModifyId = res.data.id;
        this.reformStatus = res.data.status;
        if (this.reformStatus == "待改造") {
          this.isHidden = true;
          this.isCheckHidden = true;
          this.servertext = "提交进入施工环节";
        } else if (this.reformStatus == "改造中") {
          this.isHidden = false;
          this.isCheckHidden = true;
          this.servertext = "提交完成改造";
        } else if (this.reformStatus == "改造完成") {
          this.isHidden = false;
          this.isCheckHidden = false;
          this.servertext = "申请验收";
        } else if (this.reformStatus == "验收未通过") {
          this.isHidden = false;
          this.isCheckHidden = false;
          this.servertext = "提交";
        } else if (
          this.reformStatus == "验收通过" ||
          this.reformStatus == "验收中"
        ) {
          this.isHidden = false;
          this.isCheckHidden = false;
          this.servertext = "验收通过";
        }
        this.detailedList(this.oldModifyId);
        this.photoList("photograph", "before");
        this.photoList("photograph", "after");
        this.photoList("protocol", "add");
        this.photoList("confirmOrder", "");
      });
    },
    detailedList(id) {
      let data = {
        oldModifyId: id,
        category: 1,
      };
      getSlhDetailedList(data).then((res) => {
        // this.detailData = res.data
        this.tableData = res.data;
      });
      let datas = {
        oldModifyId: id,
        category: 2,
      };
      getSlhDetailedList(datas).then((res) => {
        // this.detailData = res.data
        this.tablesData = res.data;
      });
    },
    selectDetailed(category) {
      this.$router.push({
        path: "/slhgz-repertoire",
        query: { category: category, oldModifyId: this.oldModifyId },
      });
    },
    handelOrder(n) {
      console.log(n);
      let statu = "";

      let arr = this.tableData.concat(this.tablesData);
      if (this.reformStatus == "待改造") {
        if (this.frontList.length == 0) {
          this.$toast.fail("请上传改造前照片");
          return;
        }
        statu = "改造中";
      } else if (this.reformStatus == "改造中") {
        if (this.frontList.length == 0) {
          this.$toast.fail("请上传改造前照片");
          return;
        } else if (this.afterList.length == 0) {
          this.$toast.fail("请上传改造后照片");
          return;
        }
        statu = "改造完成";
      } else if (
        this.reformStatus == "改造完成" ||
        this.reformStatus == "验收未通过"
      ) {
        if (this.frontList.length == 0) {
          this.$toast.fail("请上传改造前照片");
          return;
        } else if (this.afterList.length == 0) {
          this.$toast.fail("请上传改造后照片");
          return;
        } else if (this.confirmList.length == 0) {
          this.$toast.fail("请上传确认单照片");
          return;
        }
        statu = "验收中";
      }

      const param = new URLSearchParams();
      param.append("status", statu);
      param.append("id", this.oldModifyId);
      param.append("deviceprojectListParams", JSON.stringify(arr));

      getSlhDetailedEditItem(param).then((res) => {
        if (res.code == 200) {
          this.$toast.success("请求成功");
          this.requestData();
        }
      });
    },

    photoList(category, photoCatogory) {
      let data = {
        category: category,
        photoProtocolCatogory: photoCatogory,
        oldModifyId: this.oldModifyId,
      };
      getSlhPhotoList(data).then((res) => {
        if (category == "photograph") {
          if (photoCatogory == "before") {
            //改造前照片
            this.frontList = res.data;
          } else if (photoCatogory == "after") {
            //改造后照片
            this.afterList = res.data;
          }
        } else if (category == "protocol") {
          if (photoCatogory == "add") {
            //补充协议
            this.agreementList = res.data;
          }
        } else if (category == "confirmOrder") {
          //确认验收
          this.confirmList = res.data;
        }
      });
    },

    frontPostImg(data) {
      //改造前文件上传
      var forms = new FormData();
      forms.append("files", data.file);

      uploadFill(forms)
        .then((res) => {
          this.addPhotoItem("photograph", "before", res.data.url);
        })
        .catch((err) => {});
    },
    afterPostImg(data) {
      //改造后文件上传
      var forms = new FormData();
      forms.append("files", data.file);

      uploadFill(forms)
        .then((res) => {
          this.addPhotoItem("photograph", "after", res.data.url);
        })
        .catch((err) => {});
    },
    agreemenPostImg(data) {
      //补充协议文件上传
      var forms = new FormData();
      forms.append("files", data.file);

      uploadFill(forms)
        .then((res) => {
          this.addPhotoItem("protocol", "add", res.data.url);
        })
        .catch((err) => {});
    },
    confirmPostImg(data) {
      //确认单文件上传
      var forms = new FormData();
      forms.append("files", data.file);

      uploadFill(forms)
        .then((res) => {
          this.addPhotoItem("confirmOrder", "", res.data.url);
        })
        .catch((err) => {});
    },
    beforeDelete(i) {
      var forms = new FormData();
      forms.append("id", i.id);
      deleteFill(forms).then((res) => {
        if (res && res.code == 200) {
          this.photoList(i.category, i.photoProtocolCatogory);
          // removeAaary(this.fileList, i);
        } else {
          this.$toast.fail("图片删除失败");
        }
      });
    },
    addPhotoItem(category, photoCatogory, url) {
      let data = {
        category: category,
        photoProtocolCatogory: photoCatogory,
        oldModifyId: this.oldModifyId,
        url: url,
      };
      setSlhAddItem(data)
        .then((res) => {
          this.photoList(category, photoCatogory);
        })
        .catch((err) => {});
    },
    colume(type) {
      console.log(type);
      let str = "";
      if (type == "free") {
        str = "免费";
      } else if (type == "charge") {
        str = "自费";
      }
      return str;
    },
  },
};
</script>

<style scoped lang="less">
.SlhgzDetails {
  padding-bottom: 70px;
  position: relative;

  .box {
    background: #fff;
    padding: 11px 14px;
    margin-bottom: 10px;
    text-align: left;

    .title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      margin-bottom: 11px;
      font-weight: 600;
      color: #000000;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
      }
    }

    .van-field {
      padding: 6px 0;
    }

    .navigation {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(5, 177, 120, 0.61);
      text-align: right;
    }

    .zhu {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.5);
      line-height: 20px;
      margin: 17px 0;
    }

    .uploaderbox {
      display: flex;
      align-items: center;
      margin-bottom: 13px;
    }

    .text {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.5);
      line-height: 20px;
    }
  }
}
</style>
