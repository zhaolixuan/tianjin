<template>
  <div class="serverHome">
    <div class="model">
      <img
        @click="toLink('server-model')"
        src="../../../assets/images/serverPDFU.png"
        alt=""
      />
      <img
        @click="toLink('server-recordStatistics')"
        src="../../../assets/images/serverPDFUJL.png"
        alt=""
      />
      <img
        @click="toLink('server-CwfwModel')"
        src="../../../assets/images/serverYLCWFUJH.png"
        alt=""
      />
      <img
        @click="toLink('server-CwfwModel', 8)"
        src="../../../assets/images/serverYLCWFWJL.png"
        alt=""
      />
    </div>
    <Server-exeFooter />
  </div>
</template>

<script>
import ServerExeFooter from "@/components/common/serverExeFooter.vue";
import { mapMutations } from "vuex";
import { delCookie, setCookie, setSessionItem } from "@/utils/storage";
// import Vconsole from "vconsole";
// let vConsole = new Vconsole();
export default {
  data() {
    return {};
  },
  components: {
    ServerExeFooter,
  },
  // beforeRouteLeave(to, from, next) {
  //     if (to.path === '/server-CwfwModel') {
  //         to.meta.keepAlive = true
  //     }
  //     next()
  // },
  created() {},
  mounted() {
    let params = this.$route.query.params;
    if (params != "" && params != undefined) {
      //清空cookie
      localStorage.clear();
      delCookie("gunsToken");
      delCookie("idCard");
      let data = JSON.parse(this.$Base64.decode(params)); //解密
      console.log(params, data);

      setCookie("gunsToken", data.token);
      this.SET_INFO_NAME(data.phone);
      setSessionItem("username", data.userName);
      setSessionItem("account", data.phoneIdCrad);
    }
  },
  methods: {
    ...mapMutations(["SET_INFO_NAME"]),
    toLink(path, num) {
      this.$router.push({ path, query: { type: num } });
    },
  },
};
</script>

<style scoped lang="less">
.serverHome {
  padding-bottom: 70px;
  .model {
    padding: 14px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    img {
      width: 167px;
      margin-bottom: 14px;
    }
  }
}
</style>
