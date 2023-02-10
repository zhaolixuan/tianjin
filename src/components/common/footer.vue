<template>
  <footer>
    <div>
      <router-link to="/home">
        <img
          v-if="active != 'home'"
          src="../../assets/images/shouye.png"
          alt=""
        />
        <img
          v-if="active == 'home'"
          src="../../assets/images/shouye-active.png"
          alt=""
        />
        首页
      </router-link>
    </div>
    <div>
      <router-link to="/service">
        <img
          v-if="active != 'service'"
          src="../../assets/images/fuwu.png"
          alt=""
        />
        <img
          v-if="active == 'service'"
          src="../../assets/images/fuwu-active.png"
          alt=""
        />
        服务</router-link
      >
    </div>
    <div>
      <router-link to="/mine">
        <img
          v-if="active != 'mine'"
          src="../../assets/images/wode.png"
          alt=""
        />
        <img
          v-if="active == 'mine'"
          src="../../assets/images/wode-active.png"
          alt=""
        />
        我的</router-link
      >
    </div>
  </footer>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      active: "home",
    };
  },
  methods: {
    setMenuActive(path) {
      switch (path) {
        case "/home":
          this.active = "home";
          break;
        case "/service":
          this.active = "service";

          break;

        case "/mine":
          this.active = "mine";
          break;
        default:
          this.active = "";
          break;
      }
    },
  },
  mounted() {
    this.setMenuActive(this.$route.path);
  },
};
</script>

<style lang="less" scoped>
footer {
  position: fixed;
  bottom: -1px;
  left: 0;
  right: 0;
  display: flex;
  height: 70px;
  align-content: center;
  background: #fff;
  div {
    // width: 125px;
    flex: 1;
    height: 70px;
    text-align: center;
    line-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 30px;
        // margin-top: 5px;
      }
    }
  }
}
</style>
