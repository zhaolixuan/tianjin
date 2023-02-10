<template>
  <div class="older-content">
    <norm-layout text="老年人月收入" :flag="false"></norm-layout>
    <income-source :incomeMap="ServiceData"></income-source>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import IncomeSource from '@/views/BuffetPage/components/ConsumeChart/index'
export default {
  name: 'ServiceOperation',
  props: {
    incomeElderlyMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      let {fiveOverTotal, fourFiveTotal, oneTwoTotal, oneUnderTotal, threeFourTotal, twoThreeTotal} = this.incomeElderlyMap[0] || []
      let data = [
        { currentMonth: '1000元以下', orderfreeCardTotal: oneUnderTotal },
        { currentMonth: '1000元-2000元', orderfreeCardTotal: oneTwoTotal },
        { currentMonth: '2000元-3000元', orderfreeCardTotal: twoThreeTotal },
        { currentMonth: '3000元-4000元', orderfreeCardTotal: threeFourTotal },
        { currentMonth: '4000元-5000元', orderfreeCardTotal: fourFiveTotal },
        { currentMonth: '5000元以上', orderfreeCardTotal: fiveOverTotal }
      ]
      return {
        data: data.map(item => item.orderfreeCardTotal),
        title: data.map(item => item.currentMonth),
        top: 10,
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
.older-content {
  height: 2.8rem;
}
</style>
