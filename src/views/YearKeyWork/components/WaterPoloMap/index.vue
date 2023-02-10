<template>
    <div ref="canvasChart" style="float:right;width:30%;height: 100%;"></div>
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
    percentage: [Number]
  },
  data () {
    return {
      defaultOptions
    }
  },
  watch: {
    percentage (oldVal, newVal) {
      this.handleResizeChart()
    }
  },
  computed: {
    computedOptions () {
      const option = this.defaultOptions
      return Object.assign({}, option, {
        series: [Object.assign({}, option.series, {
          data: [this.percentage],
          label: {
            normal: {
              formatter: this.percentage * 100 + '%\n完成率',
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
