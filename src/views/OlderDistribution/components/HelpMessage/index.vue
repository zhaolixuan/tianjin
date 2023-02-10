<template>
    <div class="chart_help">
      <div ref="canvasChart" style="height: 100%;"></div>
    </div>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import defaultOptions from './option.js'
import NormLayout from '../NormLayout.vue'

export default {
  name: 'HelpMessage',
  mixins: [initChart],
  components: {
    NormLayout
  },
  data () {
    return {
      defaultOptions
    }
  },
  props: {
    SpiritsData: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    SpiritsData: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    computedOptions () {
      const option = this.defaultOptions
      option.series.map(item => {
        item.data = this.SpiritsData.data
        item.symbolBoundingData = this.SpiritsData.maxData
      })
      return Object.assign({}, option, {
        xAxis: Object.assign({}, option.xAxis, {
          max: this.SpiritsData.maxData
        }),
        yAxis: Object.assign({}, option.yAxis, {
          data: this.SpiritsData.title
        }),
        series: option.series
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
.chart_help{
  height: 73%;
  padding-left: .2rem;
}
</style>
