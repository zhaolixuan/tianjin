<template>
  <list-layout
    :crumbData="[{ title: this.$route.query.label, url: '' }]"
    :columns="columns"
    :tableData="tableData"
    :total="total"
    unit="个"
    :pageSize="pageSize"
    :currentPage="currentPage"
    v-on:getSearchValue="handleGetSearchValue"
    :backPath="path"
    :title="title + '————服务商'"
    :code="code"
  >
    <el-form :inline="true" :model="formData">
      <el-form-item label="服务商名称" class="search_select">
        <el-input
        class="head_left"
        placeholder="请输入服务商名称"
        v-model.trim="formData.companyName"
        clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="地址" class="search_select">
        <el-input
        class="head_left"
        placeholder="请输入地址"
        v-model.trim="formData.address"
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
        <!-- <a :href="downloadExcel" target="_blank">
          <el-button class="btn" >导出</el-button>
        </a> -->
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
        { label: '序号', prop: 'index', width: '150' },
        { label: '服务商名称', prop: 'companyName' },
        // { label: '商家性质', prop: 'nature' },
        // { label: '工商执照号码', prop: 'cCode' },
        { label: '地址', prop: 'address' },
        // { label: '主要负责人', prop: 'principal' },
        // { label: '联系方式', prop: 'principalTelno' },
        { label: '下属服务载体数量', prop: 'canteenNumtotal', width: 150 },
        { label: '下属服务站', prop: 'servicePointNum', width: 150 }
        // { label: '订单量', prop: 'orderTotal' }
      ],
      tableData: [],
      serviceOrderItemlist: ['普通老年人', '享受补贴老年人'],
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
      path: '',
      title: '',
      formData: {
        companyName: '',
        address: ''
      },
      params: {},
      // 11月25新增
      code: '',
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
    // this.$store.commit('setActiveName', this.$route.query.label)
    this.$store.dispatch('getUserAuthInfo').then(() => {
      this.handleGetSearchValue()
    }).catch((err) => {
      console.log('获取用户权限失败', err)
    })
    switch (this.$route.query.key) {
      case '1':
        this.path = 'FiveService'
        this.title = '五大服务大数据统计分析'
        break
      case '3':
        this.path = 'HomeDistribution'
        this.title = '居家养老服务载体分布'
        break
      default:
        this.path = 'buffetPage'
        this.title = '助餐服务监管大数据统计分析'
        break
    }
    // 11月25新增
    this.code = this.$route.query.code;
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
      api.getCompanyOtherPageListSecond(this.requestParams(page)).then(res => {
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
        companyName: '',
        CCode: '',
        address: '',
        zoneCode: '',
        streetCode: '',
        communityCode: ''
      })
      this.searchService = ''
      this.selectedLocation = []
      this.time = null
    }
  },

  components: {
    ListLayout
  }
}
</script>

<style lang="less" scoped>
// 
</style>
