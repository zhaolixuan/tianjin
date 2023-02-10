<template>
  <div class="older-content">
    <norm-layout text="老年人口库" :routerPath="path"></norm-layout>
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
        { label: '姓名', prop: 'name' },
        { label: '性别', prop: 'sex' },
        { label: '年龄', prop: 'age' }
      ],
      pageSize: 5,
      currentPage: 1,
      pageIndex: 0,
      data: [],
      start: 0,
      end: 5,
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
        path: 'olderPage',
        query: { code: this.breadCrumbCodes, isVaccination: "1" }
      }
      switch (this.argument) {
        case '2':
          url.query.haveShebao = '1'
          url.query.endMonthlyIncomeShe = '3000'
          break
        case '3':
          url.query.personbody = '3'
          break
        case '4':
          url.query.startAge = '80'
          break
        case '5':
          url.query.isLone = '1'
          break
        default:
          break
      }
      return url
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
    this.timer = setInterval(() => {
      if (this.end >= 100) {
        this.start = 0
        this.end = 5
      }
      this.tableData = this.data.slice(this.start += 5, this.end += 5)
    }, 3000)
  },
  methods: {
    handleGetSearchValue () {
      this.form = Object.assign({}, this.params, {
        merchantorderFlag: '1',
        pageSize: 100,
        page: 1
      })
      switch (this.argument) {
        case '2':
          this.form.haveShebao = '1'
          break
        case '3':
          this.form.personbody = '3'
          break
        case '4':
          this.form.startAge = '80'
          break
        default:
          this.form.isLone = '1'
          break
      }
      api.getOlderData(this.form).then(res => {
        const { records, total } = res && res.obj
        this.total = total
        this.data = records
        this.tableData = records.slice(0, 5)
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
  height: 3.8rem;
}
</style>
