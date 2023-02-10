<template>
  <div class="page-header">
    <span class="title">河西区居家养老大数据决策分析平台</span>
    <span class="left-panel nav-panel">
      <header-item :label="formatDate"></header-item>
    </span>
    <span class="right-panel nav-panel">
      <a href="/manager/" target="_blank">
        <header-item label="数据管理"></header-item>
      </a>
      <a href="/manager/system/user_chpwd" target="_blank">
        <header-item label="修改密码"></header-item>
      </a>
      <header-item
        label="退出"
        icon="logout"
        @click.native="handleLogout"
      ></header-item>
    </span>
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
  name: "PageHeader",
  components: {
    HeaderItem,
  },
  data() {
    return {
      timer: null,
      formatDate: formatDate(),
    };
  },
  computed: {
    logoutUrl() {
      return `${domain}/sso?redirectUrl=${window.location.href}`;
    },
  },
  mounted() {
    this.getFormatDate();
  },
  methods: {
    handleLogout() {
       delCookie("gunsToken");
      delCookie("loginStatus");
      window.localStorage.removeItem("checkedYanglao");
      window.localStorage.removeItem("FreeOrderInfo");
      window.localStorage.removeItem("roleid");
      window.location.href = this.logoutUrl;
    },
    getFormatDate() {
      this.timer = setInterval(() => {
        this.formatDate = formatDate();
      }, 1000);
    },
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>

<style lang="less" scoped>
.page-header {
  position: relative;
  height: 0.869rem;
  text-align: center;
  background-image: url("~@/views/ProvideAged/assets/header_bg.png");
  background-size: 100% 100%;

  .title {
    position: absolute;
    left: 0;
    right: 0;
    display: inline-block;
    margin-top: 0.134rem;
    line-height: 0.468rem;
    font-size: 0.334rem;
    font-weight: 600;
    color: rgba(201, 238, 255, 1);
  }

  .nav-panel {
    position: absolute;
    top: 0.445rem;
    line-height: 0.202rem;
    font-size: 0.142rem;
    font-weight: 400;
    color: rgba(166, 197, 253, 1);

    a {
      text-decoration: none;
      color: rgba(166, 197, 253, 1);
    }
  }

  .left-panel,
  .right-panel {
    position: absolute;
    display: flex;
    align-items: center;
  }

  .left-panel {
    left: 5.7%;
  }

  .right-panel {
    right: 5.2%;

    cursor: pointer;
  }
}
</style>
