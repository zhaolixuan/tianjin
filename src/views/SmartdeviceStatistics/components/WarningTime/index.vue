<template>
  <div class="older-content">
    <norm-layout text="预警时间" :flag="false"></norm-layout>
    <income-source :incomeMap="ServiceData"></income-source>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import IncomeSource from '@/views/BuffetPage/components/ConsumeChart/index'
export default {
  name: 'WarningTime',
  props: {
    warnTimeMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      return {
        data: this.warnTimeMap.map(item => item.warnTotal),
        title: this.warnTimeMap.map(item => item.warnTime),
        top: 20,
        unit: '次'
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
.older-content {
  height: 2.9rem;
}
</style>
