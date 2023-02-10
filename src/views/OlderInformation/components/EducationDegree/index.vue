<template>
  <div class="older-content">
    <norm-layout text="受教育程度" :flag="false"></norm-layout>
    <service-type :MedircalData="ServiceData" path="olderPage"></service-type>
  </div>
</template>

<script>
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import ServiceType from '@/views/OlderDistribution/components/ServiceType/index'
export default {
  name: 'EducationDegree',
  props: {
    educatedMap: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ServiceData () {
      let { unknownWordTotal, primarySchoolTotal, juniorMiddleTotal, highSchoolTotal, juniorCollegeOverTotal } = this.educatedMap || {}
      return {
        title: [ '不识字', '小学', '初中', '高中/中专', '大专及以上' ],
        data: [unknownWordTotal, primarySchoolTotal, juniorMiddleTotal, highSchoolTotal, juniorCollegeOverTotal],
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
  height: 3rem;
}
</style>
