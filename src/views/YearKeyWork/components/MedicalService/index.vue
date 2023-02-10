<template>
  <norm-layout :subtitle=MedicalRadar.subtitle :half="false">
    <div ref="canvasChart" style="height: 100%;width:60%"></div>
    <ul class="listData">
      <li v-for="item in MedicalRadar.data" :key='item.count'>
        <span>{{item.distributeName}}：</span>
        <span>{{item.count ||0}}项</span>
      </li>
    </ul>
    <article class="fileDistribution">
      <p v-for="item in MedicalRadar.data" :key='item.count'>{{item.distributeName + ':' + item.detail}}</p>
    </article>
  </norm-layout>
</template>

<script>
import initChart from '@/views/ProvideAged/mixins/initChart.js'
import defaultOptions from './option.js'
import NormLayout from '@/views/ProvideAged/components/NormLayout.vue'

export default {
  name: 'mimk',
  mixins: [initChart],
  components: {
    NormLayout
  },
  data () {
    return {
      defaultOptions
    }
  },
  props: {
    MedicalRadar: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    MedicalRadar: {
      deep: true,
      handler (oldVal, newVal) {
        this.handleResizeChart()
      }
    }
  },
  computed: {
    computedOptions () {
      const option = this.defaultOptions
      const MedicalRadar = this.MedicalRadar
      MedicalRadar.title.map((item, index) => {
        item.text = MedicalRadar.data.length > 0 ? MedicalRadar.data[index].distributeName : ''
      })
      return Object.assign({}, option, {
        radar: Object.assign({}, option.radar, {
          indicator: this.MedicalRadar.title
        }),
        series: Object.assign({}, option.series, {
          data: [
            {
              value: MedicalRadar.data.length > 0 ? MedicalRadar.data.map(item => item.count) : [1, 1, 1, 1],
              name: MedicalRadar.data.length > 0 ? MedicalRadar.data.map(item => item.distributeName) : []
            }
          ]
        })
      })
    }
  }
}
</script>
<style scoped >
  .listData{
    width: 25%;
    position: absolute;
    bottom:50%;
    right: 13%;
    transform: translateY(50%);
    font-size: 0.13rem;
    color:#C9EEFF;
    line-height: 0.3rem;
    text-align: left;
  }
  .fileDistribution{ margin-top: 0.2rem;}
  .fileDistribution p{
    font-size: 0.13rem;
    color: #C9EEFF;
    line-height: 0.17rem;
    text-align: left;
    margin-bottom: 0.25rem;
  }

</style>
