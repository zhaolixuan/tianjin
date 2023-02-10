<template>
  <norm-layout :icon="ProjectData.icon" :title="ProjectData.text" :half="false">
    <div ref="canvasChart" style="height: 2.05rem"></div>
  </norm-layout>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import defaultOptions from './option.js'
import NormLayout from '@/views/ProvideAged/components/NormLayout.vue'

export default {
  name: 'ServiceProject',
  mixins: [initChart],
  components: {
    NormLayout
  },
  props: {
    ProjectData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      defaultOptions
    }
  },
  watch: {
    ProjectData: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    computedOptions () {
      const option = this.defaultOptions
      const CityInOrOut = this.ProjectData.CityInOrOut || []
      option.series[1].data = [CityInOrOut[0] ? CityInOrOut[0].introductionHighCountOutCity : 0, CityInOrOut[0] ? CityInOrOut[0].introductionHighCountInCity : 0]
      option.series[0].data = [CityInOrOut[0] ? CityInOrOut[0].introductionCountOutCity : 0, CityInOrOut[0] ? CityInOrOut[0].introductionCountInCity : 0]
      return Object.assign({}, option, {
        series: option.series
      })
    }
  }
}
</script>
