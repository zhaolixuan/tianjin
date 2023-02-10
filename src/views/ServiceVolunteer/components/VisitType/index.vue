<template>
  <div class="older-content">
    <norm-layout text="探访老人类型"></norm-layout>
    <service-chart :ServiceData="ServiceData"></service-chart>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceChart from '@/views/BuffetPage/components/ServiceChart/index'
export default {
  name: 'MediacalServices',
  props: {
    peopleTypeMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      this.peopleTypeMap.map(item => {
        item.name = item.peopleType
        item.value = item.peopleTotal
      })
      return {
        data: this.peopleTypeMap,
        radius: ['50%', '67%'],
        center: ['50%', '50%'],
        title: '补贴政策',
        itemStyle: {
          borderWidth: 5,
          borderColor: '#031831'
        },
        colors: [
          {start: '#1887FE', end: '#18E7FE'},
          {start: '#62FEEF', end: '#45EB9D'},
          {start: '#CC4E32', end: '#FF876C'}
        ],
        formatter: '{b|{b}：}{c|{c}人}\n\n'
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
