<template>
  <div class="older-content">
    <norm-layout text="服务商" :routerPath="path"></norm-layout>
    <div class="older-tab">
      <p
        :class="[activeIndex === index ? 'tab_item active' : 'tab_item']"
        v-for="(item, index) in tabData"
        :key="index"
        @click="handleTab(index)"
      >
        {{ item }}
      </p>
    </div>
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
  name: 'ServiceList',
  data () {
    return {
      tabData: ['居家养老服务商', '服务商联盟'],
      activeIndex: 0,
      columns: [
        { label: '序号', prop: '', width: 80 },
        { label: '服务商', prop: 'companyName' },
        { label: '服务载体', prop: 'canteenNumtotal', width: 80 },
        { label: '服务站', prop: 'servicePointNum', width: 80 }
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
    ...mapGetters(['breadCrumbCodes', 'typeNew', 'codeNew']),
    params () {
      let params = {}
      const typeCodes = ['code', 'zoneCode', 'streetCode', 'communityCode']
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0]

      return params
    },
    path () {
      return {
        path: 'ServiceMerchant',
        query: { code: this.breadCrumbCodes, key: 3, title: '居家养老服务载体分布', allowanceMoneyZero: 1 }
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
    // }, 3000)
  },

  methods: {
    handleTab (id) {
      if (id > 0) {
        this.$router.push({
          name: 'ServiceLeague',
          query: { title: '河西区居家养老服务管理系统' }
        })
      }
    },
    handleGetSearchValue () {
      let form = Object.assign({}, this.params, {
        merchantorderFlag: '1',
        pageSize: this.pageSize,
        page: this.currentPage
      })
      api.getCompanyOtherPageListSecond(form).then(res => {
        console.log(res);
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
.older-content{
  height: 4.3rem;
}
.older-tab {
  width: 100%;
  height: 0.3rem;
  display: flex;
  padding-left: 0.4rem;
  .tab_item {
    width: 1.4rem;
    height: 0.25rem;
    border: 1px solid #00cefe;
    text-align: center;
    line-height: 0.25rem;
    color: rgba(79, 208, 255, 0.7);
    font-size: 0.15rem;
    opacity: 0.6;
  }
  .active {
    border: 1px solid #68f4ff;
    color: #68f4ff;
    opacity: 1;
  }
}
</style>
