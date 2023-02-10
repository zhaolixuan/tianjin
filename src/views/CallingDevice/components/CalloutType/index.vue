<template>
  <div class="older-content">
    <norm-layout text="呼入类型" :flag="false"></norm-layout>
    <warning-chart :ServiceData="ServiceData"></warning-chart>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import WarningChart from '@/views/BuffetPage/components/ServiceChart/index'
export default {
  name: 'CalloutType',
  props: {
    content: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      return {
        data: this.content,
        radius: ['48%', '58%'],
        center: ['50%', '60%'],
        itemStyle: {
          borderWidth: 5,
          borderColor: 'rgb(3, 29, 58)'
        },
        labelLine: {
          length: 10
        },
        legend: {
          left: 10,
          top: 10,
          data: this.content,
          icon: 'rect',
          itemWidth: 18,
          itemHeight: 10,
          textStyle: {
            color: '#C9EEFF',
            fontSize: 14 / window.devicePixelRatio,
            padding: [0, 20, 0, 5]
          }
        },
        colors: [
          { start: '#FF876C', end: '#CC4E32' },
          { start: '#18E7FE', end: '#1887FE' },
          { start: '#45EB9D', end: '#62FEEF' },
          { start: '#FCC8E9', end: '#FA6BA3' }
        ],
        formatter: '{b|{b}：}{c|{c}人}\n\n'
      }
    }
  },
  components: {
    NormLayout,
    WarningChart
  }
}
</script>

<style lang="less" scoped>
.older-content {
  height: 3rem;
}
</style>
