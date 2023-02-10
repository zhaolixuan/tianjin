<template>
  <div class="older-content">
    <norm-layout text="居家养老服务记录" :routerPath="path"></norm-layout>
    <list-layout
    :columns="columns"
    :tableData="newTabData"
    :pageSize="pageSize"
    :currentPage="currentPage"
    class="table_box"
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
        { label: '服务老人', prop: 'orderName' },
        { label: '服务类别', prop: 'requirementBig' },
        { label: '服务时间', prop: 'mealTime' },
        { label: '服务方式', prop: 'mealStyle' },
        { label: '消费金额', prop: 'consumerMoney' }
      ],
      pageSize: 50,
      currentPage: 1,
      pageIndex: 0,
      tableData: [],
      newTabData: [],
      timer: '',
      total: 0
    }
  },
  props: {
    listForm: {
      type: Object,
      default: () => {}
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
        query: { code: this.breadCrumbCodes,
          key: '5',
          header: '服务载体运营情况统计分析',
          allStatus: ['未领', '已领'],
          startTime: JSON.stringify(this.listForm.beginDay),
          endTime: JSON.stringify(this.listForm.endDay),
          merchantName: this.listForm.merchantName
        }
      }
    }
  },
  watch: {
    listForm: {
      deep: true,
      handler () {}
    }
  },
  created () {
    // this.$store.dispatch('getUserAuthInfo').then(() => {
    //   this.handleGetSearchValue()
    // }).catch((err) => {
    //   console.log('获取用户权限失败', err)
    // })
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
        merchantFlag: '1',
        pageSize: this.pageSize,
        page: this.currentPage
      })
      api.getFreeOrderPage5(form).then(res => {
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
  height: 4.3rem;
}
/deep/ .table_box {
  padding-left: 0rem;
  width: 5rem;
}
</style>
