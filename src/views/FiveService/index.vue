<template>
  <div class="older-page_bg">
    <page-header title="五大服务类别数据综合分析"></page-header>
    <div class="older-container">
      <div class="bread">
        <bread-crumb></bread-crumb>
      </div>
      <div class="left-panels">
        <service-run
          :serviceMealMap="serviceMealMap"
          @handleTime="handleTime"
          @setServiceTime="setServiceTime"
          :Loading.sync="isSearchLoading"
        ></service-run>
        <service-order :serviceOrderMap="serviceOrderMap"></service-order>
        <service-class :serviceSortMap="serviceSortMap"></service-class>
      </div>
      <div class="centre-panels">
        <div class="header_report">
          <marquee
            class="service-order_marquee"
            behavior="scroll"
            direction="left"
            v-if="tableData.length >= 1"
          >
            最新服务：
            <span
              >{{ tableData[0].payTime }} {{ tableData[0].orderName }}
              {{ tableData[0].pensioncardNumber }}</span
            >
            <span
              >在{{ tableData[0].merchantName }}享受{{
                tableData[0].requirementBig
              }}
              消费金额：{{ tableData[0].consumerMoney }}元 补贴金额：{{
                tableData[0].allowanceMoney
              }}元</span
            >
          </marquee>
        </div>
        <div class="top_panels">
          <food-chart-map></food-chart-map>
        </div>
      </div>

      <div class="right-panels">
        <place-statistics
          :serviceChannalsMap="serviceChannalsMap"
        ></place-statistics>
        <service-project :serviceTypeMap="serviceTypeMap"></service-project>
        <time-distribute :consumerMoneyMap="consumerMoneyMap"></time-distribute>
        <consume-statistics :mealCouponMap="mealCouponMap"></consume-statistics>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import PageHeader from "@/views/OlderDistribution/components/PageHeader/header";
import ServiceRun from "./components/ServiceRun/index";
import ServiceOrder from "./components/ServiceOrder/index";
import ServiceClass from "./components/ServiceClass/index";
import PlaceStatistics from "./components/PlaceStatistics/index";
import ServiceProject from "./components/ServiceProject/index";
import TimeDistribute from "./components/TimeDistribute/index";
import ConsumeStatistics from "./components/ConsumeStatistics/index";
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import FoodChartMap from "./components/FoodMap/index";
import BreadCrumb from "@/views/OlderDistribution/components/BreadCrumb";
import api from "@/api/api.js";
import {
  getDataStatistical,
  getServiceDataStatisticalSecond
} from "./apis/index";
import { mapGetters } from "vuex";
import Menu from "@/views/OlderDistribution/components/Menu";
import { arrSort } from "@/utils/utils";

