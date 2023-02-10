<template>
  <div class="older-content">
    <norm-layout text="服务载体补贴" :routerPath="path" title="养老补贴落实大数据统计"></norm-layout>
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
  name: 'SubsidyMerchant',
  data () {
    return {
      columns: [
        { label: '商家名称', prop: 'merchantName' },
        { label: '服务范围', prop: 'serviceArea' },
        { label: '补贴订单数量', prop: 'payOrdertotal' },
        { label: '补贴金额', prop: 'allowancetotal' }
      ],
      pageSize: 50,
      currentPage: 1,
      tableData: [],
      newTabData: [],
      tabIndex: 0,
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
        path: 'ServiceCarrier',
        query: { code: this.breadCrumbCodes, type: 1, key: 4, title: '养老补贴落实大数据统计' }
        // type为1跳转养老载体补贴列表页
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
        allowanceMoney: '1',
        pageSize: this.pageSize,
        page: this.currentPage
      })
      api.getFreeOrderPage4(form).then(res => {
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
  height: 4rem;
}
</style>
