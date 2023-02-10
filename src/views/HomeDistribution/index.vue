<template>
  <div class="older-page_bg">
    <page-header title="居家养老服务载体分布"></page-header>
    <div class="older-container">
      <div class="bread">
        <bread-crumb></bread-crumb>
      </div>
      <div class="left-panels">
        <built-institutions :activeBuilt="activeBuilt"></built-institutions>
        <built-services></built-services>
      </div>
      <div class="centre-panels">
        <div class="top_panels">
          <food-chart-map></food-chart-map>
        </div>
      </div>

      <div class="right-panels">
        <service-list></service-list>
        <order-list></order-list>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import PageHeader from '@/views/OlderDistribution/components/PageHeader/header'
import BuiltInstitutions from './components/BuiltInstitutions/index'
import BuiltServices from './components/BuiltServices/index'
import ServiceList from './components/ServiceList/index'
import OrderList from './components/OrderList/index'
import BreadCrumb from '@/views/OlderDistribution/components/BreadCrumb'
import FoodChartMap from './components/FoodMap/index'
import { mapGetters } from 'vuex'
import Menu from '@/views/OlderDistribution/components/Menu'
import { getCanteenNumber } from './apis/index.js'
export default {
  name: 'HomeDistribution',
  data () {
    return {
      activeBuilt: {
        flag:true
      }
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
    codeNew (val) {
      this.getCanteenNumber()
    }
  },
  created () {
    this.getCanteenNumber()
    if (
      this.$route.query.code ||
      (this.$route.query.code && this.$route.query.code.length > 0)
    ) {
      this.initCodeFromUrlQuery()
    } else {
      this.initChartInfo()
    }
    this.getCanteenNumber();
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
    getCanteenNumber () {
      getCanteenNumber(this.params).then(res => {
        this.activeBuilt = res.data
      })
    }
  },
  components: {
    PageHeader,
    Menu,
    BuiltInstitutions,
    BuiltServices,
    FoodChartMap,
    ServiceList,
    OrderList,
    BreadCrumb
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
    width:5.6rem;
    height: 10.1rem;
    box-sizing: border-box;
    z-index: 3;
  }
  .centre-panels {
    flex: 1;
    height: 10.1rem;
    margin-bottom: 1rem;
    position: relative;
    .top_panels {
      height: 100%;
    }
  }
  .bread {
    position: fixed;
    top: 5%;
    left: 2%;
  }
}
</style>
