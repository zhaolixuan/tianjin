<template>
  <norm-layout icon="health" title="老年人身体状态">
    <div ref="canvasChart" style="height: 100%;"></div>
  </norm-layout>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import createOptions from './option.js'
import NormLayout from '../NormLayout.vue'

export default {
  name: 'HealthState',
  mixins: [initChart],
  components: {
    NormLayout
  },
  props: {
    dstributionMap: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      defaultOptions: createOptions()
    }
  },
  watch: {
    dstributionMap: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    computedOptions () {
      const option = createOptions()

      const colors = [
        { start: '#FCC8E9', end: '#FA6BA3' },
        { start: '#EDFAC0', end: '#F9EB6C' },
        { start: '#00ABF5', end: '#A4EAFF' }
      ]
      const data = [
        { name: '失能', value: this.dstributionMap.disabilityTotal || 0 },
        { name: '半失能', value: this.dstributionMap.halfdisabilityTotal || 0 },
        { name: '身体正常', value: this.dstributionMap.completelySelfCareTotal || 0 }
      ]

      const barData = data.map((item, index) => {
        const name = `${item.name}: ${item.value}人`

        return {
          value: item.value || 0,
          name: name,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: colors[index].start
              }, {
                offset: 1, color: colors[index].end
              }],
              global: false
            }
          }
        }
      })

      return Object.assign({}, option, {
        legend: Object.assign({}, option.legend, { data: data.map(item => `${item.name}: ${item.value}人`) }),
        series: Object.assign({}, option.series, {
          data: barData
        })
      })
    }
  }
}
</script>
