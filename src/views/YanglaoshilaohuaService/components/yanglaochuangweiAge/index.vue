<template>
  <div class="older-content">
    <norm-layout text="智能化设备改造" :flag="false"></norm-layout>
    <service-type :MedircalData="ServiceData" path="olderPage"></service-type>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceType from '@/views/OlderDistribution/components/ServiceType/index'
export default {
  name: 'StatisticsAge',
  props: {
    ageMap: {
      type: Object,
      default: () => {}
    },
    automaticTitleMap: {
      type: Array,
      default: () => []
    },
     automaticCountMap: {
      type: Array,
      default: () => []
    },
  },
  computed: {
    ServiceData () {
      let titleArr = JSON.parse(JSON.stringify(this.automaticTitleMap))  ||[]
      let countArr =  JSON.parse(JSON.stringify(this.automaticCountMap)) ||[]
    //  console.log(titleArr,countArr);
      return {
        title:titleArr,
        //data: [nineTotal, eightTotal, sevenTotal, sixTotal],
        data: countArr,
        label: true,
        labelWidth: 20,
        isFormatter: true
      }
    }
  },
  components: {
    NormLayout,
    ServiceType
  }
}
</script>

<style lang="less" scoped>
.older-content {
  height: 3rem;
}
</style>
