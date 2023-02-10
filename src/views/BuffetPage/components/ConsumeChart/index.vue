<template>
  <div class="chart_help">
    <div ref="canvasChart" style="height: 100%;"></div>
  </div>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import defaultOptions from './option.js'

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
    incomeMap: {
      type: Object,
      default: () => {}
    },
    path: {
      type: String,
      default: () => ''
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
          top: this.incomeMap.top,
          right: this.incomeMap.right || '20%'
        }),
        xAxis: Object.assign({}, this.defaultOptions.xAxis, {
          data: this.incomeMap.title
        }),
        series: Object.assign({}, this.defaultOptions.series, {
          data: this.incomeMap.data,
          label: Object.assign({}, this.defaultOptions.series.label, {
            formatter: '{c}' + (this.incomeMap.unit || '')
          })
        })
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
    },
    GotoPage (path, query) {
      if (path) {
        this.$router.push({
          path: path,
          query: query
        })
 
      }
    }
  },
  mounted () {
    let _self = this
    if (this.path) {
      this.timer = setInterval(() => {
        this.chart.on('click', function (params) {
          switch (params.name) {
            case '1000元以下':
              _self.GotoPage(_self.path, { code: this.breadCrumbCodes, monthlyIncome: '2' })
              break
            case '1000元-2000元':
              _self.GotoPage(_self.path, { code: this.breadCrumbCodes, monthlyIncome: '3' })
              break
            case '2000元-3000元':
              _self.GotoPage(_self.path, { code: this.breadCrumbCodes, monthlyIncome: '4' })
              break
            case '3000元-4000元':
              _self.GotoPage(_self.path, { code: this.breadCrumbCodes, monthlyIncome: '5' })
              break
            case '4000元-5000元':
              _self.GotoPage(_self.path, { code: this.breadCrumbCodes, monthlyIncome: '6' })
              break
            // case '5000元以上':
            //   _self.GotoPage(_self.path, { code: this.breadCrumbCodes, monthlyIncome: '7' })
            //   break
          }
        })
      }, 3000)
    }
  },
  destroyed () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>
<style lang="less" scoped>
.chart_help {
  height: 90%;
}
</style>
