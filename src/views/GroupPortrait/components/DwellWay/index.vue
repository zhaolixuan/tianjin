<template>
  <div class="older-content">
    <norm-layout text="居住方式" :flag="false"></norm-layout>
    <service-type :MedircalData="ServiceData"></service-type>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceType from '@/views/OlderDistribution/components/ServiceType/index'
export default {
  name: 'DwellWay',
  props: {
    livingpattemMap: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ServiceData () {
      let { householdTotal, livealoneTotal } = this.livingpattemMap[0] || []
      return {
        title: ['独居', '家人居住'],
        data: [livealoneTotal, householdTotal],
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
.older-content {
  height: 1.8rem;
}
</style>
