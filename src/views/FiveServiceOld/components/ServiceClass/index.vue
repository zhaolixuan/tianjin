<template>
  <div class="older-content">
    <norm-layout text="服务类别" :flag="false"></norm-layout>
    <service-type :MedircalData="ServiceData"></service-type>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceType from '@/views/OlderDistribution/components/ServiceType/index'
export default {
  name: 'ServiceClass',
  props: {
    serviceSortMap: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ServiceData () {
      let { sortTotala, sortTotalb, sortTotalc, sortTotald, sortTotale } = this.serviceSortMap || {}
      return {
        title: [ '其他服务类', '托养床位类', '助医服务类', '生活照料类', '助餐服务类' ],
        data: [sortTotale, sortTotald, sortTotalc, sortTotalb, sortTotala],
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
  height: 3.6rem;
}
</style>
