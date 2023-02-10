<template>
  <div class="older-content">
    <norm-layout text="近一个月消费频率统计"></norm-layout>
    <income-source :incomeMap="incomeMap"></income-source>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import IncomeSource from '../ConsumeChart/index'
export default {
  name: 'ConsumeStatistics',
  props: {
    serviceOrderlatelyMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    incomeMap () {
      let title = []
      let data = []
      this.serviceOrderlatelyMap.map(item => {
        if (item) {
          title.push(item.orderlatelyName || '')
          data.push(item.orderlatelyName ? item.orderCardlatelyTotal : '')
        }
      })
      return {
        data,
        title,
        top: 20,
        unit: '单'
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
  height: 2.6rem;
}
</style>
