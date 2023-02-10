<template>
  <div ref="canvasChart" style="height: 3.5rem;"></div>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import defaultOptions from './option.js'
import { mapGetters } from 'vuex'
import {
  mergeObject,
  getMinIntervalByData,
  getMinInterval
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
    dayCareMap: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    ...mapGetters(['dayCareMap', 'pensionaddressMap']),
    computedOptions () {
      const option = this.defaultOptions

      const xAxisData = this.dayCareMap.map(item => item.zoneName || 0)
      const pensionaddressData = this.pensionaddressMap.map(item => item.pensionaddressTotal || 0)
      const dayCareData = this.dayCareMap.map(item => item.dayCareTotal || 0)
      // const minInterval = getMinIntervalByData([...pensionaddressData, ...dayCareData])
      const minIntervalData = getMinInterval([...pensionaddressData, ...dayCareData])
      return mergeObject(option, {
        xAxis: mergeObject(option.xAxis, { data: xAxisData }),
        yAxis: mergeObject(option.yAxis, minIntervalData),
        series: [
          mergeObject(option.series[0], { data: pensionaddressData }),
          mergeObject(option.series[1], { data: dayCareData })
        ]
      })
    }
  }
}
</script>
