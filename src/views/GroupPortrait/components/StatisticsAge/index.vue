<template>
  <div class="older-content">
    <norm-layout text="年龄" :flag="false"></norm-layout>
    <service-type :MedircalData="ServiceData"></service-type>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceType from '@/views/OlderDistribution/components/ServiceType/index'
export default {
  name: 'StatisticsAge',
  props: {
    ageMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      let { eightTotal, nineTotal, sevenTotal, sixTotal } = this.ageMap[0] || []
      return {
        title: [ '90岁以上', '80-89岁', '70-79岁', '60-69岁' ],
        data: [nineTotal, eightTotal, sevenTotal, sixTotal],
        label: true,
        labelWidth: 20
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
  height: 2.6rem;
}
</style>
