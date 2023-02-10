<template>
  <div class="tpgj_box">
    <ul class="tpgj_list">
      <li><i class="line_1"></i>{{tpgj.ggtsytprk||''}}</li>
      <li><i class="line_2"></i>{{tpgj.gspkhzftj||''}}</li>
      <li><i class="line_3"></i>{{tpgj.sscyfpxm||''}}</li>
      <li><i class="line_4"></i>{{tpgj.tspkhrjhj||''}}</li>
    </ul>
    <div class="funnel_bg">
      <div class="circle_1"></div>
      <div class="circle_2">
        <span class="ball ball_1"></span>
        <div class="ball2_box">
          <span class="ball ball_2"></span>
        </div>
      </div>
      <ul>
        <li>{{tpgj.familyNum||''}}</li>
        <li>{{tpgj.zftj||''}}</li>
        <li>{{tpgj.industryTotal||''}}</li>
        <li>{{tpgj.rjhj||''}}</li>
      </ul>
    </div>
    <!--<div class="tpgj_pkc">-->
      <!--<div class="line_left"></div>-->
      <!--<div class="line_right"></div>-->
      <!--<p>{{data.tpgj.data.ggtsyclpkc}}<span>{{data.tpgj.data.totalPovertyCountry}}</span>个</p>-->
    <!--</div>-->
  </div>
</template>
<script>
//* eslint-disable */
import { fetch } from '@/api/base'
export default {
  data () {
    return {
      data: {}
    }
  },
  created () {
    const _$ = this
    fetch('/api/data', {})
      .then(function (data) {
        _$.data = data.data || {}
      })
  },
  computed: {
    tpgj () {
      if (this.data.tpgj && this.data.tpgj.data) {
        return this.data.tpgj.data
      }
      return {}
    }
  }
}
</script>
<style scoped>
  .tpgj_list{
    font-size: .14rem;
    color: #B1DFFF;
    float: left;
    margin: .35rem 0 0 .25rem;
  }
  .tpgj_list li{
    padding: .08rem 0 .22rem 0;
    position: relative;
  }
  .tpgj_list li i{
    background:rgba(255,255,255,0.20);
    height: 1px;
    display: inline-block;
    position: absolute;
    top: 0;
  }
  .line_1{
    width: 1.3rem;
  }
  .line_2{
    width: 1.5rem;
  }
  .line_3{
    width: 2rem;
  }
  .line_4{
    width: 2.2rem;
  }
  .funnel_bg{
    float: left;
    background: url("../../../assets/img/funnel_bg.png") no-repeat;
    width: 2.5rem;
    height: 1.64rem;
    background-size: 2.5rem 1.64rem;
    margin-top: .25rem;
    position: relative;
    font-size:.18rem;
    color: #DDF2FF;
    text-align: center;

  }
  .funnel_bg ul li{
    height: .5rem;
    line-height: .5rem;
  }
  .funnel_bg ul li span{
    margin: 0 .1rem;
  }
  .funnel_bg ul li:first-child{
    margin-top: -.25rem;
  }
  .tpgj_box{
    position: relative;
    height: 83%;
  }
  .tpgj_pkc{
    position: absolute;
    background: rgba(12,70,125,0.15);
    color: #B1DFFF;
    font-size: .14rem;
    background: rgba(12,70,125,0.15);
    color: #B1DFFF;
    font-size: .14rem;
    width: 1.05rem;
    height: .8rem;
    right: .15rem;
    bottom: .15rem;
  }
  .tpgj_pkc p{
    width: .85rem;
    margin: .1rem auto;
  }
  .tpgj_pkc p i{
    display: block;
    font-style: normal;
  }
  .tpgj_pkc p span{
    font-size: .22rem;
  }
  .tpgj_pkc div{
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
  .circle_1{
    background: url("../../../assets/img/circle1.png") no-repeat;
    width:2.4rem;
    height: .85rem;
    background-size: 2.4rem .85rem;
    position: absolute;
    top: .2rem;
    /* -webkit-animation: animal 4s infinite linear ; */
    -webkit-transform-origin: center center;
    -ms-transform-origin: center center;
    transform-origin: center center;
  }
  .circle_2{
    background: url("../../../assets/img/circle2.png") no-repeat;
    width:2.5rem;
    height: .35rem;
    background-size: 2.5rem .35rem;
    position: absolute;
    top:.42rem;
  }
  @-webkit-keyframes animal {
    0%{
      transform: rotate(-360deg);
      -ms-transform: rotate(-360deg);
      -webkit-transform: rotate(-360deg);
    }
    100%{
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
    }
  }
  .circle_2 .ball{
    display: block;
    width: .07rem;
    height: .07rem;
    border-radius: .07rem;
    position: absolute;
    z-index: 99;
    left: 0;
  }
  .circle_2 .ball2_box{
    width: 100%;
    height: 100%;
    transform: rotate(18deg)
  }
  .circle_2 .ball_1{
    background: #16FFF9;
    animation:
      animX 2s cubic-bezier(0.36, 0, 0.64, 1) -1s infinite alternate,
      animY 2s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
      scale 3s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate;
  }
  .circle_2 .ball_2 {
    background: orange;
    animation:
      animX 2s cubic-bezier(0.36, 0, 0.64, 1) -2s infinite alternate,
      animY 2s cubic-bezier(0.36, 0, 0.64, 1) 1s infinite alternate,
      scale 3s cubic-bezier(0.36, 0, 0.64, 1) 1s infinite alternate;
  }
  @keyframes animX{
    0% {left: 0px;}
    100% {left: 2.45rem;}
  }
  @keyframes animY{
    0% {top: 0px;}
    100% {top: .3rem;}
  }
  @keyframes scale {

    0% {
      transform: scale(0.8)
    }
    50% {
      transform: scale(.9)
    }
    100% {
      transform: scale(0.8)
    }
  }



</style>

