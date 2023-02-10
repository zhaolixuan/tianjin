
<template>
  <div class="older-content">
    <norm-layout text="近三十天消费频率"></norm-layout>
    <service-chart :ServiceData="ServiceData"></service-chart>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceChart from '@/views/BuffetPage/components/ServiceChart/index'
export default {
  name: 'MonthlyConsumption',
  props: {
    expendFrequencyMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      this.expendFrequencyMap.map(item => {
        item.name = item.orderlatelyName
        item.value = item.payOrderNototal
      })
      return {
        data: this.expendFrequencyMap,
        radius: ['58%', '72%'],
        center: ['50%', '55%'],
        title: '近三十天消费频率',
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
  height: 3rem;
}
</style>
