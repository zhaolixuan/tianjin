<template>
  <div class="older-content">
    <norm-layout text="居家养老服务情况各街道排名" :flag="false"></norm-layout>
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
      return {
        title: ['马场', '越秀', '下瓦房', '马场', '越秀', '下瓦房', '马场', '越秀', '下瓦房'],
        data: [23, 34, 212, 34, 21, 32, 34, 21, 32],
        label: true,
        labelWidth: 30
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
  height: 5.5rem;
}
</style>
