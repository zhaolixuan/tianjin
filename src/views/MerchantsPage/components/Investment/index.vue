<template>
  <norm-layout :icon="InvestmentData.icon" :title="InvestmentData.text" :half="InvestmentData.half">
    <p class="topTitle">引入投资总额
      <span>{{InvestmentData.Investment}}</span><small>亿元</small>
    </p>
    <div ref="canvasChart" style="height: 100%"></div>
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
    InvestmentData: {
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
    InvestmentData: {
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
        yAxis: Object.assign({}, option.yAxis, { data: this.InvestmentData.title }),
        series: Object.assign({}, option.series, {
          data: this.InvestmentData.data
        })
      })
    }
  }
}
</script>
<style scoped lang="less">
  .topTitle{line-height: 0.5rem;
    color: #C9EEFF;
    font-size:12px;
    text-align: left;
    span{
      font-weight: 900;
      font-size: 26px;
      color: #38FBF9;
      margin:0 0.1rem;
    }
    small{
      color: #38FBF9;
      font-size:12px;
    }
  }
</style>
