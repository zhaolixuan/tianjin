<template>
  <div class="cancel_ordere_footer">
    <div class="footer_left" v-if="orderCancelTotalPrice">
      <div class="coast_con">
        <span>退款金额</span>
        <span class="coast">￥{{ orderCancelTotalPrice }}</span>
      </div>
      <div class="notice">退回至原支付渠道</div>
    </div>
    <div v-else></div>
    <div class="footer_right" @click="handelOrder">
      <span>提交</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["orderCancelTotalPrice"],
  data() {
    return {};
  },
  methods: {
    handelOrder() {
      this.$emit("handelOrder");
    },
  },
};
</script>

<style lang="less" scoped>
.cancel_ordere_footer {
  position: fixed;
  bottom: -1px;
  left: 0;
  width: 100%;
  display: flex;
  height: 65px;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  .footer_left {
    flex: 1;
    width: 225px;
    height: 65px;
    padding: 0px 0px 0px 15px;
    text-align: left;
    .coast_con {
      margin-top: 14px;
      height: 22px;
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      line-height: 22px;
      span {
        color: #000000;
      }
      .coast {
        margin-left: 7px;
        color: #e62c3b;
      }
    }
    .notice {
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.5);
      line-height: 20px;
    }
  }
  .footer_right {
    width: 150px;
    height: 65px;
    background: linear-gradient(135deg, #ff9c7b 0%, #ff254c 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      width: 44px;
      height: 28px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 28px;
      letter-spacing: 2px;
    }
  }
}
</style>
