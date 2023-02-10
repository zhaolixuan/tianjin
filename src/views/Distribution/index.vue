<template>
  <div class="dis_wrapper">
    <page-header></page-header>
    <bread-crumb :crumbData="[{ title: '老年人口分布', url: '' }]"></bread-crumb>

    <div class="dis-content_container">
      <div class="dis-content-main">
        <div class="left-panel">
          <top-title :info="populationInfo"></top-title>
          <popul-message></popul-message>
          <div class="AgesixtyBox">
            <top-title :info="olderNumber"></top-title>
            <Agesixty-message ></Agesixty-message>
          </div>
        </div>
        <div class="content-panel">
          <div class="panel-item">
            <top-title :info="medicalInformation"></top-title>
            <Health-message></Health-message>
          </div>
          <div class="panel-item">
            <top-title :info="subsidyPaymen"></top-title>
            <place-message></place-message>
          </div>
        </div>
        <div class="right-panel">
          <div class="panel-item">
            <top-title :info="serviceConfiguration"></top-title>
            <service-organization></service-organization>
          </div>
          <div class="panel-item">
            <top-title :info="serviceOrder"></top-title>
            <service-order-message></service-order-message>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '../ProvideAged/components/PageHeader/index.vue'
import BreadCrumb from '@/components/BreadCrumb/index'
import PopulMessage from '@/views/Distribution/componetns/PopulMessage/index.vue'
import AgesixtyMessage from '@/views/Distribution/componetns/AgesixtyMessage/index.vue'
import placeMessage from '@/views/Distribution/componetns/placeMessage/index.vue'
import HealthMessage from '@/views/Distribution/componetns/HealthMessage/index.vue'
import ServiceOrderMessage from '@/views/Distribution/componetns/ServiceOrderMessage/index.vue'
import ServiceOrganization from './componetns/ServiceOrganization/index.vue'
import topTitle from '@/views/Distribution/componetns/topTitle.vue'
import { mapGetters } from 'vuex'
import {
  getBaseServiceOrderCountInfo,
  getOldBasePersonInfo
} from '@/views/ProvideAged/apis/index.js'

