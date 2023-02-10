<template>
  <div class="l_m_main">
  <div class="l_m_top">
    <div class="szsy_bar">
      <div class="star_bg"></div>
      <div class="bar_bg1"></div>
      <div class="bar_line1"></div>
      <em class="swtz">
        <p>引进国内总投资</p>
        <b>323.8</b>亿
      </em>
      <div class="bar_bg2">
        <span class="bar_left"></span>
        <div class="middle_width">
          <span class="bar_middle"> <span class="bar_line2"></span></span>
        </div>
        <span class="bar_right"></span>
        <em class="gwtz">
          <p>引进国外总投资</p>
          <b>32.58</b>亿
        </em>
      </div>
    </div>
    <div class="line_bottom"></div>
  </div>
  <div class="l_m_bottom">
    <ul class="szsy_ratio">
      <li>签约项目资金到位率<span>67.20<i>%</i></span></li>
      <li>签约项目开工率<span>57.98<i>%</i></span></li>
    </ul>
    <div class="szsy_project">
      <h2>当前处于阶段</h2>
      <ul>
        <li><i class="iconfont iconqianyue"></i><span>华润项目</span>（签约阶段）</li>
        <li><i class="iconfont iconkaigong"></i><span>氢能源项目</span>（开工阶段）</li>
      </ul>
    </div>
  </div>
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
        _$.data = data.data
      })
  }
}
</script>
<style scoped>
  .l_m_main{
    height: 78%;
  }
  .l_m_top{
    height:38%;
    margin: 0 .2rem;
  }
  .l_m_bottom{
    height:60%;
    font-size: .14rem;
    color: #B1DFFF;
    overflow: hidden;
    margin: 0 .2rem;
    position: relative;
  }
  .line_bottom{
    background: -webkit-radial-gradient(rgba(31,172,255,0.3),rgba(0,65,135,0.2), rgba(31,172,255,0.2));
    background: -o-radial-gradient(rgba(31,172,255,0.3),rgba(0,65,135,0.2), rgba(31,172,255,0.2));
    background: -moz-radial-gradient(rgba(31,172,255,0.3),rgba(0,65,135,0.2), rgba(31,172,255,0.2));
    background: radial-gradient(rgba(31,172,255,0.3),rgba(0,65,135,0.2), rgba(31,172,255,0.2));
    height: 1px;
    margin-top: .2rem;
  }
  .szsy_ratio{
    float: left;
    width: 50%;
    position: absolute;
    top: 50%;
    -webkit-transform:translateY(-50%);
  }
  .szsy_ratio li{
    margin-top: .1rem;
  }
  .szsy_ratio span{
    display: block;
    color: #fff;
    font-size: .18rem;
    margin-top: .03rem;
  }
  .szsy_ratio li i{
    font-size: .14rem;
    font-style: normal;
  }
  .szsy_project{
    float: left;
    width: 50%;
    left: 50%;
    position: absolute;
    top: 50%;
    -webkit-transform:translateY(-50%);
  }
  .szsy_project h2{
    font-size: .16rem;
    font-weight: normal;
  }
  .szsy_project  ul li{
    margin-top:.15rem;
  }
  .szsy_project  ul li span{
    font-size: .16rem;
  }
  .szsy_project  ul li i{
     font-size: .16rem;
    margin-right: .05rem;
  }
  .szsy_bar{
    position: relative;
    width: 4.24rem;
    height: .62rem;
    margin: .15rem 0 0 0;
  }
  .bar_bg1{
    background: url("../../../assets/img/bar_bg1.png") no-repeat;
    width: 4.24rem;
    height: .62rem;
    background-size:4.24rem .62rem;
    position: absolute;
    z-index: 99;
  }
  .bar_line1{
    background-image: linear-gradient(-90deg, #24BDBA 0%, #45E794 100%);
    width: 4.04rem;
    height: .06rem;
    position: absolute;
    left: 0;
    bottom:.1rem;
    z-index: 9;

  }
  .bar_bg2{
    position: absolute;
    z-index: 999;
    right: 0;
    top: -0.01rem;
    height: .63rem;
    min-width: 30%;
    width: 30%;
  }
  .bar_left{
    background: url("../../../assets/img/bar_left.png") no-repeat;
    width: .18rem;
    height: .63rem;
    background-size: .18rem .63rem;
    float: left;
  }
  .bar_right{
    background: url("../../../assets/img/bar_right.png") no-repeat;
    width: .2rem;
    height: .63rem;
    background-size: .2rem .63rem;
    float: left;
  }
  .bar_middle{
    background: url("../../../assets/img/bar_middle.png") repeat-x;
    width: 100%;
    height: .63rem;
    background-size:100% .63rem;
    float: left;
    position: relative;
  }
  .bar_line2{
    background-image: linear-gradient(-90deg, #C83205 0%, #FF8D63 100%);
    height: .06rem;
    position: absolute;
    left:-.18rem;
    bottom:.1rem;
    z-index: 999;
    width:calc(100% + .18rem)
  }
  .star_bg{
    background: url("../../../assets/img/star.png") repeat-x;
    position: absolute;
    width: 100%;
    height: .49rem;
    z-index:99999;
    bottom: 0;
  }
  .swtz,.gwtz{
    font-size: .14rem;
    position: absolute;
    z-index: 9999;
    font-style: normal;
    left: .2rem;
    top: -.1rem;
    color: #fff;
  }
  .swtz p,.gwtz p{
    margin-bottom: .1rem;
    color: #B1DFFF;
  }
  .swtz b,.gwtz b{
    font-size: .2rem;
    font-weight: normal;
  }
  .middle_width{
    float: left;
    width:calc(100% - .18rem - .2rem);
  }
</style>
