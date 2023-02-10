<template>
  <div class="older-page_bg">
    <page-header title="河西区居家养老服务管理平台"></page-header>
    <div class="older-container">
      <div class="bread">
        <bread-crumb></bread-crumb>
      </div>
      <div class="left-panels">
         <el-form>
          <el-form-item label="服务时间" class="search_select">
            <el-date-picker
              v-model="ServiceTime"
              type="daterange"
              range-separator="-"
              clearable
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-button
            class="btn"
            icon="el-icon-search"
            :loading="isSearchLoading"
            @click="handleGetSearchValue"
          >查询</el-button>
        </el-form>
        <p>服务人数：{{serverTotalMap.peopleTotal}}人</p>
        <p>服务量：{{serverTotalMap.orderTotal}}人</p>
        <p>消费金额：{{serverTotalMap.consumerMoney}}元</p>
        <five-service></five-service>
        <order-way></order-way>
      </div>
      <div class="centre-panels">
        <service-mode></service-mode>
        <service-proprtion></service-proprtion>
        <top-ten-service></top-ten-service>
      </div>
      <div class="right-panels">
        <pension-status></pension-status>
        <service-record></service-record>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import PageHeader from '@/views/OlderDistribution/components/PageHeader/header'
import BreadCrumb from '@/views/OlderDistribution/components/BreadCrumb'
import FiveService from './components/FiveServices/index'
import OrderWay from './components/OrderWay/index'
import ServiceMode from './components/ServiceMode/index'
import ServiceProprtion from './components/ServiceProportion/index'
import TopTenService from './components/TopTenService/index'
import PensionStatus from './components/PensionStatus/index'
import ServiceRecord from './components/ServiceRecord/index'
import { mapGetters } from 'vuex'
import { getHomeBaseInfoOne } from './apis/index'
import Menu from '@/views/OlderDistribution/components/Menu'
export default {
  name: 'olderDistribution',
  data () {
    return {
      ServiceTime: '',
      isSearchLoading: false,
      serverTotalMap: {}
    }
  },
  components: {
    PageHeader,
    BreadCrumb,
    FiveService,
    OrderWay,
    ServiceMode,
    ServiceProprtion,
    TopTenService,
    PensionStatus,
    ServiceRecord,
    Menu
  },
  computed: {
    ...mapGetters(['typeNew', 'codeNew', 'baseInfo', 'breadCrumbCodes']),
    params () {
      let params = {}
      const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0]
      return params
    }
  },
  watch: {
    codeNew (val) {
      // this.getFreeOrderInfo()
      this.$store.dispatch('getOldBaseInfo', this.params)
    }
  },
  created () {
    this.getHomeBaseInfoOne()
    this.$store.dispatch('getOldBaseInfo', this.params)
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
    handleGetSearchValue () {},
    getHomeBaseInfoOne(){
      getHomeBaseInfoOne().then(res=>{
        if(res.data){
          let { serverTotalMap } = res.data
          this.serverTotalMap = serverTotalMap[0]
        }
      })
    }
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
  background-size: cover;
}
.older-container {
  display: flex;
  height: 100%;
  margin: 0 1.58%;
  .left-panels,
  .right-panels {
    width: 6.5rem;
    height: 10.1rem;
    // background-color: #ffffff;
    margin-top: -0.4rem;
    padding: 1% 1% 0 1%;
    box-sizing: border-box;
    z-index: 3;
    p{
      color: #28e1fe;
      font-size: .2rem;
      margin-bottom: .2rem;
      font-weight: bold;
      padding-left: 2rem;
    }
  }
  .centre-panels {
    flex: 1;
    height: 9.2rem;
    margin-bottom: 1rem;
    position: relative;
    // border: 4px solid;
    // border-image: -webkit-linear-gradient(#ddd, #000) 30 30;
    // border-image: -moz-linear-gradient(#ddd, #000) 30 30;
    // border-image: linear-gradient(#ddd, #000) 30 30;
  }
  .bread {
    position: fixed;
    top: 5%;
    left: 2%;
  }
}
</style>
<style>
.el-input__inner {
  font-size: 0.16rem;
  background-color: transparent;
  border: 0;
  border: 0.01rem solid #043a6f;
  color: #56a4f7;
  max-width: 3rem;
}
.el-input__inner::-webkit-input-placeholder {
  color: #436fd2;
}
.el-select-dropdown,
.el-picker-panel,
.el-cascader__dropdown {
  background-color: #032995;
  border: 0;
}
.el-date-picker__header--bordered {
  border-bottom: 1px solid #436fd2;
}
.el-select-dropdown__item,
.el-date-picker__header-label,
.el-date-table td,
.el-month-table td .cell,
.el-year-table td .cell,
.el-picker-panel__icon-btn {
  color: #8fc0f3;
}
.el-popper[x-placement^="bottom"] .popper__arrow,
.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: #032995;
}
.el-date-picker__header--bordered {
  border-bottom: 1px solid #436fd2;
}
.el-date-table th {
  color: #436fd2;
  border-bottom: 1px solid #436fd2;
}
.el-date-table td.next-month,
.el-date-table td.prev-month {
  color: #436fd2;
}
.el-form-item__content .el-date-editor .el-range-input {
  background: transparent !important;
  font-size: 0.16rem;
  color: #416fc4 !important;
  width: 98%;
}
.el-date-editor .el-range-input::-webkit-input-placeholder {
  color: #416fc4;
}
.el-form-item__content .el-date-editor i {
  color: #416fc4;
}
.search_select .el-form-item__label {
  font-size: 0.2rem;
  color: #a6c5fd;
  width: 1.35rem;
  float: left;
}
.el-form{
  width:100%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: .4rem;
}
.btn {
  /* padding:0.15rem 0.5rem; */
  width: 70%;
  height: 0.4rem;
  /* line-height: .4rem; */
  background: url("~@/assets/img/oldMan_tab.png") no-repeat;
  background-size: 100% 100%;
  text-align: center;
  border: 0;
  color: #4fd0ff;
  margin-right: 0.1rem;
  font-size: 0.14rem;
  margin: 0 auto;
}
</style>
