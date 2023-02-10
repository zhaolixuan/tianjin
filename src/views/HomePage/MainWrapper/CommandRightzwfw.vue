<template>
  <div class="zwfw_box">
    <div class="zwfw_left">
      <radar :id="radar.id" :clazz="radar.class" :option="radar.option" ></radar>
    </div>
    <div class="zwfw_right">
      <div class="line_left"></div>
      <div class="line_right"></div>
      <ul>
        <li><p>{{zwfw.yxfqlqd||''}}</p><span>{{zwfw.avgPeriod||''}}</span>项</li>
        <li><p>{{zwfw.xfxzqqd||''}}</p><span>{{zwfw.powerList||''}}</span>项</li>
      </ul>
    </div>
  </div>

</template>
<script>
import { fetch } from '@/api/base'
import * as jdChart from '@/components/Echarts/index.js'
export default {
  data () {
    return {
      data: {},
      radar: {
        id: 'radar',
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
        _$.data = data.data || {}
        _$.radar = {
          id: 'radar',
          class: '',
          option: {
            style: 'width:100%;height:80%'
          }
        }
      })
  },
  components: {
    ...jdChart
  },
  computed: {
    zwfw () {
      if (this.data.zwfw && this.data.zwfw.data) {
        return this.data.zwfw.data
      }
      return {}
    }
  }
}
</script>
<style scoped>
  .zwfw_box{
    height: 78%;
    position:relative;
  }
  .zwfw_left{
    width: 70%;
    float: left;
    height: 90%;
    margin-top: .1rem;
  }
  .zwfw_right{
    width: 30%;
    float: left;
    background: rgba(12,70,125,0.15);
    color: #B1DFFF;
    font-size: .14rem;
    width:1.27rem;
    height:1.45rem;
    position: absolute;
    right: .15rem;
    bottom: .15rem;

  }
  .zwfw_right ul li{
    width: 1rem;
    margin: .19rem auto 0 auto ;
  }
  .zwfw_right ul li span{
    font-size: .20rem;
  }
  .zwfw_right div{
    background: -webkit-radial-gradient(rgba(31,172,255,0.6),rgba(0,65,135,0.2), rgba(31,172,255,0.2));
    background: -o-radial-gradient(rgba(31,172,255,0.6),rgba(0,65,135,0.2), rgba(31,172,255,0.2));
    background: -moz-radial-gradient(rgba(31,172,255,0.6),rgba(0,65,135,0.2), rgba(31,172,255,0.2));
    background: radial-gradient(rgba(31,172,255,0.6),rgba(0,65,135,0.2), rgba(31,172,255,0.2));
    position: absolute;
    width: .01rem;
    height:100%;
  }
  .line_left{
    left: 0;
  }
  .line_right{
    right:.02rem;
  }
</style>
