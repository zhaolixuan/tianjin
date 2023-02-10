<template>
  <div class="older-content">
    <norm-layout text="家庭养老床位签约人群年龄" :flag="false"></norm-layout>
    <service-type :MedircalData="ServiceData" path="olderPage"></service-type>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceType from '@/views/OlderDistribution/components/ServiceType/index'
export default {
  name: 'StatisticsAge',
  props: {
    ageMap: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ServiceData () {
      let { upNinety, upEighty, upSeventy, upSixty } = this.ageMap || {}
      return {
        title: [ '90岁以上', '80-89岁', '70-79岁', '60-69岁' ],
        data: [upNinety, upEighty, upSeventy, upSixty],
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
  height: 2.5rem;
}
</style>
