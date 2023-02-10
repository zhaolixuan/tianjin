<template>
  <div class="older-content">
    <norm-layout text="下单方式"></norm-layout>
    <service-type :MedircalData="ServiceData"></service-type>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceType from '@/views/OlderDistribution/components/ServiceType/index'
export default {
  name: 'BufferOlder',
  props: {
    serviceChannalsMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      return {
        title: this.serviceChannalsMap.map(item => item.channalsName),
        data: this.serviceChannalsMap.map(item => item.orderChannalsTotal),
        label: true,
        labelWidth: 25
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
.older-content{
  height: 2.3rem;
}
</style>
