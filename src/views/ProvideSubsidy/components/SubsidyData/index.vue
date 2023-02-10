<template>
  <div class="older-content">
    <norm-layout text="助餐补贴数据统计" subhead="2019年10月开始截至今日"></norm-layout>
    <message-item :ServiceData="ServiceData"  lineNumber="three"></message-item>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import MessageItem from '@/views/OlderDistribution/components/MessageItem/index'
import { mapGetters } from 'vuex'
export default {
  name: 'OldagSubsidyDataeMessage',
  props: {
    allowanceTotalMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters(['breadCrumbCodes']),
    ServiceData () {
      return [
        {
          title: '享受补贴老人',
          number: this.allowanceTotalMap.length > 0 ? this.allowanceTotalMap[0].allowanceTotal : 0,
          text: '人',
          line: true
        },
        {
          title: '享受补贴订单',
          number: this.allowanceTotalMap.length > 0 ? this.allowanceTotalMap[0].payOrderNototal : 0,
          text: '单',
          line: true
        },
        {
          title: '补贴金额',
          number: this.allowanceTotalMap.length > 0 ? this.allowanceTotalMap[0].allowanceMoney : 0,
          text: '元'
        }
      ]
    }
  },
  components: {
    NormLayout,
    MessageItem
  }
}
</script>

<style lang="less" scoped>
.older-content{
  height: 1.6rem;
}
</style>
