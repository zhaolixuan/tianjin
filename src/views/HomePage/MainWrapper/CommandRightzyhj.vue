<template>
  <div class="zyhj_box">
    <div class="milieu_top">
      <p><span>{{hjzy.aqiLevelName}} <i class="aqi">{{hjzy.aqiLevel}}</i></span><span class="sky">{{hjzy.aqiname}} <i class="aqiLevel">{{hjzy.aqi}}</i></span><span class="sky"> {{hjzy.blueSkyName}} <i class="blueSky">{{hjzy.blueSky}}%</i></span></p>
    </div>
    <div class="milieu_bottom">
      <div class="pollute_left">
        <p>{{hjzy.zywr}}</p>
        <img src="../../../assets/img/PM2.5.svg">
        <span class="pollutant">{{hjzy.pollutant}}</span>
      </div>
      <div class="pollute_right sewageChart" id="pollute_right">
        <liquidFill id="liquidFill1" :clazz="liquidFill.class" :option="liquidFill.option1" :name="hjzy.wspj||''" :value="hjzy.sewage||0"></liquidFill>
        <liquidFill id="liquidFill2" :clazz="liquidFill.class" :option="liquidFill.option2" :name="hjzy.yysdb||''" :value="hjzy.drinking||0"></liquidFill>
      </div>
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
      hjzy: {
        'wspj': '污水排减',
        'yysdb': '饮水达标',
        'title': '资源环境',
        'zywr': '主要污染',
        'aqi': '良',
        'aqiname': '空气质量',
        'nationwideOrder': 3,
        'drinking': 1,
        'pollutant': '可吸入颗粒物',
        'provinceOrder': 4,
        'aqiLevel': 80,
        'aqiLevelName': 'AQI指数',
        'sewage': 0.2,
        'blueSky': 70,
        'blueSkyName': '蓝天比率'
      },
      liquidFill: {
        class: '',
        option1: {
          backgroundStyle: {
            color: 'rgba(242,139,110,0.1)'
          },
          itemStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#F89876'
            }, {
              offset: 1,
              color: '#CD3D11'
            }])
          },
          outline: {
            borderColor: 'rgba(215,82,40,0.6)'
          },
          style: 'width:50%;height:100%;float:left'
        },
        option2: {
          backgroundStyle: {
            color: 'rgba(39, 210, 207,0.1)'
          },
          itemStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#5CF6A9'
            }, {
              offset: 1,
              color: ' #27D2CF'
            }])
          },
          outline: {
            borderColor: 'rgba(39, 210, 207,0.6)'
          },
          style: 'width:50%;height:100%;float:left'
        }
      }
    }
  },
  created () {
    const _$ = this
    fetch('/api/data', {})
      .then(function (data) {
        _$.hjzy = data.data.hjzy || {}
      })
  },
  components: {
    ...jdChart
  }
}
</script>
<style scoped>
  .zyhj_box{
    height: 70%;
  }
  .milieu_top{
    height:28%;
    color:#A5DCFF;
    font-size: .16rem;
    margin-top: 2%;
  }
  .milieu_top p{
    display:flex;
    margin-right: .5rem;
  }
  .milieu_top p span{
    flex: 1;
    text-align: center;
  }
  .milieu_top p i{
    font-size:.2rem;
    font-style: normal;
    color: #41c2e3;
    margin-left: .1rem;
  }
  .milieu_bottom{
    height: 70%;
    overflow: hidden;
  }
  .pollute_left{
    float: left;
    width: 30%;
    background: url("../../../assets/img/gdp_line.png") no-repeat right 0;
  }
  .pollute_left p{
    font-size: .16rem;
    color:#BEE3FD;
    text-align: center;
  }
  .pollute_left span{
    display: block;
    font-size: .16rem;
    color:#D2EDFF ;
    text-align:center;
  }
  .pollute_left img{
    display: block;
    width: .37rem;
    height: .33rem;
    margin: .05rem auto;
  }
  .pollute_right{
    float: left;
    width: 65%;
    height: 100%;
  }
</style>
