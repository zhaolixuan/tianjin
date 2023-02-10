<template>
  <div class="older-content">
    <norm-layout text="民族" :flag="false"></norm-layout>
    <service-type :MedircalData="ServiceData"></service-type>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceType from '@/views/OlderDistribution/components/ServiceType/index'
export default {
  name: 'EducationDegree',
  props: {
    nationMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      let nationData = this.nationMap.slice(0,5)
      nationData.reverse()
      return {
        title: nationData.map(item => item.nationName || '未知'),
        data: nationData.map(item => item.nationTotal),
        label: true,
        labelWidth: 20
      }
    }
  },
  components: {
    NormLayout,
    ServiceType
  }
}
</script>

<style lang="less" scoped>
.older-content {
  height: 2.2rem;
}
</style>
