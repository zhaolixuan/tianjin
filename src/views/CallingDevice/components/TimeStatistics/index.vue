<template>
  <div class="chart_help">
    <div ref="canvasChart" style="height: 100%;"></div>
  </div>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import { createBar, defaultOptions } from './option.js'

export default {
  name: 'DoubleColumnCharts',
  mixins: [initChart],
  data () {
    return {
      defaultOptions
    }
  },
  props: {
    ServiceData: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    ServiceData: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    computedOptions () {
      const option = this.defaultOptions
      let data = ['8:00-16:00', '16:00-00:00', '00:00-08:00']
      return Object.assign({}, option, {
        xAxis: Object.assign(option.xAxis, {data}),
        series: [
          createBar(
            '呼入',
            [321, 431, 431],
            'rgba(11, 107, 247, 1)',
            'rgba(11, 107, 247, 0.1)'
          ),
          createBar(
            '呼出',
            [121, 211, 431],
            'rgba(94, 27, 251, 1)',
            'rgba(94, 27, 251, 0.1'
          )
        ]
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
  height: 90%;
  padding-left: 0.2rem;
}
</style>
