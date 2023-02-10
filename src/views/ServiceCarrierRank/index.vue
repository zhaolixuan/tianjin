<template>
  <list-layout
    :columns="columns"
    :tableData="tableData"
    :pageSize="pageSize"
    header="服务载体服务情况排名表"
    :currentPage="currentPage"
    backPath="FiveService"
    title="五大服务类别数据综合分析————服务载体服务情况排名表"
    :objectSpanMethod="objectSpanMethod"
  >
    <el-form :inline="true" :model="formData">
      <el-form-item label="起始时间：" class="search_select search_time">
        <el-date-picker
          v-model="formData.beginDay"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="开始日期"
        >
        </el-date-picker>
        <el-date-picker
          v-model="formData.endDay"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="截止日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="服务载体级别" class="search_select">
        <el-select
          v-model="serviceLevel"
          multiple
          clearable
          placeholder="请选择载体级别"
        >
          <el-option label="街级" value="街级"></el-option>
          <el-option label="社区级" value="社区级"></el-option>
          <el-option label="服务站" value="服务站"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务商" class="search_select">
        <el-select
          v-model="formData.companyName"
          clearable
          :disabled="companyList.length === 1"
          placeholder="请选择服务商"
        >
          <el-option
            v-for="(option, index) in companyList"
            :key="index"
            :label="option"
            :value="option"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="载体所属街道" class="search_select">
        <el-select
          v-model="formData.streetCode"
          clearable
          placeholder="请选择所属街道"
        >
          <el-option
            v-for="(option, index) in streetData"
            :key="index"
            :label="option.name"
            :value="option.code"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="btns_box">
      <div class="btns_right">
        <el-button @click="clearSearchValue" class="btn">重置</el-button>
        <el-button
          class="btn"
          icon="el-icon-search"
          :loading="isSearchLoading"
          @click="handleGetSearchValue"
          >查询</el-button
        >
        <a :href="downloadExcel" target="_blank">
          <el-button class="btn" >导出</el-button>
        </a>
      </div>
    </div>
    <Menu></Menu>
  </list-layout>
</template>

<script>
import api from '@/api/api.js'
import { mapGetters } from 'vuex'
import ListLayout from '@/components/TablerList/layout.vue'
import Menu from '@/views/OlderDistribution/components/Menu'
import { formatTime } from '@/utils/utils'
export default {
  data () {
    return {
      pageSize: 10, // 每页数量
      currentPage: 1, // 当前页数
      isSearchLoading: false,
      columns: [
        { label: '排名', prop: 'index', width: 60 },
        { label: '载体名称', prop: 'merchantName', width: 200 },
        { label: '载体级别', prop: 'canteenLevel' },
        { label: '服务商名称', prop: 'companyName' },
        { label: '服务老年人数（人）', prop: 'peopleTotal', width: 150 },
        { label: '服务量（客次）', prop: 'serviceTotal' },
        { label: '消费金额（元）', prop: 'amountCollected' },
        {
          label: '服务类别',
          children: [
            { label: '助餐服务量', prop: 'eatTotal' },
            { label: '生活照料类服务量', prop: 'liveTotal' },
            { label: '助医服务类服务量', prop: 'healthTotal' },
            { label: '托养床位类服务量', prop: 'daytimeTotal' },
            { label: '其他服务类服务量', prop: 'otherTotal' }
          ]
        },
        {
          label: '服务方式',
          children: [
            { label: '现场服务量', prop: 'siteTotal' },
            { label: '入户服务量', prop: 'dropTotal' }
          ]
        }
      ],
      streetData: [],
      serviceLevel: '',
      formData: {
        beginDay: new Date(new Date() - 1000 * 60 * 60 * 24 * 28),
        endDay: new Date(),
        companyName: '',
        streetCode: '',
        canteenLevel: ''
      },
      companyList: [],
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['useName']),
    downloadExcel () {
      const Api =
      // 'http://tianjin.aioc.dev.xjoycity.com:8204'
        process.env.NODE_ENV === 'development'
          ? 'http://tj-yanglao-test.xjoycity.com'
          : ''
      let data = `${Api}/yanglao-api/freeOrderInfo/export?`
      let keys = Object.keys(this.formData)

      keys.forEach((item, index) => {
        data += this.formData[item] ? `${item}=${this.formData[item]}&` : ''
      })
      console.log(data.slice(0, -1));
      // http://116.196.89.151//yanglao-api/freeOrderInfo/export
      // ?beginDay=2021-05-26&endDay=2021-06-23
      return data.slice(0, -1)
    }
  },
  watch: {
    useName (val) {
      this.getOtherPageList(this.useName, this.roleid)
    }
  },
  created () {
    this.roleid = window.localStorage.getItem('roleid')
    this.$store
      .dispatch('getUserAuthInfo')
      .then(() => {
        this.getServiceConditionInfo()
      })
      .catch(err => {
        console.log('获取用户权限失败', err)
      })
    api.getStreetInfo().then(res => {
      if (res) {
        this.streetData = res
      }
    })
    this.getOtherPageList(this.useName, this.roleid)
    this.formData.beginDay = formatTime(this.formData.beginDay)
    this.formData.endDay = formatTime(this.formData.endDay)
  },
  methods: {
    getOtherPageList (userName, roleid) {
      this.companyList = []
      api
        .getOtherPageList({
          page: 1,
          pageSize: 12,
          companyName: userName,
          roleId: roleid
        })
        .then(res => {
          if (res.obj) {
            res.obj.records.map(item => this.companyList.push(item.companyName))
            this.formData.companyName =
              this.companyList.length > 1 ? '' : this.companyList[0]
          }
        })
    },
    getServiceConditionInfo () {
      this.isSearchLoading = true
      this.formData.canteenLevel = this.serviceLevel.join(',')
      api.getServiceConditionInfo(this.formData).then(res => {
        if (res && res.data) {
          this.isSearchLoading = false
          let { serviceConditionMap, serviceConditionSumMap } = res.data
          if (serviceConditionSumMap && serviceConditionMap) {
            serviceConditionMap.unshift({
              companyName: '总计',
              peopleTotal: serviceConditionSumMap[0].peopleTotal,
              serviceTotal: serviceConditionSumMap[0].serviceTotal,
              amountCollected: serviceConditionSumMap[0].amountCollected,
              eatTotal: serviceConditionSumMap[0].eatTotal,
              liveTotal: serviceConditionSumMap[0].liveTotal,
              healthTotal: serviceConditionSumMap[0].healthTotal,
              daytimeTotal: serviceConditionSumMap[0].daytimeTotal,
              otherTotal: serviceConditionSumMap[0].otherTotal,
              siteTotal: serviceConditionSumMap[0].siteTotal,
              dropTotal: serviceConditionSumMap[0].dropTotal
            })
          }
          this.tableData = serviceConditionMap || [];
          this.tableData.map((item, index) => {
            item.index = index
          })
        }
      })
    },
    handleGetSearchValue () {
      this.getServiceConditionInfo()
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        const _row = [0, 0, 0, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        const _col = 1
        return {
          rowspan: _col,
          colspan: _row[columnIndex]
        }
      }
    },
    clearSearchValue () {
      this.formData = {
        beginDay: '',
        endDay: '',
        companyName: '',
        canteenLevel: '',
        streetCode: ''
      }
    }
  },
  components: {
    ListLayout,
    Menu
  }
}
</script>
<style scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 1.6rem;
  margin-right: 0.2rem;
}
</style>
