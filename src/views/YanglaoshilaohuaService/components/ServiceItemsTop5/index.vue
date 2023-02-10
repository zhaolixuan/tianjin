<template>
  <div class="older-content">
    <norm-layout text="生活环境改造项目" :flag="false"></norm-layout>

    <service-type :MedircalData="ServiceData" path="olderPage"></service-type>
  </div>
</template>

<script>
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import ServiceType from "@/views/OlderDistribution/components/ServiceType/index";
export default {
  name: "StatisticsAge",
  props: {
    ageMap: {
      type: Object,
      default: () => {},
    },
    lifeTitleMap: {
      type: Array,
      default: () => [],
    },
    lifeCountMap: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ServiceData() {
      let lifeTitle = JSON.parse(JSON.stringify(this.lifeTitleMap)) || [];
      let lifeCount = JSON.parse(JSON.stringify(this.lifeCountMap)) || [];
      return {
        //,'防走失定位','助浴椅','小夜灯','防压疮坐垫','U型上翻扶手'
        title: lifeTitle,
        //  data: [nineTotal, eightTotal, sevenTotal, sixTotal],
        data: lifeCount,
        label: true,
        labelWidth: 20,
        isFormatter: true,
      };
    },
  },
  components: {
    NormLayout,
    ServiceType,
  },
};
</script>

<style lang="less" scoped>
.older-content {
  height: 3.5rem;
}
</style>
