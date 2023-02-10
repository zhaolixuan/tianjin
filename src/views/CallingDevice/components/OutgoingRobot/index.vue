<template>
  <div class="older-content">
    <norm-layout text="外呼机器人"  :flag="false"></norm-layout>
    <message-item :ServiceData="ServiceData"></message-item>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import MessageItem from '@/views/OlderDistribution/components/MessageItem/index'
export default {
  name: 'OutgoingRobot',
  data () {
    return {
      timer: null,
      orderCountInfo: {}
    }
  },
  props: {
    baseInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ServiceData () {
      return [
        {
          title: '呼叫次数',
          number: 2,
          icon: 'older',
          text: '次',
          line: true
        },
        {
          title: '接通率 ',
          number: 5,
          icon: 'book',
          text: '%'
        },
        {
          title: '今日呼叫',
          number: 2,
          icon: 'older',
          line: true,
          text: '人'
        },
        {
          title: '接通率',
          number: 3,
          icon: 'home',
          text: '%'
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
  height: 2.2rem;
}
</style>
