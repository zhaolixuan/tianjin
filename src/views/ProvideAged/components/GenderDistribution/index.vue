<template>
  <norm-layout icon="gender" title="老年人性别人口分布">
    <div ref="canvasChart" style="height: 100%;"></div>
  </norm-layout>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import { createTitles, createBar, createGenderRatio, defaultOptions } from './options.js'
import NormLayout from '../NormLayout.vue'

export default {
  name: 'GenderDistribution',
  mixins: [initChart],
  components: {
    NormLayout
  },
  
  // 8月18日添加
  props:['chartData'],

  data () {
    return {
      defaultOptions
    }
  },

  // 8月18日添加
  mounted(){
    console.log(this.chartData);
  },

  computed: {
    computedOptions () {
      const option = this.defaultOptions
      const getAgeNumber = (sex, age) => {
        const sexIns = this.chartData.find(item => item.sex === sex)
        return sexIns ? sexIns[age] : 0
      }
      const getSexNumber = (sex) => {
        const sexIns = this.chartData.find(item => item.sex === sex)
        return sexIns ? sexIns.sextotal : 0
      }
      const getBarData = (sex) => [
        getAgeNumber(sex, 'sixtyTotal'),
        getAgeNumber(sex, 'seventyTotal'),
        getAgeNumber(sex, 'eightyTotal'),
        getAgeNumber(sex, 'ninetyOver')
      ]

      const maleNumber = getSexNumber('1')
      console.log(maleNumber);
      const famaleNumber = getSexNumber('2')
      const maleRatio = Math.round((maleNumber * 100) / (maleNumber + famaleNumber)) || 0
      const famaleRatio = Math.round((famaleNumber * 100) / (maleNumber + famaleNumber)) || 0

      return Object.assign({}, option, {
        title: createTitles(maleNumber, famaleNumber),
        series: [
          ...createBar(getBarData('1'), getBarData('2')),
          ...createGenderRatio(maleRatio, famaleRatio)
        ]
      })
    }
  }
}
</script>
