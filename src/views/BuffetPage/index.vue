<template>
  <div class="older-page_bg">
    <page-header title="助餐服务监管大数据分析"></page-header>
    <div class="older-container">
      <div class="bread">
        <bread-crumb></bread-crumb>
      </div>
      <div class="left-panels">
        <older-message :serviceMealMap="serviceMealMap"></older-message>
        <older-type :serviceTypeMap="serviceTypeMap"></older-type>
        <buffet-older :serviceOrderMap="serviceOrderMap"></buffet-older>
        <place-statistics :serviceChannalsMap="serviceChannalsMap"></place-statistics>
      </div>
      <div class="centre-panels">
        <div class="header_report">
          <marquee class="service-order_marquee"  behavior="scroll" direction="left" v-if="tableData.length >= 1">
              最新服务：
            <span>{{tableData[0].payTime}} {{tableData[0].orderName}}</span>
            <span>在{{tableData[0].merchantName}}享受{{tableData[0].requirementBig}} 消费金额：{{tableData[0].consumerMoney}}元 补贴金额：{{tableData[0].allowanceMoney}}元</span>
          </marquee>
        </div>
        <div class="top_panels">
          <food-chart-map></food-chart-map>
          <p class="label_text">数据来源：实时养老服务运营数据</p>
        </div>
      </div>
      <div class="right-panels">
        <service-project :serviceMap="serviceMap"></service-project>
        <consume-statistics :serviceOrderlatelyMap="serviceOrderlatelyMap"></consume-statistics>
        <time-distribute :serviceMap="serviceMealstimesMap"></time-distribute>
        <service-evaluate :mealCouponData="mealCouponData"></service-evaluate>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import PageHeader from '@/views/OlderDistribution/components/PageHeader/header'
import OlderMessage from './components/OldageMessage/index'
import OlderType from './components/OldageType/index'
import BuffetOlder from './components/BuffetOlder/index'
import PlaceStatistics from './components/PlaceStatistics/index'
import ServiceProject from './components/ServiceProject/index'
import ConsumeStatistics from './components/ConsumeStatistics/index'
import TimeDistribute from './components/TimeDistribute/index'
import ServiceEvaluate from './components/ServiceEvaluate/index'
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import DetialTip from './components/DetialTip/index'
import FoodChartMap from './components/FoodMap/index'
import TabsTop from './components/Tabs'
import BreadCrumb from '@/views/OlderDistribution/components/BreadCrumb'
import listLayout from '@/components/TablerList/smallLayout'
import { getCateringerServiceToday } from './apis/index'
import api from '@/api/api.js'
import { mapGetters } from 'vuex'
import Menu from '@/views/OlderDistribution/components/Menu'
export default {
  name: 'bufferPage',
  data () {
    return {
      columns: [
        { label: '序号', prop: '' },
        { label: '服务载体', prop: 'merchantName' },
        { label: '服务老人', prop: 'orderName' },
        { label: '服务类别', prop: 'requirementBig' },
        { label: '消费金额', prop: 'consumerMoney' },
        { label: '补贴金额', prop: 'allowanceMoney' }
      ],
      tableData: [],
      serviceTypeMap: [],
      serviceOrderMap: [],
      serviceChannalsMap: [],
      serviceOrderlatelyMap: [],
      serviceMealMap: {},
      serviceMealstimesMap: [],
      mealCouponData: [],
      serviceMap: [],
      facilitatorFlag: '',
      currentPage: 1,
      pageSize: 1,
      total: 0,
      timer: null,
      reportText: ''
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
    this.getCateringerServiceToday()
    this.getOlderList()
    if (
      this.$route.query.code ||
      (this.$route.query.code && this.$route.query.code.length > 0)
    ) {
      this.initCodeFromUrlQuery()
    } else {
      this.initChartInfo()
    }
  },
  watch: {
    codeNew (val) {
      if (this.params.code) {
        this.facilitatorFlag = '1'
      } else {
        this.facilitatorFlag = ''
      }
      this.getCateringerServiceToday()
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      this.getOlderList()
    }, 25000)
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
      this.$store.dispatch('getUserAuthInfo').then((res) => {})
    },
    getCateringerServiceToday () {
      let params = Object.assign({}, this.params, {
        typeFlag: 1,
        facilitatorFlag: this.facilitatorFlag
      })
      getCateringerServiceToday(params).then((res) => {
        this.serviceMap = res.data.serviceTypeMap
        res.data.serviceSupportMap.map((item) => {
          item.currentDay = item.currentDay.slice(5)
        })
        this.serviceOrderMap = [
          res.data.serviceSupportMap.reverse(),
          res.data.serviceOrderWeekMap.reverse(),
          res.data.serviceOrderMonthMap.reverse()
        ]
        this.serviceTypeMap = res.data.serviceItemMap
        this.serviceChannalsMap = res.data.serviceChannalsMap
        this.serviceOrderlatelyMap = res.data.serviceOrderlatelyMap
        this.serviceMealMap = res.data.serviceMealMap
        this.serviceMealstimesMap = res.data.consumerMoneyMap
        this.mealCouponData = res.data.mealCouponMap
      })
    },
    getOlderList () {
      let form = Object.assign({}, this.params, {
        payFlag: '1',
        requirementBig: '膳食供应',
        pageSize: this.pageSize,
        page: this.currentPage
      })
      api.getFreeOrderPage(form).then((res) => {
        const { records, total } = res && res.obj
        this.total = total
        this.tableData = records
      })
    }
  },
  components: {
    PageHeader,
    OlderMessage,
    OlderType,
    BuffetOlder,
    PlaceStatistics,
    ServiceProject,
    ConsumeStatistics,
    TimeDistribute,
    ServiceEvaluate,
    NormLayout,
    DetialTip,
    FoodChartMap,
    TabsTop,
    BreadCrumb,
    listLayout,
    Menu
  },
  destroyed () {
    clearInterval(this.timer)
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
    width: 5.5rem;
    height: 10.1rem;
    // background-color: #ffffff;
    margin-top: -0.4rem;
    padding: 1% 1% 0 1%;
    box-sizing: border-box;
    z-index: 3;
  }
  .centre-panels {
    // flex: 1;
    // height: 14.1rem;
    // position: relative;
    flex: 1;
    height: 10.1rem;
    margin-bottom: 1rem;
    position: relative;
    .header_report {
      color: #68f4ff;
      float: right;
      height: 5%;
      width: 100%;
      font-size: 0.214rem;
      display: flex;
      .report_text{
        display: inline-block;
        margin-right: 9.4rem;
      }
    }
    .top_panels {
      height: 95%;
      position: relative;
      .label_text {
        color: red;
        font-size: 0.18rem;
        position: absolute;
        bottom: 7%;
        right: 3%;
        font-weight: bold;
      }
    }
  }
  .bread {
    position: fixed;
    top: 5%;
    left: 2%;
  }
}
</style>
