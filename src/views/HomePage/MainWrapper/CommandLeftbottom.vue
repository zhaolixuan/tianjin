<template>
  <div class="yjqs_box">
    <bar :id="bar.id" :clazz="bar.class" :option="bar.option" ></bar>
  </div>
</template>

<script>
import { fetch } from '@/api/base'
import * as jdChart from '@/components/Echarts/index.js'
export default {
  data () {
    return {
      bar: {
        id: 'bar',
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
        _$.bar.gdp = data.data.gdp
      })
  },
  components: {
    ...jdChart
  }
}
</script>
<style scoped>
  .yjqs_box{
    height: 78%;
  }
</style>
