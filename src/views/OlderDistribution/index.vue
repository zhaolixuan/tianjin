<template>
  <div class="older-page_bg">
    <page-header title="河西区居家养老服务管理平台"></page-header>
    <div class="older-container">
      <div class="bread">
        <bread-crumb></bread-crumb>
      </div>
      <div class="left-panels">
        <older-message></older-message>
        <!-- <older-need></older-need> -->
        <older-subsidy></older-subsidy>
        <smart-device
          :deviceopenMap="deviceopenMap"
          :equipmentMap="equipmentMap"
          :intelligentRobot="intelligentRobot"
        ></smart-device>
        <service-organization
          :serviceAgencyMap="serviceAgencyMap"
          v-if="serviceAgencyMap"
        ></service-organization>
      </div>
      <div class="centre-panels">
        <main-chart-map></main-chart-map>
        <!-- <food-chart-map></food-chart-map> -->
      </div>
      <div class="right-panels">
        <norm-layout text="居家养老服务运营"></norm-layout>
        <div class="content">
          <div class="text" @click="handleClickRow">
            <p class="label">当日服务量</p>
            <p class="value">
              {{ this.moneyServerMap.orderCardMonthTotal || 0 }}
              <span class="unit">客次</span>
            </p>
          </div>
          <div class="text">
            <p class="label">当日消费金额</p>
            <p class="value">
              {{ this.moneyServerMap.consumerMoney || 0 }}
              <span class="unit">元</span>
            </p>
          </div>
        </div>
        <service-operation
          :serviceSupportMap="serviceOrderMonthMap"
        ></service-operation>
        <service-scene :orderTypeTotalMap="orderTypeTotalMap"></service-scene>
        <service-way :serviceStyleTotalMap="serviceStyleTotalMap"></service-way>
        <!-- <service-supervise></service-supervise>
        <provied-talens :baseInfo="baseInfo" :collectionPersonMap="collectionPersonMap"></provied-talens>
        <provide-help :baseInfo="baseInfo"></provide-help> -->
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import PageHeader from "./components/PageHeader/header";
import OlderMessage from "./components/OlderMessage/index";
import SmartDevice from "./components/SmartDevice/index";
import OlderSubsidy from "./components/OlderSubsidy/index";
import OlderNeed from "./components/OlderNeed/index";
import ServiceOrganization from "./components/ServiceOrganization/index";
import ServiceOperation from "./components/ServiceOperation/index";
import ServiceSupervise from "./components/ServiceSupervise/index";
import ProviedTalens from "./components/ProviedTalens/index";
import BreadCrumb from "./components/BreadCrumb";
import ServiceScene from "./components/ServiceScene/index";
import ServiceWay from "./components/ServiceWay/index";
import NormLayout from "./components/NormLayout";
import { mapGetters } from "vuex";
import MainChartMap from "./components/OlderMap/index";
import Menu from "./components/Menu/index";
import { getFreeOrderInfo, getFreeOrderInfoSecond } from "./apis/index";
import ProvideHelp from "./components/ProvideHelp/index";
import { getLocalItem } from "@/utils/utils.js";