export default {
  name: "FiveService",
  data() {
    return {
      serviceMealMap: {},
      serviceChannalsMap: [],
      serviceTypeMap: [],
      consumerMoneyMap: [],
      serviceOrderMap: [],
      serviceSortMap: {},
      facilitatorFlag: "",
      mealCouponMap: [],
      currentPage: 1,
      pageSize: 1,
      total: 0,
      timer: null,
      isSearchLoading: true,
      reportText: "",
      tableData: [],
      form: {
        beginDay: "",
        endDay: ""
      }
    };
  },

  computed: {
    ...mapGetters(["typeNew", "codeNew"]),
    params() {
      let params = {};
      const typeCodes = ["code", "zoneCode", "streetCode", "communityCode"];
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0];

      return params;
    }
  },

  created() {
    this.getOlderList();
    if (
      this.$route.query.code ||
      (this.$route.query.code && this.$route.query.code.length > 0)
    ) {
      this.initCodeFromUrlQuery();
    } else {
      this.initChartInfo();
    }
    // 2021年11月1日 测试环境页面一加载传了时间 本地没传时间 故新增下面这句代码
    // this.handleTime();
  },

  watch: {
    codeNew(val) {
      if (this.params.code) {
        this.facilitatorFlag = "1";
      } else {
        this.facilitatorFlag = "";
      }
      this.handleTime();
    }
  },

  mounted() {
    // this.timer = setInterval(() => {
    //   this.getOlderList();
    // }, 25000);
    this.getOlderList();
  },

  methods: {
    setServiceTime(time) {
      this.form.beginDay = time[0];
      this.form.endDay = time[1];
    },
    handleTime() {
      this.getDataStatistical();
    },
    getDate(time) {
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let date = time.getDate();
      return year + "-" + month + "-" + date;
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
    getDataStatistical() {
      let form = Object.assign({}, this.params, this.form, {
        facilitatorFlag: this.facilitatorFlag
      });
      getDataStatistical(form).then(res => {
        if (res.data) {
          this.isSearchLoading = false;
          this.serviceMealMap = Object.assign(
            {},
            res.data.serviceMealMap,
            res.data.serviceMoneyMap[0]
          );
          this.serviceTypeMap = res.data.serviceTypeMap || [
            {
              mealType: "入户服务",
              serviceMealTypeTotal: 0
            },
            {
              mealType: "现场服务",
              serviceMealTypeTotal: 0
            }
          ];
          this.consumerMoneyMap = res.data.consumerMoneyMap || [];
        }
      });
      getServiceDataStatisticalSecond(form).then(res => {
        if (res.data) {
          // 正式环境接口 serviceChannalsMap 字段 返回的有数据 且格式为数组
          if (Array.isArray(res.data.serviceChannalsMap)) {
            let serviceChannalsMap = res.data.serviceChannalsMap.reverse();
            let newArr = serviceChannalsMap.filter(item => {
              return item.channalsName == "居家养老服务卡";
            });
            this.serviceChannalsMap = newArr;
          } else {
            // 测试环境和本地 serviceChannalsMap 字段为空串
            this.serviceChannalsMap = [
              { channalsName: "居家养老服务卡", orderChannalsTotal: 0 }
            ];
          }
          this.serviceSortMap = res.data.serviceSortMap[0] || {};
          this.mealCouponMap = res.data.mealCouponMap || [];
          this.serviceOrderMap =
            (res.data.companyMap &&
              res.data.companyMap.sort(arrSort("value", false))) ||
            [];
        }
      });
    },
    getOlderList() {
      let form = Object.assign({}, this.params, {
        payFlag: "1",
        pageSize: this.pageSize,
        page: this.currentPage
      });
      api.getFreeOrderPage1(form).then(res => {
        const { records, total } = res && res.obj;
        if ((this.pageIndex += this.pageSize) >= total) {
          this.currentPage = 1;
          this.pageIndex = 0;
        }
        this.total = total;
        this.tableData = records;
      });
    }
  },

  components: {
    PageHeader,
    ServiceRun,
    ServiceClass,
    ServiceOrder,
    ServiceProject,
    PlaceStatistics,
    ConsumeStatistics,
    TimeDistribute,
    // ServiceEvaluate,
    NormLayout,
    // DetialTip,
    FoodChartMap,
    // TabsTop,
    BreadCrumb,
    Menu
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
  background-size: 100% 100%;
}
.older-container {
  display: flex;
  height: 100%;
  margin: 0 1.58%;
  .left-panels,
  .right-panels {
    width: 5.5rem;
    height: 10.1rem;
    // background-color: #ffffff;
    margin-top: -0.4rem;
    padding: 1% 1% 0 1%;
    box-sizing: border-box;
    z-index: 3;
  }
  .centre-panels {
    // flex: 1;
    // height: 14.1rem;
    // position: relative;
    flex: 1;
    height: 10.1rem;
    margin-bottom: 1rem;
    position: relative;
    .header_report {
      color: #68f4ff;
      float: right;
      height: 5%;
      width: 100%;
      font-size: 0.214rem;
      display: flex;
      .report_text {
        display: inline-block;
        margin-right: 9.4rem;
      }
    }
    .top_panels {
      height: 95%;
    }
    // .bottom_panels {
    //   height: 37%;
    // }
  }
  .bread {
    position: fixed;
    top: 5%;
    left: 2%;
  }
}
</style>
