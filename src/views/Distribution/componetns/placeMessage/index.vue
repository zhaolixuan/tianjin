<template>
  <div ref="canvasChart" style="height:3.5rem;"></div>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import defaultOptions from './option.js'
import { mapGetters } from 'vuex'
import {
  mergeObject,
  getMinIntervalByData, getMinInterval
} from '@/views/Distribution/utils/optionUtil.js'

export default {
  name: 'PopulMessage',
  mixins: [initChart],
  data () {
    return {
      defaultOptions
    }
  },
  watch: {
    allowanceMap: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    ...mapGetters(['allowanceMap']),
    computedOptions () {
      const option = this.defaultOptions
      const xAxisData = this.allowanceMap.map(item => item.zoneName)
      const allowanceData = this.allowanceMap.map(item => item.totalAllowance || 0)
      const obj = getMinInterval(allowanceData)

      return mergeObject(option, {
        xAxis: mergeObject(option.xAxis, { data: xAxisData }),
        yAxis: mergeObject(option.yAxis, obj),
        series: [
          mergeObject(option.series[0], { data: allowanceData })
        ]
      })
    }
  }
}
</script>
