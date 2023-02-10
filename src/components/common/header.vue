<template>
  <div class="layout-wrap" v-if="!isWinxin">
    <i
      v-if="this.$route.meta.titleiconhide"
    ></i>
    <i @click="goback" class="el-icon-arrow-left" v-else></i>
    <div class="common-header">{{ title }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isWinxin: false,
    };
  },
  computed: {
    title: function () {
      return this.$route.meta.title;
    },
  },
  mounted() {
    var ua = navigator.userAgent.toLowerCase();

    var isWinxin = ua.indexOf("micromessenger") != -1;

    if (isWinxin) {
      this.isWinxin = true;
      var app = document.querySelector("#app");
      app.style.paddingTop = "0px";
    } else {
      this.isWinxin = false;
    }
  },
  methods: {
    goback() {
      let name = this.$route.meta.pathName;
      if (name) {
        this.$router.push({ name: name });
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.layout-wrap {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 68px;
  width: 100vw;
  font-size: 17px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #000000;
  background: #fff;
  z-index: 999;
  box-shadow: 0px 0px 1px 0px #ccc;
  i {
    position: absolute;
    left: 20px;
    top: 27px;
  }
  .common-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -10px;
  }
}
</style>
