<template>
  <div class="older-page_bg">
    <page-header title="家庭养老床位服务数据统计分析"></page-header>
    <div class="older-container">
      <div class="bread">
        <bread-crumb @handelMap="handelMap"></bread-crumb>
      </div>
      <div class="left-panels">
        <service-organization
          :serviceAgencyMap="serviceAgencyMap"
          v-if="serviceAgencyMap"
        ></service-organization>
        <yanglaochuangwei-age :ageMap="signingAgeMap"></yanglaochuangwei-age>

        <!-- <people-state :orderTypeTotalMap="orderTypeTotalMap"></people-state> -->

        <yanglaochuangwei-body
          :signTitleMap="signTitleMap"
          :signCountMap="signCountMap"
        ></yanglaochuangwei-body>

        <yanglaochuangwei-nursing
          :signTitleMap="nursingTitleMap"
          :signCountMap="nursingCountMap"
        ></yanglaochuangwei-nursing>

        <!-- <Service-older :sexMap="oldsexMap"></Service-older> -->
      </div>
      <div class="centre-panels">
        <main-chart-map @handelMap="handelMap"></main-chart-map>
        <!-- <food-chart-map></food-chart-map> -->
      </div>
      <div class="right-panels">
        <!-- <norm-layout text="居家养老服务运营"></norm-layout> -->
        <service-run
          :serviceMealMap="serviceMealMap"
          @handleTime="handleTime"
          @setServiceTime="setServiceTime"
          :Loading.sync="isSearchLoading"
        ></service-run>
        <!-- <div class="content">
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
        </div> -->
        <service-class :serviceSortMap="serviceSortMap"></service-class>
        <ServiceItems-top5
          :oldagetop5Title="oldagetop5Title"
          :oldagetop5Count="oldagetop5Count"
        ></ServiceItems-top5>
        <oldman-list :tableData="tableData"></oldman-list>
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
import ServiceOperation from "./components/ServiceOperation/index";
import ServiceSupervise from "./components/ServiceSupervise/index";
import ProviedTalens from "./components/ProviedTalens/index";
import BreadCrumb from "./components/BreadCrumb";
import PeopleState from "./components/PeopleState";
import ServiceScene from "./components/ServiceScene/index";
import ServiceWay from "./components/ServiceWay/index";
import NormLayout from "./components/NormLayout";
import { mapGetters } from "vuex";
import MainChartMap from "./components/OlderMap/index";
import Menu from "./components/Menu/index";
import ServiceRun from "./components/ServiceRun/index";
import ServiceClass from "./components/ServiceClass/index";
import OldmanList from "./components/OldmanList/index";
import yanglaochuangweiNursing from "./components/yanglaochuangweiNursing/index";
import {
  getSigningSituation,
  getSigningPeopleAge,
  getPhysicalCondition,
  getCompanySigningSituation,
  getServiceCountPrice,
  getServiceType,
  getServiceProject,
  getServiceRecord,
  getServiceUserByCompany
} from "./apis/index";
import ProvideHelp from "./components/ProvideHelp/index";
import { getLocalItem } from "@/utils/utils.js";

