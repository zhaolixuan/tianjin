<template>
  <div>
    <Box-header
      :headerData="serviceHeaderData"
      @handelActive="servicehandelActive"
      :activeHeader="activeHeader"
    />
    <search-box @handleChangeText="handleChangeText"></search-box>
    <Box-contect
      :serviceContentData="serviceContentData"
      :activeHeader="activeHeader"
    />
    <van-empty v-if="!serviceContentData.length" description="暂无数据" />
    <Footer />
  </div>
</template>

<script>
import BoxHeader from "./component/BoxHeader.vue";
import SearchBox from "./component/searchBox.vue";
import BoxContect from "./component/BoxContect.vue";
import { getSlhList } from "@/api/slhgz.js";
import { mapMutations } from "vuex";
//import Vconsole from "vconsole";
import { delCookie, setCookie, setSessionItem } from "@/utils/storage";
//let vConsole = new Vconsole();
export default {
  data() {
    return {
      serviceHeaderData: [
        { typeName: "待改造" },
        { typeName: "改造中" },
        { typeName: "改造完成" },
        { typeName: "验收中" },
        { typeName: "验收结果" },
      ],
      activeHeader: "待改造",
      serviceContentData: [{}],
      limit: 10,
      page: 1,
      loading: false,
      finished: false,
      mealsServiceName: "",
    };
  },
  watch: {
    // activeHeader() {
    //     this.finished = false
    //     this.page = 1
    //     this.serviceContentData = []
    //     this.getContentData()
    // },
  },
  mounted() {
    //   setCookie("JSESSIONID","36A075A80714F61BF5717448E9CCF7E9; Idea-e6161943=aaceb77f-a616-452b-a9ec-6bd375c9eafd; token=5a3678c18cba98682141b1a2bdc42ccf; Admin-Expires-In=14400; gunsToken=63810ad72a7cd70e400c788b05adae7e")

    let params = this.$route.query.params;
    if (params != "" && params != undefined) {
      //清空cookie
      localStorage.clear();
      delCookie("gunsToken");
      delCookie("idCard");
      let data = JSON.parse(this.$Base64.decode(params)); //解密
      console.log(params, data);

      setCookie("gunsToken", data.token);
      this.SET_INFO_NAME(data.idCard);
      setSessionItem("username", data.userName);
      setSessionItem("account", data.phoneIdCrad);
      setSessionItem("idCard", data.idCard);
    }

    this.getTab("待改造");
    // this.getHeaderData()
    // this.$route.meta.keepAlive = true
  },
  components: {
    BoxHeader,
    SearchBox,
    BoxContect,
  },
  methods: {
    ...mapMutations(["SET_INFO_NAME"]),
    handleChangeText(n) {
      this.mealsServiceName = n;
      this.getTab(this.activeHeader);
    },
    onLoad() {
      // this.page++
      // this.getContentData()
    },
    getHeaderData() {
      // 调 listDictsByCode 接口
      getServiceType().then((res) => {
        if (res && res.code == "200") {
          this.serviceHeaderData = res.data;
          // 做判断 两种情况
          // 第一种是点击 home  主页中 nav 跳转
          // 第二种是点击 footer 组件中 服务进入
          if (this.$route.query.name) {
            this.activeHeader = this.$route.query.name + "类";
          } else {
            this.activeHeader = res.data[0].typeName;
          }
        } else {
          this.serviceHeaderData = [];
        }
      });
    },
    getContentData() {
      if (!this.activeHeader) return;
      this.loading = true;
      let data = {
        mealsServiceName: this.mealsServiceName,
        category: this.activeHeader,
        limit: this.limit,
        page: this.page,
      };
      // 调 getBusinessList 接口
      getServiceList(data).then((res) => {
        this.loading = false;
        if (res && res.code == "200") {
          res.data.forEach((i) => {
            this.serviceContentData.push(i);
          });
          if (res.data.length < 10) {
            this.finished = true;
          }
        }
      });
    },
    // BoxHeader.vue 组件将当前被点击的 navItem 传递过来
    servicehandelActive(n) {
      this.activeHeader = n;
      this.getTab(n);
    },
    getTab(name) {
      let data = {
        status: name,
        likeParam: this.mealsServiceName,
      };
      getSlhList(data).then((res) => {
        this.serviceContentData = res.data;
        console.log(this.serviceContentData);
      });
    },
  },
};
</script>

<style scoped lang="less"></style>
