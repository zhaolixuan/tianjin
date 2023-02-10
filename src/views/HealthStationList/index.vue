<template>
  <list-layout
    :crumbData="[{ title: this.$route.query.label, url: '' }]"
    :columns="columns"
    :tableData="tableData"
    :total="total"
    :pageSize="pageSize"
    :currentPage="currentPage"
    backPath="MedicalPage"
    v-on:getSearchValue="handleGetSearchValue"
    unit="个"
    title="助医服务大数据统计分析————健康驿站"
    header="助医服务大数据统计分析"
  >
    <el-form :inline="true" :model="formData">
      <!-- <el-form-item label="居家养老服务中心" class="search_select">
        <el-input
        class="head_left"
        placeholder="请输入居家养老服务中心"
        v-model.trim="formData.serviceCenter"
        clearable
        >
        </el-input>
      </el-form-item> -->
      <el-form-item label="健康驿站" class="search_select" label-width="1.85rem">
        <el-select v-model="formData.healthStation" clearable placeholder="请选择健康驿站">
          <el-option
            v-for="(option,index) in  postData"
            :key="index"
            :label="option.healthStation"
            :value="option.healthStation"
            @change="handleServiceClass">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="驿站类型" class="search_select" label-width="1.85rem">
        <el-select v-model="formData.stationType" clearable placeholder="请选择驿站类型">
          <el-option label="健康驿站" value="1"></el-option>
          <el-option label="依托社区站" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="负责人" class="search_select">
        <el-input
        class="head_left"
        placeholder="请输入负责人"
        v-model.trim="formData.principal"
        clearable
        >
        </el-input>
      </el-form-item>
            <el-form-item label="联系电话" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入联系电话"
          v-model.trim="formData.phone"
          @keyup.enter.native="handleGetSearchValue"
          clearable
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div class="btns_box">
      <div class="btns_right">
        <el-button @click="clearSearchValue" class="btn">重置</el-button>
        <el-button class="btn" icon="el-icon-search"
          :loading="isSearchLoading"
          @click="handleGetSearchValue"
        >查询</el-button>
      </div>
    </div>
 </list-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '@/api/api.js'
import ListLayout from '@/components/TablerList/layout.vue'

export default {
  data () {
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {
          scrollingX: false
        },
        bar: {
          background: '#eee'
        }
      },
      isSearchLoading: false,
      columns: [
        { label: '序号', prop: 'index' },
        // { label: '居家养老服务中心', prop: 'serviceCenter' },
        { label: '健康驿站', prop: 'healthStation' },
        { label: '驿站类型', prop: 'stationTypes', value: 'stationType' },
        { label: '地址', prop: 'site' },
        { label: '服务区域', prop: 'communityName' },
        { label: '负责人', prop: 'principal' },
        { label: '联系电话', prop: 'phone' }
      ],
      tableData: [],
      postData: [ ],
      fullscreen: true,
      index: 1,
      locationProps: {
        value: 'code',
        label: 'name',
        children: 'childs'
      },
      pageSize: 12, // 每页数量
      currentPage: 1, // 当前页数
      total: 0, // 总条数
      ServicesTime: [],
      payTime: [],
      formData: {
        healthStation: '',
        serviceCenter: '',
        principal: '',
        stationType: this.$route.query.stationType || '',
        phone: ''
      },
      params: {}
    }
  },
  computed: {
    ...mapGetters(['userType', 'code']),
    userAuthCodeParams () {
      let params = {
        streetCode: '',
        zoneCode: '',
        communityCode: ''
      }
      let urlCodeParams = {}
      if (this.userType === 1) {
        urlCodeParams = { zoneCode: this.initCodeFromQuery(1), streetCode: this.initCodeFromQuery(2), communityCode: this.initCodeFromQuery(3) }
      }
      if (this.userType === 2) {
        urlCodeParams = { zoneCode: this.initCodeFromQuery(1) }
      }
      if (this.userType === 3) {
        urlCodeParams = { streetCode: this.initCodeFromQuery(2) }
      }
      if (this.userType === 4) {
        urlCodeParams = { communityCode: this.initCodeFromQuery(3) }
      }

      return Object.assign({}, params, urlCodeParams)
    }
  },
  created () {
    this.$store.dispatch('getUserAuthInfo').then(() => {
      this.handleGetSearchValue()
    }).catch((err) => {
      console.log('获取用户权限失败', err)
    })
    let form = {
      page: 1,
      pageSize: 30
    }
    api.gethealthStation(form).then(res => {
      const { records } = res && res.obj
      this.postData = records
    })
  },
  methods: {
    initCodeFromQuery (codeIndex) {
      return this.$route.query.code && typeof this.$route.query.code !== 'string'
        ? this.$route.query.code[codeIndex] || '' : ''
    },
    requestParams (page) {
      var params = {}
      const codeParams = this.userAuthCodeParams
      params = Object.assign({}, this.formData, {
        page: typeof page === 'number' ? page : 1,
        pageSize: this.pageSize
      }, codeParams)
      return params
    },
    handleGetSearchValue (page) {
      this.isSearchLoading = true
      api.gethealthStation(this.requestParams(page)).then(res => {
        this.isSearchLoading = false
        const { records, total, size, current } = res && res.obj
        this.tableData = records
        this.pageSize = size
        this.currentPage = current
        this.total = total
      }).catch(() => {
        this.isSearchLoading = false
      })
    },
    handleServiceClass () {
      this.currentPage = 1
    },
    clearSearchValue () {
      this.formData = Object.assign({}, this.formData, {
        healthStation: '',
        serviceCenter: '',
        principal: '',
        stationType: '',
        phone: ''
      })
    }
  },
  components: {
    ListLayout
  }
}
</script>
<style scoped>
.el-form-item{
  width: 4.1rem !important;
}
</style>
