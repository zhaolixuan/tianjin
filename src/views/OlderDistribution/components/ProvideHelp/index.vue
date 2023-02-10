<template>
  <div class="older-content">
    <norm-layout text="互助养老"></norm-layout>
        <message-item :ServiceData="ServiceData" lineNumber="three"></message-item>
  </div>
</template>

<script>
import NormLayout from '../NormLayout'
import MessageItem from '../MessageItem/index'
export default {
  name: 'ProvideHelp',
  props: {
    baseInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ServiceData () {
      let data = [
        {
          title: '互助老人',
          number: this.baseInfo.returnBaseTotalmap.isAloneTotal,
          text: '名',
          line: true,
          flag: true
        },
        {
          title: '互助人数',
          number: this.baseInfo.returnBaseTotalmap.isAloneTotal,
          text: '名',
          line: true,
          flag: true
        }
      ]
      return data
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
  height: 1.2rem;
}
</style>
