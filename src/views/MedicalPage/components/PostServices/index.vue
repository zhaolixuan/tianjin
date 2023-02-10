<template>
  <div class="older-content">
    <norm-layout text="服务次数" :tab_item="tab_item" @getActiveIndex="handleGetActiveIndex"></norm-layout>
    <institutions-instance :SpiritsData="ServiceData" :minHeight="true"></institutions-instance>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import InstitutionsInstance from '@/views/OlderDistribution/components/InstitutionsInstance/index'
export default {
  name: 'PostService',
  data () {
    return {
      tab_item: ['天', '周', '月'],
      activeIndex: 0
    }
  },
  props: {
    servicePeopleMonthMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      return this.servicePeopleMonthMap[this.activeIndex]
    }
  },
  methods: {
    handleGetActiveIndex (ind) {
      this.activeIndex = ind
    }
  },
  components: {
    NormLayout,
    InstitutionsInstance
  }
}
</script>

<style lang="less" scoped>
.older-content{
  height: 2.8rem;
}
</style>
