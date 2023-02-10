<template>
  <div class="older-content">
    <norm-layout text="服务类别占比" :flag="false"></norm-layout>
    <service-chart :ServiceData="ServiceData"></service-chart>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceChart from '@/views/BuffetPage/components/ServiceChart/index'
export default {
  name: 'ServiceAmount',
  props: {
    serviceTypeMap: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ServiceData () {
      let {
        sortTotala,
        sortTotalb,
        sortTotalc,
        sortTotald,
        sortTotale
      } = this.serviceTypeMap
      let data = [
        {name: '其他服务类', value: sortTotale},
        {name: '托养床位类', value: sortTotald},
        {name: '助医服务类', value: sortTotalc},
        {name: '生活照料类', value: sortTotalb},
        {name: '助餐服务类', value: sortTotala}
      ]
      return {
        data,
        radius: ['47%', '58%'],
        center: ['50%', '55%'],
        title: '服务类别占比',
        itemStyle: {
          borderWidth: 5,
          borderColor: '#031831'
        },
        colors: [
          { start: '#FCC8E9', end: '#FA6BA3' },
          { start: '#EDFAC0', end: '#F9EB6C' },
          { start: '#00ABF5', end: '#A4EAFF' },
          { start: '#00FFFF', end: '#3564FF' },
          { start: '#DF98FF', end: '#B500FF' }
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
.older-content {
  height: 3.5rem;
}
</style>
