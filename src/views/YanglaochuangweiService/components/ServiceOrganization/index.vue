<template>
  <div class="older-content">
    <norm-layout text="家庭养老床位签约情况"
                 path="HomeDistribution"></norm-layout>
    <message-item :ServiceData="ServiceData"
                  lineNumber="three"></message-item>
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
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(['breadCrumbCodes']),
    ServiceData() {
      let data = [
        {
          title: '签约人数',
          number:
            this.serviceAgencyMap.total > 0
              ? this.serviceAgencyMap.total
              : 0,
          text: '个',
          line: true,
          // path: {
        
          //   name: 'ServiceCarrier',
          //   query: {
          //     code: this.breadCrumbCodes,
          //     title: '居家养老服务载体分布',
          //     canteenlevel: '街级',
          //   },
          // },
        },
        {
          title: '享受补贴老人',
          number:
            this.serviceAgencyMap.totalSubsidies > 0
              ? this.serviceAgencyMap.totalSubsidies
              : 0,
          text: '个',
          line: true,
          // path: {
          //   name: 'ServiceCarrier',
          //   query: {
          //     code: this.breadCrumbCodes,
          //     title: '居家养老服务载体分布',
          //     canteenlevel: '社区',
          //   },
          // },
        },
        {
          title: '长护险人群',
          number:
            this.serviceAgencyMap.totalNursing > 0
              ? this.serviceAgencyMap.totalNursing
              : 0,
          text: '个',
          // path: {
          //   name: 'ServiceCarrier',
          //   query: {
          //     code: this.breadCrumbCodes,
          //     title: '居家养老服务载体分布',
          //     canteenlevel: '服务站',
          //   },
          // },
        },
      ]
      return data
    },
  },
  components: {
    NormLayout,
    MessageItem,
  },
}
</script>

<style lang="less" scoped>
.older-content {
  height: 1.7rem;
}
</style>
