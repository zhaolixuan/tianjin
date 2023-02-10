<template>
  <div class="older-content">
    <norm-layout text="消费金额统计"></norm-layout>
    <service-chart :ServiceData="ServiceData"></service-chart>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceChart from '@/views/BuffetPage/components/ServiceChart/index'
export default {
  name: 'ServiceProject',
  props: {
    consumerMoneyMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      // eslint-disable-next-line no-unused-expressions
      this.consumerMoneyMap.length > 0 ? this.consumerMoneyMap.forEach(item => {
        item.name = item.consumer_money
        item.value = item.payOrderNoTotal
      }) : []
      return {
        data: this.consumerMoneyMap,
        radius: ['50%', '65%'],
        center: ['50%', '50%'],
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
  height: 2.6rem;
}
</style>
