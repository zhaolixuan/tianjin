<template>
  <div class="older-content">
    <norm-layout text="年龄" :flag="false"></norm-layout>
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
    }
  },
  computed: {
    ServiceData () {
      let { eightTotal, nineTotal, sevenTotal, sixTotal } = this.ageMap || {}
      return {
        title: [ '90岁以上', '80-89岁', '70-79岁', '60-69岁' ],
        data: [nineTotal, eightTotal, sevenTotal, sixTotal],
        label: true,
        labelWidth: 30
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
  height: 2.9rem;
}
</style>
