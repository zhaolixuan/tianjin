<template>
  <div class="older-content">
    <norm-layout text="养老补贴政策"></norm-layout>
    <service-chart :ServiceData="ServiceData"></service-chart>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceChart from '@/views/BuffetPage/components/ServiceChart/index'
export default {
  name: 'SubsidyServices',
  props: {
    allowancePolicyMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      let data = []
      this.allowancePolicyMap.length > 0 ? this.allowancePolicyMap.forEach(item => {
        if(item.allowancePolicyName){
          data.push({
            name:  item.allowancePolicyName,
            value: item.allowancePolicyTotal
        })
        }
      }) : []
      return {
        data: data,
        radius: ['55%', '70%'],
        center: ['50%', '48%'],
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
  height: 2.6rem;
}
</style>
