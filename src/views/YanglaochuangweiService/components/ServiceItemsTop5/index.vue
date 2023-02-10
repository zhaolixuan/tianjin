<template>
  <div class="older-content">
    <norm-layout text="服务项目统计分析前五" :flag="false"></norm-layout>
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
      default: () => {}
    },
    oldagetop5Title: {
      type: Array,
      default: () => []
    },
    oldagetop5Count: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData() {
      let titleArr = JSON.parse(JSON.stringify(this.oldagetop5Title)) || [];
      let countArr = JSON.parse(JSON.stringify(this.oldagetop5Count)) || [];

      //  let { eightTotal, nineTotal, sevenTotal, sixTotal } = this.ageMap || {}
      return {
        title: titleArr,
        data: countArr,
        label: true,
        labelWidth: 20
      };
    }
  },
  components: {
    NormLayout,
    ServiceType
  }
};
</script>

<style lang="less" scoped>
.older-content {
  height: 2.3rem;
}
</style>
