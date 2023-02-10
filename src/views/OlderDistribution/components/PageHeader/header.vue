<template>
  <div class="page-header">
    <span>{{ title }}</span>
    <span class="right-panel nav-panel">
      <a v-if="roleid != '29'" href="/#/MenuSummary">
        <header-item  icon="catalog" label="目录"></header-item>
      </a>
      <!-- <a href="/#/Frame" target="_blank"> -->
      <!-- 10月28日黎姐教的方法 相对路径 / 如果是测试 / 之前的域名就是测试的 如果是正式 /之前的域名就是正式的 -->
      <a href="/manager" target="_blank">
      <!-- 我的做法 之后根据产品说的 正式环境跳到正式的manager 测试跳到测试的 所以得用黎姐的 -->
      <!-- <a :href="dataManager" target="_blank"> -->
        <header-item label="数据管理"></header-item>
      </a>
      <header-item
        label="退出"
        icon="logout"
        @click.native="handleLogout"
      ></header-item>
    </span>
    <span class="time"><header-item :label="formatDate"></header-item></span>
  </div>
</template>

<script>
import HeaderItem from "./HeaderItem.vue";
import domain from "@/api/domain_sso.js";
import { delCookie } from "@/api/cookie";

function formatDate() {
  const date = new Date();
  const year = date.getFullYear(),
    month =
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1),
    day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate(),
    hour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours(),
    min = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes(),
    sec = date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();
  return `${year}年${month}月${day}日 ${hour}:${min}:${sec}`;
}

export default {
  name: "pageHeader",
  data() {
    return {
      formatDate: formatDate(),
      roleid:''
    };
  },
  
  props: {
    title: {
      type: String,
      default: () => ""
    }
  },

  components: {
    HeaderItem
  },

  computed: {
    logoutUrl() {
      return `${domain}/sso?redirectUrl=${window.location.href}`;
    },
    // 2021年10月28日 分环境做做目录中数据管理跳转
    dataManager(){
      var str = '';
      if(process.env.NODE_ENV === 'development'){
        str = 'http://tj-yanglao-test.xjoycity.com/manager/';
      }else if(process.env.NODE_ENV === 'production'){
        str = 'http://10.0.7.126/manager';
      }
      return str;
    },
  },

  mounted() {
    setInterval(() => {
      formatDate();
      this.formatDate = formatDate();
    }, 1000);
    this.roleid = window.localStorage.getItem('roleid')
    // console.log(process.env.NODE_ENV); // 本地就是 development
  },

  methods: {
    handleLogout() {
      delCookie("gunsToken");
      delCookie("loginStatus");
      window.localStorage.removeItem("checkedYanglao");
      window.localStorage.removeItem("FreeOrderInfo");
      window.localStorage.removeItem("roleid");
      window.location.href = this.logoutUrl;
    }
  }
};
</script>

<style lang="less" scoped>
.page-header {
  position: relative;
  height: 1.2rem;
  text-align: center;
  background-image: url("~@/views/OlderDistribution/assets/img/top-header_bg.png");
  background-size: 100% 100%;
  line-height: 1rem;
  font-size: 0.5rem;
  font-weight: bold;
  color: #ffffff;
  .nav-panel {
    position: absolute;
    top: 0.6rem;
    right: 0.2rem;
    line-height: 0.202rem;
    font-size: 0.142rem;
    font-weight: 400;
    color: rgba(166, 197, 253, 1);
    display: flex;
    a {
      text-decoration: none;
      color: rgba(166, 197, 253, 1);
    }
  }
  .time {
    position: absolute;
    right: 3.1rem;
    top: 0;
    color: rgba(166, 197, 253, 1);
  }
}
</style>
