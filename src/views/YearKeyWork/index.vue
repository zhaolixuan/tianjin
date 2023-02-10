<template>
  <div class="year_box">
    <div class="nav_btn" @click="openDialog"></div>
    <el-dialog :fullscreen="fullscreen" :visible.sync="$store.state.navDialogVisible" >
      <Navigation></Navigation>
    </el-dialog>
    <Header></Header>
    <div class="year-container">
      <div class="left-panels">
        <month-task :MonthTaskData="MonthTaskData"></month-task>
        <key-task :KeyTaskData="KeyTaskData"></key-task>
        <warning-situation :warningData="warningDatas" v-if="warningDatas.length > 0"></warning-situation>
      </div>
      <div class="centre-panels">
        <column-norms :norms="populationNorms" :inYearWork="true"></column-norms>
        <div class="menu">
          <rotate-menu  :menu="MenuData"></rotate-menu>
        </div>
      </div>
      <div class="right-panels">
        <service-type :MedircalData="AnnualTask"></service-type>
        <medical-service :MedicalRadar="YearTask"></medical-service>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb/index'
import ColumnNorms from '@/views/ProvideAged/components/Population/columnNorms.vue'
import Navigation from '@/components/Navigation/index'
import Header from '@/components/Header/index'
import MonthTask from './components/MonthCompleteTask/index.vue'
import WaterMap from './components/WaterPoloMap/index.vue'
import KeyTask from './components/KeyTaskCondition/index.vue'
import WarningSituation from './components/WarningSituation/index.vue'
import ServiceType from './components/ServiceType/index.vue'
import MedicalService from './components/MedicalService/index.vue'
import RotateMenu from './components/RotateMenu.vue'
import Api from '@/api/api'
export default {
  name: 'YearKeyWork',
  components: {
    BreadCrumb,
    ColumnNorms,
    Navigation,
    Header,
    MonthTask,
    WaterMap,
    KeyTask,
    WarningSituation,
    ServiceType,
    MedicalService,
    RotateMenu
  },
  data () {
    return {
      flag: false,
      fullscreen: true,
      number: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      YearWorkData: {}
    }
  },
  computed: {
    warningDatas () {
      const MonthTsk = this.YearWorkData.earlyWarnings || []
      return MonthTsk
    },
    MenuData () {
      const MonthTsk = this.YearWorkData.yearCompleteTask || []
      const data = MonthTsk.monthPredictTask
      return {
        data
      }
    },
    YearTask () {
      const MonthTsk = this.YearWorkData.keyWorkFile || {}
      const value = MonthTsk.length > 0 ? MonthTsk.map(item => item.count) : []
      const getMaxNumber = value.length > 0 ? value.reduce((a, b) => a > b ? a : b) : 0
      const max = Math.ceil(getMaxNumber)
      return {
        subtitle: '全年重点工作任务按依据文件分布',
        half: false,
        title: [
          { text: 'A', max, label: { offset: [50, 30] } },
          { text: 'B', max },
          { text: 'C', max },
          { text: 'D', max }
        ],
        data: MonthTsk
      }
    },
    AnnualTask () {
      const MonthTsk = this.YearWorkData.keyWorkDistribute || {}
      let MonthTskList = MonthTsk.length ? MonthTsk.sort((a, b) => a.count - b.count).slice(0, 10) : {}
      return {
        icon: 'box',
        text: '年度重点工作分布',
        subtitle: '全年重点工作任务按委办局分布',
        half: false,
        title: MonthTsk.length > 0 ? MonthTskList.map(item => item.distributeName) : '',
        data: MonthTsk.length > 0 ? MonthTskList.map(item => item.count) : '',
        maxHeight: true
      }
    },
    MonthTaskData () {
      const MonthTsk = this.YearWorkData.monthCompleteTask || {}
      return {
        icon: 'complete',
        text: '任务完成情况',
        subtitle: '当月任务完成情况',
        half: false,
        title: ['重点工作', '已完成工作', '未完成工作'],
        data: [
          MonthTsk.keyWork,
          MonthTsk.completedWork,
          MonthTsk.unfinishedWork
        ],
        percentage: MonthTsk.percentage
      }
    },
    KeyTaskData () {
      const MonthTsk = this.YearWorkData.keyWorkCases || {}
      return {
        subtitle: '重点工作完成情况',
        half: false,
        title: MonthTsk
      }
    },
    populationNorms () {
      const MonthTsk = this.YearWorkData.yearCompleteTask || {}
      return [
        {
          label: '本年度重点工作',
          value: MonthTsk.keyWork,
          unit: '项'
        },
        {
          label: '本年已完成数',
          value: MonthTsk.completedWork,
          unit: '项'
        }, {
          label: '本年未完成数',
          value: MonthTsk.unfinishedWork,
          unit: '项'
        }, {
          label: '本年完成率',
          value: (MonthTsk.percentage * 100 || 0).toFixed(3),
          unit: '%'
        }
      ]
    }
  },
  methods: {
    openDialog () {
      this.$store.commit('setNavDialogVisible', true)
    }
  },
  created () {
    Api.getYearWork().then(res => {
      this.YearWorkData = res.data
    })
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
.right-panels {
  background-image: url('~@/views/YearKeyWork/assets/right_panels-bg.png');
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
</style>
