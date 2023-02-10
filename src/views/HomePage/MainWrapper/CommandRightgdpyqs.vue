<template>
  <div class="gdpqs_box">
    <lines :id="line.id" :clazz="line.class" :option="line.option" ></lines>
  </div>
</template>

<script>
import { fetch } from '@/api/base'
import * as jdChart from '@/components/Echarts/index.js'
export default {
  data () {
    return {
      line: {
        id: 'line',
        class: '',
        option: {
          style: 'width:100%;height:100%'
        }
      }
    }
  },
  created () {
    const _$ = this
    fetch('/api/data', {})
      .then(function (data) {
        _$.line.values = data.data.gdpTrend
      })
  },
  components: {
    ...jdChart
  }
}
</script>
<style scoped>
  .gdpqs_box{
    height: 76%;
  }
</style>
