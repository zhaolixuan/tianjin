<template>
  <div class="older-content">
    <norm-layout
      text="老年人需求信息"
      :tab_item="tab_item"
      path="ProvideAged"
      v-on:getActiveIndex="handleGetActiveIndex"
      :intever="true"
    ></norm-layout>
    <help-message :SpiritsData="FastData"></help-message>
  </div>
</template>

<script>
import NormLayout from '../NormLayout'
import HelpMessage from '../HelpMessage/index'
import { mapGetters } from 'vuex'
export default {
  name: 'olderNeeds',
  data () {
    return {
      path: {
        path: 'ProvideAged'
      },
      tab_item: ['助餐', '医疗', '家政'],
      activeIndex: 0,
      timer: null
    }
  },
  created () {
    this.$store.dispatch('getUrgentneedInfo', this.params)
  },
  computed: {
    ...mapGetters(['typeNew', 'codeNew', 'UrgentneedInfo']),
    params () {
      let params = {}
      const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0]
      return params
    },
    FastData () {
      let UrgentneedInfo = []
      switch (this.activeIndex) {
        case 0:
          UrgentneedInfo = this.getUrgentneedInfo(
            this.UrgentneedInfo.mealTimeMap
          )
          break
        case 1:
          UrgentneedInfo = this.getUrgentneedInfo(
            this.UrgentneedInfo.medicalServiceMap
          )
          break
        case 2:
          UrgentneedInfo = this.getUrgentneedInfo(
            this.UrgentneedInfo.urgentneedServiceMap
          )
          break
      }
      return {
        title: UrgentneedInfo.title,
        maxData: UrgentneedInfo.maxData,
        data: UrgentneedInfo.data
      }
    }
  },
  methods: {
    handleGetActiveIndex (ind) {
      this.activeIndex = ind
    },
    getUrgentneedInfo (UrgentneedInfo) {
      let allData = {}
      const getMaxNumber =
        UrgentneedInfo && Object.values(UrgentneedInfo).length > 0
          ? Object.values(UrgentneedInfo).reduce((a, b) => (a > b ? a : b))
          : 0
      const max = Math.ceil(getMaxNumber)
      switch (this.activeIndex) {
        case 0:
          allData = {
            title: ['早餐', '中餐', '晚餐'],
            maxData: max || 100,
            data: [
              UrgentneedInfo.breakFastTotal,
              UrgentneedInfo.lunchMealTotal,
              UrgentneedInfo.dinnerMealTotal
            ]
          }
          break
        case 1:
          allData = {
            title: [
              '在社区站点取药',
              '护理、等上门服务',
              '其它',
              '代取药',
              '雇人陪同就业'
            ],
            maxData: max || 100,
            data: [
              UrgentneedInfo.medicalSitesTotal,
              UrgentneedInfo.medicalServiceDoorTotal,
              UrgentneedInfo.medicalOtherTotal,
              UrgentneedInfo.medicalubstituteTotal,
              UrgentneedInfo.accompanyDoctorTotal
            ]
          }
          break
        case 2:
          allData = {
            title: ['上门做家务', '安全检修', '其他', '上门服务', '健康知道'],
            maxData: max || 100,
            data: [
              UrgentneedInfo.houseworkDoorTotal,
              UrgentneedInfo.securityCheckTotal,
              UrgentneedInfo.otherTotal,
              UrgentneedInfo.doorServiceTotal,
              UrgentneedInfo.healthGuidanceTotal
            ]
          }
          break
      }

      return allData
    }
  },
  watch: {
    codeNew (val) {
      this.$store.dispatch('getUrgentneedInfo', this.params)
    }
  },
  components: {
    NormLayout,
    HelpMessage
  }
}
</script>

<style lang="less" scoped>
.older-content {
  height: 2.5rem;
}
</style>
