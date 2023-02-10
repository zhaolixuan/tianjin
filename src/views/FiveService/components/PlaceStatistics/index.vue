<template>
  <div class="older-content">
    <norm-layout text="服务场景"></norm-layout>
    <service-chart :ServiceData="ServiceData"></service-chart>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceChart from '@/views/BuffetPage/components/ServiceChart/index'
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
        item.name = item.channalsName
        item.value = item.orderChannalsTotal
      })
      return {
        data: this.serviceChannalsMap || [],
        radius: ['50%', '65%'],
        center: ['47%', '48%'],
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
        formatter: '{b|{b}：\n}{c|{c}客次}{d|{d}%}'
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
  height: 2.3rem;
}
</style>
