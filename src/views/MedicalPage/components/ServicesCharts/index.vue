<template>
    <div class="chart_help">
      <div ref="canvasChart" style="height: 100%;"></div>
    </div>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import defaultOptions from './option.js'

export default {
  name: 'ServiceChrts',
  mixins: [initChart],
  data () {
    return {
      defaultOptions
    }
  },
  props: {
    // SpiritsData: {
    //   type: Array,
    //   default: () => []
    // },

    SpiritsData: {
      type: Object,
      default: () => {}
    },
    minHeight: {
      type: Boolean,
      default: false
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
      // option.series.map(item => {
      //   item.data = this.SpiritsData
      // })

      // after modified
      for(var i = 0;i< option.series.length;i++){
        option.series[0].data = this.SpiritsData.serContentData;
        option.series[1].data = this.SpiritsData.serNumData;
      };

      return Object.assign({}, option, {

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
  height: 100%;
  padding-left: .1rem;
}
.minHeight{
    height: 2.2rem;
}
</style>
