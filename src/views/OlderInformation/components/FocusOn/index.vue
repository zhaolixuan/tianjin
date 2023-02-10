<template>
  <div class="older-content">
    <norm-layout text="重点关照老人" :flag="false"></norm-layout>
    <service-chart :ServiceData="ServiceData" path="olderPage"></service-chart>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceChart from '@/views/BuffetPage/components/ServiceChart/index'
export default {
  name: 'FoucsOn',
  props: {
    importantCareMap: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ServiceData () {
      let { eightTotal, aloneTotal, incomeTotal, disabilityTotal } = this.importantCareMap || {}
      return {
        data: [
          { name: '高龄', value: eightTotal },
          { name: '独居', value: aloneTotal },
          { name: '低收入', value: incomeTotal },
          { name: '失能', value: disabilityTotal }
        ],
        radius: ['55%', '70%'],
        center: ['52%', '50%'],
        title: '重点关照老人',
        colors: [
          { start: 'rgba(24,231,254,1)', end: 'rgba(24,135,254,1)' },
          { start: 'rgba(247,147,147,1)', end: 'rgba(221,71,71,1)' },
          { start: 'rgba(69,235,157,1)', end: 'rgba(98,254,239,1)' },
          { start: 'rgba(127,113,251,1)', end: 'rgba(178,125,255,1)' },
          { start: 'rgba(255,132,0,1)', end: 'rgba(255,85,0,1)' }
        ],
        labelLine: {
          length: 4,
          length2: 10
        },
        formatter: '{b|{b}：}{c|{c}人}\n{d|{d}%}'
      }
    }
  },
  components: {
    NormLayout,
    ServiceChart
  }
}
</script>

<style lang="less" scoped>
.older-content {
  height: 2.65rem;
}
</style>
