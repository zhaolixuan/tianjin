<template>
  <norm-layout :icon="TrendtData.icon" :title="TrendtData.text" :half="false">
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
    TrendtData: {
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
    TrendtData: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    computedOptions () {
      const option = this.defaultOptions
      const title = this.TrendtData.InMonth
      return Object.assign({}, option, {
        series: Object.assign({}, option.series, { data: title.map(item => item.countInMonth) }),
        xAxis: Object.assign({}, option.xAxis, {
          data: title.map(item => item.month + '月')
        })
      })
    }
  }
}
</script>
