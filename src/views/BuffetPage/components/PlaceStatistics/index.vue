<template>
  <div class="older-content">
    <norm-layout text="下单方式"></norm-layout>
    <service-chart :ServiceData="ServiceData" path="ServiceOlder"></service-chart>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceChart from '../ServiceChart/index'
export default {
  name: 'BufferOlder',
  props: {
    serviceChannalsMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      let data = []
      this.serviceChannalsMap.map(item => {
        data.push({
          name: item.channalsName,
          value: item.orderChannalsTotal
        })
      })
      return {
        data,
        radius: ['40%', '55%'],
        center: ['50%', '51%'],
        title: '下单方式',
        itemStyle: {
          borderWidth: 5,
          borderColor: 'rgb(2, 12, 26)'
        },
        colors: [
          {start: '#1887FE', end: '#18E7FE'},
          {start: '#62FEEF', end: '#45EB9D'},
          {start: '#CC4E32', end: '#FF876C'}
        ],
        formatter: '{b|{b}：}{c|{c}单}\n\n'
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
.older-content{
  height: 2.3rem;
}
</style>
