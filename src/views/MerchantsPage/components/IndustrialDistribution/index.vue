<template>
  <norm-layout :icon="IndustrialDistributionData.icon" :title="IndustrialDistributionData.text" :half="IndustrialDistributionData.half">
    <div ref="canvasChart" style="height:2.9rem"></div>
  </norm-layout>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import defaultOptions from './option.js'
import NormLayout from '@/views/ProvideAged/components/NormLayout.vue'

export default {
  name: 'IndustrialDistribution',
  mixins: [initChart],
  components: {
    NormLayout
  },
  props: {
    IndustrialDistributionData: {
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
    IndustrialDistributionData: {
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
          data: this.IndustrialDistributionData.title
        }),
        series: Object.assign({}, option.series, {
          data: this.IndustrialDistributionData.data
        })
      })
    }
  }
}
</script>
