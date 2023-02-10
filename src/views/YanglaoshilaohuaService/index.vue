<template>
  <div class="older-page_bg">
    <page-header title="适老化场景场景展示"></page-header>
    <div class="older-container">
      <div class="bread">
        <bread-crumb @handelMap="handelMap"></bread-crumb>
      </div>
      <div class="left-panels">
        <service-public
          :serviceAgencyMap="serviceAgencyMap"
          v-if="serviceAgencyMap"
        ></service-public>

        <service-organization
          :serviceAgencyMap="serviceAgencyMap"
          v-if="serviceAgencyMap"
        ></service-organization>

        <PersonnelType :orderTypeTotalMap="personnelTotalMap"></PersonnelType>

        <service-scene :orderTypeTotalMap="orderTypeTotalMap"></service-scene>

        <!-- <yanglaochuangwei-body :ageMap="oldageMap"></yanglaochuangwei-body> -->

        <!-- <Service-older :sexMap="oldsexMap"></Service-older> -->
      </div>
      <div class="centre-panels">
        <main-chart-map @handelMap="handelMap"></main-chart-map>
        <!-- <food-chart-map></food-chart-map> -->
      </div>
      <div class="right-panels">
        <!-- <norm-layout text="居家养老服务运营"></norm-layout>
        <div class="content">
          <div class="text"
               @click="handleClickRow">
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
        <service-scene :orderTypeTotalMap="orderTypeTotalMap"></service-scene>
   
        <service-way :serviceStyleTotalMap="serviceStyleTotalMap"></service-way> -->
        <ServiceItems-top5
          :ageMap="oldageMap"
          :lifeTitleMap="lifeTitle"
          :lifeCountMap="lifeCount"
        ></ServiceItems-top5>
        <yanglaochuangwei-age
          :ageMap="oldageMap"
          :automaticTitleMap="automaticTitle"
          :automaticCountMap="automaticCount"
        ></yanglaochuangwei-age>

        <oldman-list :tableData="tableData"></oldman-list>

        <!-- <service-supervise></service-supervise>
        <provied-talens :baseInfo="baseInfo" :collectionPersonMap="collectionPersonMap"></provied-talens>
        <provide-help :baseInfo="baseInfo"></provide-help> -->
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import yanglaochuangweiAge from "./components/yanglaochuangweiAge/index";
import yanglaochuangweiBody from "./components/yanglaochuangweiBody/index";
import ServiceItemsTop5 from "./components/ServiceItemsTop5/index";
import ServiceOlder from "./components/ServiceOlder/index";

import PageHeader from "./components/PageHeader/header";
import OlderMessage from "./components/OlderMessage/index";
import SmartDevice from "./components/SmartDevice/index";
import OlderSubsidy from "./components/OlderSubsidy/index";
import OlderNeed from "./components/OlderNeed/index";
import ServiceOrganization from "./components/ServiceOrganization/index";
import ServicePublic from "./components/ServicePublic/index";
import ServiceOperation from "./components/ServiceOperation/index";
import ServiceSupervise from "./components/ServiceSupervise/index";
import ProviedTalens from "./components/ProviedTalens/index";
import BreadCrumb from "./components/BreadCrumb";
import ServiceScene from "./components/ServiceScene/index";
import ServiceWay from "./components/ServiceWay/index";

import OldmanList from "./components/OldmanList/index";
import PersonnelType from "./components/PersonnelType/index";
import NormLayout from "./components/NormLayout";
import { mapGetters } from "vuex";
import MainChartMap from "./components/OlderMap/index";
import Menu from "./components/Menu/index";
import {
  getModifyCount,
  getMdifyProjectCount,
  getModifySingleProjectCount,
  getModifyPlanList,
  reformPeopleType,
} from "./apis/index";
import ProvideHelp from "./components/ProvideHelp/index";
import { getLocalItem } from "@/utils/utils.js";

