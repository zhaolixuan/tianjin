<template>
  <div class="older-content">
    <norm-layout text="改造人员类型"></norm-layout>
    <service-chart :ServiceData="ServiceData"></service-chart>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceChart from '@/views/BuffetPage/components/ServiceChart/index'

export default {
  name: 'ServiceScene',
  props: {
    orderTypeTotalMap: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    ServiceData() {
      this.orderTypeTotalMap.forEach((item) => {
        item.name = item.peopleType
        item.value = item.peopleNumber
      })
      console.log( this.orderTypeTotalMap);
      return {
        data: this.orderTypeTotalMap,
        radius: ['40%', '50%'],
        center: ['52%', '35%'],
        title: '服务方式',
        itemStyle: {
          borderWidth: 30,
          // borderColor: "#031831"
        },
        colors: [
          { start: '#1887FE', end: '#18E7FE' },
          { start: '#62FEEF', end: '#45EB9D' },
          { start: '#CC4E32', end: '#FF876C' },
        ],
        // formatter: `{b|{b}：}{c|{c}个}\n{d|{d}%}`,
        formatter: (data) => {
          let arr = this.orderTypeTotalMap.filter((i) => {
            return i.name == data.name
          })[0] || []
          console.log(data);

          return `{b|${data.name}:}{c|${data.value}人}\n{c|${arr.subsidiesPrice || ''}元} {d|${data.percent}%}`
        },
      }
    },
  },

  components: {
    NormLayout,
    ServiceChart,
  },
}
</script>

<style lang="less" scoped>
.older-content {
  height: 2.6rem;
}
</style>
