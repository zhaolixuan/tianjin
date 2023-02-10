<template>
  <div class="older-content">
    <norm-layout text="志愿者" :routerPath="path"></norm-layout>
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
  name: 'OldmanList',
  data () {
    return {
      columns: [
        { label: '志愿者姓名', prop: 'volunteerName' },
        { label: '志愿者类型', prop: 'volunteerType' },
        { label: '探访对象', prop: 'visitObjectName' },
        { label: '探访对象属性', prop: 'visitObjectType' }
      ],
      pageSize: 3,
      currentPage: 1,
      start: 0,
      end: 3,
      tableData: [],
      data: [],
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
    type () {
      return this.$store.state.type
    },
    params () {
      let params = {}
      const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0]

      return params
    },
    path () {
      return {
        path: 'VolunteerList',
        query: { code: this.$route.query.code, type: this.type }
      }
    }
  },
  created () {
    this.handleGetSearchValue()
    this.timer = setInterval(() => {
      if (this.end >= 99) {
        this.start = 0
        this.end = 3
      }
      this.tableData = this.data.slice(this.start += 3, this.end += 3)
    }, 3000)
  },
  methods: {
    handleGetSearchValue () {
      this.form = Object.assign({}, this.params, {
        pageSize: 100,
        page: 1
      })
      api.getVolunteerInfoPageList(this.form).then(res => {
        const { records, total } = res && res.obj
        this.total = total
        this.data = records
        this.tableData = records.slice(0, 3)
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
  height: 3rem;
}
</style>
