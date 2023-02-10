<template>
  <div class="older-content">
    <norm-layout text="服务老人类型" :flag="false"></norm-layout>
    <income-source :incomeMap="ServiceData"></income-source>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import IncomeSource from '@/views/BuffetPage/components/ConsumeChart/index'
export default {
  name: 'ServiceType',
  props: {
    SubsidyData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      return {
        data: this.SubsidyData.map(item => item.orderCardItemTotal),
        title: this.SubsidyData.map(item => item.orderPersonType.length > 8 ? item.orderPersonType.slice(0, 8) + '\n' + item.orderPersonType.slice(8) : item.orderPersonType),
        top: '10%'
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
