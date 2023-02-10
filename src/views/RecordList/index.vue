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
    unit="次"
    title="助医运营监管大数据统计分析————健康讲座记录"
    header="助医运营监管大数据统计分析"
  >
    <el-form :inline="true" :model="formData">
      <el-form-item label="服务时间" class="search_select">
        <el-date-picker
          v-model="ServicesTime"
          type="daterange"
          range-separator="-"
          clearable
          start-placeholder="开始时间"
          end-placeholder="结束时间">
      </el-date-picker>
      </el-form-item>
      <el-form-item label="讲座主题" class="search_select">
        <el-input
        class="head_left"
        placeholder="请输入讲座主题"
        v-model.trim="formData.lectureTopics"
        clearable
        >
        </el-input>
      </el-form-item>
       <el-form-item label="主讲人" class="search_select">
        <el-input
        class="head_left"
        placeholder="请输入主讲人"
        v-model.trim="formData.keynoteSpeaker"
        clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="健康驿站" class="search_select">
        <el-select v-model="formData.healthStation" clearable placeholder="请选择健康驿站">
          <el-option
            v-for="(option,index) in  postData"
            :key="index"
            :label="option"
            :value="option"
            @change="handleServiceClass">
          </el-option>
        </el-select>
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

let formatTime = (date) => {
  let formatData = ''
  if (date) {
    let month = (date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1))
    let day = (date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
    formatData = date.getFullYear() + '-' + month + '-' + day
  }
  return formatData
}
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
        { label: '健康驿站', prop: 'healthStation' },
        { label: '讲座主题', prop: 'lectureTopics' },
        { label: '主讲人', prop: 'keynoteSpeaker' },
        { label: '服务对象人数', prop: 'serviceObjectNum' },
        { label: '时间', prop: 'timez' }
      ],
      tableData: [],
      fullscreen: true,
      postData: ['柳江里健康驿站', '惠阳里健康驿站', '福建路健康驿站', '浏阳里健康驿站', '爱国里健康驿站'],
      index: 1,
      locationProps: {
        value: 'code',
        label: 'name',
        children: 'childs'
      },
      pageSize: 10, // 每页数量
      currentPage: 1, // 当前页数
      total: 0, // 总条数
      ServicesTime: [],
      payTime: [],
      formData: {
        healthStation: '',
        lectureTopics: '',
        keynoteSpeaker: '',
        endTime: '',
        beginTime: ''
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
    // downloadExcel () {
    //   const Api = process.env.NODE_ENV === 'development' ? 'http://tianjin.aioc.dev.xjoycity.com:8204' : ''
    //   let data = `${Api}/yanglao-api/serviceOrderInfo/downloadExcel?`
    //   const formData = Object.assign({}, this.requestParams(), {
    //     page: '',
    //     pageSize: ''
    //   })
    //   let keys = Object.keys(formData)

    //   keys.forEach((item, index) => {
    //     data += formData[item] ? `${item}=${formData[item]}&` : ''
    //   })
    //   return data.slice(0, -1)
    // }
  },
  created () {
    this.$store.dispatch('getUserAuthInfo').then(() => {
      this.handleGetSearchValue()
    }).catch((err) => {
      console.log('获取用户权限失败', err)
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
      this.formData.beginTime = formatTime(this.ServicesTime[0])
      this.formData.endTime = formatTime(this.ServicesTime[1])
      this.isSearchLoading = true
      api.getTalkRecordPage(this.requestParams(page)).then(res => {
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
        lectureTopics: '',
        keynoteSpeaker: '',
        endTime: '',
        beginTime: ''
      })
      this.searchService = ''
      this.ServicesTime = ''
    }
  },
  components: {
    ListLayout
  }
}
</script>
<style>

</style>
