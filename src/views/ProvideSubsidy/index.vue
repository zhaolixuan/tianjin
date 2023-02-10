<template>
  <div class="older-page_bg">
    <page-header title="养老补贴落实大数据统计"></page-header>
    <div class="older-container">
      <div class="left-panels">
        <subsidy-case :allowanceTypeList="allowanceTypeList"></subsidy-case>
        <subsidy-services :allowancePolicyMap="allowancePolicyMap"></subsidy-services>
      </div>
      <div class="centre-panels">
        <subsidyCase-norm :allowanceProdMap="allowanceProdMap"></subsidyCase-norm>
      </div>

      <div class="right-panels">
        <subsidy-data :allowanceTotalMap="allowanceTotalMap"></subsidy-data>
        <subsidy-merchant></subsidy-merchant>
        <subsidy-detial></subsidy-detial>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import PageHeader from '@/views/OlderDistribution/components/PageHeader/header'
import SubsidyCase from './components/SubsidyCase/index'
import SubsidyCaseNorm from './components/SubsidyCaseNorm/index'
import SubsidyData from './components/SubsidyData/index'
import SubsidyMerchant from './components/SubsidyMerchant/index'
import SubsidyDetial from './components/SubsidyDetial/index'
import SubsidyServices from './components/SubsidyServices/index'
import { mapGetters } from 'vuex'
import Menu from '@/views/OlderDistribution/components/Menu'
import { getAllowanceIndexInfo } from '@/views/OlderDistribution/apis/index.js'
export default {
  name: 'bufferPage',
  data () {
    return {
      allowanceProdMap: [],
      allowanceTotalMap: [],
      allowanceTypeList: {},
      allowancePolicyMap: []
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
    if (
      this.$route.query.code ||
      (this.$route.query.code && this.$route.query.code.length > 0)
    ) {
      this.initCodeFromUrlQuery()
    } else {
      this.initChartInfo()
    }
    this.getAllowanceIndexInfo()
  },
  watch: {
    codeNew (val) {
      this.getAllowanceIndexInfo()
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
      this.$store.dispatch('getUserAuthInfo').then(res => {
      })
    },
    getAllowanceIndexInfo () {
      getAllowanceIndexInfo(this.params).then(res => {
        this.allowanceProdMap = res.data.allowanceProdMap
        this.allowanceTotalMap = res.data.allowanceTotalMap
        this.allowancePolicyMap = res.data.allowancePolicyMap
        this.allowanceTypeList = res.data.allowanceTypeList[0]
      })
    }
  },
  components: {
    PageHeader,
    Menu,
    SubsidyCase,
    SubsidyCaseNorm,
    SubsidyData,
    SubsidyMerchant,
    SubsidyDetial,
    SubsidyServices
  }
}
</script>

<style lang="less" scoped>
.older-page_bg {
  min-height: 100%;
  font-size: initial;
  user-select: none;
  background-image: url("~@/views/ProvideSubsidy/assets/older-page_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.older-container {
  display: flex;
  height: 100%;
  margin: 0 1.58%;
  box-sizing: border-box;
  .left-panels,
  .right-panels {
    width: 6.2rem;
    height: 10.1rem;
    box-sizing: border-box;
    z-index: 3;
  }
  .centre-panels {
    flex: 1;
    height: 10.1rem;
    padding: 0 .5rem;
    box-sizing: border-box;
  }
}
</style>
