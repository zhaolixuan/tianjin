<template>
  <footer>
    <div class="left">￥{{ footInfo.price }}</div>
    <div class="right" @click="handelOrder">立即支付</div>
  </footer>
</template>

<script>
export default {
  props: ["footInfo"],
  name: "",
  data() {
    return {
      active: false,
    };
  },
  methods: {
    handelOrder() {
      this.$emit("handelOrder", true);
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
footer {
  position: fixed;
  bottom: -1px;
  left: 0;
  width: 100%;
  display: flex;
  height: 65px;
  background: #fff;
  align-items: center;
  justify-content: space-between;
  .left {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 28px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #e62c3b;
    padding-right: 16px;
  }
  .right {
    width: 150px;
    height: 65px;
    background: linear-gradient(135deg, #ff9c7b 0%, #ff254c 100%);
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    line-height: 65px;
    letter-spacing: 2px;
  }
}
</style>
