<template>
  <div class="older-page_bg">
    <page-header title="五大服务大数据统计分析"></page-header>
    <div class="older-container">
      <div class="bread">
        <norm-layout
          :text="text + '——服务载体经营情况'"
          :path="this.$route.query.key ? 'ServiceCarrierAnalysis' : 'FiveService'"
          :flag="false"
        ></norm-layout>
      </div>
      <div class="from_header">
        <el-form>
          <el-form-item label="服务商" class="search_select">
            <el-select
              v-model.trim="comList"
              multiple
              clearable
              collapse-tags
              filterable
              :disabled="companyList.length === 1"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in companyList"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务载体级别" class="search_select">
            <el-select
              v-model.trim="serviceLevel"
              multiple
              clearable
              placeholder="请选择"
            >
              <el-option label="街级" value="街级"></el-option>
              <el-option label="社区级" value="社区级"></el-option>
              <el-option label="服务站" value="服务站"></el-option>
            </el-select>
          </el-form-item>
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
            >查询</el-button
          >
        </el-form>
        <a v-if="this.roleid != '29'" :href="path" target="_blank">
          <div class="bottom_link">服务载体信息</div>
        </a>
      </div>
      <div class="main">
        <order-statistical-bar
          :serviceData="serviceData"
          :Dtype="type"
        ></order-statistical-bar>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import PageHeader from '@/views/OlderDistribution/components/PageHeader/header'
import BreadCrumb from '@/views/OlderDistribution/components/BreadCrumb'
import OrderStatisticalBar from './index_chart.vue'
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import { mapGetters } from 'vuex'
import Menu from '@/views/OlderDistribution/components/Menu'
import api from '@/api/api'

