<template>
  <div ref="canvasChart" style="height: 3.5rem;"></div>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import { mergeObject, getMinIntervalByData, getMinInterval } from '@/views/Distribution/utils/optionUtil.js'
import { createBar, defaultOptions } from './option.js'
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
      const isAloneData = this.subsidiesOldMap.map(item => item.isAloneTotal)
      const isLiveData = this.subsidiesOldMap.map(item => item.isLiveAlone)

      const minIntervalData = getMinInterval([...isAloneData, ...isLiveData])

      return mergeObject(option, {
        xAxis: mergeObject(option.xAxis, { data: xAxisData }),
        yAxis: mergeObject(option.yAxis, minIntervalData),
        series: [
          createBar('失独老人', isAloneData, 'rgba(11, 107, 247, 1)', 'rgba(11, 107, 247, 0.1)'),
          createBar('独居老人', isLiveData, 'rgba(94, 27, 251, 1)', 'rgba(94, 27, 251, 0.1)')
        ]
      })
    }
  }
}
</script>
