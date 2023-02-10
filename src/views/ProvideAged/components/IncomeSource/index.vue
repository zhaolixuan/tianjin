<template>
  <norm-layout :icon="incomeMap.icon" :title="incomeMap.text" :double="incomeMap.double">
    <div ref="canvasChart" style="height: 100%;"></div>
  </norm-layout>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import defaultOptions from './option.js'
import NormLayout from '../NormLayout.vue'

export default {
  name: 'IncomeSource',
  mixins: [initChart],
  components: {
    NormLayout
  },
  props: {
    incomeMap: {
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
    incomeMap: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },

  computed: {
    computedOptions () {
      return Object.assign({}, this.defaultOptions, {
        grid: Object.assign({}, this.defaultOptions.grid, {
          top: this.incomeMap.top
        }),
        xAxis: Object.assign({}, this.defaultOptions.xAxis, {
          data: this.incomeMap.title
        }),
        series: Object.assign({}, this.defaultOptions.series, { data: this.incomeMap.data })
      })
    }
  }
}
</script>
