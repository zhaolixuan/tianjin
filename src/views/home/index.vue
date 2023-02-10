<template>
  <div class="home-container">
    <!-- <layout></layout> -->
    <div class="header">
      <div class="header-left">
        <van-icon class="location" name="location" />
        <span @click="seeNearby"> 查看附近养老中心></span>
      </div>
      <div class="header-right">
        <van-button @click="search" type="primary" class="search-btn">
          <van-icon name="search" />
          搜索
        </van-button>
      </div>
    </div>
    <van-swipe
      class="headerImg"
      :autoplay="intervalTime"
      indicator-color="white"
      initial-swipe="0"
      v-on:change="handleChangeSwipeItem"
    >
      <van-swipe-item v-for="(item, index) in bannerSettingFiles" :key="index">
        <div class="banner_href">
          <img :src="item.url" alt="" class="img" />
        </div>
        <!-- <a :href="item.srcUrl"  target="_blank">
          <img :src="item.url" alt="" class="img" />
        </a> -->
      </van-swipe-item>
    </van-swipe>
    <!-- nav -->
    <div class="home-nav">
      <el-card class="nav-item" v-for="i in menuList" :key="i.name">
        <div class="el-card__body" @click="toService(i.name)">
          <img :src="i.src" alt="" />
          <span> {{ i.name }}</span>
        </div>
      </el-card>
    </div>
    <!-- 资讯 -->
    <!-- <div class="consult padbox">
      <Box-header
        :headerData="consultHeaderData"
        @handelActive="consulthandelActive"
        @handelSeemore="handelSeemore"
      />
      <span class="tip_title_box">
        <el-button type="text" class="tip_title">实事新闻</el-button>
        <el-button type="text" class="tip_title">利民政策</el-button>
      </span>
      <div class="consult_tab">
        <p
          v-for="i in consultTabData"
          :key="i"
          :class="activeTab == i ? 'active' : ''"
          @click="consultTabClick(i)"
        >
          {{ i }}
        </p>
      </div>
      <div
        class="consult_con"
        v-for="(item, index) in consultContentList.slice(0, 2)"
        :key="index"
        @click="handleGoDetails(item.articleId)"
      >
        <div class="imgbox">
          <div v-if="item.files.length">
            <img
              :src="
                item.files instanceof Array &&
                item.files[0].url != '' &&
                item.files[0].url
              "
              alt=""
            />
          </div>
          <div v-else>
            <img
              src="../../assets/images/home-activity-img-second.jpg"
              alt=""
            />
          </div>
          <span class="readingNum" v-if="item.numberRead"
            >{{ item.numberRead }}人读过</span
          >
          <span class="readingNum" v-else>33人读过</span>
          <span class="time">{{ item.articleReleaseTime }}</span>
        </div>
        <div class="text">
          <p>{{ item.articleTitle }}</p>
          <img
            src="../../assets/images/fenxiang.png"
            @click.stop="share"
            alt=""
          />
        </div>
      </div>
    </div> -->
    <!-- 推荐活动 -->
    <!-- <div class="consult padbox">
      <Box-header
        :headerData="recommendHeaderData"
        @handelActive="handelRecommendActive"
        @handelSeemore="handelSeemore"
      />
      <span class="tip_title_box">
        <el-button type="text" class="tip_title">社区活动</el-button>
        <el-button type="text" class="tip_title">生活关怀</el-button>
      </span>
      <div
        class="consult_con"
        v-on:click="handleGoActivityDetails(item.id)"
        v-for="(item, index) in activityList"
        :key="index"
      >
        <div class="imgbox">
          <img v-if="item.files.length" :src="item.files[0].url" alt="" />
          <span class="readingNum"
            >{{ item.numberRead ? item.numberRead : "0" }}人读过</span
          >
          <span class="time">{{ item.publishTime }}</span>
        </div>
        
        <div class="text">
          <p>{{ item.activeTitle }}</p>
        </div>
        <div class="information">
          <p>报名时间：{{ item.activeStartTime }}</p>
          <p>活动地点：{{ item.activeSite }}</p>
        </div>
      </div>
    </div> -->
    <Footer />
  </div>
</template>

