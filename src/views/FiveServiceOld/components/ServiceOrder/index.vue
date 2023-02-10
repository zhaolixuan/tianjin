<template>
  <div class="older-content">
    <norm-layout text="五大服务次数" path="OrderStatisticalAnalysis" unit="次" :tab_item="tab_item" v-on:getActiveIndex="handleGetActiveIndex"></norm-layout>
    <institutions-instance :SpiritsData="ServiceData" :minHeight="true"></institutions-instance>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import InstitutionsInstance from '@/views/OlderDistribution/components/InstitutionsInstance/index'
export default {
  name: 'BufferOlder',
  data () {
    return {
      activeIndex: 0,
      tab_item: ['天', '周', '月']
    }
  },
  props: {
    serviceOrderMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      return this.serviceOrderMap[this.activeIndex]
    }
  },
  components: {
    NormLayout,
    InstitutionsInstance
  },
  methods: {
    handleGetActiveIndex (ind) {
      this.activeIndex = ind
    }
  }
}
</script>

<style lang="less" scoped>
.older-content{
  height: 2.8rem;
}
</style>