export default {
  name: "YanglaoshilaohuaService",
  data() {
    return {
      serviceAgencyMap: {},
      serviceOrderMonthMap: [],
      collectionPersonMap: {},
      deviceopenMap: {},
      orderTypeTotalMap: [],
      serviceStyleTotalMap: [],
      personnelTotalMap: [],
      moneyServerMap: {},
      equipmentMap: {},
      intelligentRobot: "",
      oldageMap: {},
      automaticTitle: [],
      automaticCount: [],
      lifeTitle: [],
      lifeCount: [],
      tableData: [],
      data: [],
      apiData: {
        area: "河西区",
        street: "",
        community: "",
        streetCode: "",
        communityCode: "",
      },
      start: 0,
      end: 3,
    };
  },

  components: {
    PageHeader,
    OlderMessage,
    SmartDevice,
    OlderSubsidy,
    OlderNeed,
    ServiceOrganization,
    ServicePublic,
    ServiceOperation,
    ServiceSupervise,
    ProviedTalens,
    MainChartMap,
    BreadCrumb,
    ProvideHelp,
    ServiceScene,
    ServiceWay,
    NormLayout,
    Menu,
    yanglaochuangweiAge,
    yanglaochuangweiBody,
    ServiceItemsTop5,
    ServiceOlder,
    OldmanList,
    PersonnelType,
  },

  computed: {
    ...mapGetters(["typeNew", "codeNew", "baseInfo", "breadCrumbCodes"]),
    params() {
      let params = {};
      const typeCodes = ["code", "zoneCode", "streetCode", "communityCode"];
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0];
      return params;
    },
  },

  watch: {
    codeNew(val) {
      this.$store.dispatch("getOldBaseInfo", this.params);
      if (!val) {
        return false;
      }
      this.apiData = { ...this.apiData, ...this.params };
      this.getFreeOrderInfo();
    },
  },

  created() {
    let streetCode =
      getLocalItem("account") === "admin" || getLocalItem("account") === "hexi"
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
    this.handelMap({ typeNew: 1 });

    this.timer = setInterval(() => {
      if (this.end >= 99) {
        this.start = 0;
        this.end = 3;
      }
      this.tableData = this.data.slice((this.start += 3), (this.end += 3));
    }, 3000);
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
          endTime: JSON.stringify(new Date()),
        },
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
    handelMap(params) {
      //地图数据  1 河西区 3 街道 4 社区
      //console.log(params,11111111);
      if (params.typeNew == 1) {
        this.apiData = {
          ...this.apiData,
          area: "河西区",
          street: "",
          community: "",
        };
      } else if (params.typeNew == 3) {
        this.apiData = { ...this.apiData, street: params.area, community: "" };
      } else if (params.typeNew == 4) {
        this.apiData = { ...this.apiData, community: params.area };
      }
      this.clearList();
      this.getFreeOrderInfo();
    },
    getFreeOrderInfo() {
      //适老化入户改造数量 || 公共区域适老化
      getModifyCount(this.apiData).then((res) => {
        res.projectTotalMoney &&
          (res.projectTotalMoney = parseFloat(
            res.projectTotalMoney
          ).toLocaleString());
        this.serviceAgencyMap = res;
      });

      //适老化改造类型
      getMdifyProjectCount({
        area: this.apiData.area,
        street: this.apiData.street,
        community: this.apiData.community,
      }).then((res) => {
        this.orderTypeTotalMap = [
          {
            channalsName: "生活环境改造",
            orderChannalsTotal: res.shenghuohuanjingCount,
            money: parseFloat(res.shenghuohuanjingPrice).toLocaleString(),
            rersent: res.shenghuohuanjingPersent,
          },
          {
            channalsName: "智能设备安装",
            orderChannalsTotal: res.zhinengshebeiCount,
            money: parseFloat(res.zhinengshebeiPrice).toLocaleString(),
            rersent: res.zhinengshebeiPersent,
          },
        ];
      });

      //人员改造类型
      reformPeopleType({
        area: this.apiData.area,
        street: this.apiData.street,
        community: this.apiData.community,
      }).then((res) => {
        // console.log(res);
        this.personnelTotalMap = res;

        // this.personnelTotalMap = [
        //   {
        //     channalsName: "普通失能",
        //     orderChannalsTotal: res.shenghuohuanjingCount,
        //     money: parseFloat(res.shenghuohuanjingPrice).toLocaleString(),
        //     rersent: res.shenghuohuanjingPersent,
        //   },
        //   {
        //     channalsName: "兜底保障",
        //     orderChannalsTotal: res.zhinengshebeiCount,
        //     money: parseFloat(res.zhinengshebeiPrice).toLocaleString(),
        //     rersent: res.zhinengshebeiPersent,
        //   },
        // ];
      });

      //智能化设备统计
      let automaticParams = {
        type: 1,
        area: this.apiData.area,
        street: this.apiData.street,
        community: this.apiData.community,
      };

      getModifySingleProjectCount(automaticParams).then((res) => {
        let titleArr = [];
        let countArr = [];
        res.forEach((it) => {
          titleArr.push(it.projectName);
          countArr.push(it.projectCount);
        });
        this.automaticTitle = titleArr;
        this.automaticCount = countArr;
      });

      //生活设备统计
      let lifeParams = {
        type: 0,
        area: this.apiData.area,
        street: this.apiData.street,
        community: this.apiData.community,
      };

      getModifySingleProjectCount(lifeParams).then((res) => {
        let titleArr = [];
        let countArr = [];
        res.forEach((it) => {
          titleArr.push(it.projectName);
          countArr.push(it.projectCount);
        });
        //  this.tableData = data.slice(0, 3);
        this.lifeTitle = titleArr.slice(0, 6);
        this.lifeCount = countArr.slice(0, 6);
      });

      getModifyPlanList({
        page: 1,
        limit: 100,
        street: this.apiData.street,
        community: this.apiData.community,
      })
        .then((res) => {
          this.tableData = res.data;
          const { data, count } = res && res;
          this.total = count;
          this.data = data;
          this.tableData = data.slice(0, 3);
        })
        .catch(() => {});
    },
    clearList() {
      this.serviceAgencyMap = {};
    },
  },
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
    width: 6rem;
    height: 10.1rem;
    // background-color: #ffffff;
    margin-top: -0.4rem;
    padding: 1% 1% 0 1%;
    box-sizing: border-box;
    z-index: 3;
  }
  .centre-panels {
    flex: 1;
    height: 10.1rem;
    // margin-top: 1rem;
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
