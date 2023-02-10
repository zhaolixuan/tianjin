<template>
  <norm-layout :subtitle=KeyTaskData.subtitle :half="false">
    <div ref="canvasChart" style="height: 100%;"></div>
  </norm-layout>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import defaultOptions from './option.js'
import NormLayout from '@/views/ProvideAged/components/NormLayout.vue'
import WorkMap from '../WaterPoloMap/index.vue'

export default {
  name: 'ServiceProject',
  mixins: [initChart],
  components: {
    NormLayout,
    WorkMap
  },
  props: {
    KeyTaskData: {
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
    KeyTaskData: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    computedOptions () {
      const option = this.defaultOptions
      const title = this.KeyTaskData.title
      let stockData = title.length > 0 ? title.map(item => item.stocks) : ''
      let unfinData = title.length > 0 ? title.map(item => item.unfinished) : ''
      option.series[1].data = stockData
      option.series[0].data = unfinData
      return Object.assign({}, option, {
        xAxis: Object.assign({}, option.xAxis, { data: title.length > 0 ? title.map(item => item.tag) : [] }),
        series: option.series
      })
    }
  }
}
</script>
