<template>
  <div class="older-content">
    <norm-layout text="消费金额" :flag="false"  :routerPath="path"></norm-layout>
    <service-chart :ServiceData="ServiceData"></service-chart>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceChart from '@/views/BuffetPage/components/ServiceChart/index'
export default {
  name: 'ConsumeStatistics',
  props: {
    expendMoneyMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      let {payOrderNoTotala, payOrderNoTotalb, payOrderNoTotalc} = this.expendMoneyMap[0] || []
      return {
        data: [{name: '20元以上', value: payOrderNoTotalc}, {name: '10-15', value: payOrderNoTotalb}, {name: '15-20', value: payOrderNoTotala}],
        radius: ['55%', '70%'],
        center: ['52%', '46%'],
        title: '消费金额',
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
        itemStyle: {
          borderWidth: 5,
          borderColor: '#031831'
        }
      }
    },
    path () {
      return {
        path: 'DifferentGroups',
        query: { text: '消费群体画像', key: 1 }
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
  height: 2.8rem;
}
</style>
