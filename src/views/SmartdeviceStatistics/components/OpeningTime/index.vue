<template>
  <div class="older-content">
    <norm-layout text="开通时间"  :flag="false"></norm-layout>
    <institutions-instance :SpiritsData="ServiceData"></institutions-instance>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import InstitutionsInstance from '@/views/OlderDistribution/components/InstitutionsInstance/index'
export default {
  name: 'OpeningTime',
  props: {
    openTimeMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      return this.openTimeMap || []
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
  height: 3.6rem;
}
</style>
