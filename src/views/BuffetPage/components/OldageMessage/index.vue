<template>
  <div class="older-content">
    <norm-layout text="助餐项目" subhead="2019年10月至今"></norm-layout>
    <message-item :ServiceData="ServiceData" lineNumber="three"></message-item>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import MessageItem from '@/views/OlderDistribution/components/MessageItem/index'
import { mapGetters } from 'vuex'
export default {
  name: 'OldageMessage',
  props: {
    serviceMealMap: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['breadCrumbCodes']),
    ServiceData () {
      return [
        {
          title: '服务载体',
          number: this.serviceMealMap.canteenTotalCount,
          text: '个',
          line: true,
          flag: true,
          path: {
            path: 'ServiceCarrier',
            query: { code: this.breadCrumbCodes }
          }
        },
        {
          title: '服务老人',
          number: this.serviceMealMap.servicePersontotal,
          text: '人',
          line: true,
          flag: true,
          path: {
            path: 'GroupPortrait',
            query: { code: this.breadCrumbCodes }
          }
        },
        {
          title: '累计预定量',
          number: this.serviceMealMap.advanceTotal,
          text: '份',
          flag: true,
          animation: true,
          path: {
            path: 'ServiceOlder',
            query: { code: this.breadCrumbCodes }
          }
        },
        {
          title: '今日预定量',
          number: this.serviceMealMap.AdvanceCurrentTotal,
          text: '份',
          line: true,
          flag: true,
          animation: true,
          path: {
            path: 'ServiceOlder',
            query: {
              code: this.breadCrumbCodes,
              startPayTime: JSON.stringify(new Date()),
              endPayTime: JSON.stringify(new Date())
            }
          }
        },
        {
          title: '累计服务量',
          number: this.serviceMealMap.serverTotal,
          text: '份',
          line: true,
          flag: true,
          animation: true,
          path: {
            path: 'ServiceOlder',
            query: {
              code: this.breadCrumbCodes,
              endTime: JSON.stringify(new Date())
            }
          }
        },
        {
          title: '今日服务量',
          number: this.serviceMealMap.orderCardCurrentTotal,
          text: '份',
          flag: true,
          path: {
            path: 'ServiceOlder',
            query: { code: this.breadCrumbCodes,
              startTime: JSON.stringify(new Date()),
              endTime: JSON.stringify(new Date()) }
          }
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
.older-content {
  height: 2rem;
}
</style>