<script>
// import Layout from "@/components/common/header";
import Footer from "@/components/common/footer";
import BoxHeader from "./component/BoxHeader.vue";
import { getConsultList, getActiveList, getSlideshow } from "@/api/home.js";
import nativeShare from "@/mixin/nativeShare";
import { mapMutations } from "vuex";
import { delCookie, setCookie, setSessionItem } from "@/utils/storage";
// import Vconsole from "vconsole";
// let vConsole = new Vconsole();
export default {
  mixins: [nativeShare],
  name: "home",
  data() {
    return {
      // consultHeaderData: ["养老资讯", "实事新闻", "利民政策"],
      consultHeaderData: ["养老资讯"],
      // recommendHeaderData: ["推荐活动", "社区活动", "生活关怀"],
      recommendHeaderData: ["推荐活动"],
      consultTabData: ["新闻动态", "最新政策"],
      activeTab: "新闻动态",
      menuList: [
        {
          name: "助餐服务",
          src: require("@/assets/images/shanshi.png"),
          router: "",
        },
        {
          name: "生活照料",
          src: require("@/assets/images/shenghuo.png"),
          router: "",
        },
        {
          name: "助医服务",
          src: require("@/assets/images/yiliao.png"),
          router: "",
        },
        {
          name: "托养床位",
          src: require("@/assets/images/rijian.png"),
          router: "",
        },
        {
          name: "其他服务",
          src: require("@/assets/images/qita.png"),
          router: "",
        },
        {
          name: "组织活动",
          src: require("@/assets/images/zuzhi.png"),
          router: "",
        },
      ],

      // 模拟的轮播图 弃用
      carouselList: [
        {
          name: "banner_first",
          src: require("@/assets/images/home-banner.jpg"),
          router: "",
        },
        {
          name: "banner_second",
          src: require("@/assets/images/home-banner-second.png"),
          router: "",
        },
      ],
      consultContentList: [],
      activityList: [],

      // 轮播图
      bannerSettingFiles: [],
      intervalTime: 1,
    };
  },

  components: {
    // Layout,
    // BoxHeader,
    Footer,
  },

  mounted() {
    let params = this.$route.query.params;
    if (params != "" && params != undefined) {
      //清空cookie
      localStorage.clear();
      delCookie("gunsToken");
      delCookie("idCard");
      let data = JSON.parse(this.$Base64.decode(params)); //解密
      console.log(params,data);

      setCookie("gunsToken", data.token);
      this.SET_INFO_NAME(data.userName);
      setSessionItem("username", data.userName);
      setSessionItem("phone", data.phone);
      setSessionItem("cardNumber", data.cardNumber);
      setCookie("idCard", "idCard" + data.idcard);
    }
    // 首页默认加载为 activeTab
    this.getConsultListData();
    this.getActiveListData();
    this.getSlideshowData();
  },

  methods: {
    ...mapMutations(["SET_INFO_NAME"]),
    search() {
      this.$router.push({ path: "/search" });
    },
    toService(name) {
      this.$router.push({ path: "/service", query: { name: name } });
    },

    seeNearby() {
      this.$router.push({ name: "NearbyConsult" });
    },

    // 轮播图
    getSlideshowData() {
      let params = {};
      getSlideshow(params).then((res) => {
        if (res.code && res.code == 200) {
          this.bannerSettingFiles = res.data.bannerSettingFiles;
          this.intervalTime = res.data.intervalTime * 500;
        }
      });
    },

    // 查看全部
    handelSeemore(n) {
      switch (n) {
        case "养老资讯":
          // this.$router.push({ name: "Consult" });
          // this.$router.push({ path: "/Consult", query: { articleColumn: n } });
          this.$router.push({
            path: "/Consult",
            query: { activeTab: this.activeTab },
          });
          break;
        case "推荐活动":
          this.$router.push({ path: "/activity" });
          break;

        default:
          break;
      }
    },

    // 养老资讯-tab切换
    consulthandelActive(i) {
      // this.getConsultListData(i);
    },

    // 养老资讯-子级tab
    consultTabClick(n) {
      this.activeTab = n;
      this.getConsultListData(this.activeTab);
    },

    // 推荐活动-tab切换
    handelRecommendActive(i) {
      // this.getActiveListData(i);
    },

    handleGoDetails(id) {
      // 模拟进行传参 分别对应 home 首页养老资讯活动 1 和 2
      // this.$router.push({ path: "/articleDetails", query: { id: i } });
      this.$router.push({
        path: "/articleDetails",
        query: { articleId: id },
      });
    },

    handleGoActivityDetails(id) {
      this.$router.push({ path: "/activityDetails", query: { id: id } });
    },

    // 轮播图改变的处理函数
    handleChangeSwipeItem(e) {
      // console.log('当前的索引是' + e);
    },

    // 获取资讯列表
    getConsultListData(i) {
      let params = {
        articleColumn: this.activeTab,
      };
      getConsultList(params).then((res) => {
        if (res.data && res.data.length > 0) {
          this.consultContentList = res.data;
        }
      });
    },

    // 获取活动列表
    getActiveListData() {
      let params = {
        // 2条
        limit: 2,
      };
      getActiveList(params).then((res) => {
        if (res.code && res.code == 200 && res.data) {
          this.activityList = res.data;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  // background-color: #f6f6f6;
  padding-bottom: 70px;
  .header {
    height: 53px;
    // border-bottom: 1px solid green;
    display: flex;
    font-size: 17px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
    line-height: 24px;
    padding: 0px 17px;
    background-color: #fff;
    justify-content: space-between;
    .header-left {
      display: flex;
      align-items: center;
      .location {
        width: 18px;
        height: 24px;
        color: rgb(7, 193, 96);
        font-size: 24px;
        margin-right: 10px;
      }
    }
    .header-right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .search-btn {
        height: 29px;
        width: 79px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        background: linear-gradient(180deg, #0cd9b0 0%, #05b178 100%);
        padding: 0;
        justify-content: space-around;
        .van-button__content {
          width: 100%;
        }
        .van-button__text {
          display: flex;
          align-items: center;
          width: 100%;
          justify-content: center;
          .van-icon {
            margin-right: 9px;
          }
        }
      }
    }
  }
  .headerImg {
    height: 201px;
    // border-bottom: 1px solid red;
    padding: 0px 10px;
    .banner_href {
      display: block;
      img {
        height: 201px;
        width: 100%;
      }
    }
  }
  .home-nav {
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    line-height: 25px;
    display: flex;
    flex-wrap: wrap;
    // border-bottom: 1px solid red;
    justify-content: space-between;
    padding: 10px;
    /deep/.nav-item {
      background-color: #fff;
      width: 170px;
      height: 120px;
      text-align: center;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px 0 rgb(0 0 0 / 10%);
      .el-card__body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 20px;
      }
      img {
        width: 50%;
        margin-bottom: 6px;
      }
    }
  }
  .consult {
    position: relative;
    // 一级标题样式
    .tip_title_box {
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 15px;
      left: 100px;
      .tip_title {
        color: rgba(0, 0, 0, 0.5);
      }
      /deep/.el-button.tip_title.el-button--text {
        height: 30px;
        display: flex;
        padding: 0px;
        justify-content: center;
        align-items: center;
      }
    }
    .consult_tab {
      display: flex;
      align-items: center;
      margin-top: 15px;
      padding: 0px 14px;
      p {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        margin-right: 9px;
        color: rgba(0, 0, 0, 0.5);
        margin-right: 20px;
      }
      .active {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
      }
    }
    .consult_con {
      margin-top: 20px;
      border-bottom: 1px solid #ccc;
      padding: 0px 14px 20px;

      .imgbox {
        width: 340px;
        height: 194px;
        position: relative;
        background: #ccc;
        img {
          width: 340px;
          height: 194px;
        }
        span {
          position: absolute;
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
        }
        .readingNum {
          bottom: 7px;
          left: 16px;
        }
        .time {
          bottom: 7px;
          right: 10px;
        }
      }
      .text {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
        }
        p {
          width: 281px;
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.8);
          line-height: 22px;
          text-align: left;
        }
        i {
          margin-right: 5px;
        }
      }
      .information {
        margin-top: 14px;
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.6);
        text-align: left;
        line-height: 20px;
      }
    }
  }
}
</style>
