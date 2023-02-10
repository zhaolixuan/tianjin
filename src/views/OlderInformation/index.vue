<template>
  <div class="older-page_bg">
    <page-header title="河西区居家养老服务管理系统"></page-header>
    <div class="older-container">
      <div class="bread">
        <norm-layout
          text="首页———老年人基本信息统计"
          path="olderDistribution"
          :flag="null"
        ></norm-layout>
      </div>
      <div class="left-panels">
        <p class="left_top">
          <img
            :src="
              require(`@/views/OlderDistribution/assets/icons/${$route.query
                .type || 'older'}.png`)
            "
            class="icon"
            alt="norm-icon"
          />
          {{ labelText }}：{{ number }}人
        </p>
        <statistics-age :ageMap="oldageMap"></statistics-age>
        <statistics-sex :sexMap="oldsexMap"></statistics-sex>
      </div>
      <div class="centre-panels">
        <live-method :houseType="oldlivingpattemMap"></live-method>
        <physical-condition
          :physicalconditionMap="physicalconditionMap"
        ></physical-condition>
        <monthly-income :incomeElderlyMap="oldincomeMap"></monthly-income>
      </div>
      <div class="right-panels">
        <foucs-on :importantCareMap="importantCareMap"></foucs-on>
        <disease-information></disease-information>
        <!-- <oldman-list :argument="$route.query.identifyFields || '1'"></oldman-list> -->
        <oldman-list
          :argument="$route.query.identifyFields || '1'"
        ></oldman-list>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import PageHeader from "@/views/OlderDistribution/components/PageHeader/header";
import PhysicalCondition from "./components/PhysicalCondition/index";
import StatisticsAge from "./components/StatisticsAge/index";
import StatisticsSex from "./components/StatisticsSex/index";
import LiveMethod from "./components/LiveMethod/index";
import EducationDegree from "./components/EducationDegree/index";
import MonthlyIncome from "./components/MonthlyIncome/index";
import DiseaseInformation from "./components/DiseaseInformation/index";
import OldmanList from "./components/OldmanList/index";
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import FoucsOn from "./components/FocusOn/index";
import {
  getOldPersonInfo,
  getOldPersonInfoThird,
  getOldPersonInfoSecond
} from "./apis/index";
import { mapGetters } from "vuex";
import Menu from "@/views/OlderDistribution/components/Menu";

