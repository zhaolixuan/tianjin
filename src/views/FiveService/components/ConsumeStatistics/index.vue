<template>
  <div class="older-content">
    <norm-layout text="助餐服务类餐别占比"></norm-layout>
    <service-chart :ServiceData="ServiceData"></service-chart>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceChart from '@/views/BuffetPage/components/ServiceChart/index'
export default {
  name: 'ServiceProject',
  props: {
    mealCouponMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      this.mealCouponMap.forEach(item => {
        item.name = item.mealType
        item.value = item.mealTotal
      })
      return {
        data: this.mealCouponMap,
        radius: ['50%', '65%'],
        center: ['50%', '47%'],
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
        formatter: '{b|{b}：}{c|{c}客次}\n{d|{d}%}'
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
  height: 2.8rem;
}
</style>
