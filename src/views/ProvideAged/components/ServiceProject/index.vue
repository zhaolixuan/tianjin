<template>
  <norm-layout :icon="this.CircleData.icon" :title="this.CircleData.text">
    <div ref="canvasChart" style="height: 100%;"></div>
  </norm-layout>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import defaultOptions from './option.js'
import NormLayout from '../NormLayout.vue'

export default {
  name: 'HealthProject',
  mixins: [initChart],
  components: {
    NormLayout
  },
  props: {
    CircleData: {
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
    CircleData: {
      deep: true,
      handler (newVal, oldVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    computedOptions () {
      const option = this.defaultOptions

      const colors = [
        { start: '#FCC8E9', end: '#FA6BA3' },
        { start: '#EDFAC0', end: '#F9EB6C' },
        { start: '#00ABF5', end: '#A4EAFF' },
        { start: '#00FFFF', end: '#3564FF' },
        { start: '#DF98FF', end: '#B500FF' }
      ]

      return Object.assign({}, option, {
        legend: Object.assign({}, option.legend, { data: this.CircleData.data.forEach(item => `${item.name}${item.ratio ? item.ratio + '%' : item.value}`) }),
        series: Object.assign({}, option.series, {
          data: this.CircleData.data.map((item, index) => ({
            value: item.value,
            name: `${item.name}${item.ratio ? item.ratio + '%' : item.value}`,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: colors[ index % colors.length ].start
                }, {
                  offset: 1, color: colors[ index % colors.length ].end
                }],
                global: false
              }
            }
          }))
        })
      })
    }
  }
}
</script>
