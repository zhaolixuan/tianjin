<template>
  <div class="chart_help">
    <div ref="canvasChart" style="height: 100%;"></div>
  </div>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import { createTitles, createBar, createGenderRatio, defaultOptions } from './option.js'

export default {
  name: 'TwowayColumnar',
  mixins: [initChart],
  data () {
    return {
      defaultOptions,
      timer: null
    }
  },
  props: {
    twoData: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    twoData: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    computedOptions () {
      const option = this.defaultOptions
      const getAgeNumber = (sex, age) => {
        const sexIns = this.twoData.find(item => item.sex === sex)
        return sexIns ? sexIns[age] : 0
      }
      const getSexNumber = (sex) => {
        const sexIns = this.twoData.find(item => item.sex === sex)
        return sexIns ? sexIns.sexTotal : 0
      }
      const getBarData = (sex) => [
        getAgeNumber(sex, 'sixTotal'),
        getAgeNumber(sex, 'sevenTotal'),
        getAgeNumber(sex, 'eightTotal'),
        getAgeNumber(sex, 'nineTotal')
      ]

      const maleNumber = getSexNumber('女')
      const famaleNumber = getSexNumber('男')
      const maleRatio = Math.round((maleNumber * 100) / (maleNumber + famaleNumber)) || 0
      const famaleRatio = Math.round((famaleNumber * 100) / (maleNumber + famaleNumber)) || 0
      console.log(maleRatio, famaleRatio)
      return Object.assign({}, option, {
        title: createTitles(maleNumber, famaleNumber),
        series: [
          ...createBar(getBarData('男'), getBarData('女')),
          ...createGenderRatio(famaleRatio, maleRatio)
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
}
</style>
