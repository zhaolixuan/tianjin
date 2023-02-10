<template>
  <div class="older-content">
    <norm-layout text="居家养老服务载体" path="HomeDistribution"></norm-layout>
        <message-item :ServiceData="ServiceData" lineNumber="three"></message-item>
  </div>
</template>

<script>
import NormLayout from '../NormLayout'
import MessageItem from '../MessageItem/index'
import { mapGetters } from 'vuex'
export default {
  name: 'OlderSubsidy',
  props: {
    serviceAgencyMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters(['breadCrumbCodes']),
    ServiceData () {
      let data = [
        {
          title: '街级服务载体',
          number: this.serviceAgencyMap.length > 0 ? this.serviceAgencyMap[1].canteenCount : 0,
          text: '个',
          line: true,
          path: {
            // name: 'HomeDistribution',
            // 10月27日更改为跳到下面这个列表页 并携带 街道码 和 canteenlevel 载体级别
            name: 'ServiceCarrier',
            query:{
              code: this.breadCrumbCodes,
              title: '居家养老服务载体分布',
              canteenlevel:'街级',
            }
          }
        },
        {
          title: '社区级服务载体',
          number: this.serviceAgencyMap.length > 0 ? this.serviceAgencyMap[2].canteenCount : 0,
          text: '个',
          line: true,
          path: {
            name: 'ServiceCarrier',
            query:{
              code: this.breadCrumbCodes,
              title: '居家养老服务载体分布',
              canteenlevel:'社区',
            }
          }
        },
        {
          title: '服务站服务载体',
          number: this.serviceAgencyMap.length > 0 ? this.serviceAgencyMap[3].canteenCount : 0,
          text: '个',
          path: {
            name: 'ServiceCarrier',
            query:{
              code: this.breadCrumbCodes,
              title: '居家养老服务载体分布',
              canteenlevel:'服务站',
            }
          }
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
  height: 1.7rem;
}
</style>
