<template>
  <div class="older-content">
    <norm-layout text="养老服务运营"></norm-layout>
    <message-item :ServiceData="ServiceData"></message-item>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import MessageItem from '@/views/OlderDistribution/components/MessageItem/index'
import { mapGetters } from 'vuex'
export default {
  name: 'ServiceRun',
  props: {
    serviceMealMap: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['breadCrumbCodes']),
    ServiceData () {
      let { canteenTotalCount, companyTotal, servicePersontotal, advanceTotal, AdvanceCurrentTotal, orderCardCurrentTotal, serverTotal } = this.serviceMealMap || {}
      return [
        {
          title: '服务载体',
          number: canteenTotalCount,
          text: '个',
          line: true,
          flag: false,
          path: {
            path: 'ServiceCarrierOperation'
          }
        },
        {
          title: '服务商家',
          number: companyTotal,
          text: '家',
          flag: false,
          path: {
            path: 'ServiceProvidersAnalysis'
          }
        },
        {
          title: '服务老人',
          number: servicePersontotal,
          text: '人',
          flag: true,
          line: true,
          path: {
            path: 'GroupPortrait',
            query: { key: '1', title: '五大服务大数据统计分析' }
          }
        },
        {

        },
        {
          title: '累计预定情况',
          number: advanceTotal,
          text: '次',
          line: true,
          flag: true,
          animation: true,
          path: {
            path: 'ServiceOlder',
            query: { code: this.breadCrumbCodes, key: '1', title: '五大服务大数据统计分析' }
          }
        },
        {
          title: '今日预定情况',
          number: AdvanceCurrentTotal,
          text: '次',
          flag: true,
          animation: true,
          path: {
            path: 'ServiceOlder',
            query: {
              code: this.breadCrumbCodes,
              startPayTime: JSON.stringify(new Date()),
              endPayTime: JSON.stringify(new Date()),
              key: '1',
              title: '五大服务大数据统计分析'
            }
          }
        },
        {
          title: '累计服务量',
          number: serverTotal,
          text: '次',
          flag: true,
          line: true,
          animation: true,
          path: {
            path: 'ServiceOlder',
            query: {
              code: this.breadCrumbCodes,
              endTime: JSON.stringify(new Date()),
              key: '1',
              title: '五大服务大数据统计分析'
            }
          }
        },
        {
          title: '今日服务量',
          number: orderCardCurrentTotal,
          text: '次',
          flag: true,
          path: {
            path: 'ServiceOlder',
            query: { code: this.breadCrumbCodes,
              startTime: JSON.stringify(new Date()),
              endTime: JSON.stringify(new Date()),
              key: '1',
              title: '五大服务大数据统计分析'
            }
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
  height: 3.7rem;
}
</style>
