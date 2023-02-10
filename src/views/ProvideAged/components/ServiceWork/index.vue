<template>
  <norm-layout :icon="NumberData.icon" :title="NumberData.text" :half='NumberData.half'>
    <div ref="canvasChart" style="height: 2.6rem;"></div>
  </norm-layout>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import defaultOptions from './options.js'
import NormLayout from '../NormLayout.vue'

export default {
  name: 'GenderDistribution',
  mixins: [initChart],
  components: {
    NormLayout
  },
  props: {
    NumberData: {
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
    NumberData: {
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
        xAxis: Object.assign(option.xAxis, {
          data: this.NumberData.title
        }),
        series: Object.assign({}, option.series, {
          data: this.NumberData.data
        })
      })
    }
  }
}
</script>
