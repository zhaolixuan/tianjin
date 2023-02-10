<template>
  <div class="year_box">
    <div class="nav_btn" @click="openDialog"></div>
    <el-dialog :fullscreen="fullscreen" :visible.sync="$store.state.navDialogVisible" >
      <Navigation></Navigation>
    </el-dialog>
    <Header></Header>
    <div class="year-container">
      <div class="left-panels">
        <Investment :InvestmentData="InvestmentData" style="height:30%"></Investment>
        <SettledEnterprise :SettledEnterpriseData="SettledEnterpriseData"></SettledEnterprise>
        <IndustrialDistribution :IndustrialDistributionData="IndustrialDistributionData"></IndustrialDistribution>
      </div>
      <div class="centre-panels">
        <column-norms :norms="populationNorms" :inYearWork="true"></column-norms>
        <div class="center-tabs">
          <centre-tabs :ProjectList="ProjectList" :count="pageCount" v-on:handleChange="getPage"/>
        </div>
      </div>
      <div class="right-panels">
        <project-introduce :ProjectData="ProjectData"></project-introduce>
        <project-section :SectiontData="SectiontData"></project-section>
        <Project-trend :TrendtData="TrendtData"></Project-trend>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb/index'
import ColumnNorms from '@/views/ProvideAged/components/Population/columnNorms.vue'
import Navigation from '@/components/Navigation/index'
import Header from '@/components/Header/index'
import Investment from './components/Investment/index'
import SettledEnterprise from './components/SettledEnterprise/index'
import IndustrialDistribution from './components/IndustrialDistribution/index'
import CentreTabs from './components/Table'
import ProjectIntroduce from './components/ProjectIntroduce/index.vue'
import ProjectSection from './components/ProjectSection/index.vue'
import ProjectTrend from './components/ProjectTrend/index.vue'
import Api from '@/api/api'
export default {
  name: 'YearKeyWork',
  components: {
    BreadCrumb,
    ColumnNorms,
    Navigation,
    Header,
    Investment,
    SettledEnterprise,
    IndustrialDistribution,
    CentreTabs,
    ProjectIntroduce,
    ProjectSection,
    ProjectTrend
  },
  data () {
    return {
      flag: false,
      fullscreen: true,
      MerchantsData: [],
      ProjectList: [],
      timer: null,
      page: 1,
      pageSize: 10,
      pageCount: 0
    }
  },
  created () {
    this.getList({page: this.page, pageSize: this.pageSize})
    Api.getMerchants().then(res => {
      this.MerchantsData = res
    })
  },
  computed: {
    populationNorms () {
      return [
        {
          label: '引进项目',
          value: this.MerchantsData.totalProjectIntroduction || 0,
          unit: '项'
        }, {
          label: '引进优质项目',
          value: this.MerchantsData.totalProjectIntroductionHigh || 0,
          unit: '项'
        }, {
          label: '注册资本金或投资金额',
          value: this.MerchantsData.totalRegisteredAndinvestment || 0,
          unit: '万元'
        }
      ]
    },
    InvestmentData () {
      const Investment = this.MerchantsData.totalInvestment || 0
      const TheCity = this.MerchantsData.totalInvestmentInTheCity || 0
      const SideTheCity = this.MerchantsData.totalInvestmentOutsideTheCity || 0
      return {
        icon: '招商引资',
        text: '招商引资',
        half: false,
        title: ['引进市外总投资', '引进市内总投资'],
        data: [SideTheCity, TheCity],
        maxHeight: true,
        Investment
      }
    },
    SettledEnterpriseData () {
      const InEnttype = this.MerchantsData.totalProjectInEnttype || []
      const investment = this.MerchantsData.totalProjectInregisterOrinvestment || []
      return {
        icon: '企业',
        text: '入驻企业',
        half: false,
        data: [23, 43],
        maxHeight: true,
        InEnttype,
        investment
      }
    },
    IndustrialDistributionData () {
      const InIndustry = this.MerchantsData.totalProjectInIndustry || {}
      const industryList = InIndustry.length ? InIndustry.sort((a, b) => b.countInIndustry - a.countInIndustry).slice(0, 10) : []
      let title = []
      let data = []
      // eslint-disable-next-line no-unused-expressions
      industryList.length > 0 ? industryList.map(item => {
        title.push(item.industry.replace(/(.{2})/g, '$1\n'))
        data.push(item.countInIndustry)
      }) : []
      return {
        icon: '引进项目行业分布',
        text: '引进项目行业分布前十',
        half: false,
        title,
        data,
        maxHeight: true
      }
    },
    ProjectData () {
      const CityInOrOut = this.MerchantsData.totalProjectCityInOrOut || []
      return {
        text: '项目来源分布',
        icon: 'ProjectDFS',
        title: ['市外', '市内'],
        half: false,
        CityInOrOut
      }
    },
    SectiontData () {
      const InDocument = this.MerchantsData.totalProjectInDocument || []
      return {
        text: '引进项目部门分布',
        icon: 'section',
        half: false,
        InDocument
      }
    },
    TrendtData () {
      const InMonth = this.MerchantsData.totalProjectInMonth || []
      return {
        text: '引入项目月度趋势变化',
        icon: 'trend',
        half: false,
        InMonth
      }
    }
  },
  methods: {
    openDialog () {
      this.$store.commit('setNavDialogVisible', true)
    },
    getList ({page, pageSize}) {
      Api.getProjectList(page, pageSize).then(res => {
        this.pageCount = res.count
        this.ProjectList = res.obj
      })
    },
    getPage (val) {
      console.log(val)
      this.getList({page: val, pageSize: this.pageSize})
    }
  }
}
</script>

<style lang="less" scoped>
.year_box{
  min-height: 100%;
  font-size: initial;
  user-select: none;
  background: #010B30;
  .year-container{
    display: flex;
    height: 100%;
    margin: 0 1.58%;
    background: url("~@/assets/img/big_project_bg.gif") 50% 0% no-repeat;
    background-size: 100% 87%
  }
}
.left-panels,
.right-panels{
  width: 5.45rem;
  height: 9.7rem;
  text-align: center;
  background-image: url('~@/views/YearKeyWork/assets/left_panels-bg.png');
  background-size: 100% 100%;
  margin-top: -0.4rem;
  padding: 1% 1% 0 1%;
  box-sizing: border-box;
  z-index: 3;
}
.centre-panels{
  flex: 1;
  height: 9.2rem;
  text-align: center;
  margin: 0 1.58%;
}
.rote{
  transform: rotate(30deg)
}
.center-tabs{
  margin-top: 5%;
  width: 100%;
  height: 7.62rem;
  background:no-repeat url('~@/views/MerchantsPage/assets/中间.png');
  background-size:100% 100%;
  position: relative;
}
</style>
