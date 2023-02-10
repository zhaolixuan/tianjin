<template>
  <div class="older-content">
    <norm-layout text="各街道呼叫结果"  :flag="false"></norm-layout>
    <stacked-bar :ServiceData="ServiceData"></stacked-bar>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import StackedBar from '../StackedBar/index'
export default {
  name: 'StreetcallResult',
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

      ]
    }
  },
  components: {
    NormLayout,
    StackedBar
  }
}
</script>

<style lang="less" scoped>
.older-content{
  height: 6.2rem;
}
</style>
