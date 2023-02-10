<template>
  <div class="chart_help">
    <div ref="canvasChart" style="height: 100%;"></div>
  </div>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
// import {defaultOptions, creatBar, creatYaxis, creatXaxis} from './option.js'

// 这里借用 OrderStatisticalBar/options 配置文件 因为他是含有折线的
// 所以在此新建了 option_zhexian.js 文件
import { defaultOptions,createLine,createXais,createZoom } from './option_zhexian.js'

export default {
  name: 'StackedColumnChart',
  // minxins 自定义的一些方法 可以混入到其他各个组建中使用
  // 这里是 当前组件 使用 initChart 里面的方法
  // 比如这个文件使用 initChart.js 中的 handleResizeChart 方法
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
      // 深度监听
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    // computedOptions () {
    //   let { Data, moneyValue, servicesValue } = this.serviceData
    //   console.log(Data,moneyValue,servicesValue);
    //   // 街道名数组(对应父组件中的 streetName)   moneyValue 消费金额 对应父组件中 consumerMoney
    //   // servicesValue 服务量 对应父组件中的 orderCardMonthTotal

    //   // console.log(!!(servicesValue && moneyValue))
    //   return Object.assign({}, this.defaultOptions, {
    //     // yAxis: creatYaxis(Data),
    //     xAxis: creatXaxis(Data),
    //     series: creatBar(servicesValue, moneyValue),
    //     legend: Object.assign({}, this.defaultOptions.legend, {
    //       show: !!(servicesValue && moneyValue)
    //     })
    //   })
    // },

    // 借用的
    computedOptions () {
      let { Data, moneyValue, servicesValue } = this.serviceData
      console.log(Data,moneyValue,servicesValue);
      let maxNumber = this.serviceData.Data.length > 29 ? 50 : 100
      return Object.assign({}, this.defaultOptions, {
        xAxis: createXais(Data),
        dataZoom: createZoom(maxNumber),
        series: [
          ...createLine(servicesValue,moneyValue)
        ]
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
  height: 8.5rem;
}
</style>
