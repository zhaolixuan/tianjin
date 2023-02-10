<template>
  <list-layout
    :crumbData="[{ title: this.$route.query.label, url: '' }]"
    :columns="columns"
    :tableData="tableData"
    :total="total"
    :pageSize="pageSize"
    :currentPage="currentPage"
    unit="个"
    backPath="MedicalPage"
    v-on:getSearchValue="handleGetSearchValue"
    title="助医服务大数据统计分析————保险赔付情况"
  >
    <el-form :inline="true" :model="formData">
      <el-form-item label="姓名" class="search_select">
        <el-input class="head_left" placeholder="请输入姓名" v-model.trim="formData.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="年龄段" class="search_select">
        <el-input
          class="input_num"
          placeholder="起始年龄"
          v-model="formData.beginAge"
          @change="handleGetSearchValue"
        />
        <span>-</span>
        <el-input
          class="input_num"
          placeholder="截止年龄"
          v-model="formData.endAge"
          @change="handleGetSearchValue"
        />
      </el-form-item>
      <el-form-item label="报案时间" class="search_select">
        <el-date-picker v-model="formData.reportTime" type="date" clearable placeholder="选择日期"></el-date-picker>
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
        >查询</el-button>
        <!-- <a :href="downloadExcel" target="_blank">
          <el-button class="btn" >导出</el-button>
        </a>-->
      </div>
    </div>
    <Menu></Menu>
  </list-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '@/api/api.js'
import ListLayout from '@/components/TablerList/layout.vue'
import Menu from '@/views/OlderDistribution/components/Menu';

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
        { label: '序号', prop: 'index', width: '150' },
        { label: '被保险人', prop: 'name' },
        { label: '身份证号', prop: 'idcardNumber' },
        { label: '事故时间', prop: 'accidentTime' },
        { label: '报案时间', prop: 'reportTime' },
        // { label: '意外伤害身故', prop: 'accidentalInjuryDeath' },
        // { label: '意外伤害赔付', prop: 'accidentalInjuryPayment' },
        { label: '联系电话', prop: 'remark' },
        { label: '是否赔付完毕', prop: 'isCompensate' },
        { label: '预估金额', prop: 'estimatedAmount' },
        { label: '已赔付金额', prop: 'compensationAmount' },
        { label: '赔付日期', prop: 'compensationTime' },
        { label: '操作', prop: 'InsuranceClaims' }
      ],
      tableData: [],
      fullscreen: true,
      index: 1,
      locationProps: {
        value: 'code',
        label: 'name',
        children: 'childs'
      },
      pageSize: 10, // 每页数量
      currentPage: 1, // 当前页数
      total: 0, // 总条数
      formData: {
        name: '',
        beginAge: '',
        endAge: '',
        reportTime: ''
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
        urlCodeParams = {
          zoneCode: this.initCodeFromQuery(1),
          streetCode: this.initCodeFromQuery(2),
          communityCode: this.initCodeFromQuery(3)
        }
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
    this.$store
      .dispatch('getUserAuthInfo')
      .then(() => {
        this.handleGetSearchValue()
      })
      .catch((err) => {
        console.log('获取用户权限失败', err)
      })
  },
  methods: {
    initCodeFromQuery (codeIndex) {
      return this.$route.query.code &&
        typeof this.$route.query.code !== 'string'
        ? this.$route.query.code[codeIndex] || ''
        : ''
    },
    requestParams (page) {
      var params = {}
      const codeParams = this.userAuthCodeParams
      params = Object.assign(
        {},
        this.formData,
        {
          page: typeof page === 'number' ? page : 1,
          pageSize: this.pageSize
        },
        codeParams
      )

      return params
    },
    handleGetSearchValue (page) {
      this.isSearchLoading = true
      api
        .getPaymentPageList(this.requestParams(page))
        .then((res) => {
          this.isSearchLoading = false
          const { records, total, size, current } = res && res.obj
          this.tableData = records
          this.pageSize = size
          this.currentPage = current
          this.total = total
        })
        .catch(() => {
          this.isSearchLoading = false
        })
    },
    handleServiceClass () {
      this.currentPage = 1
    },
    clearSearchValue () {
      this.formData = Object.assign({}, this.formData, {
        name: '',
        beginAge: '',
        endAge: '',
        reportTime: ''
      })
    }
  },
  components: {
    ListLayout,
    Menu
  }
}
</script>
<style >
</style>
