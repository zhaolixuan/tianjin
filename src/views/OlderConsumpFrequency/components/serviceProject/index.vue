<template>
  <div class="older-content">
    <norm-layout text="服务项目" :flag="false"></norm-layout>
    <service-chart :ServiceData="ServiceData"></service-chart>
  </div>
</template>

<script>
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import ServiceChart from "@/views/BuffetPage/components/ServiceChart/index";

export default {
  name: "ServiceProject",
  data() {
    return {};
  },

  props: {
    serviceSortMap: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  components: {
    NormLayout,
    ServiceChart
  },

  computed: {
    ServiceData () {
      let { sortTotala, sortTotalb, sortTotalc, sortTotald, sortTotale } = this.serviceSortMap || {}
      let data = [
        {name: '其他服务类', value: sortTotale},
        {name: '托养床位类', value: sortTotald},
        {name: '助医服务类', value: sortTotalc},
        {name: '生活照料类', value: sortTotalb},
        {name: '助餐服务类', value: sortTotala}
      ]
      return {
        data,
        radius: ['42%', '51%'],
        center: ['50%', '50%'],
        title: '服务类别',
        itemStyle: {
          borderWidth: 5,
          borderColor: '#031831'
        },
        colors: [
          {start: '#1887FE', end: '#18E7FE'},
          {start: '#62FEEF', end: '#45EB9D'},
          {start: '#CC4E32', end: '#FF876C'}
        ],
        formatter: '{b|{b}：}{c|{c}客次}\n{d|{d}%}'
      }
    }
  }
};
</script>

<style lang="less" scoped>
.older-content {
  height: 3.15rem;
}
</style>
