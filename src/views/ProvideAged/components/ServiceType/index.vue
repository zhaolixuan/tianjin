<template>
  <norm-layout :icon="MedircalData.icon" :title="MedircalData.text"  :double="MedircalData.double">
    <div ref="canvasChart" style="height: 100%;"></div>
  </norm-layout>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import defaultOptions from './option.js'
import NormLayout from '../NormLayout.vue'

export default {
  name: 'ServiceProject',
  mixins: [initChart],
  components: {
    NormLayout
  },
  props: {
    MedircalData: {
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
    MedircalData: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    computedOptions () {
      const option = this.defaultOptions

      return Object.assign({}, option, {
        yAxis: Object.assign({}, option.yAxis, { data: this.MedircalData.title }),
        series: Object.assign({}, option.series, {
          data: this.MedircalData.data
        })
      })
    }
  }
}
</script>
