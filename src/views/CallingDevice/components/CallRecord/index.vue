<template>
  <div class="older-content">
    <norm-layout text="呼叫记录" :tab_item="tab_item" :flag="false"></norm-layout>
    <double-column-charts></double-column-charts>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import DoubleColumnCharts from '../DoubleColumnCharts/index'
export default {
  name: 'CallRecord',
  data () {
    return {
      tab_item: ['天', '周', '月']
    }
  },
  components: {
    NormLayout,
    DoubleColumnCharts
  }
}
</script>

<style lang="less" scoped>
.older-content{
  height: 3.6rem;
}
</style>
