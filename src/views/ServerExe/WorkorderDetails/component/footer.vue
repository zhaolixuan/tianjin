<template>
  <footer>
    <div
      class="left"
      v-if="servertext == '我要接单'"
      id="revoke"
      @click="handelOrder('撤销服务')"
    >
      撤销服务
    </div>
    <div class="right" @click="handelOrder(servertext)">{{ servertext }}</div>
  </footer>
</template>

<script>
export default {
  props: ["servertext"],
  name: "",
  data() {
    return {
      active: false,
    };
  },
  methods: {
    handelOrder(n) {
      this.$emit("handelOrder", n);
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
  .left {
    width: 132px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.6);
    letter-spacing: 2px;
    overflow: hidden;
    animation: all 1s;
    /*  Webkit内核浏览器：Safari and Chrome*/
    -webkit-transition-property: all;
    -webkit-transition-duration: 0.5s;
    -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    /*  Mozilla内核浏览器：firefox3.5+*/
    -moz-transition-property: all;
    -moz-transition-duration: 0.5s;
    -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    /*  Opera*/
    -o-transition-property: all;
    -o-transition-duration: 0.5s;
    -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    /*  IE9*/
    -ms-transition-property: all;
    -ms-transition-duration: 0.5s;
    -ms-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
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