export default {
  name: "olderDistribution",
  data() {
    return {
      serviceAgencyMap: [],
      serviceOrderMonthMap: [],
      collectionPersonMap: {},
      deviceopenMap: {},
      orderTypeTotalMap: [],
      serviceStyleTotalMap: [],
      moneyServerMap: {},
      equipmentMap: {},
      intelligentRobot: ""
    };
  },

  components: {
    PageHeader,
    OlderMessage,
    SmartDevice,
    OlderSubsidy,
    OlderNeed,
    ServiceOrganization,
    ServiceOperation,
    ServiceSupervise,
    ProviedTalens,
    MainChartMap,
    BreadCrumb,
    ProvideHelp,
    ServiceScene,
    ServiceWay,
    NormLayout,
    Menu
  },

  computed: {
    ...mapGetters(["typeNew", "codeNew", "baseInfo", "breadCrumbCodes"]),
    params() {
      let params = {};
      const typeCodes = ["code", "zoneCode", "streetCode", "communityCode"];
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0];
      return params;
    }
  },

  watch: {
    codeNew(val) {
      this.$store.dispatch("getOldBaseInfo", this.params);
      if (!val) {
        return false;
      }
      this.getFreeOrderInfo();
    }
  },

  created() {
    let streetCode =
      getLocalItem("account") === "admin" ||
      getLocalItem("account") === "hexi"
        ? ""
        : getLocalItem("account");
    // this.getFreeOrderInfo(); // 10月27日解开这个调用注释
    // this.$store.dispatch("getOldBaseInfo", {
    //   streetCode: streetCode,
    //   ...this.params
    // });

    if (
      this.$route.query.code ||
      (this.$route.query.code && this.$route.query.code.length > 0)
    ) {
      this.initCodeFromUrlQuery();
    } else {
      this.initChartInfo();
    }
  },

  methods: {
    handleClickRow() {
     this.$router.push({
        path: "ServiceOlder",
        query: {
          code: this.breadCrumbCodes,
          key: "4",
          header: "河西区居家养老服务管理平台",
          allStatus: ["未领", "已领"],
          startTime: JSON.stringify(new Date()),
          endTime: JSON.stringify(new Date())
        }
      });

    },

    initCodeFromUrlQuery() {
      let code = [];
      let len = 1;
      if (typeof this.$route.query.code !== "string") {
        code[0] = this.$route.query.code[this.$route.query.code.length - 1];
        code[1] = this.$route.query.code[this.$route.query.code.length - 2];
        len = this.$route.query.code.length;
      } else {
        code = [this.$route.query.code, "120100000000"];
      }
      this.$store.commit("setCodeNew", code);
      this.$store.commit("setTypeNew", len);
    },

    initChartInfo() {
      this.$store.dispatch("getUserAuthInfo");
    },

    getFreeOrderInfo() {
      let streetCode =
        getLocalItem("account") === "admin" ||
        getLocalItem("account") === "hexi"
          ? ""
          : getLocalItem("account");
      getFreeOrderInfo({ streetCode, ...this.params }).then(res => {
        // console.log(res);
        this.collectionPersonMap = res.data.collectionPersonMap;
        this.deviceopenMap = res.data.deviceopenMap;
        this.intelligentRobot = res.data.intelligentRobot;

        // 模拟正式库接口的返回 因为这个属性测试和本地库为字符串(没有值)
        // let arr = [
        //   {orderChannalsTotal: "0", channalsName: "商家APP"},
        //   {orderChannalsTotal: 130622, channalsName: "居家养老服务卡"},
        //   {orderChannalsTotal: "0", channalsName: "电话下单"}
        // ]
        // let orderTypeTotal = arr;
        let orderTypeTotal = res.data.orderTypeTotalMap;
        let oderSingleArr = [];
        if (Array.isArray(orderTypeTotal) && orderTypeTotal.length > 0) {
          orderTypeTotal.forEach(item => {
            if (item.channalsName == "居家养老服务卡") {
              oderSingleArr.push(item);
            }
          });
        } else {
          oderSingleArr = "";
        }
        // console.log(oderSingleArr);
        this.orderTypeTotalMap = oderSingleArr || [
          { channalsName: "居家养老服务卡", orderChannalsTotal: 0 }
          // { channalsName: "商家APP", orderChannalsTotal: 0 },
          // { channalsName: "电话下单", orderChannalsTotal: 0 }
        ];
        this.moneyServerMap = res.data.moneyServerMap[0];
        this.equipmentMap = res.data.equipmentMap;
      });
      getFreeOrderInfoSecond({ streetCode, ...this.params }).then(res => {
        this.serviceAgencyMap = res.data.serviceAgencyMap;
        this.serviceOrderMonthMap = [
          res.data.serviceOrderMonthMap.reverse(),
          res.data.healthServerMonthMap.reverse(),
          res.data.houseKeepingOrderMonthMap.reverse()
        ];
        this.serviceStyleTotalMap = res.data.serviceStyleTotalMap || [];
      });
    }
  }
};
</script>

<style lang="less" scoped>
.older-page_bg {
  min-height: 100%;
  font-size: initial;
  user-select: none;
  background-image: url("~@/views/OlderDistribution/assets/img/older-page_bg.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.older-container {
  display: flex;
  height: 100%;
  margin: 0 1.58%;
  .left-panels,
  .right-panels {
    width: 5.7rem;
    height: 10.1rem;
    // background-color: #ffffff;
    margin-top: -0.4rem;
    padding: 1% 1% 0 1%;
    box-sizing: border-box;
    z-index: 3;
  }
  .centre-panels {
    flex: 1;
    height: 9.2rem;
    margin-bottom: 1rem;
    position: relative;
    // border: 4px solid;
    // border-image: -webkit-linear-gradient(#ddd, #000) 30 30;
    // border-image: -moz-linear-gradient(#ddd, #000) 30 30;
    // border-image: linear-gradient(#ddd, #000) 30 30;
  }
  .bread {
    position: fixed;
    top: 5%;
    left: 2%;
  }
  .content {
    height: 1rem;
    display: flex;
    .text {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .label {
        font-size: 0.17rem;
        color: #ffffff;
        margin-bottom: 0.07rem;
      }
      .value {
        font-size: 0.24rem;
        color: #ff8400;
        font-weight: 600;
        .unit {
          color: #28e1fe;
          font-size: 0.14rem;
        }
      }
    }
  }
}
</style>
