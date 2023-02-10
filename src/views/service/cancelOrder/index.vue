<template>
  <div class="cancel_order_tontainer">
    <!-- 服务人员取消的回显 -->
    <div class="cancel_order_info" v-if="this.isOrderOpreator == false">
      <div v-for="i in cancelOrderData && cancelOrderData.list" :key="i.id">
        <div class="order_info_header">
          <span class="title">{{ i.mealsInfoName }}</span>
          <span class="icon">
            <span class="img">
              <img src="../../../assets/images/dianhua.png" alt="" />
            </span>
            <span class="text">
              <a style="color: #000" :href="`tel:${i.mealsPhone}`"
                >电话</a
              ></span
            >
          </span>
        </div>
        <div class="order_info_middle">
          <div class="img">
            <img :src="i.catoryPicture" alt="" />
          </div>
          <div class="title_sort_coast">
            <div class="title">{{ i.projectName }}</div>
            <div class="sort">{{ i.name }}</div>
            <div class="coast">
              <span>X{{ i.number }}</span>
              <p>￥{{ i.price }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="order_info_bottom">
        <span>退款金额：</span>
        <span class="coast">￥{{ cancelOrderData.countPrice }}</span>
      </div> -->
    </div>
    <!-- 老人取消的回显 -->
    <div class="cancel_order_info" v-else>
      <div v-for="item in cancelOrderDataOlderCancel.projects" :key="item.id">
        <div class="order_info_header">
          <span class="title">{{ item.mealsInfoName }}</span>
          <span class="icon">
            <span class="img">
              <img src="../../../assets/images/dianhua.png" alt="" />
            </span>
            <span class="text">
              <a style="color: #000" :href="`tel:${item.mealsPhone}`"
                >电话</a
              ></span
            >
          </span>
        </div>
        <div class="order_info_middle">
          <div class="img">
            <img :src="item.catoryPicture" alt="" />
          </div>
          <div class="title_sort_coast">
            <div class="title">{{ item.projectName }}</div>
            <div class="sort">{{ item.name }}</div>
            <div class="coast">
              <span>X{{ item.number }}</span>
              <p>￥{{ item.price }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="order_info_bottom">
        <span>退款金额：</span>
        <span class="coast">￥{{ orderCancelTotalPrice }}</span>
      </div>
    </div>
    <!-- common used cancel reason -->
    <div class="cancel_order_reason">
      <div class="cancel_order_title">
        <span class="title">{{
          this.$route.query.type == "1" ? "撤销原因" : "取消原因"
        }}</span>
        <span class="choice" v-if="this.$route.query.type != '1'"
          >请选择（必填）</span
        >
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
              :placeholder="
                this.$route.query.type == '1'
                  ? '补充详情撤销原因，有利于我们更快的帮您处理'
                  : '补充详情取消原因，有利于我们更快的帮您处理'
              "
              resize="none"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- footer component -->
    <Footer
      class="footer"
      :orderCancelTotalPrice="orderCancelTotalPrice"
      @handelOrder="handelOrder"
    />
  </div>
</template>

<script>
import Footer from "./footer.vue";
import {
  cancelServiceOrder,
  saveCancelServiceRemarks,
  oldPerpleCancelOrder,
  saveoldPerpleCancelOrderRemark,
} from "@/api/service";

export default {
  name: "cancelOrder",
  data() {
    return {
      cancelOrderData: {
        list: [],
      },
      ruleForm: {
        cancelReason: "",
      },
      rules: {
        cancelReason: [
          { required: true, message: "请输入取消原因", trigger: "blur" },
        ],
      },
      fileList: [],
      file: {
        name: "121212",
      },
      id: "",
      // judeg server or older
      isOrderOpreator: true,
      cancelOrderDataOlderCancel: {
        projects: [],
      },
      orderCancelTotalPrice: "",
    };
  },

  components: {
    Footer,
  },

  mounted() {
    this.id = this.$route.query.id;
    // console.log(this.id);
    //type   1：服务人员 0：老人
    if (this.$route.query.type == "1") {
      this.$route.meta.title = "申请撤销";
      this.getData();
    } else {
      this.$route.meta.title = "申请取消";
      this.oldPerpleCancelOrderData(this.id);
    }
  },

  computed: {
    // 计算老人取消订单时候的价格总和
    // orderCancelTotalPrice() {
    //   let total = 0;
    //   var projects = this.cancelOrderDataOlderCancel.projects;
    //   for (var i = 0; i < projects.length; i++) {
    //     total += parseFloat(projects[i].price);
    //   }
    //   return total;
    // },
  },

  methods: {
    getData() {
      this.isOrderOpreator = false;
      cancelServiceOrder({ orderMealsPersonalId: this.id })
        .then((res) => {
          if (res && res.code == 200) {
            this.cancelOrderData = res.data;
            // this.orderCancelTotalPrice = res.data.countPrice;
          }
        })
        .catch((err) => {});
    },

    handelOrder() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          let data = {
            id: this.id,
            remarks: this.ruleForm.cancelReason,
          };
          // 根据 isOrderOpreator value judge
          if (!this.isOrderOpreator) {
            saveCancelServiceRemarks(data)
              .then((res) => {
                if (res && res.code == 200) {
                  this.$router.push({
                    name: "ServerHome",
                  });
                } else {
                  this.$message.error("订单提交失败");
                }
              })
              .catch((err) => {});
          } else {
            saveoldPerpleCancelOrderRemark(data).then((res) => {
              // console.log(res);
              if (res.code && res.code == 200) {
                this.$router.push({ path: "/myorder" });
              } else {
                this.$message.error("订单取消失败");
              }
            });
          }
        } else {
          return false;
        }
      });
    },

    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file);
    },

    // 老人订单取消时候商品回显
    oldPerpleCancelOrderData(id) {
      this.isOrderOpreator = true;
      let params = {
        orderId: id,
      };
      oldPerpleCancelOrder(params)
        .then((res) => {
          // console.log(res);
          if (res.code && res.code == 200) {
            this.cancelOrderDataOlderCancel = res.data;
            this.orderCancelTotalPrice = res.data.totalPrice;
          }
        })
        .catch((error) => {});
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
      justify-content: space-between;
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
      // height: 105px;
      margin-top: 25px;
      background-color: #f6f6f6;
      border: 1px solid #eee;
      padding: 17px 9px 10px 17px;
      overflow: hidden;
      .cancelReason {
        width: 100%;
        height: 100%;
      }
    }
    .files_upload_container {
      height: 83px;
      width: 83px;
      margin-top: 15px;
      border: 1px solid #eee;
      .van-uploader {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        // .van-uploader__wrapper,
        // .van-uploader__upload {
        //   width: 100%;
        //   height: 100%;
        //   border-radius: 0px;
        // }
        .preview-cover {
          position: absolute;
          bottom: 0;
          box-sizing: border-box;
          width: 100%;
          padding: 4px;
          color: #fff;
          font-size: 12px;
          text-align: center;
          background: rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
}
</style>
