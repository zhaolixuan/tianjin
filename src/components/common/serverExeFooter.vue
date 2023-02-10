<template>
  <footer>
    <div>
      <router-link to="/server-home">
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
        工单广场
      </router-link>
    </div>
    <div>
      <router-link to="/server-mine">
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
        case "/server-home":
          this.active = "home";
          break;
        case "/server-mine":
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
  width: 100%;
  position: fixed;
  bottom: -1px;
  left: 0;
  display: flex;
  height: 70px;
  align-content: center;
  background: #fff;
  display: flex;
  justify-content: space-evenly;
  div {
    width: 125px;
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
