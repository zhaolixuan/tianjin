<template>
  <div class="cancel_order_tontainer">
    <div class="cancel_order_info">
      <div class="order_info_middle">
        <div class="img">
          <img :src="cancelOrderData.catoryPicture" alt="" />
        </div>
        <div class="title_sort_coast">
          <div class="title">{{ cancelOrderData.name }}</div>
          <div class="coast">
            <p>￥{{ cancelOrderData.totalPrice }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="cancel_order_reason">
      <div class="cancel_order_title">
        <span class="title">服务评分</span>
        <van-rate
          v-model="value"
          :size="25"
          color="#ffd21e"
          void-icon="star"
          void-color="#eee"
          v-on:change="handleChangeValue"
        />
        <!-- <span class="choice">请选择（必选）</span> -->
      </div>
      <div class="text_field">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item prop="cancelReason">
            <el-input
              type="textarea"
              v-model="ruleForm.cancelReason"
              class="cancelReason"
              :rows="3"
              placeholder="请输入想要说的评价的内容"
              resize="none"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="files_upload_container">
        <SmUpload
          @beforeDelete="beforeDelete"
          :maxCount="4"
          @postImg="postImg"
        />
      </div>
    </div>
    <div class="footer" @click="handelOrder">提交</div>
  </div>
</template>

<script>
import { getSessionItem, getCookie } from "@/utils/storage.js";
import { getOrderAppreise, addItem, upload } from "@/api/mine";
import { removeAaary } from "@/utils/index";
import SmUpload from "@/components/common/SmUpload";
export default {
  name: "cancelOrder",
  data() {
    return {
      cancelOrderData: {
        list: [],
      },
      value: 0,
      ruleForm: {
        cancelReason: "",
      },
      rules: {
        cancelReason: [
          { required: true, message: "请输入评价内容", trigger: "blur" },
        ],
      },
      orderid: "",
      orderAppraiseFileList: [],
      name: "",
    };
  },
  components: {
    SmUpload,
  },
  mounted() {
    // 商品id
    let id = this.$route.query.id;
    // 订单id=> orderId
    this.orderid = this.$route.query.orderId;
    this.getOrderAppreiseData();
  },

  methods: {
    // 调用发布评价信息时候的回显接口
    getOrderAppreiseData() {
      let params = {
        orderServiceProjectId: this.$route.query.id,
      };
      getOrderAppreise(params)
        .then((res) => {
          if (res && res.code == 200) {
            this.cancelOrderData = res.data;
            let { name } = res.data;
            this.name = name;
          }
        })
        .catch((err) => {});
    },
    // 提交图片到后端
    postImg(data) {
      let { mealsInfoId } = this.cancelOrderData;
      var forms = new FormData();
      forms.append("files", data.file);
      forms.append("orderServiceProjectId", mealsInfoId);
      forms.append("idCard", getCookie("idCard").split("idCard")[1]);
      upload(forms).then((res) => {
        this.orderAppraiseFileList.push({ id: res.data.id });
        for (let index = 0; index < data.fileList.length; index++) {
          if (data.fileList[index].id == "") {
            if (res.code && res.code == 200) {
              data.fileList[index].id = res.data.id;
              data.fileList[index].status = "done";
              data.fileList[index].message = "上传成功";
            } else {
              data.fileList[index].status = "failed";
              data.fileList[index].message = "上传失败";
            }
            break;
          }
        }
      });
    },

    // 点击发布评价的处理函数
    handelOrder() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          let data = {
            appraiseTime: new Date(),
            remarks: this.ruleForm.cancelReason,
            levels: this.value,
            typeCode: this.cancelOrderData.typeCode,
            projectCode: this.cancelOrderData.projectCode,
            projectName: this.cancelOrderData.projectName,
            serviceMealsId: this.cancelOrderData.mealsInfoId,
            orderid: this.orderid,
            orderAppraiseFileIds: this.orderAppraiseFileList,
            appraiseName: getSessionItem("username"),
            idCard: getCookie("idCard").split("idCard")[1],
            name: this.name,
          };
          addItem(data)
            .then((res) => {
              if (res && res.code == 200) {
                let { id } = res.data;
                this.$router.push({
                  path: "/RatingDetails",
                  query: {
                    id: id,
                  },
                });
              } else {
                this.$message.error("评价发布失败");
              }
            })
            .catch((err) => {});
        } else {
          return;
        }
      });
    },

    // 文件删除之前的回调
    beforeDelete(i) {
      this.orderAppraiseFileList.forEach((j) => {
        if (j.id == i.id) {
          removeAaary(this.orderAppraiseFileList, j);
        }
      });
    },

    // 监听用户点了几颗星
    handleChangeValue(val) {
      // console.log(val);
      this.value = val;
    },
  },
};
</script>

<style lang="less" scoped>
.cancel_order_tontainer {
  background-color: #f6f6f6;
  padding-bottom: 60px;
  .cancel_order_info {
    background-color: #fff;
    padding: 0px 15px;
    .order_info_header {
      padding-top: 17px;
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 25px;
      }
      .icon {
        width: 63px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff0e4;
        border-radius: 16px;
        .img {
          width: 24px;
          height: 24px;
          display: flex;
          img {
            width: 100%;
          }
        }
        .text {
          flex: 1;
          font-size: 12px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ce6309;
          line-height: 17px;
          letter-spacing: 2px;
        }
      }
    }
    .order_info_middle {
      padding: 27px 0px 17px 0px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      .img {
        width: 104px;
        height: 104px;
        margin-right: 14px;
        border: 1px solid #eee;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title_sort_coast {
        flex: 1;
        display: flex;
        flex-direction: column;
        // justify-content: space-between;
        .title {
          margin-bottom: 5px;
          text-align: left;
          font-size: 17px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #000000;
          line-height: 24px;
        }
        .sort {
          height: 20px;
          margin-bottom: 4px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.5);
          line-height: 20px;
          text-align: left;
        }
        .coast {
          height: 28px;
          font-size: 20px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #e62c3b;
          line-height: 28px;
          text-align: left;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.5);
          }
        }
      }
    }
    .order_info_bottom {
      height: 53px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      span {
        height: 28px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.5);
        line-height: 22px;
      }
      .coast {
        color: #e62c3b;
      }
    }
  }
  .cancel_order_reason {
    margin-top: 12px;
    background-color: #fff;
    padding: 0px 16px 16px 17px;
    margin-bottom: 37px;
    .cancel_order_title {
      padding-top: 21px;
      display: flex;
      //   justify-content: space-between;
      align-items: center;
      .title {
        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #000000;
        line-height: 28px;
      }
      .choice {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(5, 177, 120, 0.61);
        line-height: 20px;
      }
    }
    .text_field {
      //   height: 105px;
      margin-top: 25px;
      background-color: #f6f6f6;
      //   border: 1px solid #eee;
      //   padding: 17px 9px 36px 17px;
      overflow: hidden;
      .cancelReason {
        width: 100%;
        height: 100%;
        /deep/ .el-textarea__inner {
          border: none;
          background: transparent;
        }
      }
    }
    .files_upload_container {
      // height: 83px;
      // width: 83px;
      margin-top: 15px;
      display: flex;
      align-items: center;
     
    }
  }
  .footer {
    position: fixed;
    bottom: 20px;
    left: 12px;
    right: 12px;
    height: 53px;
    background: #05b178;
    border-radius: 4px;
    text-align: center;
    line-height: 53px;
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
  }
}
</style>
