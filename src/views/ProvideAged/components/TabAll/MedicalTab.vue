<template>
  <div class="tab-content_container">
    <!-- <service-item :ServiceData="ServiceData"></service-item> -->
    <service-type :MedircalData="MedicalData"></service-type>
    <medical-service :MedicalRadar="MedicalRadar"></medical-service>
    <monthly-income icon="buck" title="上年度医疗支出部分" :xAxisData="xAxisData" :chartData="MedicalExpend" color="rgba(123, 151, 177, 1)" :max="true"/>
    <service-work :NumberData="NumberData"></service-work>
  </div>
</template>
<script>
import ServiceItem from '../ServiceItem/index.vue'
import MedicalService from '../MedicalService/index.vue'
import ServiceType from '../ServiceType/index.vue'
import ServiceWork from '../ServiceWork/index.vue'
import MonthlyIncome from '../MonthlyIncome'
import { mapGetters } from 'vuex'

const formatNumber = number => number || 0

export default {
  name: 'MedicalTab',
  components: {
    ServiceItem,
    MedicalService,
    ServiceType,
    ServiceWork,
    MonthlyIncome
  },
  data () {
    return {
      xAxisData: [
        '2000元\n以内',
        '2001至\n4000元',
        '4001至\n6000元',
        '6001至\n8000元',
        '8001至\n10000元',
        '10000\n元以上'
      ]
    }
  },
  computed: {
    ...mapGetters(['type', 'code', 'medicalInfo']),
    params () {
      let params = {}
      const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
      params[typeCodes[this.type - 1]] = this.code[0]

      return params
    },
    ServiceData () {
      return [
        {
          title: '有健康档案',
          number: this.medicalInfo.baseMedicalMap.haveHealthRecordsTotal || 0,
          icon: 'document',
          text: '人'
        },
        {
          title: '签订家庭医生',
          number: this.medicalInfo.baseMedicalMap.signHomeoctorTotal || 0,
          icon: 'doctor',
          text: '人'
        },
        {
          title: '每年免费体检',
          number:
            this.medicalInfo.baseMedicalMap.freePhysicalExaminationTotal || 0,
          icon: 'heart',
          text: '人'
        }
      ]
    },
    MedicalData () {
      return {
        icon: 'keep',
        text: '享有的医疗保险',
        title: [
          '其他商业保险',
          '无任何保险',
          '城镇居民\n基本医疗保险',
          '城镇职工\n基本医疗保险'
        ],
        double: true,
        data: [
          formatNumber(
            this.medicalInfo.medicalInsuranceMap.medicalOtherinsuranceTotal
          ),
          formatNumber(
            this.medicalInfo.medicalInsuranceMap.medicalNoninsuranceTotal
          ),
          formatNumber(
            this.medicalInfo.medicalInsuranceMap.medicalResidentsTotal
          ),
          formatNumber(this.medicalInfo.medicalInsuranceMap.medicalUrbanTotal)
        ]
      }
    },
    MedicalRadar () {
      const medicalService = this.medicalInfo.medicalServiceMap || {}
      const getMaxNumber = Object.values(medicalService).reduce((a, b) => a > b ? a : b)
      const max = Math.ceil(getMaxNumber)
      return {
        icon: 'services',
        text: '需要的医疗服务',
        double: true,
        radius: 90,
        title: [
          { text: '在社区站点取药', max, label: { offset: [50, 30] } },
          { text: '雇人陪同就业', max },
          { text: '代取药', max },
          { text: '其它', max },
          { text: '医疗、护理、等\n上门服务', max }
        ],
        data: [
          medicalService.medicalSitesTotal,
          medicalService.accompanyDoctorTotal,
          medicalService.medicalubstituteTotal,
          medicalService.medicalOtherTotal,
          medicalService.medicalServiceDoorTotal
        ]
      }
    },
    MedicalExpend () {
      const medicalExpend = this.medicalInfo.overYearMedicalExpendMap
      return [
        formatNumber(medicalExpend.threeUnderTotal),
        formatNumber(medicalExpend.twoFourTotal),
        formatNumber(medicalExpend.fourSixTotal),
        formatNumber(medicalExpend.sixEightTotal),
        formatNumber(medicalExpend.eightOneTotal),
        formatNumber(medicalExpend.oneOverTotal)
      ]
    },
    NumberData () {
      const importInfo = this.medicalInfo.medicalImportInfoMap
      return {
        icon: 'sick',
        text: '重要疾病信息',
        title: ['高血压', '糖尿病', '精神病', '肢体残疾', '其他疾病'],
        half: true,
        data: [
          formatNumber(importInfo.gxyTotal),
          formatNumber(importInfo.tnbTotal),
          formatNumber(importInfo.jsbTotal),
          formatNumber(importInfo.ztcjTotal),
          formatNumber(importInfo.otherIllnessTotal)
        ]
      }
    }
  },
  watch: {
    code (val) {
      this.$store.dispatch('getBaseMedicalInfo', this.params)
    }
  },
  created () {
    this.$store.dispatch('getBaseMedicalInfo', this.params)
  }
}
</script>
