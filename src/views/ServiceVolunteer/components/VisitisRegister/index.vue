<template>
  <div class="older-content">
    <norm-layout text="志愿者服务入户探访花名册" :routerPath="path"></norm-layout>
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
        { label: '志愿者姓名', prop: 'volunteerName' },
        { label: '志愿者类型', prop: 'volunteerType' },
        { label: '联系电话', prop: 'volunteerPhone' },
        { label: '探访对象姓名', prop: 'visitObjectName' }
      ],
      pageSize: 5,
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
        path: 'VolunteerList',
        query: {
          code: this.breadCrumbCodes
        }
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
  },
  methods: {
    handleGetSearchValue () {
      let form = Object.assign({}, this.params, {
        pageSize: this.pageSize,
        page: this.currentPage
      })
      api.getVolunteerInfoPageList(form).then(res => {
        const { records, size, total } = res && res.obj
        this.pageIndex += records.length
        this.total = total
        this.tableData = records
        this.pageSize = size
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
  height: 4rem;
}
.table_box {
  padding: 0 0.2rem 0 0.3rem;
}
</style>
