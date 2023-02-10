<template>
  <div class="SlhgzDetails">
    <nav class="box details">
      <p class="title">工单详情</p>
      <van-cell-group>
        <van-field
          label="老年人姓名"
          placeholder="请输入姓名"
          v-model="detailData.name"
        />
        <!-- :value="detailData.name" -->
        <van-field
          label="身份证号"
          placeholder="请输入身份证号"
          v-model="detailData.identityId"
        />

        <van-field
          label="年龄"
          placeholder="请输入年龄"
          v-model="detailData.age"
        />
        <van-field
          label="联系方式"
          placeholder="请输入联系方式"
          v-model="detailData.phoneNumber"
        />
        <van-cell>
          <div class="six">
            <p>性别</p>

            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio icon-size="15px" name="0">男</van-radio>
              <van-radio icon-size="15px" name="1">女</van-radio>
            </van-radio-group>
          </div>
        </van-cell>
        <van-field
          label="居住街道"
          v-model="detailData.street"
          right-icon="arrow-down"
          @click="streetClick(1)"
          placeholder="请选择居住街道"
          readonly
        ></van-field>
        <van-field
          label="居住社区"
          v-model="detailData.community"
          right-icon="arrow-down"
          @click="streetClick(2)"
          placeholder="请选择居住社区"
          readonly
        ></van-field>
        <van-field
          placeholder="请输入详细地址"
          label="详细地址"
          v-model="detailData.adress"
        />
      </van-cell-group>
    </nav>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        value-key="name"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 适老化改造清单 -->
    <nav class="box details">
      <div class="title">
        <p>适老化改造清单</p>

        <!-- <span @click="selectDetailed(1)">选择设备清单 > </span> -->
      </div>
      <AgeingContent
        @handleSelectionChange="ageingSelectionChange"
        :category="ageingcategory"
      ></AgeingContent>
    </nav>
    <!-- 智能化改造清单 {colume(installType)}-->
    <nav class="box details">
      <p class="title">
        智能化改造清单
        <!--<span @click="selectDetailed(2)">选择设备清单 > </span>-->
      </p>
      <GenceContent
        @handleSelectionChange="genceSelectionChange"
        :category="intelligencecategory"
      ></GenceContent>
    </nav>
    <nav class="box details">
      <p class="title">改造协议</p>
      <div class="uploaderbox">
        <SmUpload
          @beforeDelete="beforeDelete"
          :maxCount="3"
          @postImg="frontPostImg"
          :list="agreementList"
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
import AgeingContent from "./component/ageingContent.vue";
import GenceContent from "./component/genceContent.vue";
import eventBus from "@/utils/eventbus";
import {
  getSlhDetailedAddItem,
  uploadFill,
  getSlhSelectstreetList,
  getSlhCommunityList,
} from "@/api/slhgz.js";

export default {
  data() {
    return {
      radio: "0",
      showPicker: false,
      detailData: { street: "", community: "" },
      servertext: "提交",
      agreementList: [],
      columns: [],
      ageingcategory: 1,
      intelligencecategory: 2,
      genceList: [],
      ageingList: [],
      pickerCategory: 0,
      streetList: [], //街道
      communityList: [], //社区
    };
  },

  mounted() {
    this.requestData();
  },
  components: {
    SmUpload,
    Footer,
    AgeingContent,
    GenceContent,
  }, //每次激活时
  created() {},
  methods: {
    genceSelectionChange(n) {
      this.genceList = n;
    },
    ageingSelectionChange(n) {
      this.ageingList = n;
    },
    onConfirm(value) {
      if (this.pickerCategory == 1) {
        this.detailData.street = value.name;
        this.communityData(value.code);
      } else {
        this.detailData.community = value.name;
      }
      this.showPicker = false;
    },
    requestData() {
      //查询街道
      getSlhSelectstreetList().then((res) => {
        this.streetList = res;
      });
    },
    communityData(code) {
      getSlhCommunityList({ code: code }).then((res) => {
        this.communityList = res;
      });
    },

    handelOrder(n) {
      this.detailData.sex = this.radio;
      this.detailData.status = "待改造";

      if (
        this.detailData.name == undefined ||
        this.detailData.sex == undefined ||
        this.detailData.age == undefined ||
        this.detailData.identityId == undefined ||
        this.detailData.phoneNumber == undefined ||
        this.detailData.street == undefined ||
        this.detailData.community == undefined ||
        this.detailData.adress == undefined
      ) {
        this.$toast.fail("请完善老人信息");
        return;
      }

      let arr = this.genceList.concat(this.ageingList);
      this.detailData.deviceprojectListParams = JSON.stringify(arr);

      if (this.agreementList.length > 0) {
        let imgUrl = "";
        this.agreementList.forEach((element) => {
          imgUrl += element.url + ",";
        });

        this.detailData.protocolBase = imgUrl;
      } else {
        this.$toast.fail("请上传改造协议");
        return;
      }
      console.log(this.detailData);
      const param = new URLSearchParams();
  
      param.append("street", this.detailData.street);
      param.append("community",this.detailData.community);
      param.append("name", this.detailData.name);
      param.append("identityId",this.detailData.identityId);
      param.append("age", this.detailData.age);
      param.append("phoneNumber", this.detailData.phoneNumber);
      param.append("adress", this.detailData.adress);
      param.append("sex", this.detailData.sex);
      param.append("status", this.detailData.status);
      param.append("deviceprojectListParams",this.detailData.deviceprojectListParams);
      param.append("protocolBase",this.detailData.protocolBase);

      getSlhDetailedAddItem(param).then((res) => {
        if (res.code == 200) {
          this.$toast.success("添加成功");

          setTimeout(() => {
            this.$router.go(-1);
          }, 500);
        } else {
          this.$toast.fail("添加失败");
        }
      });
    },

    frontPostImg(data) {
      //改造前文件上传
      var forms = new FormData();
      forms.append("files", data.file);

      uploadFill(forms)
        .then((res) => {
          this.agreementList.push({ url: res.data.url });
          // this.addPhotoItem("photograph", "before", res.data.url);
        })
        .catch((err) => {});
    },
    beforeDelete(i) {
      this.agreementList.splice(i.url);
    },
    streetClick(n) {
      //街道社区点击事件  1 街道  2社区
      this.pickerCategory = n;

      switch (n) {
        case 1:
          if (this.streetList.length > 0) {
            this.columns = this.streetList;
            this.showPicker = true;
          } else {
            this.$toast.fail("暂无街道");
          }
          break;
        case 2:
          if (this.communityList.length > 0) {
            this.columns = this.communityList;
            this.showPicker = true;
          } else {
            this.$toast.fail("暂无社区");
          }
          break;
      }
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
    padding: 10px 10px;
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
    .six {
      height: 40px;
      display: flex;
      align-items: center;
      background: #fff;
      p {
        font-size: 14px;
        margin-right: 20px;
      }
      .van-radio {
        font-size: 14px;
      }
    }
  }
}
</style>