export default {
  name: "bufferPage",
  data() {
    return {
      number: 0,
      oldageMap: {},
      oldsexMap: {},
      oldlivingpattemMap: {},
      educatedMap: {},
      oldincomeMap: {},
      physicalconditionMap: {},
      importantdiseaseMap: {},
      importantCareMap: {}
    };
  },

  computed: {
    ...mapGetters(["typeNew", "codeNew"]),
    params() {
      let params = {};
      const typeCodes = ["code", "zoneCode", "streetCode", "communityCode"];
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0];
      return params;
    },
    labelText() {
      let label = "";
      switch (this.$route.query.identifyFields || "1") {
        case "1":
          label = "老年人";
          break;
        case "2":
          label = "低收入老人";
          break;
        case "3":
          label = "失能老人";
          break;
        case "4":
          label = "80岁以上老人";
          break;
        default:
          label = "独居老人";
          break;
      }
      return label;
    }
  },

  created() {
    // this.getOldPersonInfo()
    if (
      this.$route.query.code ||
      (this.$route.query.code && this.$route.query.code.length > 0)
    ) {
      this.initCodeFromUrlQuery();
    } else {
      this.initChartInfo();
    }
  },

  mounted() {
    console.log(this.$route.query.flag);
    console.log(this.params);
    // 1 新增这个逻辑片段1 可以从 olderDistribution 选择了社区 然后点 常住老年人 到OlderInformation 然
    // 后点击 目录 到 MenuSummary 然后点击目录中的 老年人基本信息 后 到 OlderInformation 回显社区级别的
    if (this.$route.query.streetCode) {
      window.localStorage.setItem("streetCode", this.$route.query.streetCode);
      window.localStorage.removeItem("communityCode");
    } else if (this.$route.query.communityCode) {
      window.localStorage.setItem(
        "communityCode",
        this.$route.query.communityCode
      );
      window.localStorage.removeItem("streetCode");
    }
  },

  watch: {
    codeNew(val) {
      if (!val) {
        return false;
      }
      this.getOldPersonInfo();
    }
  },

  methods: {
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

    getOldPersonInfo() {
      // let params = Object.assign({}, this.$route.query)

      // olderDistribution 点击了 echarts 地图 然后选择街道 数据更新
      // 然后再点击常住老年人 就会筛选展现 上面那个代码是没有把地址栏的
      // 参数一起作为查询条件的 这个作为了 众里寻他千百度啊 一开始如同
      // 上面谁把它注释了 现在复制一份解开
      let params = Object.assign({}, this.$route.query, this.params); // 只加 this.params 只能回显到街道的

      // 2 新增这个逻辑片段2 可以从 olderDistribution 选择了社区 然后点 常住老年人到 OlderInformation 然后点击
      // 目录 到 MenuSummary 然后点击目录中的 老年人基本信息 后 到 OlderInformation 回显社区级别的

      // 3 但是又经测试 好像出现了 如果只下钻到街道 然后从 MenuSummary 回到 OlderInformation 显示的却是 社区级别
      // 的注释掉吧先 最后又在 mounted 中 if else 新增了 removeItem 片段 完美解决 不管是 下钻到街道还是 社区 从
      // MenuSummary 回到 OlderInformation 都能显示 从OlderInformation到MenuSummary 时候的级别(街道/社区)
      if (this.$route.query.flag) {
        let queObj = {
          streetCode: window.localStorage.getItem("streetCode"),
          communityCode: window.localStorage.getItem("communityCode")
        };
        params = Object.assign({}, queObj);
      }
      console.log(params);

      getOldPersonInfo(params).then(res => {
        if (res.data) {
          let { oldpersontotalMap, oldageMap, oldAgeWayMap } = res.data;
          this.number = oldpersontotalMap.sixtyOldTotal;
          this.oldageMap = oldageMap;
          this.oldsexMap = oldAgeWayMap;
        }
      });

      getOldPersonInfoSecond(params).then(res => {
        if (res.data) {
          let { oldlivingpattemMap, educatedMap, oldincomeMap } = res.data;
          this.oldlivingpattemMap = oldlivingpattemMap;
          this.educatedMap = educatedMap;
          this.oldincomeMap = oldincomeMap;
        }
      });

      getOldPersonInfoThird(params).then(res => {
        if (res.data) {
          let {
            physicalconditionMap,
            importantdiseaseMap,
            importantCareMap
          } = res.data;
          this.physicalconditionMap = physicalconditionMap;
          this.importantdiseaseMap = importantdiseaseMap;
          this.importantCareMap = importantCareMap;
        }
      });
    }
  },

  components: {
    PageHeader,
    Menu,
    LiveMethod,
    StatisticsAge,
    StatisticsSex,
    EducationDegree,
    MonthlyIncome,
    PhysicalCondition,
    DiseaseInformation,
    OldmanList,
    NormLayout,
    FoucsOn
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
    width: 6.5rem;
    height: 10.1rem;
    padding: 1% 1% 0 1%;
    box-sizing: border-box;
    z-index: 3;
    margin-top: -0.2rem;
  }
  .centre-panels {
    flex: 1;
    height: 10.1rem;
    padding: 0 2%;
  }
  .left_top {
    height: 2rem;
    width: 100%;
    line-height: 2rem;
    font-size: 0.25rem;
    color: #28e1fe;
    padding-left: 0.4rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    img {
      height: 0.74rem;
      width: 0.74rem;
      margin-right: 0.4rem;
    }
  }
  .bread {
    position: fixed;
    top: 6%;
    left: 2%;
  }
}
</style>
