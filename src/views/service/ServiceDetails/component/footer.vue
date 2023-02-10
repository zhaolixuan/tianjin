<template>
  <footer>
    <div class="left">
      <div @click="handelConllection">
        <img
          v-if="!active"
          src="../../../../assets/images/xingxing.png"
          alt=""
        />
        <img
          v-else
          src="../../../../assets/images/xingxing-active.png"
          alt=""
        />
        收藏
      </div>
      <div>
        <a style="color: #000" :href="`tel:${phone}`">
          <img src="../../../../assets/images/telephone@2x.png" alt="" />电话
        </a>
      </div>
    </div>

    <div class="right" @click="handelOrder">立即下单</div>
  </footer>
</template>

<script>
export default {
  props: ["active", "phone"],
  name: "",
  data() {
    return {};
  },
  methods: {
    handelConllection() {
      this.$emit("handelConllection");
    },
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
  height: 70px;
  background: #fff;
  align-items: center;
  justify-content: space-between;
  .left {
    flex: 1;
    display: flex;
    justify-content: center;
    height: 100%;
    div {
      margin: 0 22px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.5);
      img {
        width: 33px;
      }
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .right {
    flex: 1;
    height: 100%;
    background: #05b178;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
