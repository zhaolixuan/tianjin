<template>
  <div class="older-content">
    <norm-layout text="消费金额" :flag="false"></norm-layout>
    <income-source :incomeMap="ServiceData"></income-source>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import IncomeSource from '@/views/BuffetPage/components/ConsumeChart/index'
export default {
  name: 'ConsumptionMoney',
  props: {
    consumerMoneyMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      return {
        data: this.consumerMoneyMap.map(item => item.payOrderNoTotal),
        title: this.consumerMoneyMap.map(item => item.consumer_money),
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
  height: 3rem;
}
</style>
