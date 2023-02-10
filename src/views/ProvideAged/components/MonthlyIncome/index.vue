<template>
  <norm-layout :icon="icon" :title="title">
    <div ref="canvasChart" :style="{'height':max? '2.55rem' : '100%'}"></div>
  </norm-layout>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import defaultOptions from './options.js'
import NormLayout from '../NormLayout.vue'

export default {
  name: 'MonthlyIncome',
  mixins: [initChart],
  components: {
    NormLayout
  },
  props: {
    title: [String],
    icon: [String],
    color: [String],
    max: [Boolean],
    left: {
      type: String,
      default: () => '0'
    },
    right: {
      type: String,
      default: () => '0'
    },
    monthlyIncomeMap: {
      type: Object,
      default: () => {}
    },
    xAxisData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      defaultOptions
    }
  },
  watch: {
    monthlyIncomeMap: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    },
    xAxisData: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    computedOptions () {
      const option = this.defaultOptions
      const data = this.chartData.length > 0
        ? this.chartData
        : [
          this.monthlyIncomeMap ? this.monthlyIncomeMap.noIncomeTotal : 0,
          this.monthlyIncomeMap ? this.monthlyIncomeMap.oneUnderTotal : 0,
          this.monthlyIncomeMap ? this.monthlyIncomeMap.oneTwoTotal : 0,
          this.monthlyIncomeMap ? this.monthlyIncomeMap.twoThreeTotal : 0,
          this.monthlyIncomeMap ? this.monthlyIncomeMap.threeFourTotal : 0,
          this.monthlyIncomeMap ? this.monthlyIncomeMap.fourFiveTotal : 0,
          this.monthlyIncomeMap ? this.monthlyIncomeMap.fiveOverTotal : 0
        ]
      return Object.assign({}, option, {
        series: Object.assign({}, option.series, { data }),
        grid: Object.assign({}, option.grid, { left: Number(this.left), right: Number(this.right) }),
        xAxis: Object.assign({}, option.xAxis, {
          data: this.xAxisData,
          axisLabel: { color: this.color }
        })
      })
    }
  }
}
</script>
