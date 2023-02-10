<template>
  <div class="older-page_bg">
    <page-header title="志愿者服务数据统计"></page-header>
    <div class="older-container">
      <div class="left-panels">
        <volunteer-team :volunteersTeamMap="volunteersTeamMap"></volunteer-team>
        <volunteer-type :volunteersTypeMap="volunteersTypeMap"></volunteer-type>
        <volunteer-structure></volunteer-structure>
      </div>
      <div class="centre-panels">
        <visitis-register></visitis-register>
        <visit-type :peopleTypeMap="peopleTypeMap"></visit-type>
        <statistics-age :peopleAgeMap="peopleAgeMap"></statistics-age>
      </div>
      <div class="right-panels">
        <review-situation :visitReturnMap="visitReturnMap"></review-situation>
        <review-rank></review-rank>
        <visiting-records></visiting-records>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import PageHeader from "@/views/OlderDistribution/components/PageHeader/header";
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import VolunteerTeam from "./components/VolunteerTeam/index";
import VolunteerType from "./components/VolunteerType/index";
import VisitisRegister from "./components/VisitisRegister/index";
import StatisticsAge from "./components/StatisticsAge/index";
import ReviewSituation from "./components/ReviewSituation/index";
import ReviewRank from "./components/ReviewRank/index";
import VisitType from "./components/VisitType/index";
import VisitingRecords from "./components/VisitingRecords/index";
import VolunteerStructure from "./components/VolunteerStructure/index";
import { getVolunteerServiceInfo } from "./apis/index";
import { mapGetters } from "vuex";
import Menu from "@/views/OlderDistribution/components/Menu";

export default {
  name: "ServiceVolunteer",
  data() {
    return {
      volunteersTeamMap: {},
      peopleTypeMap: [],
      volunteersTypeMap: {},
      visitReturnMap: {},
      peopleAgeMap: []
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
    this.getVolunteerServiceInfo();
  },

  watch: {
    codeNew(val) {
      this.debounce(this.getVolunteerServiceInfo, 1000);
    }
  },

  methods: {
    getVolunteerServiceInfo() {
      getVolunteerServiceInfo(this.params).then(res => {
        const {
          volunteersTeamMap,
          peopleTypeMap,
          peopleAgeMap,
          volunteersTypeMap,
          visitReturnMap
        } = res && res.data;
        this.volunteersTeamMap = volunteersTeamMap;
        this.peopleTypeMap = peopleTypeMap;
        this.peopleAgeMap = peopleAgeMap;
        this.volunteersTypeMap = volunteersTypeMap[0];
        this.visitReturnMap = visitReturnMap[0];
      });
    },

    debounce(fn, wait) {
      if (this.fn !== null) {
        clearTimeout(this.fn);
      }
      this.fn = setTimeout(fn, wait);
    }
  },

  components: {
    PageHeader,
    Menu,
    NormLayout,
    VolunteerTeam,
    VolunteerType,
    VisitisRegister,
    VisitType,
    StatisticsAge,
    ReviewSituation,
    ReviewRank,
    VisitingRecords,
    VolunteerStructure
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
  .bread {
    position: fixed;
    top: 6%;
    left: 2%;
  }
}
</style>
