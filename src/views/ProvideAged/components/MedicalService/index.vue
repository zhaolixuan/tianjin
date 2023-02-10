<template>
  <norm-layout :icon="MedicalRadar.icon" :title="MedicalRadar.text" :double="MedicalRadar.double">
    <div ref="canvasChart" style="height: 100%;"></div>
  </norm-layout>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import defaultOptions from './option.js'
import NormLayout from '../NormLayout.vue'

export default {
  name: 'mimk',
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
    MedicalRadar: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    MedicalRadar: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    computedOptions () {
      const option = this.defaultOptions
      return Object.assign({}, option, {
        radar: Object.assign({}, option.radar, {
          indicator: this.MedicalRadar.title,
          radius: this.MedicalRadar.radius || 70
        }),
        series: Object.assign({}, option.series, {
          data: [
            {
              value: this.MedicalRadar.data,
              name: this.MedicalRadar.text
            }
          ]
        })
      })
    }
  }
}
</script>
