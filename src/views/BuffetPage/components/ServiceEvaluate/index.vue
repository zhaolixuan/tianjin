<template>
  <div class="older-content">
    <norm-layout text="餐别统计"></norm-layout>
    <service-chart :ServiceData="ServiceData"></service-chart>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceChart from '../ServiceChart/index'
export default {
  name: 'ServiceEvaluate',
  props: {
    mealCouponData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      this.mealCouponData.forEach(item => {
        item.name = item.mealType
        item.value = item.mealTotal
      })
      return {
        data: this.mealCouponData,
        radius: ['46%', '60%'],
        center: ['48%', '48%'],
        title: '就餐方式',
        itemStyle: {
          borderWidth: 5,
          borderColor: '#031831'
        },
        colors: [
          {start: '#1887FE', end: '#18E7FE'},
          {start: '#62FEEF', end: '#45EB9D'},
          {start: '#CC4E32', end: '#FF876C'}
        ],
        formatter: '{b|{b}}{a|{d}%}\n\n'
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
  height: 2.4rem;
}
</style>
