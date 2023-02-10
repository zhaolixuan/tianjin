<template>
    <div class="chart_help">
      <div ref="canvasChart" style="height: 100%;"></div>
    </div>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import { createTitles, createBar, createGenderRatio, defaultOptions } from './option.js'

export default {
  name: 'ServiceChart',
  mixins: [initChart],
  data () {
    return {
      defaultOptions,
      timer: null,
      name: ''
    }
  },
  props: {
    twoData: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    computedOptions () {
      const option = this.defaultOptions
      console.log(this.twoData)
      // const getAgeNumber = (sex, age) => {
      //   const sexIns = this.charstData.find(item => item.sex === sex)
      //   return sexIns ? sexIns[age] : 0
      // }
      // const getSexNumber = (sex) => {
      //   const sexIns = this.charstData.find(item => item.sex === sex)
      //   return sexIns ? sexIns.sexTotal : 0
      // }
      // const getBarData = (sex) => [
      //   getAgeNumber(sex, 'sixTotal'),
      //   getAgeNumber(sex, 'sevenTotal'),
      //   getAgeNumber(sex, 'eightTotal'),
      //   getAgeNumber(sex, 'nineTotal')
      // ]

      // const maleNumber = getSexNumber('女')
      // const famaleNumber = getSexNumber('男')
      // const maleRatio = Math.round((maleNumber * 100) / (maleNumber + famaleNumber)) || 0
      // const famaleRatio = Math.round((famaleNumber * 100) / (maleNumber + famaleNumber)) || 0

      // return Object.assign({}, option, {
      //   title: createTitles(maleNumber, famaleNumber),
      //   series: [
      //     ...createBar(getBarData('女'), getBarData('男')),
      //     ...createGenderRatio(maleRatio, famaleRatio)
      //   ]
      // })
      return []
    }
  }
}
</script>
<style lang="less" scoped>
.chart_help{
  height: 90%;
  padding-left: .2rem;
}
</style>
