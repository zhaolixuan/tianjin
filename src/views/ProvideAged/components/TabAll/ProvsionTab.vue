<template>
  <div class="tab-content_container">
    <HelpMessage :SpiritsData="FastData"></HelpMessage>
    <HelpMessage :SpiritsData="SolventData"></HelpMessage>
    <HelpMessage :SpiritsData="BoughtData"></HelpMessage>
    <income-source :incomeMap="AcceptData"></income-source>
  </div>
</template>
<script>
import HelpMessage from '../HelpMessage/index.vue'
import IncomeSource from '../IncomeSource/index.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'ProvsionTab',
  computed: {
    ...mapGetters(['type', 'code', 'UrgentneedInfo']),
    params () {
      let params = {}
      const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
      params[typeCodes[this.type - 1]] = this.code[0]
      return params
    },
    FastData () {
      const UrgentneedInfo = this.UrgentneedInfo.urgentneedServiceMap || null
      const getMaxNumber =
        UrgentneedInfo && Object.values(UrgentneedInfo).length > 0
          ? Object.values(UrgentneedInfo).reduce((a, b) => (a > b ? a : b))
          : 0
      const max = Math.ceil(getMaxNumber)
      return {
        icon: 'flame',
        text: '最急需养老服务',
        title: [
          '上门做家务',
          '安全检修',
          '其他',
          '上门服务',
          '健康指导',
          '紧急救援和呼叫',
          '康复理疗',
          '文化娱乐活动',
          '日间照料',
          '短期托养',
          '精神慰籍'
        ],
        maxData: max,
        data: [
          UrgentneedInfo.houseworkDoorTotal,
          UrgentneedInfo.securityCheckTotal,
          UrgentneedInfo.otherTotal,
          UrgentneedInfo.doorServiceTotal,
          UrgentneedInfo.healthGuidanceTotal,
          UrgentneedInfo.emergencyRescueTotal,
          UrgentneedInfo.rehabilitationTotal,
          UrgentneedInfo.culturalActivitiesTotal,
          UrgentneedInfo.dayCareTotal,
          UrgentneedInfo.shortCareTotal,
          UrgentneedInfo.spiritualConsolationTotal
        ]
      }
    },
    SolventData () {
      const UrgentneedInfo = this.UrgentneedInfo.paidProvisionMap || null
      const getMaxNumber =
        UrgentneedInfo && Object.values(UrgentneedInfo).length > 0
          ? Object.values(UrgentneedInfo).reduce((a, b) => (a > b ? a : b))
          : 0
      const max = Math.ceil(getMaxNumber)
      return {
        icon: 'money',
        text: '可接受有偿可提供的养老服务',
        title: [
          '上门做家务',
          '安全检修',
          '其他',
          '上门服务',
          '健康指导',
          '紧急救援和呼叫',
          '康复理疗',
          '文化娱乐活动',
          '日间照料',
          '短期托养',
          '精神慰籍'
        ],
        maxData: max,
        data: [
          UrgentneedInfo.houseworkDoorTotal,
          UrgentneedInfo.securityCheckTotal,
          UrgentneedInfo.otherTotal,
          UrgentneedInfo.doorServiceTotal,
          UrgentneedInfo.healthGuidanceTotal,
          UrgentneedInfo.emergencyRescueTotal,
          UrgentneedInfo.rehabilitationTotal,
          UrgentneedInfo.culturalActivitiesTotal,
          UrgentneedInfo.dayCareTotal,
          UrgentneedInfo.shortCareTotal,
          UrgentneedInfo.spiritualConsolationTotal
        ]
      }
    },
    BoughtData () {
      const UrgentneedInfo = this.UrgentneedInfo.purchasedMap || null
      const getMaxNumber =
        UrgentneedInfo && Object.values(UrgentneedInfo).length
          ? Object.values(UrgentneedInfo).reduce((a, b) => (a > b ? a : b))
          : 0
      const max = Math.ceil(getMaxNumber)
      return {
        icon: 'oldvalue',
        text: '购买过的养老服务',
        title: [
          '上门做家务',
          '安全检修',
          '其他',
          '上门服务',
          '健康指导',
          '紧急救援和呼叫',
          '康复理疗',
          '文化娱乐活动',
          '日间照料',
          '短期托养',
          '精神慰籍'
        ],
        maxData: max,
        data: [
          UrgentneedInfo.houseworkDoorTotal,
          UrgentneedInfo.securityCheckTotal,
          UrgentneedInfo.otherTotal,
          UrgentneedInfo.doorServiceTotal,
          UrgentneedInfo.healthGuidanceTotal,
          UrgentneedInfo.emergencyRescueTotal,
          UrgentneedInfo.rehabilitationTotal,
          UrgentneedInfo.culturalActivitiesTotal,
          UrgentneedInfo.dayCareTotal,
          UrgentneedInfo.shortCareTotal,
          UrgentneedInfo.spiritualConsolationTotal
        ]
      }
    },
    AcceptData () {
      const UrgentneedInfo = this.UrgentneedInfo.feeServiceMap || {}
      return {
        icon: 'task',
        text: '能接受的养老服务机构收费标准',
        title: [
          '2000元\n左右',
          '2500元\n左右',
          '3000元\n左右',
          '3500元\n左右',
          '4000元\n左右',
          '4500元\n左右',
          '5000元\n左右'
        ],
        data: [
          UrgentneedInfo.twoAroundTotal,
          UrgentneedInfo.twofiveAroundTotal,
          UrgentneedInfo.threeAroundTotal,
          UrgentneedInfo.threefiveAroundTotal,
          UrgentneedInfo.fourAroundTotal,
          UrgentneedInfo.fourfiveAroundTotal,
          UrgentneedInfo.fiveOverTotal
        ],
        double: true,
        top: 'center'
      }
    }
  },
  watch: {
    code (val) {
      this.$store.dispatch('getUrgentneedInfo', this.params)
    }
  },
  components: {
    HelpMessage,
    IncomeSource
  },
  created () {
    this.$store.dispatch('getUrgentneedInfo', this.params)
  }
}
</script>
