<template>
  <norm-layout icon="education" title="老年人受教育程度">
    <div ref="canvasChart" style="height: 100%;"></div>
  </norm-layout>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import defaultOptions from './option.js'
import NormLayout from '../NormLayout.vue'

export default {
  name: 'EducationLevel',
  mixins: [initChart],
  components: {
    NormLayout
  },
  props: {
    educationInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      defaultOptions
    }
  },
  watch: {
    educationInfo: {
      deep: true,
      handler(oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    computedOptions() {
      const data = [
        this.educationInfo.unknownWordTotal,
        this.educationInfo.primarySchoolTotal,
        this.educationInfo.juniorMiddleTotal,
        this.educationInfo.highSchoolTotal,
        this.educationInfo.juniorCollegeOverTotal
      ]

      return Object.assign({}, this.defaultOptions, {
        series: Object.assign({}, this.defaultOptions.series, { data })
      })
    }
  }
}
</script>
