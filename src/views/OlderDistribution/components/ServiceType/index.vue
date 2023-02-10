<template>
  <div class="chart_help">
    <div ref="canvasChart" style="height: 100%;"></div>
  </div>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import {defaultOptions, createBar, createYaxis} from './option.js'

export default {
  name: 'ServiceProject',
  mixins: [initChart],
  props: {
    MedircalData: {
      type: Object,
      default: () => {}
    },
    path: {
      type: String,
      default: () => ''
    }
  },
  data () {
    return {
      defaultOptions,
      timer: null
    }
  },
  watch: {
    MedircalData: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    computedOptions () {
      const option = this.defaultOptions
      let { labelWidth, data, label, title ,isFormatter} = this.MedircalData
      title.reverse()
      data.reverse()
  
      let formatter = isFormatter||false

      return Object.assign({}, option, {
        
        yAxis: createYaxis(title),
        series: createBar(data, labelWidth, label, formatter),
      
      })
   
    }
  },
  methods: {
    GotoPage (path, query) {
      if (path) {
       this.$router.push({
          path: path,
          query: query
        })

      }
    }
  },
  mounted () {
    let _self = this
    if (this.path) {
      this.timer = setInterval(() => {
        this.chart.on('click', function (params) {
          switch (params.name) {
            // case '60-69岁':
            //   _self.GotoPage(_self.path, { code: this.breadCrumbCodes, startAge: '60', endAge: '69' })
            //   break
            // case '70-79岁':
            //   _self.GotoPage(_self.path, { code: this.breadCrumbCodes, startAge: '70', endAge: '79' })
            //   break
            // case '80-89岁':
            //   _self.GotoPage(_self.path, { code: this.breadCrumbCodes, startAge: '80', endAge: '89' })
            //   break
            // case '90岁以上':
            //   _self.GotoPage(_self.path, { code: this.breadCrumbCodes, startAge: '90' })
            //   break
            case '大专及以上':
              _self.GotoPage(_self.path, { code: this.breadCrumbCodes, education: '5' })
              break
            case '高中/中专':
              _self.GotoPage(_self.path, { code: this.breadCrumbCodes, education: '4' })
              break
            case '初中':
              _self.GotoPage(_self.path, { code: this.breadCrumbCodes, education: '3' })
              break
            case '小学':
              _self.GotoPage(_self.path, { code: this.breadCrumbCodes, education: '2' })
              break
            case '不识字':
              _self.GotoPage(_self.path, { code: this.breadCrumbCodes, education: '1' })
              break
          }
        })
      }, 3000)
    }
  },
  destroyed () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>
<style lang="less" scoped>
.chart_help{
  height: 100%;
  padding-left: .2rem;
}

</style>
