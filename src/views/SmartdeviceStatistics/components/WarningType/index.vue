<template>
  <div class="older-content">
    <norm-layout text="预警类型" :flag="false"></norm-layout>
    <service-chart :ServiceData="ServiceData"></service-chart>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceChart from '@/views/BuffetPage/components/ServiceChart/index'
export default {
  name: 'WarningType',
  props: {
    warnTypeMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      this.warnTypeMap.map(item => {
        if (item.eventType) {
          item.name = item.eventType
          item.value = item.eventtypeTotal
        }
      })
      return {
        data: this.warnTypeMap,
        radius: ['58%', '70%'],
        center: ['52%', '45%'],
        title: '预警类型',
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
        formatter: '{b|{b}：}{c|{c}次}'
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
  height: 2.7rem;
}
</style>
