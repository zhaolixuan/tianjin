<template>
  <div class="older-content">
    <norm-layout text="补贴订单明细" :routerPath="path"></norm-layout>
    <list-layout
    :columns="columns"
    :tableData="newTabData"
    :pageSize="pageSize"
    :currentPage="currentPage"
    v-on:getSearchValue="handleGetSearchValue"
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
  name: 'SubsidyDetial',
  data () {
    return {
      columns: [
        { label: '订单号', prop: 'payOrderNo' },
        { label: '服务老人', prop: 'orderName' },
        { label: '服务时间', prop: 'mealTime' },
        { label: '服务项目', prop: 'mealType' },
        { label: '金额', prop: 'allowanceMoney' }
      ],
      pageSize: 50,
      currentPage: 1,
      tableData: [],
      newTabData: [],
      tabTotal: 0,
      timer: ''
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
        path: 'ServiceOlder',
        query: { code: this.breadCrumbCodes, title: '养老补贴落实大数据统计', allowanceMoneyZero: 1 }
      }
    }
  },
  created () {
    this.$store.dispatch('getUserAuthInfo').then(() => {
      this.handleGetSearchValue()
    }).catch((err) => {
      console.log('获取用户权限失败', err)
    })
    this.timer = setInterval(() => {
      if (this.tableData.length <= 20) {
        this.handleGetSearchValue()
      }
      this.newTabData = this.tableData.splice(0, 5)
    }, 10000)
  },
  methods: {
    handleGetSearchValue () {
      let form = Object.assign({}, this.params, {
        merchantorderFlag: '1',
        pageSize: this.pageSize,
        page: this.currentPage
      })
      api.getFreeOrderPage3(form).then(res => {
        const { records, size, total } = res && res.obj
        this.tabTotal += records.length
        if (this.tabTotal >= total) {
          this.currentPage = 1
        }
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
.older-content{
  height: 3.8rem;
}
</style>
