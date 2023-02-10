<template>
  <div class="orderDetails">
    <Steps
      :status="status"
      @cancel="cancel"
      :type="type"
      :time="orderInformation"
    />

    <nav class="commodityInfo">
      <div class="title">
        <p>{{ orderInformation.mealsInfoName }}</p>
        <span style="background: rgba(255, 125, 16, 0.1); color: #ce6309">
          <img src="../../../assets/images/dianhua.png" alt="" />
          <a style="color: #000" :href="`tel:${orderInformation.mealsPhone}`"
            >电话</a
          >
        </span>
      </div>

      <BoxContect :contentData="contentData" />
      <div class="payment">
        支付金额：<span>￥{{ orderInformation.totalPrice }}</span>
      </div>
    </nav>

    <nav class="Serverinfo">
      <p class="title">服务人信息</p>
      <div class="address">
        <div class="left">
          <img src="../../../assets/images/address.png" alt="" />
          <div class="info">
            <p class="name">{{ orderInformation.address }}</p>
            <span
              >{{ orderInformation.oldPeople }}
              {{ orderInformation.phone }}</span
            >
          </div>
        </div>
      </div>
      <div class="address time">
        <div class="left">
          <img src="../../../assets/images/time.png" alt="" />
          <div class="info">
            <p>上门时间</p>
          </div>
        </div>
        <div class="right">
          <p>
            {{ orderInformation.startTime }} -
            {{
              orderInformation.endTime && orderInformation.endTime.split(" ")[1]
            }}
          </p>
        </div>
      </div>
    </nav>

    <div class="add-child-account">
      <van-form class="add-child-form" ref="addChildForm">
        <div class="username">
          <van-field
            readonly
            class="username-field"
            v-model="orderInformation.number"
            label="订单编号"
          />
        </div>
        <div class="username">
          <van-field
            readonly
            class="username-field"
            v-model="orderInformation.createTime"
            label="下单时间"
          />
        </div>
        <!-- <div class="username">
          <van-field
            readonly
            class="username-field"
            v-model="orderInformation.createTime"
            label="支付时间"
          />
        </div>
        <div class="username">
          <van-field
            readonly
            class="username-field"
            v-model="orderInformation.orderMethod"
            label="付款方式"
          />
        </div> -->
        <div class="username">
          <van-field
            readonly
            class="username-field"
            v-model="orderInformation.remarks"
            label="备注"
          />
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import Steps from "./component/steps.vue";
import BoxContect from "./component/BoxContect";
import {
  getOrderDetailByNumber,
  oldPersonalFinishOrder,
  oldPersonalDeleteOrder,
} from "@/api/service";
// import { Dialog } from "vant";

