<template>
  <div class="older-page_bg">
    <page-header title="呼叫中心大数据统计"></page-header>
    <div class="older-container">
      <div class="left-panels">
        <outgoing-robot></outgoing-robot>
        <call-type :content="callData"></call-type>
        <call-record></call-record>
      </div>
      <div class="centre-panels">
        <streetcall-result></streetcall-result>
        <service-hotline></service-hotline>
      </div>
      <div class="right-panels">
        <callout-type :content="CallTypeData"></callout-type>
        <warning-time :content="CallTypeData"></warning-time>
        <call-time></call-time>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import PageHeader from '@/views/OlderDistribution/components/PageHeader/header'
import OutgoingRobot from './components/OutgoingRobot/index'
import CallType from './components/CallType/index'
import CallRecord from './components/CallRecord/index'
import StreetcallResult from './components/StreetcallResult/index'
import CalloutType from './components/CalloutType/index'
import WarningTime from './components/WarningTime/index'
import CallTime from './components/CallTime/index'
import ServiceHotline from './components/ServiceHotline/index'
import { mapGetters } from 'vuex'
import Menu from '@/views/OlderDistribution/components/Menu'
export default {
  name: 'CallingDevice',
  data () {
    return {
      callData: [{name: '独居老人监护', value: 105}, {name: '政策普及', value: 352}, {name: '服务推送', value: 315}, {name: '特殊天气提醒', value: 315}],
      CallTypeData: [{name: '预定服务', value: 105}, {name: '服务咨询', value: 352}, {name: '政策咨询', value: 315}, {name: '举报', value: 315}]
    }
  },
  computed: {
    ...mapGetters(['typeNew', 'codeNew']),
    params () {
      let params = {}
      const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0]

      return params
    }
  },
  created () {
    if (
      this.$route.query.code ||
      (this.$route.query.code && this.$route.query.code.length > 0)
    ) {
      this.initCodeFromUrlQuery()
    } else {
      this.initChartInfo()
    }
  },
  methods: {
    initCodeFromUrlQuery () {
      let code = []
      let len = 1
      if (typeof this.$route.query.code !== 'string') {
        code[0] = this.$route.query.code[this.$route.query.code.length - 1]
        code[1] = this.$route.query.code[this.$route.query.code.length - 2]
        len = this.$route.query.code.length
      } else {
        code = [this.$route.query.code, '120100000000']
      }
      this.$store.commit('setCodeNew', code)
      this.$store.commit('setTypeNew', len)
    },
    initChartInfo () {
      this.$store.dispatch('getUserAuthInfo')
    }
  },
  components: {
    PageHeader,
    Menu,
    OutgoingRobot,
    CallType,
    CallRecord,
    StreetcallResult,
    CalloutType,
    WarningTime,
    ServiceHotline,
    CallTime
  }
}
</script>

<style lang="less" scoped>
.older-page_bg {
  min-height: 100%;
  font-size: initial;
  user-select: none;
  background-image: url("~@/views/OlderDistribution/assets/img/older-page_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.older-container {
  display: flex;
  height: 100%;
  margin: 0 1.58%;
  .left-panels,
  .right-panels {
    width: 6.5rem;
    height: 10.1rem;
    padding: 1% 1% 0 1%;
    box-sizing: border-box;
    z-index: 3;
    margin-top: -.2rem;
  }
  .centre-panels {
    flex: 1;
    height: 10.1rem;
    padding: 0 2%;
  }
}
</style>