export default {
  name: 'ServiceCarrierOperation',
  data () {
    return {
      ServiceTime: [
        this.$route.query.start ? this.$route.query.start : '',
        this.$route.query.end ? this.$route.query.end : ''
      ],
      merchantName: '',
      serviceLevel: '',
      isSearchLoading: false,
      comList: [],
      text: '',
      userName: '',
      form: {
        companyName: [],
        beginDay: '',
        endDay: '',
        serviceFlag: 1,
        canteenLevel: ''
      },
      roleid: '',
      companyList: [],
      serviceData: {
        xData: [],
        zValue: [],
        rValue: []
      },
      type: '',
      roleid:null

    }
  },
  computed: {
    ...mapGetters(['typeNew', 'codeNew', 'breadCrumbCodes', 'useName']),
    params () {
      let params = {}
      const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0]

      return params
    },
    path () {
      let path = `/#/ServiceCarrier?code=${this.breadCrumbCodes}&key=3`
      return path
    }
  },
  created () {
     this.roleid =  window.localStorage.getItem('roleid')
    this.type = this.$route.query.type;
    this.roleid = window.localStorage.getItem('roleid')
    this.text = this.$route.query.key ? '服务载体运营大数据统计分析' : '五大服务大数据统计分析'
    if (
      this.$route.query.code ||
      (this.$route.query.code && this.$route.query.code.length > 0)
    ) {
      this.initCodeFromUrlQuery()
    } else {
      this.initChartInfo()
    }
    this.getOtherPageList(this.useName, this.roleid)
  },
  watch: {
    codeNew () {
      this.getMerchantServerOrderInfo()
    },
    useName (val) {
      this.getOtherPageList(this.useName, this.roleid)
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
    handleGetSearchValue () {
      this.getMerchantServerOrderInfo()
    },
    getOtherPageList (userName, roleid) {
      this.companyList = []
      api.getOtherPageList({ page: 1, pageSize: 12, companyName: userName, roleId: roleid }).then((res) => {
        if (res.obj) {
          res.obj.records.map((item) => this.companyList.push(item.companyName))
          this.comList = this.companyList.length > 1 ? [] : Array(this.companyList[0])
          this.getMerchantServerOrderInfo()
        }
      })
    },
    getMerchantServerOrderInfo () {
      this.form.companyName =
        this.comList.length > 0 ? this.comList.join(',') : ''
      this.isSearchLoading = true
      this.form.beginDay = this.ServiceTime ? this.ServiceTime[0] : ''
      this.form.endDay = this.ServiceTime ? this.ServiceTime[1] : ''
      this.form.canteenLevel = this.serviceLevel.join(',')
      let form = Object.assign({}, this.form, this.params)
      if(this.type == 'amount') { // money 是金额
        delete form.serviceFlag;
        form.amountFlag = 1;
      }
      api.getMerchantServerOrderInfo(form).then((res) => {
        if (res.data) {
          this.isSearchLoading = false
          let { merchantServerTotalMap } = res.data
          this.serviceData.xData = []
          merchantServerTotalMap.map((item, index) =>
            item.merchantName
              ? item.merchantName
              : merchantServerTotalMap.splice(index, 1)
          )
          merchantServerTotalMap.map((item) => {
            if (String(item.merchantName).indexOf('居家养老服务中心') !== -1) {
              item.name = String(item.merchantName).replace(
                '居家养老服务中心',
                ''
              )
            } else if (
              String(item.merchantName).indexOf('居家养老服务点') !== -1
            ) {
              item.name = String(item.merchantName).replace(
                '居家养老服务点',
                ''
              )
            } else {
              item.name = String(item.merchantName).replace('社区服务点', '')
            }
            this.serviceData.xData.push(item.name)
          })
          this.serviceData.zValue = merchantServerTotalMap.map(
            (item) => item.orderAllCardMonthTotal
          )
          this.serviceData.rValue = merchantServerTotalMap.map(
            (item) => item.consumerAllMoney
          )
        }
      })
    }
  },
  components: {
    PageHeader,
    BreadCrumb,
    OrderStatisticalBar,
    NormLayout,
    Menu
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
  height: 100%;
  margin: 0 1.58%;
  display: flex;
  flex-direction: column;
  .from_header {
    width: 100%;
    height: 1rem;
    padding-top: 0.3rem;
    box-sizing: border-box;
    .service_content {
      height: 100%;
      float: right;
      font-size: 0.2rem;
      color: #56a4f7;
      font-weight: bold;
      span {
        margin-right: 1rem;
      }
    }
    .bottom_link {
      float: right;
      width: 3.5rem;
      height: 0.5rem;
      background: url("~@/views/ProvideSubsidy/assets/older_tab.png") no-repeat;
      background-size: 100% 100%;
      color: #16fff1;
      font-size: 0.14rem;
      text-align: center;
      line-height: 0.5rem;
      margin-right: 1.5rem;
    }
  }
  .btn {
    margin-left: 0.2rem;
  }
  .main {
    flex: 1;
  }
  .bread {
    position: fixed;
    top: 7%;
    left: 2%;
  }
}
.from_header {
  /deep/ .search_select .el-form-item__label {
    font-size: 0.2rem;
    color: #a6c5fd;
    width: 1.35rem;
    float: left;
  }
  /deep/ .el-form {
    width: 15rem;
    display: flex;
    float: left;
  }
  /deep/ .el-form-item {
    width: 33%;
  }
  /deep/ .el-select {
    min-width: 2.5rem;
    max-width: 4rem;
  }
  /deep/ .el-select__tags-text {
    max-width: 1rem;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
  }
  /deep/ .el-input__inner {
    font-size: 0.16rem;
    background-color: transparent;
    border: 0;
    border: 0.01rem solid #043a6f;
    color: #56a4f7;
    max-width: 3rem;
  }
  /deep/ .el-input__inner::-webkit-input-placeholder {
    color: #436fd2;
  }
  /deep/ .btn {
    /* padding:0.15rem 0.5rem; */
    width: 1.3rem;
    height: 0.4rem;
    /* line-height: .4rem; */
    background: url("~@/assets/img/oldMan_tab.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    border: 0;
    color: #4fd0ff;
    margin-right: 0.1rem;
    /* margin-top: 2rem; */
    float: right;
    font-size: 0.14rem;
  }
  /deep/ .el-input.is-disabled .el-input__inner{
  background: transparent;
  border-color: #043a6f;
  color: #7c7d80;
}
  /deep/ .el-input__inner:hover,
  /deep/ .el-select:hover .el-input__inner,
  /deep/ .el-cascader .el-input:hover .el-input__inner {
    border-color: #043a6f;
  }
  /deep/ .btn:focus,
  /deep/ .btn:hover {
    color: #16fff1;
    background: url("~@/assets/img/oldMan_tab.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>
<style>
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
  .el-select-dropdown__item.hover,
  .el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover {
    background-color: #0148cb;
    color: #8fc0f3;
  }
  .el-tag.el-tag--info {
    background-color: #0e3a8d;
    border: 0;
    color: #8fc0f3;
  }
  .el-tag.el-tag--info .el-tag__close {
    background-color: #3b6fd1;
    color: #8fc0f3;
  }
  .el-tag.el-tag--info .el-tag__close:hover {
    background-color: #3b6fd1;
    color: #8fc0f3;
  }
  .el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
    background-color: #032995;
    color: #409eff;
    font-weight: 700;
  }
</style>
