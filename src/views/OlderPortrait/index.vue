<template>
  <div class="older-page_bg">
    <div class="page_header">河西区居家养老服务管理平台</div>
    <div class="page_container">
      <div class="bread">
        <bread-crumb homeUrl="/olderDistribution" :crumbData="[{ title: '老年人画像', url: '' }]"></bread-crumb>
      </div>
      <div class="main_contianer">
        <div class="container_left">
          <basic-information :idCard="idCard" :basePersonVo="basePersonVo"></basic-information>
          <attention-index :populationRecordVo="populationRecordVo"></attention-index>
          <service-facility :smartServeyVo="smartServeyVo"></service-facility>
        </div>
      <div class="container_right">
          <belonging-community :communityVo="communityVo"></belonging-community>
          <provide-policy :basePersonAllowanceVo="basePersonAllowanceVo"></provide-policy>
          <service-demand :populationRecordVo="populationRecordVo"></service-demand>
      </div>
      </div>
      <div class="bottom_container">
        <div class="tabs_plane">
          <div class="tab_item" v-for="(item,index) in tabData" :key="index">
            <span :class="activeIndex == index ? 'tab-pane-before before_active' : 'tab-pane-before'" v-if="index===0" @click="hanleTabs(index)">{{item}}</span>
            <span :class='[activeIndex == index  ? "tab-pane-afther afther_acvtive" :"tab-pane-afther",index === tabData.length -1 ? "tab-pane-afther mr_l": "tab-pane-afther"]' v-if="index>=1" @click="hanleTabs(index)">{{item}}</span>
          </div>
        </div>
        <div class="table_plane">
          <list-layout :columns="columns" :tableData="tableDatas"></list-layout>
        </div>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BasicInformation from './components/BasicInformation'
import Menu from '@/views/OlderDistribution/components/Menu/index'
import BreadCrumb from '@/components/BreadCrumb/index'
import BelongingCommunity from './components/BelongingCommunity'
import AttentionIndex from './components/AttentionIndex'
import ProvidePolicy from './components/ProvidePolicy'
import ServiceFacility from './components/ServiceFacility'
import ServiceDemand from './components/ServiceDemand'
import ListLayout from './components/ListLayout'
import api from '@/api/api'
export default {
  name: 'olderPortrait',
  data () {
    return {
      tabData: ['购买服务记录', '走访记录', '服务项目'],
      activeIndex: 0,
      payColumns: [
        { label: '序号', prop: 'index' },
        { label: '服务订单', prop: 'payOrderNo' },
        { label: '服务时间', prop: 'mealTime' },
        { label: '服务项目', prop: 'mealType' },
        { label: '消费金额', prop: 'consumerMoney' },
        { label: '补贴金额', prop: 'allowanceMoney' },
        { label: '服务载体', prop: 'servicePoint' }
      ],
      serviceColumns: [
        { label: '序号', prop: 'index' },
        { label: '时间', prop: 'times' },
        { label: '服务项目', prop: 'serviceProject' },
        { label: '服务部门', prop: 'serviceSectors' }
      ],
      columns: [],
      idCard: this.$route.query.idCard,
      basePersonVo: {},
      communityVo: {},
      populationRecordVo: {},
      basePersonAllowanceVo: {},
      tableData: [],
      payData: [],
      serviceData: [],
      smartServeyVo: {},
      timer: null
    }
  },
  components: {
    Menu,
    BreadCrumb,
    BasicInformation,
    BelongingCommunity,
    AttentionIndex,
    ProvidePolicy,
    ServiceFacility,
    ServiceDemand,
    ListLayout
  },
  computed: {
    ...mapGetters(['typeNew', 'codeNew']),
    params () {
      let params = {}
      const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0]

      return params
    },
    tableDatas () {
      return this.tableData.slice(0, 4)
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
    this.initPictureData()
    this.columns = this.serviceColumns
    this.timer = setInterval(() => {
      this.tableData = this.tableData.concat(this.tableData.splice(0, 4))
    }, 3000)
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
    hanleTabs (ind) {
      this.activeIndex = ind
      switch (ind) {
        // case 0:
        //   this.tableData = this.payData
        //   this.columns = this.payColumns
        //   break
        case 2:
          this.tableData = this.serviceData
          this.columns = this.serviceColumns
      }
    },
    initPictureData () {
      api
        .getOlderDetail({idCard: this.idCard})
        .then(res => {
          let data = res.data
          let num = 1
          if (data) {
            this.basePersonVo = data.basePersonVo
            this.communityVo = data.communityVo
            this.populationRecordVo = data.populationRecordVo
            this.basePersonAllowanceVo = data.basePersonAllowanceVo
            this.smartServeyVo = data.smartServeyVo
            this.payData = data.freeOrderInfoDto || []
            this.serviceData = data.oldPersonAppointmentRecordDto || []
            this.tableData = data.oldPersonAppointmentRecordDto || []
            this.tableData.map(item => item.index = num++)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
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
  background-image: url("~@/views/OlderPortrait/assets/older-portrait_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.page_header{
  width: 100%;
  line-height: .72rem;
  text-align: center;
  font-size: .3rem;
  color: #C9EEFF;
  font-weight: bold;
  font-family: PingFangSC-Semibold;
}
.page_container{
  width: 100%;
  height: 100%;
  .bread{
    width: 100%;
    height: .5rem;
    display: flex;
    align-items: center;
  }
}
.main_contianer{
  width: 100%;
  height: 6.2rem;
  box-sizing: border-box;
  padding: 0 .3rem;
  display: flex;
  .container_left{
    width: 50%;
    height: 100%;
    margin-right: .16rem;
  }
  .container_right{
    width: 50%;
    height: 100%;
  }
}
.bottom_container{
  width: 100%;
  height: 3rem;
  padding: 0 .35rem;
  margin-top: .115rem;
  box-sizing: border-box;
  .tabs_plane{
    height: .5rem;
    width: 100%;
    font-size: .16rem;
    .tab_item{
      display: inline-block;
      line-height: .5rem;
      text-align: center;
      color: #C9EEFF;
      width: 2.2rem;
      height: 100%;
    }
    .tab-pane-before{
      width: 100%;
      display: inline-block;
      height: 100%;
      background-image: url('~@/views/OlderPortrait/assets/left-tab.png');
      background-size: 100% 100%;
    }
    .before_active{
      background-image: url('~@/views/OlderPortrait/assets/left-tab-active.png')  !important;
      color: #016AFF ;
    }
    .afther_acvtive{
      background-image: url('~@/views/OlderPortrait/assets/tab-active.png') !important;
      color: #016AFF ;
    }
    .tab-pane-afther{
      width: 100%;
      display: inline-block;
      height: 100%;
      background-image: url('~@/views/OlderPortrait/assets/tab.png');
      background-size: 100% 100%;
      margin-left: -1rem;
    }
    .mr_l{
      margin-left: -2rem;
    }
  }
  .table_plane{
    width: 100%;
    height: 2.15rem;
    margin-top: .12rem;
  }
}
</style>