export default {
  name: 'OlderDfs',
  data () {
    return {
      obj: {
        parentId: '120103000000'
      },
      codeList: [],
      populationInfo: {
        title: '人口信息',
        list: [
          {
            id: 0,
            icon: '总失独老人@2x',
            name: '总失独老人',
            sum: 0,
            unit: '人'
          }, {
            id: 1,
            icon: '总独居老人@2x',
            name: '总独居老人',
            sum: 0,
            unit: '人'
          }
        ]
      },
      olderNumber: {
        title: '',
        list: [
          {
            id: 0,
            icon: '总老人数@2x',
            name: '总老人数',
            sum: 0,
            unit: '人'
          }, {
            id: 1,
            icon: '总失能老人@2x',
            name: '总失能老人',
            sum: 0,
            unit: '人'

          }, {
            id: 2,
            icon: '总残疾老人@2x',
            name: '总残疾老人',
            sum: 0,
            unit: '人'
          }
        ]
      },
      medicalInformation: {
        title: '医疗信息',
        list: [
          {
            id: 0,
            icon: '总健康档案@2x',
            name: '总健康档案',
            sum: 0,
            unit: '人'
          }, {
            id: 1,
            icon: '总享有医保@2x',
            name: '总享有医保',
            sum: 0,
            unit: '人'
          }, {
            id: 2,
            icon: '签订家庭医生@2x',
            name: '总签订家庭医生',
            sum: 0,
            unit: '人'
          }
        ]
      },
      subsidyPaymen: {
        title: '补贴情况领取',
        list: [
          {
            id: 0,
            icon: '领取补贴老人总数@2x',
            name: '领取补贴老人总数',
            sum: 0,
            unit: '人'
          }
        ]
      },
      serviceConfiguration: {
        title: '养老服务配置',
        list: [
          {
            id: 0,
            icon: '总养老中心@2x',
            name: '总养老中心',
            sum: 0,
            unit: '家'
          }, {
            id: 1,
            icon: '总日间照料中心@2x',
            name: '总日间照料中心',
            sum: 0,
            unit: '家'
          }
        ]
      },
      serviceOrder: {
        title: '服务工单统计',
        list: [
          {
            id: 0,
            icon: '总服务老人@2x',
            name: '总服务老人数',
            sum: 0,
            unit: '人'
          }, {
            id: 1,
            icon: '总服务工单数@2x',
            name: '总服务工单数',
            sum: 0,
            unit: '单'
          }
        ]
      },
      populationMessage: {
        data: [],
        codeList: []
      }
    }
  },
  computed: {
    ...mapGetters(['type', 'code', 'baseInfo']),
    params () {
      let params = {}
      const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
      params[typeCodes[this.type - 1]] = this.code[0]
      return params
    }
  },
  created () {
    this.$store.dispatch('getUserAuthInfo')
    this.$store.dispatch('getPersonInfo', this.params)

    getBaseServiceOrderCountInfo(this.params).then(res => {
      this.serviceOrder.list[0].sum = res.data.oldPersonTotal
      this.serviceOrder.list[1].sum = res.data.ordeCardTotal
    })
    getOldBasePersonInfo(this.params).then(res => {
      this.populationInfo.list[0].sum = res.data.returnBaseTotalmap.isLiveAlonelTotal
      this.populationInfo.list[1].sum = res.data.returnBaseTotalmap.isAloneTotal// 4
      this.olderNumber.list[0].sum = res.data.returnBaseTotalmap.sixtyOldTotal // 1
      this.olderNumber.list[1].sum = res.data.returnBaseTotalmap.disabilityTotal // 5
      this.olderNumber.list[2].sum = res.data.returnBaseTotalmap.disabledTotal
      this.medicalInformation.list[0].sum = res.data.returnBaseTotalmap.haveHealthRecordsTotal
      this.medicalInformation.list[1].sum = res.data.returnBaseTotalmap.totalMedical
      this.medicalInformation.list[2].sum = res.data.returnBaseTotalmap.signHomeoctorTotal
      this.subsidyPaymen.list[0].sum = res.data.returnBaseTotalmap.allowanceTotal
      this.serviceConfiguration.list[0].sum = res.data.returnBaseTotalmap.pensionInstitutionsTotal
      this.serviceConfiguration.list[1].sum = res.data.returnBaseTotalmap.dayCareTotal
    })
    // 1 sixtyOldTotal 常住老年人
    // 2 eightUnderTotal 高龄(80岁以上)
    // 3 lowIncome 低收入(3000元及以下)
    // 4 isAloneTotal 独居老人
    // 5 disabilityTotal 失能老人
    // 6 currentBirthdayTotal 今日生日
  },
  watch: {
    type () {
      getBaseServiceOrderCountInfo(this.params).then(
        res => {
          this.serviceOrder.list[0].sum = res.data.oldPersonTotal
          this.serviceOrder.list[1].sum = res.data.ordeCardTotal
        }
      )
    }
  },
  components: {
    PageHeader,
    BreadCrumb,
    PopulMessage,
    ServiceOrderMessage,
    ServiceOrganization,
    AgesixtyMessage,
    placeMessage,
    HealthMessage,
    topTitle
  }
}
</script>

<style lang="less" scoped>
.dis_wrapper {
  width: 100%;
  min-height: 100%;
  font-size: initial;
  user-select: none;
  background-image: url("~@/views/ProvideAged/assets/provide-aged-page_bg.png");

}
.dis-content_container{
  margin: 0 1.58%;
}
.dis-content-main {
  display: flex;
  flex-wrap: wrap;
  .left-panel,
  .content-panel,
  .right-panel {
    flex:1;
    width: 31.78%;
    height: 9.2rem;
  }
  .content-panel{
    margin: 0 1.5%;
    display: flex;
    flex-direction: column;
  }
  .left-panel{
    background-image: url("~@/views/Distribution/assets/left-panel_bg.png");
    background-size: 100% 100%;
  }
  .right-panel{
    display: flex;
    flex-direction: column;
  }
}

.panel-item{
  flex:1;
  background-image: url("~@/views/Distribution/assets/panel-item_bg.png");
  background-size: 100% 100%;
}
.panel-item:nth-child(1){
  margin-bottom:30px;
}
.AgesixtyBox{margin-top:0.55rem}
</style>
