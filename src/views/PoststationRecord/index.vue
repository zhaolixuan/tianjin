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
    :title="$route.query.title + '———健康驿站服务记录统计表'"
    header="助医运营监管大数据统计分析"
  >
    <el-form :inline="true" :model="formData">
      <el-form-item label="服务时间" class="search_select" label-width="1.85rem">
        <el-date-picker
          v-model="ServicesTime"
          type="daterange"
          range-separator="-"
          clearable
          start-placeholder="开始时间"
          end-placeholder="结束时间">
      </el-date-picker>
      </el-form-item>
    </el-form>
    <div class="btns_box">
      <div class="btns_right">
        <a :href="downloadExcel" target="_blank">
                <el-button class="btn">导出</el-button>
              </a>
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
import { formatTime } from '@/utils/utils'
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
        { label: '驿站名称', prop: 'healthStation' },
        { label: '服务次数', prop: 'serviceTotal' },
        { label: '血压测量', prop: 'totalx' },
        { label: '血糖测量', prop: 'totalt' },
        { label: '用药指导', prop: 'totaly' },
        { label: '健康宣教', prop: 'totalj' },
        { label: '社区康复管理', prop: 'totals' },
        { label: '服务项目次数', prop: 'total' }
      ],
      tableData: [],
      pageSize: 10, // 每页数量
      currentPage: 1, // 当前页数
      total: 0, // 总条数
      formData: {
        endTime: '',
        beginTime: ''
      },
      ServicesTime: [new Date(new Date() - 1000 * 60 * 60 * 24 * 7), new Date()]
    }
  },
  computed: {
    ...mapGetters(['typeNew', 'codeNew']),
    params () {
      let params = {}
      const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0]

      return params
    },
    downloadExcel () {
      const Api =
      // 'http://tianjin.aioc.dev.xjoycity.com:8204'
        process.env.NODE_ENV === 'development'
          ? 'http://tj-yanglao-test.xjoycity.com'
          : ''
      let data = `${Api}/yanglao-api/healthStationInfo/downloadExcel?`

      let formData = Object.assign({}, this.formData, this.params)
      let keys = Object.keys(formData)

      keys.forEach((item, index) => {
        data += formData[item] ? `${item}=${formData[item]}&` : ''
      })
      return data.slice(0, -1)
    }
  },
  created () {
    this.$store.dispatch('getUserAuthInfo').then(() => {
      this.handleGetSearchValue()
    }).catch((err) => {
      console.log('获取用户权限失败', err)
    })
    this.formData.beginTime = formatTime(this.ServicesTime[0])
    this.formData.endTime = formatTime(this.ServicesTime[1])
  },
  methods: {
    handleGetSearchValue (page) {
      this.formData.beginTime = formatTime(this.ServicesTime[0])
      this.formData.endTime = formatTime(this.ServicesTime[1])
      this.isSearchLoading = true
      api.getHealthServiceRecord(this.formData).then(res => {
        this.isSearchLoading = false
        const { healthServiceRecordMap, allHealthServiceRecordMap } = res && res.data
        allHealthServiceRecordMap[0].healthStation = '总计'
        healthServiceRecordMap.push(...allHealthServiceRecordMap)
        this.tableData = healthServiceRecordMap
      }).catch(() => {
        this.isSearchLoading = false
      })
    },
    handleServiceClass () {
      this.currentPage = 1
    },
    clearSearchValue () {
      this.formData = Object.assign({}, this.formData, {
        endTime: '',
        beginTime: ''
      })
      this.ServicesTime = ''
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
