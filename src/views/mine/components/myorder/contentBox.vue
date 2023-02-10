<template>
  <div>
    <van-list v-model="loading1" :finished="finished" @load="onLoad">
      <div class="content-item" v-for="(item, index) in orderList" :key="index">
        <!-- 时间和状态 -->
        <div class="order-date-status">
          <div class="order-date">{{ item.createTime }}</div>
          <!-- <div class="order-status">{{ item.status }}</div> -->
        </div>
        <!-- 订单的信息 -->
        <div class="order-img-info-price">
          <div class="order-img">
            <img :src="item.catoryPicture" alt="" />
          </div>
          <div class="order-info-total">
            <div class="order-info">
              {{ item.mealsInfoName }}
            </div>
            <div class="foot-sort">{{ item.type }}</div>
            <div class="order-price">￥{{ item.totalPrice }}</div>
          </div>
        </div>
        <!-- 金额和详情 -->
        <div class="order-pay-details">
          <span>支付金额：￥{{ item.totalPrice }}</span>
          <span class="goDetails" v-on:click="handleGoDetails(item)"
            >查看详情 ></span
          >
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  props: ["orderList", "loading", "finished"],
  data() {
    return {
      loading1: false,
    };
  },
  watch: {
    loading(n) {
      if (!n) {
        this.loading1 = false;
      }
    },
  },
  created() {},
  mounted() {},
  methods: {
    onLoad() {
      this.$emit("onLoad");
    },
    handleGoDetails(i) {
      this.$router.push({
        path: "/orderDetails",
        query: {
          orderNumber: i.number,
          //  pathName: "Myorder"
          type: i.type,
        },
      });
    },
  },
};
</script>

<style scoped lang="less">
.content-item {
  background-color: #fff;
  height: 238px;
  padding: 18px 14px 0px 14px;
  margin-bottom: 10px;
  .order-date-status {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.5);
    line-height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding-bottom: 9px;
    .order-status {
      color: #ff9c27;
    }
  }
  .order-img-info-price {
    height: 142px;
    // margin-top: 9px;
    padding: 19px 0px;
    display: flex;
    border-bottom: 1px solid #eee;
    .order-img {
      width: 104px;
      height: 104px;
      margin-right: 14px;
      // border: 1px solid green;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .order-info-total {
      flex: 1;
      .order-info {
        height: 48px;
        font-size: 17px;
        text-align: left;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 24px;
      }
      .foot-sort {
        margin-top: 5px;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
        line-height: 20px;
        text-align: left;
      }
      .order-price {
        margin-top: 4px;
        height: 28px;
        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #e62c3b;
        line-height: 28px;
        text-align: left;
      }
    }
  }
  .order-pay-details {
    height: 22px;
    margin-top: 11px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.5);
    line-height: 22px;
    display: flex;
    justify-content: space-between;
    .goDetails {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #05b279;
      line-height: 20px;
    }
  }
}
</style>
