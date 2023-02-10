<template>
  <div class="older-content">
    <norm-layout text="服务商占比"></norm-layout>
    <service-chart :ServiceData="ServiceData"></service-chart>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceChart from '@/views/BuffetPage/components/ServiceChart/index'

export default {
  name: 'BufferOlder',
  props: {
    serviceOrderMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
     
      this.serviceOrderMap&&this.serviceOrderMap.map(item => {
        item.name = item.companyname
        item.value = item.companyTotal
      })
      let num = this.serviceOrderMap.slice(5).reduce((preVal, curVal) => {
        return (
          Number(preVal) + Number(curVal.companyTotal || 0)
        )
      }, 0)
      let data = this.serviceOrderMap.slice(0, 5)
      data.push({name: '其它', value: num})
      return {
        data,
        radius: ['47%', '60%'],
        center: ['50%', '51%'],
        title: '服务商占比',
        itemStyle: {
          borderWidth: 5,
          borderColor: '#031831'
        },
        colors: [
          { start: 'rgba(24,231,254,1)', end: 'rgba(24,135,254,1)' },
          { start: 'rgba(247,147,147,1)', end: 'rgba(221,71,71,1)' },
          { start: 'rgba(69,235,157,1)', end: 'rgba(98,254,239,1)' },
          { start: 'rgba(127,113,251,1)', end: 'rgba(178,125,255,1)' },
          { start: 'rgba(255,132,0,1)', end: 'rgba(255,85,0,1)' }
        ],
        formatter: '{b|{b}：}{c|{c}客次}\n{d|{d}%}'
      }
    }
  },
  methods: {
    arrSort (key) {
      return (a, b) => {
        var vala = a[key]
        var valb = b[key]
        return valb - vala
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
  height: 2.7rem;
}
</style>
