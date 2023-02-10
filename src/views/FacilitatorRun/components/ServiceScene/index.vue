<template>
  <div class="older-content">
    <norm-layout text="服务场景占比" :flag="false"></norm-layout>
    <service-chart :ServiceData="ServiceData"></service-chart>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceChart from '@/views/BuffetPage/components/ServiceChart/index'
export default {
  name: 'ServiceWay',
  props: {
    serviceTypeMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      this.serviceTypeMap.forEach(item => {
        item.name = item.mealType
        item.value = item.serviceMealTypeTotal
      })
      var juJiaArr = this.serviceTypeMap.filter(item=>{
        return item.name = '居家养老服务卡';
      })
      console.log(juJiaArr);
      return {
        data: juJiaArr || [],
        radius: ['65%', '81%'],
        center: ['50%', '50%'],
        title: '服务场景占比',
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
  height: 3rem;
}
</style>
