<template>
  <div ref="canvasChart" style="height: 3.5rem;" ></div>
</template>

<script>
import { mapGetters } from 'vuex'
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import { mergeObject,
  getMinIntervalByData,
  getMinInterval
} from '@/views/Distribution/utils/optionUtil.js'
import {
  createHealth,
  createHome,
  createMedical,
  defaultOptions
} from './option.js'

export default {
  name: 'PopulMessage',
  mixins: [initChart],
  data () {
    return {
      defaultOptions
    }
  },
  watch: {
    medicalMap: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    ...mapGetters(['medicalMap']),
    computedOptions () {
      const option = this.defaultOptions

      const getMedicalValues = (key, toNum = false) => this.medicalMap.map(item =>
        toNum ? parseInt(item[key]) || 0 : item[key]
      )
      const healthBarData = getMedicalValues('healthTotal')
      const homeBarData = getMedicalValues('signhomeTotal')
      const medicalBarData = getMedicalValues('totalMedical')
      const minIntervalData = getMinInterval([...healthBarData, ...homeBarData, ...medicalBarData])
      return mergeObject(option, {
        xAxis: mergeObject(option.xAxis, { data: getMedicalValues('zoneName') }),
        yAxis: [mergeObject(option.yAxis[0], minIntervalData), option.yAxis[1]],
        series: [
          ...createHealth(getMedicalValues('healthTotalRadio', true), healthBarData),
          ...createHome(getMedicalValues('signHomeRadio', true), homeBarData),
          ...createMedical(getMedicalValues('totalMedicalRadio', true), medicalBarData)
        ]
      })
    }
  }
}
</script>
