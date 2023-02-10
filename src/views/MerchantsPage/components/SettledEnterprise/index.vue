
<template>
  <norm-layout :icon="SettledEnterpriseData.icon" :title="SettledEnterpriseData.text" :half="false">
    <div ref="canvasChart" style="height: 100%;"></div>
  </norm-layout>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import defaultOptions from './option.js'
import NormLayout from '@/views/ProvideAged/components/NormLayout.vue'
import echarts from 'echarts'
export default {
  name: 'SettledEnterprise',
  mixins: [initChart],
  components: {
    NormLayout
  },
  props: {
    SettledEnterpriseData: {
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
    SettledEnterpriseData: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    computedOptions () {
      let privately = ''
      let state = ''
      let invest = ''
      let register = ''
      let firm = this.SettledEnterpriseData.InEnttype || []
      let investData = this.SettledEnterpriseData.investment || []
      firm.map(item => {
        privately = firm[0].entType + String(Math.round((firm[0].entTypeRate) * 100) + '%')
        state = firm[1].entType + String(Math.round((firm[1].entTypeRate) * 100) + '%')
      })
      investData.map(item => {
        invest = investData[0].registerOrinvestment + String(Math.round((investData[0].registerOrinvestmentRate) * 100) + '%')
        register = investData[1].registerOrinvestment + String(Math.round((investData[1].registerOrinvestmentRate) * 100) + '%')
      })
      const option = this.defaultOptions
      return Object.assign({}, option, {
        legend: Object.assign(option.legend, [
          Object.assign(option.legend[0], {data: [privately, state]}),
          Object.assign(option.legend[1], {data: [invest, register]})
        ]),
        series: Object.assign(option.series, [
          Object.assign(option.series[0], {data: [
            {
              name: privately,
              value: firm.map(item => Math.round((firm[0].entTypeRate) * 100)),
              itemStyle: {
                color: new echarts.graphic.LinearGradient(
                  1, 0, 0, 1, [
                    {offset: 0, color: '#DF98FF'},
                    {offset: 1, color: '#B500FF'}
                  ]
                ),
                global: false
              }
            },
            {
              name: state,
              value: firm.map(item => Math.round((firm[1].entTypeRate) * 100)),
              itemStyle: {
                color: new echarts.graphic.LinearGradient(
                  1, 0, 0, 1, [
                    {offset: 0, color: 'rgba(164,234,255,1)'},
                    {offset: 1, color: 'rgba(0,134,245,1)'}
                  ]
                ),
                global: false
              }
            }
          ]

          }),
          Object.assign(option.series[1], {data: [
            {
              name: invest,
              value: investData.map(item => Math.round((investData[0].registerOrinvestmentRate) * 100)),
              itemStyle: {
                color: new echarts.graphic.LinearGradient(
                  1, 0, 0, 1, [
                    {offset: 0, color: '#FCC8E9'},
                    {offset: 1, color: '#FA6BA3'}
                  ]
                ),
                global: false
              }
            },
            {
              name: register,
              value: investData.map(item => Math.round((investData[1].registerOrinvestmentRate) * 100)),
              itemStyle: {
                color: new echarts.graphic.LinearGradient(
                  1, 0, 0, 1, [
                    {offset: 0, color: '#FFF04C'},
                    {offset: 1, color: '#F3FAC0'}
                  ]
                ),
                global: false
              }
            }
          ]})
        ])
      })
    }
  }
}
</script>
