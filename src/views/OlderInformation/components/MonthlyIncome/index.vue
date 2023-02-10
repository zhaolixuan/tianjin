<template>
  <div class="older-content" :style="{'height': fromconFre == true ? '2.5rem' : '3rem'}">
    <norm-layout text="老年人社保收入" :flag="false"></norm-layout>
    <income-source :incomeMap="ServiceData" path="olderPage"></income-source>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import IncomeSource from '@/views/BuffetPage/components/ConsumeChart/index'
export default {
  name: 'ServiceOperation',
  props: {
    incomeElderlyMap: {
      type: Object,
      default: () => {}
    },
    fromconFre:{
      type:Boolean,
      default:() => {
        return true;
      }
    }
  },
  computed: {
    ServiceData () {
      let {fiveOverTotal, fourFiveTotal, oneTwoTotal, oneUnderTotal, threeFourTotal, twoThreeTotal, noIncomeTotal} = this.incomeElderlyMap || {}
      let data = [
        { currentMonth: '无社保', orderfreeCardTotal: noIncomeTotal },
        { currentMonth: '1000元以下', orderfreeCardTotal: oneUnderTotal },
        { currentMonth: '1000元-2000元', orderfreeCardTotal: oneTwoTotal },
        { currentMonth: '2000元-3000元', orderfreeCardTotal: twoThreeTotal },
        { currentMonth: '3000元-4000元', orderfreeCardTotal: threeFourTotal },
        { currentMonth: '4000元-5000元', orderfreeCardTotal: fourFiveTotal },
        { currentMonth: '5000元以上', orderfreeCardTotal: fiveOverTotal }
      ]
      return {
        data: data.map(item => item.orderfreeCardTotal),
        title: data.map(item => item.currentMonth.length > 10 ? item.currentMonth.slice(0, 6) + '\n' + item.currentMonth.slice(6) : item.currentMonth),
        top: 20,
        right: '0'
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
  height: 3rem;
}
</style>
