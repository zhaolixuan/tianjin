<template>
  <div class="older-page_bg">
    <page-header title="智能设备监测大数据统计分析"></page-header>
    <div class="older-container">
      <div class="left-panels">
        <install-type :installData="installationTypeMap"></install-type>
        <statistics-age :ageMap="oldageMap"></statistics-age>
        <statistics-sex :sexMap="sexMap"></statistics-sex>
      </div>
      <div class="centre-panels">
        <opening-time :openTimeMap="openTimeMap"></opening-time>
        <install-device></install-device>
        <equipment-warning :warningMap="warningMap"></equipment-warning>
      </div>
      <div class="right-panels">
        <warning-type :warnTypeMap="warnTypeMap"></warning-type>
        <warning-time :warnTimeMap="warnTimeMap"></warning-time>
        <equipment-record></equipment-record>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import PageHeader from '@/views/OlderDistribution/components/PageHeader/header'
import InstallType from './components/InstallType/index'
import StatisticsAge from '@/views/OlderInformation/components/StatisticsAge/index'
import StatisticsSex from '@/views/GroupPortrait/components/StatisticsSex/index'
import OpeningTime from './components/OpeningTime/index'
import EquipmentWarning from './components/EquipmentWarning/index'
import WarningType from './components/WarningType/index'
import WarningTime from './components/WarningTime/index'
import EquipmentRecord from './components/EquipmentRecord/index'
import InstallDevice from './components/InstallDevice/index'
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import { mapGetters } from 'vuex'
import Menu from '@/views/OlderDistribution/components/Menu'
import { getDevicesService } from './apis/index'
export default {
  name: 'SmartdeviceStatistics',
  data () {
    return {
      installationTypeMap: [],
      oldageMap: {},
      sexMap: {},
      openTimeMap: [],
      warningMap: [],
      warnTypeMap: [],
      warnTimeMap: []
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
    this.getDevicesService()
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
    getDevicesService () {
      getDevicesService(this.params).then(res => {
        if (res.data) {
          this.installationTypeMap = res.data.installationTypeMap
          this.oldageMap = res.data.oldageMap
          this.sexMap = res.data.sexMap
          this.openTimeMap = res.data.openTimeMap.reverse()
          this.warningMap = res.data.warningMap
          this.warnTypeMap = res.data.warnTypeMap
          this.warnTimeMap = res.data.warnTimeMap
        }
      })
    }
  },
  components: {
    PageHeader,
    Menu,
    InstallType,
    StatisticsAge,
    StatisticsSex,
    OpeningTime,
    EquipmentWarning,
    WarningType,
    WarningTime,
    EquipmentRecord,
    InstallDevice,
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
