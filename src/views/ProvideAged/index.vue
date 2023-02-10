<template>
  <div class="provide-aged_page">
    <page-header></page-header>
    <div class="page-content_container">
      <div class="bread-crumb-container">
        <bread-crumb />
        <service-order />
      </div>
      <div class="page-content_main">
        <div class="left-panel">
          <population />
          <div class="chart-map_container">
            <div class="chart-map_title">
              <span class="title-icon"></span>
              <span class="title-text" @click="handleOlderDfs"
                >老年人各片区分布情况</span
              >
            </div>
            <chart-map />
          </div>
        </div>
        <div class="right-panel">
          <Tabs :label.sync="label"></Tabs>
          <p class="lable_text" v-show="label !== '老年人信息'">
            数据来源：养老需求调查问卷
          </p>
        </div>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import ChartMap from "./components/Map/index.vue";
import PageHeader from "./components/PageHeader/index.vue";
import BreadCrumb from "./components/BreadCrumb.vue";
import ServiceOrder from "./components/ServiceOrder.vue";
import Population from "./components/Population/index.vue";
import GenderDistribution from "./components/GenderDistribution/index.vue";
import MonthlyIncome from "./components/MonthlyIncome/index.vue";
import HealthState from "./components/HealthState/index.vue";
import EducationLevel from "./components/EducationLevel/index.vue";
import IncomeSource from "./components/IncomeSource/index.vue";
import PopulationLibrary from "./components/PopulationLibrary/index.vue";
import Tabs from "./components/Tabs";
import { mapGetters } from "vuex";
import Menu from "@/views/OlderDistribution/components/Menu";

export default {
  name: "ProvideAged",
  components: {
    ChartMap,
    PageHeader,
    BreadCrumb,
    ServiceOrder,
    Population,
    GenderDistribution,
    MonthlyIncome,
    HealthState,
    EducationLevel,
    IncomeSource,
    PopulationLibrary,
    Tabs,
    Menu
  },
  data() {
    return {
      label: "老年人信息"
    };
  },
  computed: {
    ...mapGetters(["type", "code", "baseInfo"]),
    params() {
      let params = {};
      const typeCodes = ["code", "zoneCode", "streetCode", "communityCode"];
      params[typeCodes[this.type - 1]] = this.code[0];

      return params;
    }
  },
  watch: {
    code(val) {
      this.$store.dispatch("getOldBaseInfo", this.params);
    }
  },
  created() {
    if (
      this.$route.query.code ||
      (this.$route.query.code && this.$route.query.code.length > 0)
    ) {
      this.initCodeFromUrlQuery();
      this.$store.dispatch("getOldBaseInfo", this.params);
    } else {
      this.initChartInfo();
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
      this.$store.commit("setCode", code);
      this.$store.commit("setType", len);
    },
    initChartInfo() {
      this.$store.dispatch("getUserAuthInfo").then(res => {
        this.$store.dispatch("getOldBaseInfo", this.params);
      });
    },
    handleOlderDfs() {
      if (this.type === 1) {
        this.$router.push({ path: "/olderDfs" });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.provide-aged_page {
  min-height: 100%;
  font-size: initial;
  user-select: none;
  background-image: url("~@/views/ProvideAged/assets/provide-aged-page_bg.png");
}
.page-content_container {
  margin: 0 1.56%;
  .page-content_main {
    display: flex;
    justify-content: space-between;
  }
}
.bread-crumb-container {
  overflow: hidden;
}
.left-panel {
  width: 43.625%;
  .chart-map_container {
    position: relative;
    width: 100%;
    height: 6.7rem;
    background-image: url("~@/views/ProvideAged/assets/echart-map_bg.png");
    background-size: 100% 100%;
    margin-top: 0.4rem;
    .chart-map_title {
      position: absolute;
      display: inline-block;
      z-index: 999;
      padding: 0 0.2rem;
      line-height: 0.9rem;
      border-radius: 2px;
      // border: 2px solid rgba(12, 53, 115, 1);
      .title-icon {
        display: inline-block;
        width: 0.119rem;
        height: 0.119rem;
        border-radius: 100%;
        background: rgba(123, 213, 255, 1);
        box-shadow: 0px 0px 4px 0px rgba(207, 255, 244, 0.5);
      }
      .title-text {
        font-size: 0.214rem;
        color: rgba(123, 213, 255, 1);
        cursor: pointer;
      }
    }
  }
}
.right-panel {
  width: 54.635%;
  height: 9.3rem;
  color: #ffffff;
  // background-image: url("~@/views/ProvideAged/assets/chart_container_bg.png");
  background-size: 100% 100%;
  position: relative;
  .lable_text {
    color: rgba(123, 213, 255, 1);
    font-size: 0.17rem;
    position: absolute;
    bottom: 2%;
    right: 5%;
  }
}
</style>
