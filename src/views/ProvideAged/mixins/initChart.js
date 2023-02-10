export default {
  props: {
    chartData: {
      type: Array,
      default: () => []
    },
    dataAxis: {
      type: Array,
      default: () => []
    },
    dataYxis: {
      type: Array,
      default: () => []
    },
    topColor: [String],
    bottomColor: [String],
    options: [Object]
  },

  data() {
    return {
      chart: null
    }
  },

  watch: {
    chartData: {
      deep: true,
      handler(oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },

  computed: {
    computedOptions() {
      return this.defaultOptions || {}
    }
  },

  mounted() {
    this.chart = this.$echarts.init(this.$refs.canvasChart)
    this.chart.setOption(this.computedOptions)
    this.chart.off('click')
    window.addEventListener('resize', this.handleResizeChart)
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResizeChart)
  },

  methods: {
    handleResizeChart() {
      if (!this.chart) return
      this.$nextTick(() => {
        this.chart.setOption(this.computedOptions)
        this.chart.resize()
      })
    }
  }
}
