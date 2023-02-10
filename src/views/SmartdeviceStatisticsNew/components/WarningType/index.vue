<template>
  <div class="older-content">
    <norm-layout text="已处理预警信息" :flag="false"></norm-layout>
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
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ServiceData () {
      let { overtimeTotal, normalTotal } = this.warnTypeMap
      return {
        data: [
          { name: '超时处理', value: overtimeTotal || 0 },
          { name: '正常处理', value: normalTotal || 0 }
        ],
        radius: ['58%', '70%'],
        center: ['52%', '45%'],
        title: '预警类型',
        colors: [
          { start: 'rgba(24,231,254,1)', end: 'rgba(24,135,254,1)' },
          { start: 'rgba(247,147,147,1)', end: 'rgba(221,71,71,1)' }
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
