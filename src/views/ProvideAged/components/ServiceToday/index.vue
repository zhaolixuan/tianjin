<template>
  <norm-layout :icon="TodayDatas.icon" :title="TodayDatas.text">
    <div ref="canvasChart" :style="{'height':TodayDatas.max ? '100%' : '2.6rem'}"></div>
  </norm-layout>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import defaultOptions from './options.js'
import NormLayout from '../NormLayout.vue'

export default {
  name: 'Today',
  mixins: [initChart],
  components: {
    NormLayout
  },
  props: {
    TodayDatas: {
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
    TodayDatas: {
      deep: true,
      handler (newVal, oldVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    computedOptions () {
      const option = this.defaultOptions
      return Object.assign({}, option, {
        xAxis: Object.assign(option.xAxis, {
          data: this.TodayDatas.title
        }),
        series: Object.assign(option.series, {
          data: this.TodayDatas.data
        })
      })
    }
  }
}
</script>
