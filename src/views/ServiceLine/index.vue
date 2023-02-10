<template>
  <div class="chart_help">
    <div ref="canvasChart" style="height: 100%;"></div>
  </div>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import {defaultOptions, createLegend, createxAxis, createLine} from './option.js'

export default {
  name: 'ConsumeChart',
  mixins: [initChart],
  data () {
    return {
      defaultOptions,
      timer: null
    }
  },
  props: {
    serviceData: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    serviceData: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    computedOptions () {
      let { legend, xDate, xData } = this.serviceData
      return Object.assign({}, this.defaultOptions, {
        legend: createLegend(legend),
        xAxis: createxAxis(xDate),
        series: createLine(xData)
      })
    }
  },
  methods: {
    handleResizeChart () {
      this.$nextTick(() => {
        this.chart.dispose()
        this.chart = this.$echarts.init(this.$refs.canvasChart)
        this.chart.setOption(this.computedOptions)
        this.chart.resize()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.chart_help {
  height: 100%;
}
</style>
