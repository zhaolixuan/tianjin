<template>
  <div class="older-content">
    <norm-layout text="服务方式"></norm-layout>
    <service-chart :ServiceData="ServiceData" path="ServiceOlder"></service-chart>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceChart from '../ServiceChart/index'
export default {
  name: 'ServiceProject',
  props: {
    serviceMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      this.serviceMap.forEach(item => {
        item.name = item.mealType
        item.value = item.serviceMealTypeTotal
      })
      return {
        data: this.serviceMap,
        radius: ['50%', '65%'],
        center: ['47%', '48%'],
        title: '服务方式',
        itemStyle: {
          borderWidth: 5,
          borderColor: '#031831'
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
  height: 2.2rem;
}
</style>
