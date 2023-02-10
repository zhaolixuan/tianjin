<template>
  <div class="older-content">
    <norm-layout text="一键通预警记录"  :flag="false" :routerPath="path"></norm-layout>
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
      columns: [
        { label: '姓名', prop: 'name' },
        { label: '预警时间', prop: 'alarmTime' },
        { label: '类型', prop: 'eventType' }
      ],
      pageSize: 5,
      currentPage: 1,
      pageIndex: 0,
      tableData: [],
      timer: '',
      total: 0,
      form: {}
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
        path: 'WarningRecordList',
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
    // this.timer = setInterval(() => {
    //   this.currentPage === this.total / this.pageSize
    //     ? (this.currentPage = 1)
    //     : (this.currentPage += 1)
    //   this.handleGetSearchValue()
    // }, 5000)
  },
  methods: {
    handleGetSearchValue () {
      this.form = Object.assign({}, this.params, {
        merchantorderFlag: '1',
        pageSize: this.pageSize,
        page: this.currentPage
      })
      api.getminfoPageList(this.form).then(res => {
        const { records, total } = res && res.obj
        if ((this.pageIndex += this.pageSize) >= total) {
          this.currentPage = 1
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
