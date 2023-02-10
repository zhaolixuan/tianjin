<template>
  <div class="older-content">
    <norm-layout text="助餐服务记录" unit="单" :tab_item="tab_item" v-on:getActiveIndex="handleGetActiveIndex"></norm-layout>
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
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      let data = this.serviceOrderMap.length > 0 ? this.serviceOrderMap[this.activeIndex] : []
      return data
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
  height: 2.65rem;
}
</style>
