<template>
  <div class="older-content">
    <norm-layout text="门磁设备预警" :flag="false"></norm-layout>
    <message-item :ServiceData="ServiceData" lineNumber="three"></message-item>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import MessageItem from '@/views/OlderDistribution/components/MessageItem/index'
import { mapGetters } from 'vuex'
export default {
  name: 'GatetWarning',
  props: {
    warningMap: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['breadCrumbCodes']),
    ServiceData () {
      let { alarmTotal, pendingTotal, processedTotal } = this.warningMap
      return [
        {
          title: '预警次数',
          number: alarmTotal || 0,
          text: '次',
          line: true,
          flag: true
        },
        {
          title: '已处理',
          number: processedTotal || 0,
          text: '个',
          flag: true
        },
        {
          title: '待处理',
          number: pendingTotal || 0,
          text: '个',
          line: true,
          flag: true
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
  height: 2.4rem;
}
</style>
