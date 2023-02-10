<template>
  <div ref="canvasChart" style="height: 3.5rem;"></div>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import { mergeObject, getMinIntervalByData, getMinInterval } from '@/views/Distribution/utils/optionUtil.js'
import defaultOptions from './option.js'
import { mapGetters } from 'vuex'

export default {
  name: 'PopulMessage',
  mixins: [initChart],
  data () {
    return {
      defaultOptions
    }
  },
  watch: {
    subsidiesOldMap: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    ...mapGetters(['subsidiesOldMap']),
    computedOptions () {
      const option = this.defaultOptions

      const xAxisData = this.subsidiesOldMap.map(item => item.zoneName)
      const totalData = this.subsidiesOldMap.map(item => item.zoneTotal || 0)
      const disabilityData = this.subsidiesOldMap.map(item => item.totaldisability || 0)
      const isDisableData = this.subsidiesOldMap.map(item => item.IsdisabledTotal || 0)
      const minIntervalData = getMinInterval([...totalData, ...disabilityData, ...isDisableData])
      return mergeObject(option, {
        xAxis: mergeObject(option.xAxis, { data: xAxisData }),
        yAxis: mergeObject(option.yAxis, minIntervalData),
        series: [
          mergeObject(option.series[0], { data: isDisableData }),
          mergeObject(option.series[1], { data: disabilityData }),
          mergeObject(option.series[2], { data: totalData })
        ]
      })
    }
  }
}
</script>
