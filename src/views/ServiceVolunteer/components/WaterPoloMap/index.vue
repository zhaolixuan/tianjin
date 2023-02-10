<template>
    <div ref="canvasChart" style="float:right;width:30%;height: 100%;"></div>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import defaultOptions from './option.js'
import NormLayout from '@/views/ProvideAged/components/NormLayout.vue'
import 'echarts-liquidfill'

export default {
  name: 'WaterPoloMap',
  mixins: [initChart],
  components: {
    NormLayout
  },
  props: {
    realReta: [String]
  },
  data () {
    return {
      defaultOptions
    }
  },
  watch: {
    realReta (oldVal, newVal) {
      this.handleResizeChart()
    }
  },
  computed: {
    computedOptions () {
      const option = this.defaultOptions
      return Object.assign({}, option, {
        series: [Object.assign({}, option.series, {
          data: [this.realReta],
          label: {
            normal: {
              formatter: (this.realReta || 0) + ' \n ' + '完成率',
              textStyle: {
                fontSize: 12,
                color: 'rgba(0, 122, 255, 1)'
              }
            }
          }
        })]
      })
    }
  }
}
</script>
