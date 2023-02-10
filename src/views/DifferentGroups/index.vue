<template>
  <div class="older-page_bg">
    <page-header title="助餐运营服务监管大数据分析"></page-header>
    <div class="older-container">
      <div class="bread">
        <norm-layout :linkArr="linkArr"  :flag="null"></norm-layout>
      </div>
      <div class="left-panels">
        <p class="title">10-15元消费群体画像</p>
        <old-sex :serviceMap="oldFirstSexMap"></old-sex>
        <old-age :ageMap="oldFirstAgeMap"></old-age>
        <monthly-income :incomeElderlyMap="oldFirstIncomeMap"></monthly-income>
      </div>
      <div class="centre-panels">
        <p class="title">15-20元消费群体画像</p>
        <old-sex :serviceMap="oldSecondSexMap"></old-sex>
        <old-age :ageMap="oldSecondAgeMap"></old-age>
        <monthly-income :incomeElderlyMap="oldSecondIncomeMap"></monthly-income>
      </div>
      <div class="right-panels">
        <p class="title">20元以上消费群体画像</p>
        <old-sex :serviceMap="oldThirdSexMap"></old-sex>
        <old-age :ageMap="oldThirdAgeMap"></old-age>
        <monthly-income :incomeElderlyMap="oldThirdIncomeMap"></monthly-income>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import PageHeader from '@/views/OlderDistribution/components/PageHeader/header'
import OldSex from './components/OldSex/index'
import OldAge from './components/OldAge/index'
import MonthlyIncome from './components/MonthlyIncome/index'
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import { mapGetters } from 'vuex'
import Menu from '@/views/OlderDistribution/components/Menu'
import { getAmountGroupInfo } from './apis/index'
export default {
  name: 'FacilitatorAnalytical',
  data () {
    return {
      linkArr: [
        {label: (this.$route.query.key ? '五大服务大数据统计分析' : '助餐运营服务监管大数据统计分析'), path: (this.$route.query.key ? 'FiveService' : 'buffetPage')},
        {label: '—服务老人统计分析', path: 'GroupPortrait'},
        {label: '消费金额消费群体画像'}
      ],
      oldFirstSexMap: {},
      oldSecondSexMap: {},
      oldThirdSexMap: {},
      oldFirstAgeMap: {},
      oldSecondAgeMap: {},
      oldThirdAgeMap: {},
      oldFirstIncomeMap: {},
      oldSecondIncomeMap: {},
      oldThirdIncomeMap: {}
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
  watch: {
    codeNew () {
      this.getAmountGroupInfo()
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
    this.getAmountGroupInfo()
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
    getAmountGroupInfo () {
      getAmountGroupInfo(this.params).then(res => {
        if (res.data) {
          this.oldFirstSexMap = res.data.oldFirstSexMap
          this.oldThirdSexMap = res.data.oldThirdSexMap
          this.oldSecondSexMap = res.data.oldSecondSexMap
          this.oldFirstAgeMap = res.data.oldFirstAgeMap
          this.oldSecondAgeMap = res.data.oldSecondAgeMap
          this.oldThirdAgeMap = res.data.oldThirdAgeMap
          this.oldFirstIncomeMap = res.data.oldFirstIncomeMap
          this.oldSecondIncomeMap = res.data.oldSecondIncomeMap
          this.oldThirdIncomeMap = res.data.oldThirdIncomeMap
        }
      })
    }
  },
  components: {
    PageHeader,
    OldSex,
    OldAge,
    MonthlyIncome,
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
    width: 7rem;
    height: 10.1rem;
    padding: 1% 1% 0 1%;
    box-sizing: border-box;
    z-index: 3;
    margin-top: -.2rem;
  }
  .centre-panels {
    width: 7rem;
    height: 10.1rem;
    // padding: 0 2%;
  }
  .bread {
    position: fixed;
    top: 9%;
    left: 1%;
    z-index:999
  }
}
.title{
  font-size: .2rem;
  height: .7rem;
  line-height: .7rem;
  color: #68f4ff;
  padding-left: .4rem;
  font-weight: bold;
}
</style>
