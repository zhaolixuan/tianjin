<template>
  <div class="older-page_bg">
    <page-header title="服务商运营大数据统计分析"></page-header>
    <div class="older-container">
      <div class="left-panels">
        <screening-condition :serviceShop="serviceShop" @handleChangeForm="handleChangeForm" :serviceCarrierMap="serviceCarrierMap"></screening-condition>
        <all-orders :thirtyOrderMap="thirtyOrderMap" :allOrderMap="allOrderMap"></all-orders>
        <service-statistics :oldageMap="oldageMap"></service-statistics>
      </div>
      <div class="centre-panels">
        <service-amount :serviceTypeMap="serviceTypeMap"></service-amount>
        <service-type :serviceTypeMap="serviceTypeMap"></service-type>
        <service-scene :serviceTypeMap="serviceTypeMap"></service-scene>
      </div>
      <div class="right-panels">
        <old-sex :sexMap="sexMap"></old-sex>
        <monthly-income :oldincomeMap="oldincomeMap"></monthly-income>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import PageHeader from '@/views/OlderDistribution/components/PageHeader/header'
import ScreeningCondition from './components/ScreeningCondition/index'
import AllOrders from './components/AllOrders/index'
import ServiceAmount from './components/ServiceAmount/index'
import ServiceStatistics from './components/ServiceStatistics/index'
import OldSex from './components/OldSex/index'
import MonthlyIncome from './components/MonthlyIncome/index'
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceType from './components/ServiceType/index'
import ServiceScene from './components/ServiceScene/index'
import { mapGetters } from 'vuex'
import Menu from '@/views/OlderDistribution/components/Menu'
import { getServiceProvide } from './apis/index'
export default {
  name: 'FacilitatorAnalytical',
  data () {
    return {
      serviceOrderWeekMap: [],
      serviceSortMap: {},
      consumerMoneyMap: [],
      serviceChannalsMap: [],
      serviceTypeMap: [],
      oldageMap: {},
      sexMap: {},
      oldincomeMap: {},
      serviceShop: [],
      allOrderMap: {},
      serviceCarrierMap: [],
      thirtyOrderMap: {}
    }
  },
  computed: {
    ...mapGetters(['typeNew', 'codeNew']),
    params: {
      get: function () {
        let params = {}
        const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
        params[typeCodes[this.typeNew - 1]] = this.codeNew[0]
        return params
      },
      set: function () {}
    }
  },
  watch: {
    codeNew (val) {
      this.getServiceProvide()
    }
  },
  created () {
    this.getServiceProvide()
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
    handleChangeForm (form) {
      this.getServiceProvide(form)
    },
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
    },
    getServiceProvide (form) {
      this.params = this.params.code ? delete this.params.code : this.params
      let params = Object.assign({}, this.params, form)
      getServiceProvide(params).then(res => {
        if (res.data) {
          this.serviceShop = res.data.serviceProviderMap
          this.serviceOrderWeekMap = res.data.serviceOrderWeekMap.reverse()
          this.serviceSortMap = res.data.serviceSortMap[0]
          this.consumerMoneyMap = res.data.consumerMoneyMap
          this.serviceChannalsMap = res.data.serviceChannalsMap
          this.serviceTypeMap = res.data.serviceTypeMap
          this.oldageMap = res.data.oldageMap
          this.sexMap = res.data.oldsexMap
          this.oldincomeMap = res.data.oldincomeMap
          this.allOrderMap = res.data.allOrderMap
          this.thirtyOrderMap = res.data.thirtyOrderMap[0]
          this.serviceCarrierMap = res.data.serviceCarrierMap
        }
      })
    }
  },
  components: {
    PageHeader,
    ScreeningCondition,
    AllOrders,
    ServiceAmount,
    ServiceStatistics,
    OldSex,
    MonthlyIncome,
    ServiceType,
    ServiceScene,
    NormLayout,
    Menu
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
    width: 6rem;
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
  .right-panels{
    width: 7rem;
  }
  .bread {
    position: fixed;
    top: 6%;
    left: 1%;
  }
}
</style>
