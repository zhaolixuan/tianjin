<template>
  <div class="chart_help">
    <div ref="canvasChart" style="height: 100%;"></div>
  </div>
</template>

<script>
import initChart from '../../OlderConsumeStreetDistribution/mixins/initChart.js'
import {defaultOptions, creatBar, creatYaxis} from './option.js'

export default {
  name: 'StackedColumnChart',
  mixins: [initChart],
  data () {
    return {
      defaultOptions,
      timer: null
    }
  },
  props: {
    serviceData: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    serviceData: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    computedOptions () {
      let { Data, moneyValue, servicesValue } = this.serviceData
      // console.log(Data,moneyValue,servicesValue);
      return Object.assign({}, this.defaultOptions, {
        yAxis: creatYaxis(Data),
        series: creatBar(servicesValue, moneyValue),
        legend: Object.assign({}, this.defaultOptions.legend, {
          show: !!(servicesValue && moneyValue)
        })
      })
    },
  },
  methods: {
    handleResizeChart () {
      this.$nextTick(() => {
        this.chart.dispose()
        this.chart = this.$echarts.init(this.$refs.canvasChart)
        this.chart.setOption(this.computedOptions)
        this.chart.resize()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.chart_help {
  height: 13rem;
}
</style>
