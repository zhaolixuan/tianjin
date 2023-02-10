<template>
  <div class="mine-container">
    <div class="mermber-center-container">
      <span v-if="isLogin" class="username">{{ mineData.name }}</span>
      <span v-else @click="goLogin" class="username">未登录</span>

      <!-- <span class="phone">手机：{{ mineData.phone || '' }}</span> -->
      <span v-if="isLogin" class="phone"
        >养老卡号：{{ mineData.cardNo || "" }}</span
      >
      <span v-if="isLogin" class="phone" style="margin-top: 24px"
        >余额：{{ mineData.money || "" }}元</span
      >
      <span class="edit" @click="edit" v-if="isLogin">
        <van-icon name="edit" />
        查看资料
      </span>
      <!-- <span class="service-card" v-on:click="handleGoMyCard">
        <span>居家养老服务卡支付二维码</span>
        <span
          v-if="mineData.idcardNumber && mineData.idcardNumber.split('').length"
          >已绑定 >></span
        >
        <span v-else>未绑定 >></span>
      </span> -->
    </div>
    <!-- 我的服务 -->
    <div class="my-service">
      <div class="my-service-header">我的服务</div>
      <div class="my-service-nav">
        <div class="first-floor">
          <div class="nav-item" v-on:click="handleGoMyOrder">
            <span class="nav-item-icon my-order"></span>
            <span>我的订单</span>
          </div>
          <div class="nav-item" v-on:click="handleGoMyRating">
            <span class="nav-item-icon my-rating"></span>
            <span>我的评价</span>
          </div>
          <div class="nav-item" v-on:click="handleGoMyCollect">
            <span class="nav-item-icon my-collect"></span>
            <span>我的收藏</span>
          </div>
        </div>
        <div class="second-floor">
          <div class="nav-item" v-on:click="handleGoMyActivitys">
            <span class="nav-item-icon my-activity"></span>
            <span>我的活动</span>
          </div>
          <a class="nav-item" style="color: #000" href="tel:85858590">
            <span class="nav-item-icon servicer-line"></span>
            <span> 客服热线 </span>
          </a>
          <div class="nav-item" v-on:click="handleGoFeedBack">
            <span class="nav-item-icon advice-feedback"></span>
            <span>意见反馈</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 其它信息 -->
    <div class="other-info-container">
      <div class="other-info-header">其他信息</div>
      <div class="other-info-content">
        <!-- <div class="other-info-item">
          <span class="icon child-account"></span>
          <span v-on:click="handleGoChildrenAccount">子女账号</span>
        </div> -->
        <div class="other-info-item">
          <span class="icon service-address"></span>
          <span v-on:click="handleGoServiceAddress">服务地址</span>
        </div>
        <div class="other-info-item">
          <span class="icon login-out"></span>
          <span v-on:click="handleGoLoginOut">退出</span>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/common/footer.vue";
import Myorder from "@/views/mine/components/myorder/index.vue";
import myRating from "@/views/mine/components/myRating/index.vue";
import myCollect from "@/views/mine/components/myCollect/index.vue";
import myCard from "@/views/mine/components/myCard/index.vue";
import childAccount from "@/views/mine/components/childAccount/index.vue";
import myActivities from "@/views/mine/components/myActivities/index.vue";
import servicerLine from "@/views/mine/components/servicerLine/index.vue";
import feedBack from "@/views/mine/components/feedBack/index.vue";

import { delCookie, getCookie, getSessionItem } from "@/utils/storage";
import { getPeopleInfomation } from "@/api/home";

export default {
  data() {
    return {
      mineData: {},
      isLogin: false,
    };
  },

  mounted() {
    if (getCookie("idCard")) {
      this.isLogin = true;
      this.getData();
    }
  },

  methods: {
    getData() {
      let data = {
        createUser: getSessionItem("username"),
        phone: getSessionItem("phone"),
        idcardNumber: getCookie("idCard").split("idCard")[1],
        pensionCardNumber: getSessionItem("cardNumber"),
      };
      getPeopleInfomation(data).then((res) => {
        if (res && res.code == 200) {
          this.mineData = { ...res.data };
        }
      });
    },
    edit() {
      this.$router.push({ path: "/bindCard" });
    },
    handleGoMyCard() {
      if (!this.mineData.pensioncardNumber) {
        return this.$dialog
          .alert({
            title: "提示",
            message:
              "你还未办理居家养老服务卡，您可以在就近的居家养老服务中心进行办理，也可以咨询养老服务热线 85858590",
          })
          .then(() => {
            // on close
          });
      }
      this.$router.push({ path: "/myCard", component: myCard });
    },

    handleGoMyOrder() {
      this.$router.push({ path: "/myorder", component: Myorder });
    },

    handleGoMyRating() {
      this.$router.push({ path: "/myRating", component: myRating });
    },

    handleGoMyCollect() {
      this.$router.push({ path: "/myCollect", component: myCollect });
    },

    handleGoMyActivitys() {
      this.$router.push({
        path: "/myActivities",
        component: myActivities,
      });
    },

    handleGoServiceLine() {
      this.$router.push({
        path: "/servicerLine",
        component: servicerLine,
      });
    },

    handleGoFeedBack() {
      this.$router.push({ path: "/feedBack", component: feedBack });
    },

    handleGoChildrenAccount() {
      this.$router.push({
        path: "/childAccount",
        component: childAccount,
      });
    },

    handleGoServiceAddress() {
      this.$router.push({
        path: "/addressList",
        query: { unClick: true },
      });
    },
    goLogin() {
      this.$router.push({ name: "login" });
    },
    handleGoLoginOut() {
      this.$dialog
        .confirm({
          title: "退出",
          message: "确认退出",
        })
        .then(() => {
          delCookie("gunsToken");
          delCookie("idCard");
          localStorage.clear()
          try {
            window.android.onPageClose("");//退出
          } catch (e) {
            console.log("出错了");
          }

          this.$router.push({ name: "login" });
        })
        .catch(() => {});
    },
  },

  components: {
    Footer,
  },
};
</script>

