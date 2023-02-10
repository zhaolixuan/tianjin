<template>
  <div class="older-content">
    <norm-layout text="性别" :flag="false"></norm-layout>
    <service-chart :ServiceData="ServiceData"></service-chart>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceChart from '@/views/BuffetPage/components/ServiceChart/index'
export default {
  name: 'ConsumptionMoney',
  props: {
    serviceMap: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ServiceData () {
      let { menTotal, womenTotal } = this.serviceMap || {}
      return {
        data: [
          {name: '男', value: menTotal},
          {name: '女', value: womenTotal}
        ],
        radius: ['57%', '70%'],
        center: ['50%', '50%'],
        title: '性别',
        itemStyle: {
          borderWidth: 5,
          borderColor: '#031831'
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
  height: 2.7rem;
}
</style>
