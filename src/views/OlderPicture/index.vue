<template>
  <div class="picturewrapper">
    <div class="nav_btn" @click="openDialog"></div>
    <el-dialog
      :fullscreen="fullscreen"
      :visible.sync="$store.state.navDialogVisible"
    >
      <Navigation></Navigation>
    </el-dialog>
    <page-header></page-header>
    <bread-crumb :crumbData="crumbData"></bread-crumb>
    <HeadInfo :listData="populationRecordVo"></HeadInfo>
    <BaseInfo :listData="basePersonVo"></BaseInfo>
    <HealthInfo :listData="healthRecordVo"></HealthInfo>
    <SocialInfo :listData="shebRecordVo"></SocialInfo>
    <OlderInfo
      :listData="jiezhongxinxi"
      :serviceList="serviceList"
      :jiezhongxinxi="jiezhongxinxi"
    ></OlderInfo>
    <SubsidyInfo :listData="basePersonAllowanceVo"></SubsidyInfo>
  </div>
</template>

<script>
import api from "@/api/api";
import Header from "@/components/Header/index";
import PageHeader from "../ProvideAged/components/PageHeader/index.vue";
import BreadCrumb from "@/components/BreadCrumb/index";
import Navigation from "@/components/Navigation/index";
import HeadInfo from "./HeadInfo";
import BaseInfo from "./BaseInfo";
import HealthInfo from "./HealthInfo";
import SocialInfo from "./SocialInfo";
import OlderInfo from "./OlderInfo";
import SubsidyInfo from "./SubsidyInfo";

export default {
  data() {
    return {
      crumbData: [
        {
          title: "老年人口库",
          url: "/olderPage"
        },
        {
          title: "老年人口画像",
          url: ""
        }
      ],
      fullscreen: true,
      basePersonVo: null,
      healthRecordVo: null,
      populationRecordVo: null,
      serviceList: [],
      shebRecordVo: null,
      basePersonAllowanceVo: null,
      timer: null,
      jiezhongxinxi: {}
    };
  },

  components: {
    Header,
    PageHeader,
    BreadCrumb,
    Navigation,
    HeadInfo,
    BaseInfo,
    HealthInfo,
    SocialInfo,
    OlderInfo,
    SubsidyInfo
  },

  created() {
    this.$store.commit("setActiveName", "老年人口画像");
    this.initPictureData();
    this.timerRun();
  },

  destroyed() {
    this.timerStop();
  },

  methods: {
    openDialog() {
      this.$store.commit("setNavDialogVisible", true);
    },

    initPictureData() {
      var params = {
        idCard: this.$route.query.idCard
      };
      api
        .getOlderDetail(params)
        .then(res => {
          let data = res.data;
          if (data) {
            this.basePersonVo = data.basePersonVo || {};
            this.healthRecordVo = data.healthRecordVo || {};
            this.populationRecordVo = data.populationRecordVo || {};
            this.shebRecordVo = data.shebRecordVo || {};
            this.basePersonAllowanceVo = data.basePersonAllowanceVo || {};
            this.serviceList = data.list || [];
            this.jiezhongxinxi = data.busAnswerVacciness || {};
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    timerRun() {
      this.timer = setInterval(() => {
        this.initPictureData();
      }, 30000);
    },

    timerStop() {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
};
</script>

<style scoped>
.picturewrapper {
  position: relative;
  background: url("../../assets/img/big_project_bg.gif") 100% 100% no-repeat;
  background-size: cover;
  background-color: transparent;
}
</style>
