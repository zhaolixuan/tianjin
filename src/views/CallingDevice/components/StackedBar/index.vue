<template>
    <div class="chart_help">
      <div ref="canvasChart" style="height: 100%;"></div>
    </div>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import defaultOptions from './option.js'

export default {
  name: 'ServiceChart',
  mixins: [initChart],
  data () {
    return {
      defaultOptions
    }
  },
  props: {
    ServiceData: {
      type: Array,
      default: () => []
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
    // computedOptions () {
    //   const option = this.defaultOptions
    //   return Object.assign({}, option, {
    //     series: Object.assign({}, option.series, {

    //     })
    //   })
    // }
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
  height: 90%;
  padding-left: .2rem;
}
</style>
