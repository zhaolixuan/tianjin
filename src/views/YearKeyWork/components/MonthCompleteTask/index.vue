<template>
  <norm-layout :icon="MonthTaskData.icon" :title="MonthTaskData.text" :half="MonthTaskData.half" :subtitle=MonthTaskData.subtitle>
    <div ref="canvasChart" style="width:70%;height: 100%;float:left;"></div>
    <work-map :percentage="this.MonthTaskData.percentage"/>
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
    MonthTaskData: {
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
    MonthTaskData: {
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
        yAxis: Object.assign({}, option.yAxis, { data: this.MonthTaskData.title }),
        series: Object.assign({}, option.series, {
          data: this.MonthTaskData.data
        })
      })
    }
  }
}
</script>
