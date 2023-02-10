<template>
  <div class="older-content">
    <norm-layout text="下单方式"></norm-layout>
    <service-chart :ServiceData="ServiceData"></service-chart>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceChart from '@/views/BuffetPage/components/ServiceChart/index'
export default {
  name: 'OrderWay',
  props: {
    orderWayMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      this.orderWayMap.map(item => {
        item.name = item.channalsName
        item.value = item.orderChannalsTotal
      })
      return {
        data: this.orderWayMap,
        radius: ['55%', '70%'],
        center: ['50%', '48%'],
        title: '下单方式',
        itemStyle: {
          borderWidth: 5,
          borderColor: 'rgb(2, 12, 26)'
        },
        colors: [
          {start: '#1887FE', end: '#18E7FE'},
          {start: '#62FEEF', end: '#45EB9D'},
          {start: '#CC4E32', end: '#FF876C'}
        ]
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
  height: 2.5rem;
}
</style>
