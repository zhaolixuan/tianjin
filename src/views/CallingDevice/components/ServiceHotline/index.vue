<template>
  <div class="older-content">
    <norm-layout text="坐席服务热线"  :flag="false"></norm-layout>
    <message-item :ServiceData="ServiceData"></message-item>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import MessageItem from '@/views/OlderDistribution/components/MessageItem/index'
export default {
  name: 'ServiceHotline',
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
          title: '呼入量',
          number: 132312,
          icon: 'older',
          text: '次',
          line: true
        },
        {
          title: '今日呼入量 ',
          number: 312,
          icon: 'book',
          text: '次'
        },
        {
          title: '呼出量',
          number: 132312,
          icon: 'older',
          text: '次',
          line: true
        },
        {
          title: '今日呼出量 ',
          number: 312,
          icon: 'book',
          text: '次'
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
  height: 3rem;
}
</style>
