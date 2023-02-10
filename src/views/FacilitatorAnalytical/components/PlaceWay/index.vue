<template>
  <div class="older-content">
    <norm-layout text="下单方式" :flag="false"></norm-layout>
    <income-source :incomeMap="ServiceData"></income-source>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import IncomeSource from '@/views/BuffetPage/components/ConsumeChart/index'
export default {
  name: 'PlaceWay',
  props: {
    serviceChannalsMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      return {
        data: this.serviceChannalsMap.map(item => item.orderChannalsTotal),
        title: this.serviceChannalsMap.map(item => item.channalsName),
        top: 20,
        right: '1%'
      }
    }
  },
  components: {
    NormLayout,
    IncomeSource
  }
}
</script>

<style lang="less" scoped>
.older-content{
  height: 3.2rem;
}
</style>
