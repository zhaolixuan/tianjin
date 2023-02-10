<template>
  <div class="older-page_bg">
    <page-header title="五大服务大数据统计分析"></page-header>
    <div class="older-container">
      <div class="bread">
        <norm-layout
        :text="($route.query.key ? '五大服务大数据统计分析——' : '助餐运营服务监管大数据统计分析——') + '服务老人消费群体画像'"
        path="FiveService"
        :flag="null">
        </norm-layout>
      </div>
      <div class="left-panels">
        <p class="left_top">老年人消费人数：{{oldMoneyTotal}}人</p>
        <service-type :SubsidyData="elderlyservicetypeMap"></service-type>
        <statistics-age :ageMap="ageMap"></statistics-age>
        <statistics-sex :sexMap="sexMap"></statistics-sex>
      </div>
      <div class="centre-panels">
        <statistics-nation :nationMap="nationMap"></statistics-nation>
        <dwell-way :livingpattemMap="livingpattemMap"></dwell-way>
        <monthly-income :incomeElderlyMap="incomeElderlyMap"></monthly-income>
        <consume-statistics :expendMoneyMap="expendMoneyMap"></consume-statistics>
      </div>
      <div class="right-panels">
        <order-way :orderWayMap="orderWayMap"></order-way>
        <monthly-consumption :expendFrequencyMap="expendFrequencyMap"></monthly-consumption>
        <oldman-list></oldman-list>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import PageHeader from '@/views/OlderDistribution/components/PageHeader/header'
import ServiceType from './components/ServiceType/index'
import StatisticsAge from './components/StatisticsAge/index'
import StatisticsSex from './components/StatisticsSex/index'
import DwellWay from './components/DwellWay/index'
import MonthlyIncome from './components/MonthlyIncome/index'
import ConsumeStatistics from './components/ConsumeStatistics/index'
import StatisticsNation from './components/StatisticsNation/index'
import OrderWay from './components/OrderWay/index'
import MonthlyConsumption from './components/MonthlyConsumption/index'
import OldmanList from './components/OldmanList/index'
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import { mapGetters } from 'vuex'
import Menu from '@/views/OlderDistribution/components/Menu'
import { getHelpMealsInfo, getMealsInfoSecond, getHelpMealsInfoThree } from './apis/index'
export default {
  name: 'bufferPage',
  data () {
    return {
      elderlyservicetypeMap: [],
      ageMap: [],
      sexMap: {},
      livingpattemMap: [],
      incomeElderlyMap: [],
      expendMoneyMap: [],
      orderWayMap: [],
      expendFrequencyMap: [],
      oldMoneyTotal: 0,
      nationMap: []
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
    this.getHelpMealsInfo()
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
    },
    getHelpMealsInfo () {
      getHelpMealsInfo(this.params).then(res => {
        if (res.data) {
          this.elderlyservicetypeMap = res.data.elderlyservicetypeMap
          this.ageMap = res.data.ageMap
          this.sexMap = res.data.sexMap[0]
          this.oldMoneyTotal = res.data.oldmoneyMap.oldMoneyTotal
          this.nationMap = res.data.nationMap
        }
      })
      getMealsInfoSecond(this.params).then(res => {
        if (res.data) {
          this.livingpattemMap = res.data.livingpattemMap
          this.incomeElderlyMap = res.data.incomeElderlyMap
        }
      })
      getHelpMealsInfoThree(this.params).then(res => {
        if (res.data) {
          this.expendMoneyMap = res.data.expendMoneyMap
          this.orderWayMap = res.data.orderWayMap
          this.expendFrequencyMap = res.data.expendFrequencyMap
        }
      })
    }
  },
  components: {
    PageHeader,
    Menu,
    StatisticsNation,
    ServiceType,
    StatisticsAge,
    StatisticsSex,
    DwellWay,
    MonthlyIncome,
    ConsumeStatistics,
    OrderWay,
    MonthlyConsumption,
    OldmanList,
    NormLayout
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
    margin-top: -0.2rem;
  }
  .left_top {
    height: 1.2rem;
    width: 100%;
    line-height: 1.2rem;
    font-size: 0.25rem;
    color: #28e1fe;
    padding-left: 0.4rem;
    font-weight: 600;
  }
  .centre-panels {
    flex: 1;
    height: 10.1rem;
    padding: 0 2%;
  }
  .bread {
    position: fixed;
    top: 6%;
    left: 1%;
  }
}
</style>
