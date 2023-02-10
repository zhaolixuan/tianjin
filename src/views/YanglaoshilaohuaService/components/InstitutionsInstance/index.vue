<!--
 * @Description: fileContent
 * @Author: diaolili
 * @Date: 2021-04-27 15:30:21
-->
<template>
    <div :class="chartNorl">
      <div ref="canvasChart" style="height: 100%;"></div>
    </div>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import defaultOptions from './option.js'
import NormLayout from '../NormLayout.vue'

export default {
  name: 'Institutions',
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
      type: Array,
      default: () => []
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
    chartNorl () {
      return [this.minHeight ? 'minHeight' : 'chart_help']
    },
    computedOptions () {
      const option = this.defaultOptions
      option.series.map(item => {
        item.data = this.SpiritsData.map(item => item.orderfreeCardTotal || item.orderCardlatelyTotal || item.orderCardTotal || item.serviceObjectNum || item.serverTotal || item.houseKeepingTotal || 0)
      })
      return Object.assign({}, option, {
        xAxis: Object.assign({}, option.xAxis, {
          data: this.SpiritsData.map(item => item.currentMonth || item.currentWeek || item.currentDay || '')
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
  },
  // this file had been studied at 20210817
}
</script>
<style lang="less" scoped>
.chart_help{
  box-sizing: border-box;
  height: 85%;
  padding-left: .4rem;
}
.minHeight{
    height: 2.2rem;
}
</style>
