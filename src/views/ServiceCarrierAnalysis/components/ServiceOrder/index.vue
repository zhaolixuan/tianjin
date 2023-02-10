<template>
  <div class="older-content">
    <norm-layout text="服务记录（周）" unit="人次" :flag="false" ></norm-layout>
    <institutions-instance :SpiritsData="ServiceData" :minHeight="true"></institutions-instance>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import InstitutionsInstance from '@/views/OlderDistribution/components/InstitutionsInstance/index'
export default {
  name: 'ServiceOrder',
  props: {
    serviceOrderWeekMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      return this.serviceOrderWeekMap
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