<style lang="less" scoped>
.mine-container {
  padding-bottom: 80px;
  .mermber-center-container {
    height: 173px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    position: relative;
    background-image: url("../../assets/images/personal-bg-yasuo@2x.jpg");
    background-size: auto 173px;
    .avator {
      position: absolute;
      top: 36px;
      left: 14px;
      display: block;
      height: 60px;
      width: 60px;
      border-radius: 30px;
      border: 1px solid #eee;
      overflow: hidden;
      .avator-img {
        width: 100%;
        height: 100%;
        border-radius: 30px;
      }
    }
    .username {
      position: absolute;
      top: 41px;
      left: 22px;
      font-size: 22px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 30px;
      letter-spacing: 2px;
    }
    .phone {
      position: absolute;
      top: 71px;
      left: 90px;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
      line-height: 21px;
    }
    .edit {
      position: absolute;
      top: 40px;
      right: 0px;
      width: 101px;
      height: 31px;
      background: rgba(29, 72, 121, 0.56);
      border-radius: 100px 0px 0px 100px;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 31px;
    }
    .service-card {
      position: absolute;
      top: 125px;
      left: 13px;
      width: 350px;
      height: 47px;
      background: linear-gradient(180deg, #2f2e59 0%, #041231 100%);
      border-radius: 8px 8px 0px 0px;
      font-size: 17px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffe5bd;
      line-height: 24px;
      letter-spacing: 1px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 14px;
      box-sizing: border-box;
      background-image: url("../../assets/images/personal-account-bg@2x.png");
      background-size: auto 47px;
    }
  }
  .my-service {
    height: 309px;
    background: #fff;
    padding: 26px 21px 28px 22px;
    .my-service-header {
      height: 28px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 28px;
      text-align: left;
      margin-left: -8px;
    }
    .my-service-nav {
      box-sizing: border-box;
      margin-top: 20px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 22px;
      .first-floor,
      .second-floor {
        display: flex;
        justify-content: space-between;
        .nav-item {
          height: 92px;
          width: 70px;
          .nav-item-icon {
            display: block;
            height: 70px;
            width: 70px;
          }
          .my-order {
            background-image: url("../../assets/images/my-order@2x.png");
            background-size: 70px 70px;
          }
          .my-rating {
            background-image: url("../../assets/images/my-rating@2x.png");
            background-size: 70px 70px;
          }
          .my-collect {
            background-image: url("../../assets/images/my-collect@2x.png");
            background-size: 70px 70px;
          }
          .my-activity {
            background-image: url("../../assets/images/my-activity@2x.png");
            background-size: 70px 70px;
          }
          .servicer-line {
            background-image: url("../../assets/images/servicer-line@2x.png");
            background-size: 70px 70px;
          }
          .advice-feedback {
            background-image: url("../../assets/images/advice-feedback@2x.png");
            background-size: 70px 70px;
          }
        }
      }
      .first-floor {
        margin-bottom: 23px;
      }
    }
  }
  .other-info-container {
    margin-top: 14px;
    height: 277px;
    box-sizing: border-box;
    background: #fff;
    .other-info-header {
      height: 57px;
      text-align: left;
      padding-left: 10px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 28px;
      line-height: 57px;
    }
    .other-info-content {
      padding: 0px 15px;
      .other-info-item {
        height: 68px;
        line-height: 68px;
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
        line-height: 25px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .icon {
          display: block;
          height: 38px;
          width: 38px;
          margin-right: 21px;
        }
        .child-account {
          background: url("../../assets/images/child-account@2x.png") no-repeat;
          background-size: 36px 36px;
        }
        .service-address {
          background: url("../../assets/images/service-address@2x.png")
            no-repeat;
          background-size: 36px 36px;
        }
        .login-out {
          background: url("../../assets/images/login-out@2x.png") no-repeat;
          background-size: 36px 36px;
        }
      }
    }
  }
}
</style>
