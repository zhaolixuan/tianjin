<!--
 * @Description: fileContent
 * @Author: diaolili
 * @Date: 2021-05-17 15:03:51
-->
<template>
  <list-layout
    :crumbData="[{ title: '', url: '' }]"
    :columns="columns"
    :tableData="tableData"
    :total="total"
    :pageSize="pageSize"
    :currentPage="currentPage"
    backPath='olderDistribution'
    v-on:getSearchValue="getData"
    header='居家养老服务载体分布'
    title="居家养老服务载体分布————养老院"
  >
 </list-layout>
</template>

<script>
import api from '@/api/api.js'
import ListLayout from '@/components/TablerList/layout.vue'

export default {
  name: 'NursingHome',
  data () {
    return {
      isSearchLoading: false,
      columns: [
        { label: '序号', prop: 'index', width: '150' },
        { label: '机构名称', prop: 'organizationName' },
        { label: '机构类型', prop: 'organizationType' },
        { label: '统一社会信用代码', prop: 'socialCreditCode' },
        { label: '法人代表姓名', prop: 'legalPersonName' },
        { label: '法人联系电话', prop: 'legalPersonPhone' },
        { label: '养老机构法人性质', prop: 'legalPersonNature' },
        { label: '地址', prop: 'address' },
        { label: '从业人员总数', prop: 'employeesNum' },
        { label: '老年人居住房间总数', prop: 'roomNum' },
        { label: '老年人床位总数', prop: 'bedNum' }
      ],
      tableData:[],
      pageSize: 10, // 每页数量
      currentPage: 1, // 当前页数
      total: 0 // 总条数
    }
  },
  computed: {},
  created () {
    this.$store.dispatch('getUserAuthInfo').then(() => {
      this.getData()
    }).catch((err) => {
      console.log('获取用户权限失败', err)
    })
  },
  methods: {
    getData (page) {
      this.isSearchLoading = true
      const params = {
        page: page,
        pageSize: this.pageSize
      }
      api.getServices4NursingHome(params).then(res => {
        this.isSearchLoading = false
        const { records, total, size, current } = res && res.obj
        this.tableData = records
        this.pageSize = size
        this.currentPage = current
        this.total = total
      }).catch(() => {
        this.isSearchLoading = false
        this.tableData = []
      })
    },
    handleServiceClass () {
      this.currentPage = 1
    }
  },
  components: {
    ListLayout
  }
}
</script>
<style >

</style>
