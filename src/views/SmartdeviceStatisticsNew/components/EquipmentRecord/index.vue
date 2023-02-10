<template>
  <div class="older-content">
    <norm-layout :tab_item="tabData"  v-on:getActiveIndex="handleGetActiveIndex"  :flag="false" :routerPath="path"></norm-layout>
    <list-layout
      :columns="columns"
      :tableData="tableData"
      :pageSize="pageSize"
      :currentPage="currentPage"
    ></list-layout>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ListLayout from '@/components/TablerList/smallLayout.vue'
import api from '@/api/api.js'
import { mapGetters } from 'vuex'
export default {
  name: 'InstallDevice',
  data () {
    return {
      tabData: ['一键通预警记录', '门磁设备预警记录'],
      columns: [
        { label: '姓名', prop: 'name' },
        { label: '预警时间', prop: 'alarmTime' },
        { label: '类型', prop: 'eventType' }
      ],
      pageSize: 5,
      currentPage: 1,
      pageIndex: 0,
      tableData: [],
      checkIndex: 0,
      timer: '',
      total: 0,
      form: {
        pageSize: 5,
        currentPage: 1
      }
    }
  },
  props: {
    argument: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    ...mapGetters(['typeNew', 'codeNew', 'breadCrumbCodes']),
    params () {
      let params = {}
      const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0]

      return params
    },
    path () {
      let url = {
        path: this.checkIndex === 0 ? 'WarningRecordList' : 'warningGateList',
        query: { code: this.breadCrumbCodes, title: '智能设备监测大数据统计分析' }
      }
      return url
    }
  },
  created () {
    this.handleGetSearchValue()
    this.$store
      .dispatch('getUserAuthInfo')
      .then(() => {
        this.handleGetSearchValue()
      })
      .catch(err => {
        console.log('获取用户权限失败', err)
      })
    this.timer = setInterval(() => {
      this.form.currentPage === this.total / this.form.pageSize
        ? (this.form.currentPage = 1)
        : (this.form.currentPage += 1)
      this.handleGetSearchValue()
    }, 20000)
  },
  methods: {
    handleGetActiveIndex (key) {
      this.checkIndex = key
      this.handleGetSearchValue()
      this.tableData = []
    },
    handleGetSearchValue () {
      let form = Object.assign({}, this.params, {
        merchantorderFlag: '1',
        pageSize: this.form.pageSize,
        page: this.form.currentPage
      })
      this.checkIndex === 0
        ? this.columns = [
          { label: '姓名', prop: 'name' },
          { label: '预警时间', prop: 'alarmTime' },
          { label: '类型', prop: 'eventType' }
        ]
        : this.columns = [
          { label: '姓名', prop: 'userName' },
          { label: '预警时间', prop: 'alarmTime' },
          { label: '类型', prop: 'disposeState' }
        ]
      this.checkIndex === 0
        ? api.getminfoPageList(form).then(res => {
          const { records, total } = res && res.obj
          if ((this.pageIndex += this.form.pageSize) >= total) {
            this.form.currentPage = 1
            this.pageIndex = 0
          }
          this.total = total
          this.tableData = records
        })
        : api.getAlarmInfoPageList(this.form).then(res => {
          const { records, total } = res && res.obj
          if ((this.pageIndex += this.form.pageSize) >= total) {
            this.form.currentPage = 1
            this.pageIndex = 0
          }
          this.total = total
          this.tableData = records
        })
    }
  },
  destroyed () {
    clearInterval(this.timer)
  },
  components: {
    NormLayout,
    ListLayout
  }
}
</script>

<style lang="less" scoped>
.older-content {
  height: 4.3rem;
}
</style>
