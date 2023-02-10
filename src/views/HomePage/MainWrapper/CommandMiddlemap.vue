<style scoped>
  .map_box{
    width: 100%;
    z-index: 5;
  }
  .map_bg{
    background: url("../../../assets/img/map.png") no-repeat;
    width:9.46rem;
    height: 6.53rem;
    background-size: 9.46rem 6.53rem;
    margin:  0 auto;
    position: relative;
    top: .2rem;
  }
  .map_bg .pop{
    font-size: .12rem;
    color: #fff;
    position: absolute;
  }
  .map_bg .pop dl{
    overflow: hidden;
  }
  .map_bg .pop_1 dl{
    margin-left: -.1rem;
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
  .map_bg .pop dt{
    width: .94rem;
    height: .94rem;
    background-size: .94rem .94rem;
    float: left;
    position: relative;
  }
  .map_bg .pop dt em{
    background: url("../../../assets/img/round.png") no-repeat;
    display: inline-block;
    width: .94rem;
    height: .94rem;
    background-size: .94rem .94rem;
    -webkit-animation: animal 4s infinite linear ;
    -webkit-transform-origin: center center;
    -ms-transform-origin: center center;
    transform-origin: center center;
  }
  .map_bg .pop dt p{
    position: absolute;
    left:.2rem;
    top:0;
  }
  .map_bg .pop dt span{
    width: .6rem;
    display:block;
    margin: .25rem auto 0 auto;
    text-align: center;
  }
  .map_bg .pop dt i{
    font-size: .14rem;
    display: block;
    font-style: normal;
    width: .6rem;
    margin:  0 auto;
    text-align: center;
  }
  .map_bg .pop dt span b{
    font-size: .18rem;
  }
  .map_bg .pop dd{
    background: url("../../../assets/img/brand.png") no-repeat;
    width: 1.74rem;
    height: .94rem;
    background-size: 1.74rem .94rem;
    float: left;
    margin-left: -.17rem;
  }
  .map_bg .pop dd p{
    height: .3rem;
    line-height: .3rem;
    width: 1.3rem;
    margin:.1rem 0 0 .35rem;
    border-bottom: 1px solid rgba(255,255,255,.5);
  }
  .map_bg .pop dd p i{
    background: url("../../../assets/img/icon.png") no-repeat;
    display: inline-block;
    width: .12rem;
    height: .12rem;
    background-size: .12rem .12rem;
    vertical-align: middle;
    margin-right: .05rem;
  }
  .line_1{
    background: url("../../../assets/img/line_1.png") no-repeat;
    width: .42rem;
    height: .59rem;
    background-size:.42rem .59rem;
    margin: .08rem 0 0 1.2rem;
  }
  .pop_1{
    top:21%;
    left:45%;
  }
  .pop_1 dl{
    float: left;
    margin-top: -.95rem;
  }
  .map_bg .pop dd span{
    margin-left: .33rem;
    display: block;
    margin-top: .05rem;
  }

  .map_bg .pop dd span em{
    display: block;
    font-style: normal;
  }
  .map_bg .pop dd  b,.map_bg .pop dd strong{
    font-size: .18rem;
  }
</style>
<template>
  <div class="map_box gdpmap">
    <div class="map_bg">
      <div class="pop pop_1">
        <dl>
          <dt><em></em><p><span><b title="麒麟科技创新园">1935</b>亿</span><i>生产总值</i></p></dt>
          <dd><p><i></i>人口总数<b title="麒麟科技创新园">107.8</b>万</p><span><em>规划总面积</em><strong title="麒麟科技创新园">83km²</strong></span></dd>
        </dl>
        <div class="line_1"></div>
      </div>
    </div>
  </div>
</template>

<script>
//* eslint-disable */
export default {
  data () {
    return {
    }
  }
}
</script>
