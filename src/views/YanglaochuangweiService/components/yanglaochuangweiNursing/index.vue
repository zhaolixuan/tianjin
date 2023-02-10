<template>
  <div class="older-content">
    <norm-layout text="服务商护理人员情况"
                 :flag="false"></norm-layout>
    <service-type :MedircalData="ServiceData"
                  path="olderPage"></service-type>
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
      default: () => {},
    },
    signTitleMap: {
      type: Array,
      default: () => []
    },
    signCountMap: {
      type: Array,
      default: () => []
    },
  },
  computed: {
    ServiceData() {
        let titleArr = JSON.parse(JSON.stringify(this.signTitleMap))  ||[]
      let countArr =  JSON.parse(JSON.stringify(this.signCountMap)) ||[]
      return {
        title: titleArr,
        data: countArr,
        label: true,
        labelWidth: 20,
      }
    },
  },
  components: {
    NormLayout,
    ServiceType,
  },
}
</script>

<style lang="less" scoped>
.older-content {

  height: 2.7rem;
}
</style>
