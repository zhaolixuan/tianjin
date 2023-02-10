<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { delCookie } from "@/api/cookie";

export default {
  name: "App",
  data() {
    return {
      closeWind: [
        "butieDetails",
        "OlderInformation",
        "olderPage",
        "EquipmentList",
        "TheagedGateList",
        'ServiceCarrier',
        'ServiceOlder',
        'VolunteerList',
        'ServiceMerchant',
        'ServiceProvidersAnalysis',
        'ServiceCarrierOperation',
        'OlderConsumpTimesAndAmount',
        'OlderConsumeServerDistribution',
        'OlderConsumeStreetDistribution',
        'InsuranceClaims',
        'HealthStationList',
        'MedicalList',
        'PoststationRecord',
        'HealthRecordInfoSheet',
        'HealthHomeBedDetails',
        'HealthMedicalSickBedStatistics',
        'WarningRecordList',
        'VisitingTeam',
        'VisitingRecords',
        'VisitService',
        'disabledPage',
        'olderSubsidy',
        'NursingHome',
        'ServiceOperation',
        'OlderConsumeServerCarrierDistribution',
        'olderPicture',
        'YanglaoshilaohuaService',
        'YanglaochuangweiService',
        'YanglaoshilaohuaList',
         'YanglaochuangweiList',
         'YanglaoshilaohuaParkList',
      ],
    };
  },

  mounted() {
    window.addEventListener("beforeunload", (e) => this.beforeunloadHandler(e));
  },
  destroyed() {
    window.removeEventListener("beforeunload", (e) =>
      this.beforeunloadHandler(e)
    );
  },
  methods: {
    beforeunloadHandler(e) {
      if (!this.closeWind.includes(this.$route.name)) {
        delCookie("loginStatus");
        window.localStorage.clear();
      }
    },
  },
};
</script>

<style>
.v-modal {
  opacity: 1 !important;
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
ul,
li {
  list-style: none;
}
html,
body {
  height: 100%;
  width: 100%;
  font-family: "Microsoft Yahei";
}
#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
#app > div {
  height: 100%;
}
.nav_btn {
  background: url("assets/img/nav_btn.png") no-repeat;
  width: 0.57rem;
  height: 0.77rem;
  background-size: 0.57rem 0.77rem;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  z-index: 999;
}
.el-dialog__body {
  height: 100% !important;
  padding: 0;
}
.el-dialog__header {
  position: absolute;
  padding: 0;
  z-index: 999;
  width: 100%;
}
#bgFrame {
  border: 0;
}
</style>
