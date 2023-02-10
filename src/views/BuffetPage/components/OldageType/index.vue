<template>
  <div class="older-content">
    <norm-layout text="服务老人类型"></norm-layout>
    <service-chart :ServiceData="ServiceData"></service-chart>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceChart from '../ServiceChart/index'
export default {
  name: 'OlderType',
  props: {
    serviceTypeMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      let data = []
      this.serviceTypeMap.map((item, index) => {
        if (item.orderPersonType !== 'NULL') {
          data.push(item)
        }
      })
      data.map((item, index) => {
        item.value = item.orderCardItemTotal || ''
        item.name = item.orderPersonType || ''
        if (item.name === '') {
          data.splice(index, 1)
        }
        if (item.name.length > 10) {
          item.name = item.name.slice(0, 8) + '\n' + item.name.slice(8)
        }
      })
      return {
        data,
        radius: ['40%', '50%'],
        center: ['52%', '47%'],
        title: '服务老人类型',
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
        formatter: '{b|{b}：}{c|{c}人}'
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
  height: 2.6rem;
}
</style>
