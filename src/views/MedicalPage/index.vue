<template>
  <div class="older-page_bg">
    <page-header title="助医服务大数据统计分析" class="header"></page-header>
    <div class="older-container">
      <div class="bread">
        <bread-crumb></bread-crumb>
      </div>
      <div class="left-panels">
        <post-data
          :healthStationMap="healthStationMap"
          :Loading.sync="isSearchLoading"
          @handleTime="handleTime"
          ref="postData"
        ></post-data>
        <post-services
          :servicePeopleMonthMap="servicePeopleMonthMap"
        ></post-services>
        <service-project
          :serviceObjectNumMap="serviceObjectNumMap"
        ></service-project>
      </div>
      <div class="centre-panels">
        <div class="top_panels">
          <food-chart-map></food-chart-map>
          <p class="label_text">数据来源：健康驿站实时服务数据</p>
        </div>
      </div>

      <div class="right-panels">
        <meiacal-services
          :halfincapacitatedNumMap="halfincapacitatedNumMap"
        ></meiacal-services>
        <health-chair :PatientsMap="medicinePatientsMap"></health-chair>
        <services-record :form="form"></services-record>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import PageHeader from "@/views/OlderDistribution/components/PageHeader/header";
import BreadCrumb from "@/views/OlderDistribution/components/BreadCrumb";
import PostData from "./components/PostData/index";
import PostServices from "./components/PostServices/index";
import ServiceProject from "./components/ServicesProject/index";
import FoodChartMap from "./components/FoodMap/index";
import MeiacalServices from "./components/MediacalServices/index";
import ServicesRecord from "./components/ServicesRecord/index";
import HealthChair from "./components/HealthChair/index";
import { mapGetters } from "vuex";
import Menu from "@/views/OlderDistribution/components/Menu";
import { getCateringerService } from "./apis/index";
import { formatTime } from '@/utils/utils.js'

export default {
  name: "bufferPage",
  data() {
    return {
      healthStationMap: {},
      servicePeopleMonthMap: [],
      serviceObjectNumMap: [],
      halfincapacitatedNumMap: [],
      medicinePatientsMap: [],
      serviceTotal: 0,
      isSearchLoading: false,
      form: {
        beginTime: formatTime(new Date(new Date() - 1000 * 60 * 60 * 24 * 30)),
        endTime: formatTime(new Date())
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
    // this.getCateringerService(); // 1 也会触发一次 getCateringerService
    if (
      this.$route.query.code ||
      (this.$route.query.code && this.$route.query.code.length > 0)
    ) {
      this.initCodeFromUrlQuery();
    } else {
      // this.initChartInfo(); // 2 会通过 store 回旋式的触发一次 getCateringerService
    }
  },

  watch: {
    codeNew: {
      handler(val) {
        this.getCateringerService(); // 3 触发 getCateringerService
      },
      immediate: false
    }
  },

  methods: {
    handleTime(time) {
      this.form.beginTime = time.length > 0 ? time[0] : formatTime(new Date(new Date() - 1000 * 60 * 60 * 24 * 30));
      this.form.endTime = time.length > 0 ? time[1] : formatTime(new Date());
      this.getCateringerService();
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

    getCateringerService() {
      let params = Object.assign(this.params, this.form);
      getCateringerService(params).then(res => {
        if (res.data) {
          res.data.servicePeopleDayMap.map(item => {
            item.currentDay = item.currentDay.slice(5);
          });
          this.servicePeopleMonthMap = [
            res.data.servicePeopleDayMap.reverse(),
            res.data.servicePeopleWeekMap.reverse(),
            res.data.servicePeopleMonthMap.reverse()
          ];
          this.serviceObjectNumMap = res.data.serviceObjectNumMap;
          this.serviceTotal = Object.values(this.serviceObjectNumMap[0]).reduce(
            (sum, number) => {
              return sum + number;
            },
            0
          );
          this.healthStationMap = Object.assign({}, res.data.healthStationMap, {
            serviceTotal: this.serviceTotal
          });
          this.halfincapacitatedNumMap = res.data.halfincapacitatedNumMap;
          this.medicinePatientsMap = res.data.medicinePatientsMap;
        }
      });
    }
  },

  components: {
    PageHeader,
    Menu,
    BreadCrumb,
    PostData,
    PostServices,
    ServiceProject,
    FoodChartMap,
    MeiacalServices,
    ServicesRecord,
    HealthChair
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
  /deep/ .header {
    z-index: 99;
  }
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
    margin-top: -0.6rem;
    padding: 1% 1% 0 1%;
    box-sizing: border-box;
    z-index: 3;
  }
  .centre-panels {
    flex: 1;
    height: 10.1rem;
    position: relative;
    .top_panels {
      height: 100%;
      .label_text {
        color: red;
        font-size: 0.18rem;
        position: absolute;
        bottom: 7%;
        right: 3%;
        font-weight: bold;
      }
    }
  }
  .bread {
    position: fixed;
    top: 5%;
    left: 2%;
  }
}
</style>