export default {
  data() {
    return {
      orderNumber: "",
      orderInformation: {},
      status: null,
      contentData: [],
      // 三大服务类型
      type: "",
    };
  },
  components: {
    Steps,
    BoxContect,
  },

  created() {},
  mounted() {
    this.orderNumber = this.$route.query.orderNumber;
    this.getOrderDetailByNumber();
    // console.log(this.$route.query.id);
    this.type = this.$route.query.type;
  },
  methods: {
    cancel(n) {
      let { typeName, mealsInfoId } = this.contentData[0];
      switch (n) {
        case "取消":
          this.$router.push({
            path: "/cancelOrder",
            query: {
              id: this.orderInformation.id,
              type: 0,
            },
          });
          break;
        case "结束":
          this.$dialog
            .confirm({
              title: "结束服务",
              message: "确定要结束服务？",
            })
            .then(() => {
              let data = {
                orderNumber: this.orderNumber,
              };
              oldPersonalFinishOrder(data)
                .then((res) => {
                  if (res && res.code == 200) {
                    this.getOrderDetailByNumber();
                  }
                })
                .catch((err) => {});
            })
            .catch(() => {
              // on cancel
            });
          break;

        case "购买":
          this.$router.push({
            path: "/details",
            query: {
              id: mealsInfoId,
              category: typeName,
            },
          });
          break;

        case "评价":
          this.$router.push({
            path: "/myRatingItem",
            query: {
              id: this.orderInformation.id,
            },
          });

          break;

        case "删除":
          this.$dialog
            .confirm({
              title: "删除订单",
              message: "确定要删除此订单？",
            })
            .then(() => {
              let data = {
                orderId: this.orderInformation.id,
              };
              oldPersonalDeleteOrder(data)
                .then((res) => {
                  if (res && res.code == 200) {
                    this.$message.success("订单删除成功");
                    setTimeout(() => {
                      this.$router.push({ path: "/myorder" });
                    }, 300);
                  } else {
                    this.$message.error("订单删除失败");
                  }
                })
                .catch((err) => {});
            })
            .catch(() => {
              // on cancel
            });
          break;
        case "返回":
          this.$router.push({
            path: "/home",
          });
          break;

        default:
          break;
      }
    },

    // 根据 orderNumber 获取订单详情
    getOrderDetailByNumber() {
      let data = {
        orderNumber: this.orderNumber,
      };
      getOrderDetailByNumber(data).then((res) => {
        if (res && res.code == 200) {
          this.orderInformation = res.data;
          this.contentData = res.data.projects;
          this.status = res.data.status;
          // this.time = res.data.rejectionTime;
          // 后端返回 status 等于 6 的时候 助餐服务类 和 生活照料类
          // 才会到 steps 步骤条中第三步骤
          // this.status = 6;

          // 得到三大服务类型
          // this.type = res.data.type;
          // console.log(this.type);
          // setItem("type",this.type)
        }
      });
    },

    // 点击电话弹窗 弃用
    // handleCallOpen(phone) {
    //   Dialog.confirm({
    //     title: "确定要拨打电话吗",
    //     message: phone,
    //   })
    //     .then(() => {
    //       // on confirm
    //     })
    //     .catch(() => {
    //       // on cancel
    //     });
    // },
  },
};
</script>

<style scoped lang="less">
.orderDetails {
  padding-bottom: 10px;

  .commodityInfo {
    margin-top: 16px;
    background: #fff;
    padding: 17px 15px;

    .title {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
      }
      span {
        display: inline-block;
        width: 53px;
        height: 23px;
        background: rgba(5, 177, 120, 0.1);
        border-radius: 0 16px 16px 0;
        font-size: 12px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #03855a;
        letter-spacing: 2px;
        position: relative;
        line-height: 23px;
        img {
          position: absolute;
          width: 23px;
          height: 23px;
          left: -12px;
        }
      }
    }
    .payment {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.5);
      border-top: 1px solid #eee;
      padding-top: 5px;
      span {
        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #e62c3b;
      }
    }
  }
  .Serverinfo {
    margin-top: 11px;
    background: #fff;
    padding: 20px 13px;
    text-align: left;
    .title {
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #000000;
    }
    .address {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      padding: 10px 0;
      .left {
        display: flex;
        align-items: center;
        img {
          width: 24px;
          height: 24px;
          margin-right: 10px;
        }
        .info {
          p {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 600;
            color: #000000;
            line-height: 25px;
          }
          .name {
            margin-bottom: -6px;
          }
          span {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.5);
          }
        }
      }
      .right {
        p {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #05b279;
          i {
            color: #000000;
            opacity: 0.3;
            margin-left: 12px;
          }
        }
      }
    }
    .time {
      border-bottom: none;
      padding: 18px 0;
    }
    /deep/ .van-radio-group {
      margin-top: 16px;
      .van-cell__title {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
      }
      .van-icon-success {
        background-color: green;
        border-color: green;
      }
    }
    /deep/ .remarks {
      .van-cell__title {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #000000;
      }
      .van-field {
        margin-top: 12px;
      }
      .total {
        .van-field__control {
          font-size: 20px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #e62c3b;
        }
      }
    }
  }
  .add-child-account {
    .add-child-form {
      background-color: #fff;
      .username {
        height: 55px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        padding: 0px 12px;
        /deep/ .username-field {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #000000;
          line-height: 25px;
          background-color: #fff;
          .van-field__label {
            span {
              font-size: 16px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: rgba(0, 0, 0, 0.5);
            }
          }
          .van-field__control {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 600;
            color: #000000;
          }
        }
      }
    }
    .submitAddChildAccount {
      height: 53px;
      margin-top: 20px;
      padding: 0px 12px;
      .submitAdd {
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        line-height: 25px;
      }
    }
  }
}
</style>
