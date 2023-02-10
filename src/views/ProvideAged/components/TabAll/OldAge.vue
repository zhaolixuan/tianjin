<template>
  <div class="tab-content_container">
    <gender-distribution :chartData="baseInfo.oldSexDstributionList"></gender-distribution>
    <monthly-income
      icon="salary"
      title="老年人口月收入"
      :xAxisData="oldIncomeData"
      color="rgba(123, 151, 177, 1)"
      :monthlyIncomeMap="baseInfo.oldMonthlyDstributionMap"
    />
    <health-state :dstributionMap="baseInfo.oldBodyDstributionMap"></health-state>
    <education-level :educationInfo="baseInfo.returnEducationmap"></education-level>
    <income-source :incomeMap="incomeMap"></income-source>
    <population-library></population-library>
  </div>
</template>

<script>
import GenderDistribution from '../GenderDistribution/index.vue'
import MonthlyIncome from '../MonthlyIncome/index.vue'
import HealthState from '../HealthState/index.vue'
import EducationLevel from '../EducationLevel/index.vue'
import IncomeSource from '../IncomeSource/index.vue'
import PopulationLibrary from '../PopulationLibrary/index.vue'
import { mapGetters } from 'vuex'
import {
  getUserInfo,
  getCommunityByUserId,
  getOldBasePersonInfo
} from '@/views/ProvideAged/apis/index.js'
const formatNumber = number => number || 0
export default {
  name: 'OldAge',
  components: {
    GenderDistribution,
    MonthlyIncome,
    HealthState,
    EducationLevel,
    IncomeSource,
    PopulationLibrary
  },
  data () {
    return {
      TableName: [
        '老年人信息',
        '医疗信息',
        '养老服务信息',
        '助餐信息',
        '服务机构/服务订单信息'
      ],
      oldIncomeData: [
        '无收入',
        '1000\n元以下',
        '1001至\n2000元',
        '2001至\n3000元',
        '3001至\n4000元',
        '4001至\n5000元',
        '5000元\n以上'
      ]
    }
  },
  mounted(){
    console.log(this.baseInfo);
  },
  computed: {
    ...mapGetters(['type', 'code', 'baseInfo']),
    params () {
      let params = {}
      const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
      params[typeCodes[this.type - 1]] = this.code[0]

      return params
    },
    incomeMap () {
      const baseInfo = this.baseInfo.returnSourcemap || {}
      return {
        text: '老年人收入来源',
        icon: 'income',
        title: ['退休金', '劳动收入', '低保救助金', '子女赡养', '其他'],
        data: [
          formatNumber(baseInfo.pensionTotal),
          formatNumber(baseInfo.laborIncomeTotal),
          formatNumber(baseInfo.minimumIncomeTotal),
          formatNumber(baseInfo.childIncomeTotal),
          formatNumber(baseInfo.otherTotal)
        ],
        top: 20
      }
    }
  }
}
</script>
<style lang="less">
.tab-content_container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 2% 2.5% 0 2.5%;
}
</style>