export default {
  name: "YanglaochuangweiService",
  data() {
    return {
      serviceAgencyMap: {},
      serviceOrderMonthMap: [],
      collectionPersonMap: {},
      deviceopenMap: {},
      orderTypeTotalMap: [],
      serviceStyleTotalMap: [],
      moneyServerMap: {},
      equipmentMap: {},
      intelligentRobot: "",
      oldageMap: {},
      streetCode: "",
      communityCode: "",
      automaticTitle: [],
      automaticCount: [],
      signCountMap: [],
      signTitleMap: [],
      nursingCountMap: [],
      nursingTitleMap: [],
      signingAgeMap: {},
      serviceStartTime: "",
      serviceEndTime: "",
      isSearchLoading: false,
      serviceMealMap: {},
      serviceSortMap: [],
      oldagetop5Title: [],
      oldagetop5Count: [],
      tableData: []
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
    Menu,
    yanglaochuangweiAge,
    yanglaochuangweiBody,
    ServiceItemsTop5,
    ServiceOlder,
    PeopleState,
    ServiceRun,
    ServiceClass,
    OldmanList,
    yanglaochuangweiNursing
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
    this.getFreeOrderInfo();
    this.getRightInfo();
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
    setServiceTime(time) {
      this.serviceStartTime = time[0];
      this.serviceEndTime = time[1];
    },
    handleTime() {
      //查询方法
      this.getRightInfo();
    },

    handelMap(params) {
      console.log(params);
      //地图数据  1 河西区 3 街道 4 社区
      if (params.typeNew == 1) {
        //  this.area = "河西区";
        this.streetCode = "";
        this.communityCode = "";
      } else if (params.typeNew == 3) {
        this.streetCode = params.code;
        this.communityCode = "";
      } else if (params.typeNew == 4) {
        this.communityCode = params.code;
      }
      // this.clearList();
      this.getRightInfo();
      this.getFreeOrderInfo();
    },

    getRightInfo() {
      //服务量、消费金额
      getServiceCountPrice({
        streetCode: this.streetCode,
        communityCode: this.communityCode,
        serviceStartTime: this.serviceStartTime,
        serviceEndTime: this.serviceEndTime
      }).then(res => {
        this.isSearchLoading = false;
        this.serviceMealMap = res;
      });

      //服务类型统计
      getServiceType({
        streetCode: this.streetCode,
        communityCode: this.communityCode,
        serviceStartTime: this.serviceStartTime,
        serviceEndTime: this.serviceEndTime
      }).then(res => {
        this.serviceSortMap = res;
      });

      //服务项目统计分析前五
      getServiceProject({
        streetCode: this.streetCode,
        communityCode: this.communityCode,
        serviceStartTime: this.serviceStartTime,
        serviceEndTime: this.serviceEndTime
      }).then(res => {
        let titleArr = [];
        let countArr = [];
        res.forEach(it => {
          titleArr.push(it.serviceProject);
          countArr.push(it.totalCount);
        });
        this.oldagetop5Title = titleArr;
        this.oldagetop5Count = countArr;
      });

      //家庭养老床位服务记录
      getServiceRecord({
        streetCode: this.streetCode,
        communityCode: this.communityCode,
        serviceStartTime: this.serviceStartTime,
        serviceEndTime: this.serviceEndTime,
        page: 1,
        size: 3
      }).then(res => {
        this.tableData = res;
      });
    },
    getFreeOrderInfo() {
      //床位签约情况
      getSigningSituation({
        streetCode: this.streetCode,
        communityCode: this.communityCode
      }).then(res => {
        this.serviceAgencyMap = res;
      });

      //签约人群年龄
      getSigningPeopleAge({
        streetCode: this.streetCode,
        communityCode: this.communityCode
      }).then(res => {
        this.signingAgeMap = res;
      });

      //签约老人身体状况
      getPhysicalCondition({
        streetCode: this.streetCode,
        communityCode: this.communityCode
      }).then(res => {
        this.orderTypeTotalMap = [
          {
            channalsName: "正常",
            orderChannalsTotal: res.normal
          },
          {
            channalsName: "轻度",
            orderChannalsTotal: res.mild
          },
          {
            channalsName: "中度",
            orderChannalsTotal: res.moderate
          },
          {
            channalsName: "重度",
            orderChannalsTotal: res.severed
          }
        ];
        console.log(this.orderTypeTotalMap);
      });

      //服务商签约情况
      getCompanySigningSituation({
        streetCode: this.streetCode,
        communityCode: this.communityCode
      }).then(res => {
        let titleArr = [];
        let countArr = [];
        res.forEach(it => {
          titleArr.push(it.companay);
          countArr.push(it.totalCount);
        });
        this.signTitleMap = titleArr;
        this.signCountMap = countArr;
      });

      //服务商护理人员
      getServiceUserByCompany({
        streetCode: this.streetCode,
        communityCode: this.communityCode
      }).then(res => {
        let titleArr = [];
        let countArr = [];
        res.data.forEach(it => {
          titleArr.push(it.companyName);
          countArr.push(it.num);
        });
        this.nursingTitleMap = titleArr;
        this.nursingCountMap = countArr;
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
