<template>
  <div class="tab-content_container">
    <service-type :MedircalData="ProjectFive"></service-type>
    <medical-service :MedicalRadar="ServiceType"></medical-service>
    <monthly-income
      icon="repast"
      title="近七天服务工单数量"
      :xAxisData="xAiData"
      :chartData="MedicalExpend"
      left='-20'
      right='20'
      color="rgba(123, 151, 177, 1)"
    />
    <service-type :MedircalData="MerchatsData"></service-type>
    <service-today :TodayDatas="OldTimer"></service-today>
    <service-project :CircleData="BufferData"></service-project>
  </div>
</template>
<script>
import MedicalService from '../MedicalService/index.vue'
import ServiceProject from '../ServiceProject/index.vue'
import ServiceType from '../ServiceType/index.vue'
import ServiceWork from '../ServiceWork/index.vue'
import ServiceToday from '../ServiceToday/index.vue'
import MonthlyIncome from '../MonthlyIncome'
import { mapGetters } from 'vuex'
export default {
  name: 'ServiceTab',
  data () {
    return {
      xAxisData: []
    }
  },
  components: {
    MedicalService,
    ServiceProject,
    ServiceType,
    ServiceWork,
    ServiceToday,
    MonthlyIncome
  },
  computed: {
    ...mapGetters(['type', 'code', 'operatingData']),
    params () {
      let params = {}
      const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
      params[typeCodes[this.type - 1]] = this.code[0]
      return params
    },
    data () {
      return this.perInfo.serviceItemMap
    },
    xAiData () {
      const OrderNumMap = this.operatingData.serviceOrderNumMap || []
      let data = []
      data = OrderNumMap.length > 0 ? OrderNumMap.map(item => item.currentDay.slice(5)) : []
      Array.reverse(data)
      return data
    },
    ServiceType () {
      const TypeMap = this.operatingData.serviceTypeMap || []
      const getMaxNumber = TypeMap ? Object.values(TypeMap[0]).reduce((a, b) => a > b ? a : b) : 0
      const max = Math.ceil(getMaxNumber)
      return {
        icon: 'form',
        text: '服务类型',
        title: [
          { text: '有偿服务', max, label: { offset: [50, 30] } },
          { text: '政府购买', max },
          { text: '政府补贴', max },
          { text: '免费服务', max },
          { text: '政府购买+\n有偿服务', max }
        ],
        data: TypeMap.length > 0 ? Object.values(TypeMap[0]).map(item => Number(item)) : []
      }
    },
    MedicalExpend () {
      const OrderNumMap = this.operatingData.serviceOrderNumMap || []
      let data = OrderNumMap.length > 0 ? OrderNumMap.map(item => item.orderCardTotal) : []
      Array.reverse(data)
      return data
    },
    OldTimer () {
      const EveryDayMap = this.operatingData.serviceMealsEveryDayMap || []
      return {
        icon: 'institution',
        text: '下单时间统计',
        title: ['07:00-10:00', '11:00-14:00', '17:00-20:00'],
        data: EveryDayMap.length > 0 ? EveryDayMap.map(item => item.mealsTotal) : [],
        max: true
      }
    },
    BufferData () {
      const OrderMap = this.operatingData.serviceDistrictOrderMap || []
      let data = []
      // eslint-disable-next-line no-unused-expressions
      OrderMap.length > 0 ? OrderMap.map((item, index) => {
        data.push({
          value: item.orderCardTotal,
          ratio: Math.round(item.orderCardTotal / item.total * 100),
          name: item.zoneName
        })
      }) : []
      return {
        icon: 'label',
        text: '各片区订单统计',
        unit: '%',
        flag: true,
        data
      }
    },
    MerchatsData () {
      const OrderMap = this.operatingData.serviceMerchantOrderMap || []
      return {
        icon: 'day',
        text: '服务商家订单前五',
        title: OrderMap.length > 0 ? OrderMap.map(item => item.seormer) : [],
        data: OrderMap.length > 0 ? OrderMap.map(item => item.counts) : []
      }
    },
    ProjectFive () {
      const ItemMap = this.operatingData.serviceItemMap || []
      return {
        icon: 'pay',
        text: '服务项目前五',
        title: ItemMap.length > 0 ? ItemMap.map(item => item.seroi) : [],
        data: ItemMap.length > 0 ? ItemMap.map(item => item.counts) : []
      }
    }
  },
  watch: {
    code (val) {
      this.$store.dispatch('getOperatingDay', this.params)
    }
  },
  created () {
    this.$store.dispatch('getOperatingDay', this.params)
  }
}
</script>
