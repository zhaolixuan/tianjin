<template>
  <norm-layout :icon="SectiontData.icon" :title="SectiontData.text" :half="false">
    <div ref="canvasChart" style="height: 100%;"></div>
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
    SectiontData: {
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
    SectiontData: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    computedOptions () {
      const InDocument = this.SectiontData.InDocument || []
      const option = this.defaultOptions
      let getMax = InDocument.length > 0 ? Math.max.apply(Math, InDocument.map(item => { return item.introductionCount })) : []
      let max = Math.ceil(getMax)
      let title = []
      InDocument.map((item, index) => {
        let text = InDocument.length > 0 ? InDocument[index].documentName : []
        title.push({text, max})
      })
      return Object.assign({}, option, {
        radar: Object.assign({}, option.radar, {
          indicator: title
        }),
        series: Object.assign({}, option.series, {
          data: [
            {
              value: InDocument.length > 0 ? InDocument.map(item => item.introductionCount) : [],
              name: InDocument.length > 0 ? InDocument.map(item => item.documentName) : []
            }
          ]
        })
      })
    }
  }
}
</script>
