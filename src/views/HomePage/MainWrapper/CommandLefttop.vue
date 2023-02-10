<template>
  <div class="cyfz_box">
    <div class="cyfz_main1 clearfix">
      <div class="sector_chart">
        <gauge :id="gauge.id" :clazz="gauge.class" :option="gauge.option" :value="data.speedUp||0"></gauge>
        <span class="num_1">0</span>
        <span class="num_2">10</span>
        <em>产值增速</em>
      </div>
      <div class="pie_chart">
        <div class="pie_1">
        <pie id="pie1" :clazz="pie.class" :option="pie.option" :name="data.first" :value="data.firstIndustry||0"></pie>
        </div>
        <div class="pie_2">
        <pie id="pie2" :clazz="pie.class" :option="pie.option" :name="data.second" :value="data.secondIndustry||0"></pie>
        </div>
        <div class="pie_3">
        <pie id="pie3" :clazz="pie.class" :option="pie.option" :name="data.third" :value="data.thirdlyIndustry||0"></pie>
        </div>
      </div>
    </div>
    <div class="cyfz_main2">
      <ul>
        <li>{{data.scztzl}}<span>{{data.marketEntityProportion}}%</span><i>↑</i><p><b>{{data.marketEntity}}</b>{{data.scztzlunit}}</p></li>
        <li>{{data.zczj}}<span>{{data.registeredFundProportion}}%</span><i>↑</i><p><b>{{data.registeredFund}}</b>{{data.zczjunit}}</p></li>
      </ul>
    </div>
    <div class="cyfz_main3">
      <ul>
        <li><p>{{data.qyhs}}<b>{{data.enterpriseNum}}</b>{{data.scztzlunit}}</p><div class="progress_bar"><em><span style="width: 52%"><b class="icon_quan"></b></span></em><i>52%</i></div> </li>
        <li><p>{{data.gths}}<b>{{data.individualNum}}</b>{{data.scztzlunit}}</p><div class="progress_bar"><em><span style="width: 48%"><b class="icon_quan"></b></span></em><i>48%</i></div> </li>
      </ul>
    </div>
    <div class="cyfz_main4">
      <div class="line_top"></div>
      <!--<div class="main4_tit">-->
        <!--<span class="hb_tit"><i></i>环比</span><span class="ry_tit"><i></i>市场规模/亿元</span>全球人工智能市场规模及增长率-->
      <!--</div>-->
      <!--<div class="main4_chart">-->
      <!--<column :id="column.id" :clazz="column.class" :option="column.option" ></column>-->
      <!--</div>-->
      <div class="zcz_tit"> 产业总产值<em><b>150.95</b>亿</em></div>
      <ul class="sy_ul">
        <li><i class="iconfont iconchanyezongzhi"></i>新材料产业<em><b>27.17</b>亿</em></li>
        <li><i class="iconfont iconchanyezongzhi"></i>新一代信息技术<em><b>27.17</b>亿</em></li>
        <li><i class="iconfont iconchanyezongzhi"></i>新能源产业<em><b>27.17</b>亿</em></li>
        <li><i class="iconfont iconchanyezongzhi"></i>数字创意产业<em><b>27.17</b>亿</em></li>
        <li><i class="iconfont iconchanyezongzhi"></i>智能制造产业<em><b>27.17</b>亿</em></li>
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
      data: {
        speedUp: 8.1,
        speedUpName: 'GDP增速jn',
        sum: 11715,
        sumName: '生产总值',
        sumUnit: '亿元',
        order: 2,
        orderName: '生产总值省内排名',
        fixedAssets: 6362,
        fixedAssetsName: '固定资产投资',
        fixedAssetsUnit: '亿元',
        population: 680,
        populationName: '总人口',
        populationUnit: '万人',
        title: '产业发展',
        hsunit: '万户',
        first: '第一产业',
        second: '第二产业',
        third: '第三产业',
        firstIndustry: 2.2,
        secondIndustry: 38.0,
        thirdlyIndustry: 59.8,
        marketEntity: 107,
        marketEntityProportion: 30,
        registeredFundProportion: 43,
        registeredFund: 19534,
        enterpriseNum: 55,
        enterpriseNumProportion: 25,
        individualNum: 52,
        individualNumProportion: 75,
        boxcy_tit: '三大产业占比jn',
        scztzl: '市场主体总量（万户）',
        zczj: '注册资金(亿元)',
        scztzlunit: '万户',
        zczjunit: '亿元',
        qyhs: '企业户数',
        gths: '个体户数'
      },
      gauge: {
        id: 'gauge',
        class: '',
        option: {
          style: 'width:100%;height:100%'
        }
      },
      column: {
        id: 'column',
        class: '',
        option: {
          style: 'width:100%;height:100%'
        }
      },
      pie: {
        id: 'pie1',
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
        _$.data = data.data.chanyefazhan || {}
      })
  },
  components: {
    ...jdChart
  }
}
</script>
<style scoped>
  .clearfix:after{visibility:hidden;display:block;font-size:0;content: " ";clear:both;height:0;}
  .clearfix{*zoom:1;}
  .cyfz_box{
    font-size: .12rem;
    color:#B1DFFF;
    height:88%;
    margin: 0 .25rem;
  }
  .cyfz_main1{
    height: 20%;
  }
  .cyfz_main1 div{float:left}
  .cyfz_main2{
    height: 14%;
    margin-top: .2rem;
  }
  .cyfz_main2 ul{
    display: flex;
  }
  .cyfz_main2 ul li{
    flex: 1;
  }
  .cyfz_main2 ul li span{
    color: #fff;
    font-size: .16rem;
    margin-left: .08rem;
  }
  .cyfz_main2 ul li i{
    font-style: normal;
    color:#FF5053 ;
    font-size: .14rem;
    margin-left: .03rem;
  }
  .cyfz_main2 ul li p{
    color: #fff;
  }
  .cyfz_main2 ul li b{
    font-size: .24rem;
    color: #fff;
    font-weight: normal;
  }
  .cyfz_main3{
    height: 15%;
    margin-top: .1rem;
  }
  .cyfz_main3 ul{
    display: flex;
  }
  .cyfz_main3 ul li{
    flex: 1;
  }
  .cyfz_main3 ul li .progress_bar i{
    font-style: normal;
    margin-left: .1rem;
  }
  .cyfz_main3 ul li .progress_bar em{
    display: inline-block;
    background: linear-gradient(-90deg, rgba(36,189,186,.4),rgba(69,231,148,.4));
    border-radius: 10px;
    width: 1.3rem;
    height: .08rem;
    margin-top: .1rem;
    position: relative;
  }
  .cyfz_main3 ul li .progress_bar em span{
    display: inline-block;
    background: linear-gradient(-90deg, rgba(36,189,186,1),rgba(69,231,148,1));
    border-radius: 10px;
    position: absolute;
    left: 0;
    opacity:1;
    top: 0;
    height: .08rem;
  }
  .cyfz_main3 ul li p b{
    font-weight: normal;
    font-size: .22rem;
    margin-left:.08rem;
    color: #fff;
  }
  .cyfz_main3 ul li .icon_quan{
    background: url("../../../assets/img/quan.svg") no-repeat;
    display:inline-block;
    width:.18rem;
    height: .18rem;
    background-size: .18rem .18rem;
    position: absolute;
    top:-.05rem;
    right:-.02rem;
  }
  .cyfz_main4{
    margin-top: 2%;
    height: 40%;
  }
  .line_top{
    background: -webkit-radial-gradient(rgba(31,172,255,0.3),rgba(0,65,135,0.2), rgba(31,172,255,0.2));
    background: -o-radial-gradient(rgba(31,172,255,0.3),rgba(0,65,135,0.2), rgba(31,172,255,0.2));
    background: -moz-radial-gradient(rgba(31,172,255,0.3),rgba(0,65,135,0.2), rgba(31,172,255,0.2));
    background: radial-gradient(rgba(31,172,255,0.3),rgba(0,65,135,0.2), rgba(31,172,255,0.2));
    width: 100%;
    height: .01rem;
  }
  .cyfz_main4 p{
    padding-top: .2rem;
  }
  .cyfz_main4 p span{
    font-size: .22rem;
    color:#fff;
    margin-left: .1rem;
  }
  .cyfz_main4 ul{
    overflow: hidden;
  }
  .cyfz_main4 ul li{
    float: left;
    width: 50%;
    margin-top: .06rem;
  }
  .cyfz_main4 ul li em{
    display: inline-block;
    padding-left: .08rem;
    font-style: normal;
    font-size: .12rem;
  }
  .cyfz_main4 ul li span{
    font-size: .18rem;
    color: #fff;
    margin-left: .1rem;
  }
  .iconchanyezongzhi{
    font-size: .16rem;
  }
  .sector_chart{
    width: 35%;
    height: 100%;
    float: left;
    position: relative;
  }
  .sector_chart span{
    font-size: .12rem;
    color:rgba(255,255,255,.4);
    position: absolute;
    bottom:-.1rem;
  }
  .sector_chart span.num_1{
    left:.08rem
  }
  .sector_chart span.num_2{
    right:.16rem;
  }
  .sector_chart em{
    position: absolute;
    font-style: normal;
    color: #DDF2FF;
    left: 50%;
    margin-left: -20%;
    bottom:-.15rem;
  }
  .pie_chart{
    width: 65%;
    height: 100%;
  }
  .pie_chart div{
    width: 33%;
    height: 120%;
  }
  .main4_tit{
    height: 12%;
    padding-top: .12rem;
  }
  .main4_tit span{
    float: right;
    margin-left: .2rem;
  }
  .main4_chart{
    height: 80%;
  }
  .main4_tit  span.ry_tit i{
    background: #44C4E3;
    width: .1rem;
    height: .1rem;
    position: static;
    display: inline-block;
    margin-right: .05rem;
    vertical-align: middle;
  }
  .main4_tit span.hb_tit i{
    position: static;
    display: inline-block;
    margin-right: .05rem;
    background: url("../../../assets/img/hb_line.png") no-repeat;
    width: .29rem;
    height: .08rem;
    background-size: .29rem .08rem;
  }
  .zcz_tit{
    font-size: .12rem;
    margin: .15rem 0 .05rem 0;
  }
  .zcz_tit em{
    color: #fff;
    font-style: normal;
  }
  .zcz_tit b{
    font-size: .18rem;
    margin:0 .05rem 0 .1rem;
  }
  .sy_ul li{
    height: .24rem;
    line-height: .24rem;
  }
  .sy_ul li i{
    margin-right:.1rem;
  }
  .sy_ul li em{
    color: #fff;
  }
  .sy_ul li em b{
    font-size: .16rem;
    margin:0 .03rem 0 .05rem;
  }
</style>
