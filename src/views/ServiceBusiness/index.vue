<template>
  <list-layout
    :crumbData="[{ title: '服务商家', url: '' }]"
    :columns="columns"
    :tableData="tableData"
    :total="total"
    :pageSize="pageSize"
    :currentPage="currentPage"
    v-on:getSearchValue="handleGetSearchValue"
    :unit="unit"
  >
    <el-form :inline="true" :model="formData" ref="paramForm">
      <el-form-item label="商家名称" class="search_select">
        <el-input v-model="formData.businessName" placeholder="请输入商家名称" class="head_left" clearable/>
      </el-form-item>
      <el-form-item label="商家性质" class="search_select">
        <el-select v-model="formData.bussinessType" clearable placeholder="请选择商家性质">
          <el-option
            v-for="option in bussinessTypeOptions"
            :key="option.label"
            :label="option.label"
            :value="option.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工商执照" class="search_select">
        <el-input v-model="formData.license" placeholder="请输入工商执照" class="head_left" clearable/>
      </el-form-item>
      <el-form-item label="主要负责人" class="search_select">
        <el-input v-model="formData.personInCharge" placeholder="请输入主要负责人" class="head_left" clearable/>
      </el-form-item>
    </el-form>
    <div class="btns_box">
      <div class="btns_right">
        <el-button @click="handleResetForm" class="btn">重置</el-button>
        <el-button class="btn" icon="el-icon-search"
          :loading="isSearchLoading"
          @click="handleGetSearchValue"
        >查询</el-button>
        <a :href="downloadExcel">
          <el-button class="btn">导出</el-button>
        </a>
      </div>
    </div>
  </list-layout>
</template>

<script>
import { getBusinessInfoPage } from '../ProvideAged/apis/index.js'
import ListLayout from './components/layout.vue'

const initForm = () => ({
  businessName: '',
  bussinessType: '',
  license: '',
  personInCharge: ''
})

export default {
  name: 'ServiceBusiness',
  components: {
    ListLayout
  },
  data () {
    return {
      isSearchLoading: false,
      formData: initForm(),
      bussinessTypeOptions: [
        { label: '个体', value: '个体' },
        { label: '股份合作制企业', value: '股份合作制企业' },
        { label: '股份有限公司', value: '股份有限公司' },
        { label: '国有企业', value: '国有企业' },
        { label: '集体企业', value: '集体企业' },
        { label: '社会团体', value: '社会团体' },
        { label: '私营企业', value: '私营企业' },
        { label: '外资公司', value: '外资公司' },
        { label: '有限责任公司', value: '有限责任公司' },
        { label: '中外合资公司', value: '中外合资公司' },
        { label: '中外合作公司', value: '中外合作公司' }
      ],
      columns: [
        { label: '商家名称', prop: 'merchantName' },
        { label: '商家性质', prop: 'merchantNatrue' },
        { label: '工商执照', prop: 'businessLicebse' },
        { label: '主要负责人', prop: 'mainPerson' },
        { label: '负责人联系方式', prop: 'mainPhone' },
        { label: '服务项目', prop: 'serviceItems' },
        { label: '服务区域', prop: 'serviceRegion' },
        { label: '服务开始时间', prop: 'serviceStartTime' },
        { label: '服务结束时间', prop: 'serviceEndTime' },
        { label: '周末是否服务', prop: 'isWeekservice' },
        { label: '假期是否服务', prop: 'isVacationservice' }
      ],
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      unit: '家'
    }
  },
  computed: {
    downloadExcel () {
      const Api = process.env.NODE_ENV === 'development' ? 'http://tianjin.aioc.dev.xjoycity.com:8204' : ''
      let data = `${Api}/yanglao-api/baseBusinessInfo/downloadExcel?`
      let keys = Object.keys(this.formData)
      keys.forEach((item, index) => {
        data += `${item}=${this.formData[item]}&`
      })
      return data.slice(0, -1)
    }
  },
  created () {
    this.$store.commit('setActiveName', '服务商家')
    this.$store.dispatch('getUserAuthInfo').then(() => {
      this.handleGetSearchValue()
    }).catch((err) => {
      console.log('获取用户权限失败', err)
    })
  },
  methods: {
    handleResetForm () {
      this.formData = initForm()
    },
    handleGetSearchValue (page) {
      const params = Object.assign({}, this.formData, {
        page: typeof page === 'number' ? page : 1,
        pageSize: this.pageSize
      })
      this.isSearchLoading = true
      getBusinessInfoPage(params).then(res => {
        this.isSearchLoading = false
        const { records, total, size, current } = res && res.obj
        this.tableData = records
        this.pageSize = size
        this.currentPage = current
        this.total = total
      }).catch(() => {
        this.isSearchLoading = false
      })
    }
  }
}
</script>
