<template>
  <div class="older-content">
    <norm-layout text="探访服务记录" :routerPath="path"></norm-layout>
    <list-layout
      :columns="columns"
      :tableData="tableData"
      :pageSize="pageSize"
      :currentPage="currentPage || 1"
      v-on:getSearchValue="handleGetSearchValue"
    ></list-layout>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ListLayout from '@/components/TablerList/smallLayout.vue'
import api from '@/api/api.js'
import { mapGetters } from 'vuex'
export default {
  name: 'VisitisRegister',
  data () {
    return {
      columns: [
        { label: '被访人姓名', prop: 'intervieweeName' },
        { label: '年龄', prop: 'age' },
        { label: '电话', prop: 'phone' },
        { label: '被探访次数', prop: 'visitTotal' }
      ],
      pageSize: 7,
      currentPage: 1,
      pageIndex: 0,
      tableData: [],
      total: 0,
      timer: ''
    }
  },
  computed: {
    ...mapGetters(['breadCrumbCodes', 'typeNew', 'codeNew']),
    params () {
      let params = {}
      const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0]

      return params
    },
    path () {
      return {
        path: 'VisitService',
        query: {}
      }
    }
  },
  created () {
    this.$store
      .dispatch('getUserAuthInfo')
      .then(() => {
        this.handleGetSearchValue()
      })
      .catch(err => {
        console.log('获取用户权限失败', err)
      })
    // this.timer = setInterval(() => {
    //   if (this.pageIndex >= this.total) {
    //     this.currentPage = 0
    //     this.pageIndex = 0
    //   }
    //   this.currentPage += 1
    //   this.handleGetSearchValue()
    // }, 5000)
    // this.handleGetSearchValue()
  },
  methods: {
    handleGetSearchValue () {
      let form = Object.assign({}, this.params, {
        pageSize: this.pageSize,
        page: this.currentPage
      })
      api.getVisitServicePageInfo(form).then(res => {
        const { records, size, total } = res && res.obj
        this.pageIndex += records.length
        this.total = total
        this.tableData = records
        this.pageSize = size
      })
    }
  },
  // destroyed () {
  //   clearInterval(this.timer)
  // },
  components: {
    NormLayout,
    ListLayout
  }
}
</script>

<style lang="less" scoped>
.older-content {
  height: 4rem;
}
.table_box {
  padding: 0 0.2rem 0 0.3rem;
}
</style>
