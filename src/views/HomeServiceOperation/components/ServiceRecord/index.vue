<template>
  <div class="older-content">
    <norm-layout text="居家养老服务记录" :routerPath="path"></norm-layout>
    <list-layout
    :columns="columns"
    :tableData="tableData"
    :pageSize="pageSize"
    :currentPage="currentPage"
  >
    </list-layout>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ListLayout from '@/components/TablerList/smallLayout.vue'
import api from '@/api/api.js'
import { mapGetters } from 'vuex'
export default {
  name: 'OldmanList',
  data () {
    return {
      columns: [
        { label: '姓名', prop: 'name' },
        { label: '性别', prop: 'sex' },
        { label: '年龄', prop: 'age' },
        { label: '消费订单数', prop: 'payOrderNoTotal' }
      ],
      pageSize: 5,
      currentPage: 1,
      pageIndex: 0,
      tableData: [],
      timer: '',
      total: 0
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
      return {
        path: 'ServiceoldMan',
        query: { code: this.breadCrumbCodes }
      }
    }
  },
  created () {
    this.$store.dispatch('getUserAuthInfo').then(() => {
      this.handleGetSearchValue()
    }).catch((err) => {
      console.log('获取用户权限失败', err)
    })
    // this.timer = setInterval(() => {
    //   this.currentPage === (this.total / this.pageSize) ? this.currentPage = 1 : this.currentPage += 1
    //   this.handleGetSearchValue()
    // }, 5000)
  },
  methods: {
    handleGetSearchValue () {
      let form = Object.assign({}, this.params, {
        merchantorderFlag: '1',
        pageSize: this.pageSize,
        page: this.currentPage
      })
      // api.getSecondPageList(form).then(res => {
      //   const { records, total } = res && res.obj
      //   if ((this.pageIndex += this.pageSize) >= total) {
      //     this.currentPage = 1
      //     this.pageIndex = 0
      //   }
      //   this.total = total
      //   this.tableData = records
      // })
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
.older-content{
  height: 4.3rem;
}
</style>
