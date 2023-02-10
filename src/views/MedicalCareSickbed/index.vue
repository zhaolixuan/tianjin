<template>
  <!-- 此路由已经修改为 HealthCareService; 即,是 HealthCareService 的前身 当时做好等接口 因为客户多次修改 所以废弃 -->
  <div class="older_page_bg">
    <PageHeader title="医护一体病床和家庭病床服务" />
    <div class="order_container">
      <div class="bread">
        <BreadCrumb />
      </div>
      <div class="left_panels">
        <SickbedNumber :healthStationMap="healthStationMap" />
        <SickbedToHospital :serviceChannalsMap="serviceChannalsMap" />
        <DischargeHospital :serviceChannalsMap="serviceChannalsMap" />
      </div>
      <div class="center_panels">
        <div class="top_panels">
          <FoodChartMap />
        </div>
      </div>
      <div class="right_panels">
        <DischargeStatus :serviceChannalsMap="serviceChannalsMap" />
        <MedicalCareList />
        <HomeSickbedList />
      </div>
    </div>
    <Menu />
  </div>
</template>

<script>
import PageHeader from "@/views/OlderDistribution/components/PageHeader/header";
import BreadCrumb from "@/views/OlderDistribution/components/BreadCrumb";
import SickbedNumber from "./components/SickbedNumber/index";
import SickbedToHospital from "./components/SickbedToHospital/index";
import DischargeHospital from "./components/DischargeHospital/index";
import DischargeStatus from "./components/DischargeStatus/index";
import MedicalCareList from "./components/MedicalCareList/index";
import HomeSickbedList from "./components/HomeSickbedList/index";
import FoodChartMap from "@/views/MedicalPage/components/FoodMap/index";
import Menu from "@/views/OlderDistribution/components/Menu";
import { mapGetters } from "vuex";
import { getCateringerService, getDataStatistical } from "./api/api";

export default {
  name: "MedicalCareSickbed",
  data() {
    return {
      healthStationMap: {},
      serviceTotal: 0,
      serviceChannalsMap: [],
      facilitatorFlag: "",
      form: {
        beginDay: new Date("2021,09,23"),
        endDay: new Date("2021,09,23")
      }
    };
  },

  components: {
    PageHeader,
    BreadCrumb,
    SickbedNumber,
    SickbedToHospital,
    DischargeHospital,
    DischargeStatus,
    MedicalCareList,
    HomeSickbedList,
    FoodChartMap,
    Menu
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
    if (
      this.$route.query.code ||
      (this.$route.query.code && this.$route.query.code.length > 0)
    ) {
      this.initCodeFromUrlQuery();
    } else {
      this.initChartInfo();
    }
    this.getCateringerService();
    this.getDataStatistical();
  },

  watch: {
    codeNew(val) {
      this.getCateringerService();
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

    getCateringerService() {
      getCateringerService(this.params).then(res => {
        console.log(res);
        if (res.code && res.code == 200) {
          this.healthStationMap = Object.assign({}, res.data.healthStationMap, {
            serviceTotal: this.serviceTotal
          });
        }
      });
    },

    getDataStatistical() {
      let form = Object.assign({}, this.params, this.form, {
        facilitatorFlag: this.facilitatorFlag
      });
      getDataStatistical(form).then(res => {
        console.log(res);
        this.serviceChannalsMap = res.data.serviceChannalsMap.reverse();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.older_page_bg {
  min-height: 100%;
  font-size: initial;
  user-select: none;
  background-image: url("~@/views/OlderDistribution/assets/img/older-page_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .order_container {
    display: flex;
    height: 100%;
    margin: 0 1.58%;
    .bread {
      position: fixed;
      top: 5%;
      left: 2%;
    }
    .left_panels,
    .right_panels {
      width: 5.5rem;
      height: 10.1rem;
      // background-color: #ffffff;
      margin-top: -0.4rem;
      padding: 1% 1% 0 1%;
      box-sizing: border-box;
      z-index: 3;
    }
    .center_panels {
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
  }
}
</style>
