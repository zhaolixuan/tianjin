<template>
  <div class="older_page_bg">
    <PageHeader title="卫健养老服务大数据统计分析" />
    <div class="order_container">
      <div class="bread">
        <BreadCrumb />
      </div>
      <div class="left_panels">
        <HealthyCondition :healthStationMap="healthStationMap" />
        <ChronicDisease :chronicDisease="chronicDisease" />
        <HealthRecordInfo />
      </div>
      <div class="center_panels">
        <HomeBedNub :familySickbedMap="familySickbedMap" />
        <ToHospitalDep :hospitalDepartmentsMap="hospitalDepartmentsMap" />
        <IsMedicalnsurance :haveOrNoInsurance="haveOrNoInsurance" />
        <HomeBedDetails />
      </div>
      <div class="right_panels">
        <MedicalCareBed :hospitalBedAdmissionsMap="hospitalBedAdmissionsMap" />
        <SickBedToHospital
          :integratedMedicalWardMap="integratedMedicalWardMap"
        />
        <MedicalSickBedStatistics />
      </div>
    </div>
    <Menu />
  </div>
</template>

<script>
import PageHeader from "@/views/OlderDistribution/components/PageHeader/header";
import BreadCrumb from "@/views/OlderDistribution/components/BreadCrumb";
import HealthyCondition from "./components/HealthyCondition/index";
import ChronicDisease from "./components/ChronicDisease/index";
import HealthRecordInfo from "./components/HealthRecordInfo/index";
import HomeBedNub from "./components/HomeBedNub/index";
import ToHospitalDep from "./components/ToHospitalDep/index";
import IsMedicalnsurance from "./components/IsMedicalnsurance/index";
import HomeBedDetails from "./components/HomeBedDetails/index";
import MedicalCareBed from "./components/MedicalCareBed/index";
import SickBedToHospital from "./components/SickBedToHospital/index";
import MedicalSickBedStatistics from "./components/MedicalSickBedStatistics/index";
import { mapGetters } from "vuex";
import Menu from "@/views/OlderDistribution/components/Menu";
import api from "@/api/api.js";

export default {
  name: "HealthCareService",
  data() {
    return {
      healthStationMap: {}, // 健康状况
      familySickbedMap: {}, // 家庭床位
      hospitalBedAdmissionsMap: {}, // 医护一体化床位
      chronicDisease: {}, // 慢性疾病
      hospitalDepartmentsMap: [], // 入院科室
      integratedMedicalWardMap: [], // 医护一体化病床入院情况统计
      haveOrNoInsurance: {}, // 是否有医保
    };
  },

  components: {
    PageHeader,
    BreadCrumb,
    HealthyCondition,
    ChronicDisease,
    HealthRecordInfo,
    HomeBedNub,
    ToHospitalDep,
    IsMedicalnsurance,
    HomeBedDetails,
    MedicalCareBed,
    SickBedToHospital,
    MedicalSickBedStatistics,
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
    this.getHealthStatistics();
  },

  watch: {
    codeNew(val) {
      this.getHealthStatistics();
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

    getHealthStatistics() {
      let params = {};
      api.getHealthStatistics(params).then(res => {
        if (res.code && res.code == 200) {
          this.healthStationMap = Object.assign(
            {},
            res.data.healthyConditionMap
          );
          this.familySickbedMap = Object.assign({}, res.data.familySickbedMap);
          this.haveOrNoInsurance = Object.assign({}, res.data.familySickbedMap);
          this.hospitalBedAdmissionsMap = Object.assign(
            {},
            res.data.hospitalBedAdmissionsMap
          );
          this.chronicDisease = Object.assign({}, res.data.chronicDiseaseMap);
          this.hospitalDepartmentsMap = res.data.hospitalDepartmentsMap;
          this.integratedMedicalWardMap = res.data.integratedMedicalWardMap;
        }
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
      width: 6rem;
      height: 10.1rem;
      // background-color: #ffffff;
      margin-top: -0.4rem;
      padding: 2% 1% 0 1%;
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
