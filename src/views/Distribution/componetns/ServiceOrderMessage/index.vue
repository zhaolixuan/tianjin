<template>
  <div ref="canvasChart" style="height: 3.5rem;"></div>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import { createBar, defaultOptions } from './option.js'
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
    serverOrderMap: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    ...mapGetters(['serverOldPersonMap', 'serverOrderMap']),
    computedOptions () {
      const option = this.defaultOptions
      const xAxisData = this.serverOrderMap.map(item => item.zoneName)
      const oldPersonData = this.serverOldPersonMap.map(item => item.oldPersontotal)
      const serviceOrderData = this.serverOrderMap.map(item => item.serviceOrdertotal)
      // const minInterval = getMinIntervalByData([...oldPersonData, ...serviceOrderData])
      const minIntervalData = getMinInterval([...oldPersonData, ...serviceOrderData])
      return mergeObject(option, {
        xAxis: mergeObject(option.xAxis, { data: xAxisData }),
        yAxis: mergeObject(option.yAxis, minIntervalData),
        series: [
          createBar('服务老人', oldPersonData, 'rgba(11, 107, 247, 1)', 'rgba(11, 107, 247, 0.1)'),
          createBar('服务工单', serviceOrderData, 'rgba(94, 27, 251, 1)', 'rgba(94, 27, 251, 0.1')
        ]
      })
    }
  }
}
</script>
