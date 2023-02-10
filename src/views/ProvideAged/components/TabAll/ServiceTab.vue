<template>
  <div class="tab-content_container">
    <service-item :ServiceData="ServiceData"></service-item>
    <service-type :MedircalData="CircleData"></service-type>
    <service-type :MedircalData="MedicalData"></service-type>
    <service-work :NumberData="NumberData"></service-work>
    <service-today :TodayDatas="TodayData"></service-today>

  </div>
</template>
<script>
import ServiceItem from '../ServiceItem/index.vue'
import ServiceProject from '../ServiceProject/index.vue'
import ServiceType from '../ServiceType/index.vue'
import ServiceWork from '../ServiceWork/index.vue'
import ServiceToday from '../ServiceToday/index.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'ServiceTab',
  components: {
    ServiceItem,
    ServiceProject,
    ServiceType,
    ServiceWork,
    ServiceToday
  },
  computed: {
    ...mapGetters(['type', 'code', 'perInfo', 'MealInfo', 'breadCrumbCodes']),
    params () {
      let params = {}
      const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
      params[typeCodes[this.type - 1]] = this.code[0]
      return params
    },
    ServiceData () {
      return [
        {
          id: 0,
          title: '养老中心',
          number: this.perInfo.dayCenterMap.pensionInstitutionsTotal,
          icon: 'hous',
          text: '家'
        },
        {
          id: 1,
          title: '日间照料中心',
          number: this.perInfo.dayCenterMap.dayCareTotal,
          icon: 'public',
          text: '家'
        },
        {
          id: 2,
          title: '网格员',
          label: '网格员',
          number: this.perInfo.dayCenterMap.gridPersonTotal,
          icon: 'staff',
          text: '人',
          path: {
            name: 'reseauPage',
            query: { code: this.breadCrumbCodes }
          }
        }
      ]
    },
    MedicalData () {
      return {
        icon: 'insurance',
        text: '服务类型',
        title: Object.keys(this.perInfo.serviceTypeMap),
        data: Object.values(this.perInfo.serviceTypeMap)
      }
    },
    NumberData () {
      return {
        icon: 'illness',
        text: '近六个月订单',
        title: this.perInfo.serviceOrderNumMap.length ? this.perInfo.serviceOrderNumMap.map(item => (item.currentMonth)).reverse() : [],
        data: this.perInfo.serviceOrderNumMap.length ? this.perInfo.serviceOrderNumMap.map(item => (item.orderCardTotal)).reverse() : []

      }
    },
    TodayData () {
      return {
        icon: '订餐时间',
        text: '订餐时间',
        title: ['07:00-10:00', '11:00-14:00', '17:00-20:00'],
        data: this.perInfo.mealsNumMap ? this.perInfo.mealsNumMap.map(item => (item.mealsTotal)) : []
      }
    },
    CircleData () {
      const perInfo = this.perInfo.serviceItemMap || {}
      Array.reverse(perInfo)
      return {
        icon: 'project',
        text: '服务项目前五',
        title: perInfo.map(item => (item.serviceorderItem)),
        data: perInfo.map(item => (item.orderCardTotal))
      }
    }
  },
  watch: {
    code (val) {
      this.$store.dispatch('getOrderPersonInfo', this.params)
    }
  },
  created () {
    this.$store.dispatch('getOrderPersonInfo', this.params)
  }
}
</script>
