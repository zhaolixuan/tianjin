<template>
    <div class="tab-content_container">
       <service-project :CircleData="CircleData"></service-project>
       <service-project :CircleData="FormData"></service-project>
       <service-type :MedircalData="MedircalData"></service-type>
       <service-type :MedircalData="DaylData"></service-type>
       <medical-service :MedicalRadar="MedicalRadar"></medical-service>
       <service-type :MedircalData="PriceData"></service-type>
    </div>
</template>
<script>
import ServiceProject from '../ServiceProject'
import ServiceType from '../ServiceType'
import MedicalService from '../MedicalService/index.vue'
import { mapGetters } from 'vuex'
const formatNumber = (number) => number || 0
export default {
  name: 'BufferTab',
  components: {
    ServiceProject,
    ServiceType,
    MedicalService
  },
  computed: {
    ...mapGetters(['type', 'code', 'MealInfo']),
    params () {
      let params = {}
      const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
      params[typeCodes[this.type - 1]] = this.code[0]
      return params
    },
    CircleData () {
      const MealInfo = this.MealInfo.isPayMap || {}
      return {
        icon: 'pay',
        text: '是否付费',
        flag: true,
        unit: '%',
        data: [
          { value: MealInfo.payMealTotal, ratio: Math.round(MealInfo.payMealTotal / MealInfo.total * 100), name: '是：' },
          { value: MealInfo.nonPayMealTotal, ratio: Math.round(MealInfo.nonPayMealTotal / MealInfo.total * 100), name: '否：' }
        ],
        colors: [
          { start: '#FCC8E9', end: '#FA6BA3' },
          { start: '#00ABF5', end: '#A4EAFF' }
        ]
      }
    },
    FormData () {
      const MealInfo = this.MealInfo.mealStyleMap || {}
      return {
        icon: 'form',
        text: '助餐形式',
        flag: true,
        data: [
          { value: MealInfo.sitMealTotal, ratio: Math.round(MealInfo.sitMealTotal / MealInfo.total * 100), name: '现场就餐：' },
          { value: MealInfo.foodDeliveryTotal, ratio: Math.round(MealInfo.foodDeliveryTotal / MealInfo.total * 100), name: '送餐：' }
        ],
        colors: [
          { start: '#FCC8E9', end: '#FA6BA3' },
          { start: '#00ABF5', end: '#A4EAFF' }
        ]
      }
    },
    MedircalData () {
      const MealInfo = this.MealInfo.mealTimeMap || {}
      return {
        icon: 'repast',
        text: '助餐时间',
        title: ['晚餐', '午餐', '早餐'],
        data: [
          formatNumber(MealInfo.dinnerMealTotal),
          formatNumber(MealInfo.lunchMealTotal),
          formatNumber(MealInfo.breakFastTotal)
        ]
      }
    },
    DaylData () {
      const MealInfo = this.MealInfo.mealDayMap || {}
      return {
        icon: 'day',
        text: '助餐天数',
        title: ['七天', '五天', '三天'],
        data: [
          formatNumber(MealInfo.sevenMealDayTotal),
          formatNumber(MealInfo.fiveMealDayTotal),
          formatNumber(MealInfo.threeMealDayTotal)
        ]
      }
    },
    MedicalRadar () {
      const MealInfo = this.MealInfo.mealMeachantMap || {}
      const getMaxNumber = Object.values(MealInfo).reduce((a, b) => a > b ? a : b)
      const max = Math.ceil(getMaxNumber)
      return {
        icon: 'institution',
        text: '认可的助餐机构',
        title: [
          { text: '互联网订餐', max, label: {offset: [50, 30]} },
          { text: '社会餐饮企业\n含配餐企业', max },
          { text: '其它', max },
          { text: '养老机构', max },
          { text: '日间照料中心', max }
        ],
        data: [
          MealInfo.socialInternetOrderingTotal,
          MealInfo.socialCateringEnterprisesTotal,
          MealInfo.socialOtherTotal,
          MealInfo.socialPensionTotal,
          MealInfo.socialDayCareTotal
        ]
      }
    },
    PriceData () {
      const MealInfo = this.MealInfo.mealPriceMap || {}
      return {
        icon: 'label',
        text: '餐品价格',
        title: ['20元及以上', '16-19元', '10-15元'],
        data: [
          formatNumber(MealInfo.twentylOverTotal),
          formatNumber(MealInfo.sixtyMealPriceTotal),
          formatNumber(MealInfo.tenMealPriceTotal)
        ]
      }
    }
  },
  watch: {
    code (val) {
      this.$store.dispatch('getBaseMealInfo', this.params)
    }
  },
  created () {
    this.$store.dispatch('getBaseMealInfo', this.params)
  }
}
</script>
