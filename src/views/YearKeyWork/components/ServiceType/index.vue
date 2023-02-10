<template>
  <norm-layout :icon="MedircalData.icon" :title="MedircalData.text" :maxHeight="MedircalData.maxHeight" :half="MedircalData.half"  :subtitle=MedircalData.subtitle>
    <div ref="canvasChart" style="height: 100%;"></div>
  </norm-layout>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import defaultOptions from './option.js'
import NormLayout from '@/views/ProvideAged/components/NormLayout.vue'

export default {
  name: 'ServiceProject',
  mixins: [initChart],
  components: {
    NormLayout
  },
  props: {
    MedircalData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      defaultOptions
    }
  },
  watch: {
    MedircalData: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    computedOptions () {
      const option = this.defaultOptions
      const MedircalData = this.MedircalData.data

      var yMax = MedircalData ? MedircalData.reduce((a, b) => a > b ? a : b) : 0
      var dataShadow = []
      MedircalData && MedircalData.forEach(item => {
        dataShadow.push(yMax + 20)
      })
      option.series[1].data = MedircalData
      option.series[0].data = dataShadow
      return Object.assign({}, option, {
        yAxis: Object.assign({}, option.yAxis, { data: this.MedircalData.title }),
        series: option.series
      })
    }
  }
}
</script>
