<template>
  <div class="older-content">
    <norm-layout text="消费频率低老年人" :routerPath="path"></norm-layout>
    <service-chart :ServiceData="ServiceData"></service-chart>
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
      this.serviceChannalsMap.map(item => {
        item.name = item.channalsName == 'tenNum' ? '消费10次' : item.channalsName == 'fiveNum' ? '消费5次' : item.channalsName == 'oneNum' ? '消费1次' : '',
        item.value = item.orderChannalsTotal
      })
      return {
        data: this.serviceChannalsMap,// 也是个数组
        radius: ['50%', '65%'],
        center: ['47%', '48%'],
        title: '当前消费次数占比',
        itemStyle: {
          borderWidth: 5,
          borderColor: '#031831'
        },
        colors: [
          {start: '#1887FE', end: '#18E7FE'},
          {start: '#62FEEF', end: '#45EB9D'},
          {start: '#CC4E32', end: '#FF876C'}
        ],
        // 设置提示框显示内容
        // {a} 指 series.name {b} 指series.data 的name
        // {c} 指 series.data的value {d}% 指这一部分占总数的百分比
        // formatter: '{b|{b}：}{c|{c}  人数}\n{d|{d}%}',
        formatter: '{b|{b}：}{c|{c}  人数}\n'
      }
    },
    path() {
      return {
        path:'OlderConsumpTimesAndAmount',
        query: { orderType:'num', code: this.$route.query.code, type: this.type }
      };
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
