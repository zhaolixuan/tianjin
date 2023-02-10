<template>
  <div class="consume_wrapper">
    <div class="consume_head">
      <ul class="left_ul">
        <li><i><b>{{listData.budgetIncome}}</b>万元</i><em>一般公共预算收入</em></li>
        <li><i class="mt_5"><b>{{listData.incomeGrowthR}}</b>万元</i> <em>税收收入</em></li>
      </ul>
      <span>智慧河西综合管理平台</span>
      <ul class="right_ul">
         <li><em>八项重点支出金额</em> <i class="mt_5"><b>{{listData.budgetExpend}}</b>万元</i> </li>
         <li><em>变化百分比</em> <i><b>{{listData.expendGrowthR}}</b> %</i> </li>
      </ul>
    </div>
    <div class="consume_main">
      <div class="consume_left">
        <div class="hot_rank1">
          <div class="rank_title">
           <i class="iconfont iconiconchanyefazhan"></i>
           <span>产业结构</span>
          </div>
          <div class="rank_1">
            <div class="gntz_box">
              <div class="round">
                <i></i>
                 <span>{{industryData&&industryData[0]?industryData[0].industryTrend:0}}<em>%</em></span>
              </div>
              <div class="gntz_bar">
                <span class="line_1"></span>
                <p>{{industryData&&industryData[0]?industryData[0].industryType:''}}</p>
              </div>
            </div>
            <div class="gwtz_box">
              <div class="round round_2">
                <i></i>
                 <span>{{industryData&&industryData[1]?industryData[1].industryTrend:0}}<em>%</em></span>
              </div>
              <div class="gwtz_bar">
                <span class="line_2"></span>
                <p>{{industryData&&industryData[1]?industryData[1].industryType:''}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="hot_rank2">
          <div class="rank_title">
            <i class="iconfont iconzhengwufuwu"></i>
            <span>第三产业主要行业占地区生产总值比(%)</span>
          </div>
          <Commandzwfw></Commandzwfw>
        </div>
        <div class="hot_rank3">
          <div class="rank_title">
             <i class="iconfont icongdpqushi"></i>
            <span>第三产业主要行业增加值(亿元)</span>
          </div>
          <div class="rank_3">
             <pillar :id="pillar.id" :clazz="pillar.class" :option="pillar.option" :dataObj="mainIndustry"></pillar>
          </div>
        </div>
      </div>
      <div class="consume_middle">
        <ul class="gdp_ul">
          <!-- <li><b class="gdp_1"></b><span><em>GDP总量</em><i>{{listData.gdpTotal}}</i>亿元</span></li> -->
          <!-- <li><b class="gdp_2"></b><span><em>GDP增速</em><i>{{listData.gdpIncrSpeed}}</i>%</span></li>
          <li><b class="gdp_3"></b><span><em>GDP市内排名</em>第<i>{{listData.gdpProvinceRank}}</i>名</span></li> -->
        </ul>
        <ul class="menu_ul">
          <li class="menu_1">
            <a @click="HandleSwiteh">
              <i class="zwfw"></i>重点工作
              <!-- <ul>
                <li class="btn_1">经济运行</li>
                <li class="btn_2">跨境电商</li>
                <li class="btn_3">招才引智</li>
                <li class="btn_4">人口运行</li>
                <li class="btn_5">环境保护</li>
                <li class="btn_6">文化旅游</li>
              </ul> -->
            </a>
          </li>
          <li class="menu_2">
            <a @click="redirectTo('/#/olderDistribution')">
              <i class="szsy"></i>智慧养老
              <!-- <ul>
                <li class="btn_1">产业分析</li>
                <li class="btn_2">产业指数</li>
                <li class="btn_3">园区管理</li>
                <li class="btn_4">扶贫管理</li>
                <li class="btn_5">产业园咨询</li>
              </ul> -->
              </a>
            </li>
          <li class="menu_3">
            <router-link :to="{ path: 'frame', query:{'url':'https://www.maicedata.com/#/?tk=nRmJz4CO1Ex2Ax9JZSr7BK4tF8KZuQ5mlvdCzla6N90ZjZI961MBltVyTdg08psl','titleName': '经济产业分析', 'key': 3} }"><i class="xczx"></i>经济产业分析</router-link>
            <!-- <a href="#/frame?titleName=经济产业分析&key=3&url=https%3A%2F%2Fwww.maicedata.com%2F%23%2F%3Ftk%3DnRmJz4CO1Ex2Ax9JZSr7BK4tF8KZuQ5mlvdCzla6N90ZjZI961MBltVyTdg08psl"><i class="xczx"></i>经济产业分析 -->
            <!-- <ul>
                <li class="btn_1">招商态势</li>
                <li class="btn_2">重大项目管理</li>
                <li class="btn_3">产业链招商</li>
                <li class="btn_4">靶向企业</li>
                <li class="btn_5">招商政策云</li>
              </ul> -->
            <!-- </a> -->
            </li>
          <!-- <li class="menu_4">
            <router-link :to="{ path: '/Merchants' , query: { key:4 } }"><i class="cyfz"></i>招商态势</router-link> -->
            <!-- <ul>
              <li class="btn_1">指标墙</li>
              <li class="btn_2">指标追踪</li>
              <li class="btn_3">养老态势</li>
              <li class="btn_4">政务服务</li>
              <li class="btn_5">交通出行</li>
              <li class="btn_6">公共卫生</li>
            </ul> -->
            <!-- </a> -->
          <!-- </li> -->
          <li class="menu_5">
             <router-link :to="{ path: '/industryInvestment' , query: { key:5 } }"><i class="whjy"></i>产业链招商</router-link>
            <!-- <ul>
                <li class="btn_1">基础设施</li>
                <li class="btn_2">综合体征</li>
                <li class="btn_3">专题体征</li>
                <li class="btn_4">历史体征</li>
                <li class="btn_5">体征指标</li>
                <li class="btn_6">大数据管理</li>
              </ul> -->
            </li>
          <li class="menu_6">
            <a  href="#/frame?titleName=重大项目&key=6&url=/static/html/bigproject/home.html"><i class="hjzl"></i>重大项目
            <!-- <ul>
                <li class="btn_1">公共安全</li>
                <li class="btn_2">时间管理</li>
                <li class="btn_3">应急预案</li>
                <li class="btn_4">应急研判</li>
                <li class="btn_5">应急指挥</li>
              </ul> -->
            </a>
            </li>
          <!-- <li class="menu_6"><a href="#"><i class="zwfw"></i>应急联动</a></li> -->
        </ul>
      </div>
      <div class="consume_right">
        <div class="hot_rank4">
          <div class="rank_title">
            <i class="iconfont iconiconxiangcunzhenxing"></i>
            <span>八项重点支出(万元)</span>
          </div>
          <div class="rank_4">
            <rank :id="rank.id" :clazz="rank.class" :option="rank.option" :dataObj="dataObj"></rank>
          </div>
        </div>
        <!-- <div class="hot_rank5">
          <div class="rank_title">
            <i class="iconfont icongdpqushi"></i>
            <span>高端企业</span>
          </div>
          <div class="rank_5">
              <div class="pillar_tit">

              </div>
              <pillar :id="pillar.id" :clazz="pillar.class" :option="pillar.option" :dataObj="dataObj"></pillar>
          </div>
        </div> -->
        <div class="hot_rank6">
          <div class="rank_title">
            <i class="iconfont iconiconhuanjingzhiliang"></i>
            <span>人力社保(人)</span>
          </div>
          <div class="rank_6">
            <div class="circle_1">
               <p>{{humanSocial.settlePerson}}</p>
              <span>海河英才计划<br>已落户人数</span>
            </div>
            <div class="circle_4">
              <p>{{humanSocial.newJobs}}</p>
              <span>全年完成新增就业人数技术企业</span>
            </div>
            <div class="circle_5">
              <p>{{humanSocial.insuredePerson}}</p>
              <span>全年累计城镇企业职工养老保险参保缴费人数</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="left_qyzh">
      <div class="title_box">
        <i></i>市场主体
      </div>
      <div class="left_chart">
         <div class="chart_bg"><span class="chart_on"><i>{{listData.industryTotalValue}}</i></span></div>
         <i class="num_1">0</i>
         <i class="num_2">30000</i>
         <i class="num_3">60000</i>
         <i class="num_4">90000</i>
         <span>(家)</span>
      </div>
    </div>
    <div class="right_tdmj">
      <div class="title_box title_box_2">
        <i></i>注册资金
      </div>
       <div class="right_chart">
        <div class="chart_bg"><span class="chart_on"><i><em>{{listData.primaryIndustryR}}</em></i></span></div>
         <i class="num_1">0</i>
         <i class="num_2">1000</i>
         <i class="num_3">2000</i>
         <i class="num_4">3000</i>
         <span>(亿元)</span>
      </div>
    </div>
  </div>
</template>

<script>
import Commandzwfw from './Commandzwfw'
import * as jdChart from '@/components/Echarts/index.js'
import Api from '@/api/api'
export default {
  data () {
    return {
      listData: [],
      industryData: [],
      humanSocial: '',
      rank: {
        id: 'rank',
        class: '',
        option: {
          style: 'width:80%;height:100%'
        }
      },
      pillar: {
        id: 'pillar',
        class: '',
        option: {
          style: 'width:90%;height:90%'
        }
      },
      industry: {
        id: 'industry',
        class: '',
        option: {
          style: 'width:80%;height:90%'
        }
      },
      // dataObj: {
      //   city: ['一般公共服务', '公共安全', '教育', '科学技术', '社会保障和就业','卫生健康','节能环保','城乡社区'],
      //   numList: [57157, 38830, 92835, 3710, 109157,49517,4607,79324]
      // },
      dataObj: {
        city: ['一般公共服务', '公共安全', '教育', '科学技术', '社会保障和就业', '卫生健康', '节能环保', '城乡社区'],
        numList: []
      },
      // mainIndustry:{
      //   city:['金融','社会服务','批发零售','房地产','住宿和餐饮','交通仓储邮政'],
      //   numList:[267.15,121.57,47.51,28.01,19.63,10.68]
      // },
      mainIndustry: {
        city: [],
        numList: []
      }
    }
  },
  components: {
    Commandzwfw,
    ...jdChart
  },
  methods: {
    init () {
      Api.getHhIndex().then(res => {
        console.log(res)
        this.listData = res
      })
      Api.getHhIndexIndustryIncr().then(res => {
        for (var i = res.length - 1; i >= 0; i--) {
          this.industryData.push({industryTrend: res[i].industryTrend[0], industryType: res[i].industryType})
        }
      })
      Api.getIndustryStruct().then(res => {
        res.forEach((val, key) => {
          this.mainIndustry.city.push(val.industryType)
          this.mainIndustry.numList.push(val.produceValue)
        })
      })
      Api.getTjIndexHumanSocial().then(res => {
        this.humanSocial = res[0]
      })
      Api.getTjIndexImportExpend().then(res => {
        this.dataObj.numList.push(res[0].budgetServerExpend, res[0].budgetSafeExpend, res[0].budgetEducationExpend, res[0].technologyExpend, res[0].socialEmployment, res[0].healthExpend, res[0].energyProtectionExpend, res[0].townCountryExpend)
      })
    },
    redirectTo (url) {
      window.location.href = `${window.location.origin}${url}`
    },
    HandleSwiteh () {
      this.$router.push({
        name: 'yearWork',
        query: {
          key: 1
        }
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
  .consume_wrapper{
    height: 100%;
    position: relative;
  }
  .consume_head{
    font-size: .16rem;
    overflow: hidden;
    width: 100%;
    text-align: center;
    height:17%;
    color: #fff;
    text-shadow:5px 2px 5px #303030;
  }
  .consume_head ul{
    float: left;
    padding-top: .5rem
  }
  .consume_head ul li{
    float: left;
    font-size: .18rem
  }
   .consume_head ul li b{
    font-size: .24rem
  }
  .left_ul{
    margin-left:4.5%;
    width: 31%;
  }
  .left_ul li i{
    font-size:.14rem;
    font-style: normal;
    float: left;
  }
  .left_ul li i.mt_5{
     margin-top:.035rem;
  }
  .left_ul li em{
    float: right;
    font-style: normal;
    margin-top: .1rem
  }
  .left_ul li:first-child{
    width: 44%;
  }
  .left_ul li:last-child{
    width: 44%;
    margin-left: 12%
  }
  .right_ul{
    margin-right: 4.5%;
    width: 31%;
  }
  .right_ul li i{
    font-size:.14rem;
    font-style: normal;
    float: right;
  }
  .right_ul li i.mt_5{
     margin-top:.035rem;
  }
  .right_ul li em{
    float: left;
    font-style: normal;
    margin-top: .1rem
  }
   .right_ul li:first-child{
    width: 44%;
  }
  .right_ul li:last-child{
    width: 44%;
    margin-left: 12%
  }
  .consume_head span{
    float: left;
    width: 29%;
    font-size: .34rem;
    padding-top: .5rem;
    color: #C9F1FF;
  }
  .consume_main{
    height: 83%;
    overflow: hidden;
  }
  .consume_left{
    float: left;
    width: 35.5%;
    height: 100%;
  }
  .consume_middle{
    float: left;
    width: 32%;
    height: 100%;
    position:relative;
  }
  .xszs_box{
    width: 80%;
    height:.5rem;
    background: #333;
    opacity: .5;
    margin-top: .2rem;
    border-radius:3rem;
  }
  .consume_right{
    float: left;
    width: 32.5%;
    height: 100%;
  }
  .consume_main{
    font-size: .18rem;
    color: #FFFFFF;
  }
  .gdp_ul{
    overflow: hidden;
    color: #fff;
    padding-top: 10%;
    font-size: .14rem;
    display: flex;
    justify-content: center;
  }
  .gdp_ul li{
    float: left;
    width: 33.33%;
  }
  .gdp_ul li span{
    float: left;
  }
  .gdp_ul li span em{
    display: block;
    color:#A8E7F6;
    font-size: .18rem;
    font-style: normal
  }
  .gdp_ul li i{
    font-style: normal;
    font-size: .24rem
  }
  .gdp_ul li b{
    float: left;
    width: .48rem;
    height: .48rem;
    margin: .05rem .1rem 0 0;
  }
  .gdp_ul li b.gdp_1{
    background: url("img/gdp_1.png")no-repeat;
    background-size: .48rem .48rem;
  }
  .gdp_ul li b.gdp_2{
    background: url("img/gdp_2.png")no-repeat;
    background-size: .48rem .48rem;
  }
  .gdp_ul li b.gdp_3{
    background: url("img/gdp_3.png")no-repeat;
    background-size: .48rem .48rem;
  }
  .menu_ul{
    position: absolute;
    bottom: 11.5%;
    width: 120%;
    left: -3%;
    z-index: 10;
  }
  .menu_ul li{
    float:left;
    font-size: .14rem;
    color: #B1DFFF;
    width: 14.2%;
    text-align: center;
  }
  .menu_ul li i{
    display: block;
    width: .46rem;
    height: .55rem;
    background-size: .46rem .55rem;
    margin: 0 auto;
  }
  .cyfz{
    background: url("../../../assets/img/cyfz.png");
  }
  .szsy{
    background: url("../../../assets/img/szsy.png");
  }
  .xczx{
     background: url("../../../assets/img/xczx.png");
  }
  .whjy{
     background: url("../../../assets/img/whjy.png");
  }
  .hjzl{
     background: url("../../../assets/img/hjzl.png");
  }
  .zwfw{
     background: url("../../../assets/img/zwfw.png");
  }
  .menu_ul li a{
    text-decoration: none;
    color: #B1DFFF;
    position: relative;
  }
  @keyframes cartoon
        {
        from {transform: scale(0);}
        to {transform: scale(1);}
   }
  .menu_ul li a ul{
    position: absolute;
    left:-.8rem;
    top:-1.4rem;
    background: url("img/menubg.png");
    width: 2.14rem;
    height: 2.14rem;
    background-size: 2.14rem 2.14rem;
    display: none;
    z-index: 99;
  }
  .menu_ul li a:hover ul{
    display: block;
    animation: cartoon 1s;
  }
  .menu_ul li a ul li{
     position: absolute;
     background: url("img/li_bg.png");
     width: 1.12rem;
     height: .49rem;
     background-size: 1.12rem .49rem;
     color: rgba(255,255,255,0.7);
     line-height: .47rem;
  }
  .menu_ul li a ul li:hover{
    background: url("img/li_bg_on.png");
    width: 1.12rem;
    height: .49rem;
    background-size: 1.12rem .49rem;
    color: #fff;
  }
  .menu_ul li a ul li.btn_1{
    right: -.45rem;
    top: .35rem;
    transform: rotate(63deg);
  }
  .menu_ul li a ul li.btn_2{
    left: .5rem;
    top: -.25rem;
  }
  .menu_ul li a ul li.btn_3{
    left: -.45rem;
    top: .35rem;
    transform: rotate(-63deg);
  }
  .menu_ul li a ul li.btn_4{
    left: -.4rem;
    top: 1.4rem;
    transform: rotate(-120deg);
  }
  .menu_ul li a ul li.btn_5{
    left: .5rem;
    bottom: -.25rem;
    transform: rotate(180deg);
  }
  .menu_ul li a ul li.btn_6{
    right: -.45rem;
    top: 1.4rem;
    transform: rotate(120deg);
  }
  .menu_1 a:hover i.cyfz{
    background: url("../../../assets/img/cyfz_on.png");
    width: .62rem;
    height: .55rem;
    background-size: .63rem .55rem;
  }
  .menu_2 a:hover i.szsy{
    background: url("../../../assets/img/szsy_on.png");
    width: .62rem;
    height: .55rem;
    background-size: .63rem .55rem;
  }
  .menu_3 a:hover i.xczx{
    background: url("../../../assets/img/xczx_on.png");
    width: .62rem;
    height: .55rem;
    background-size: .63rem .55rem;
  }
  .menu_5 a:hover i.whjy{
    background: url("../../../assets/img/whjy_on.png");
    width: .62rem;
    height: .55rem;
    background-size: .63rem .55rem;
  }
  .menu_6 a:hover i.hjzl{
    background: url("../../../assets/img/hjzl_on.png");
    width: .62rem;
    height: .55rem;
    background-size: .63rem .55rem;
  }
  .menu_1 a:hover i.zwfw{
    background: url("../../../assets/img/zwfw_on.png");
    width: .62rem;
    height: .55rem;
    background-size: .63rem .55rem;
  }
  .menu_4 a:hover i.cyfz{
    background: url("../../../assets/img/cyfz_on.png");
    width: .62rem;
    height: .55rem;
    background-size: .63rem .55rem;
  }
  .menu_ul li a.active i.cyfz{
    background: url("../../../assets/img/cyfz_on.png");
    width: .62rem;
    height: .55rem;
    background-size: .63rem .55rem;
  }
  .menu_ul li a.active i.szsy{
    background: url("../../../assets/img/szsy_on.png");
    width: .62rem;
    height: .55rem;
    background-size: .63rem .55rem;
  }
  .menu_ul li a.active i.xczx{
    background: url("../../../assets/img/xczx_on.png");
    width: .62rem;
    height: .55rem;
    background-size: .63rem .55rem;
  }
  .menu_ul li a.active i.whjy{
    background: url("../../../assets/img/whjy_on.png");
    width: .62rem;
    height: .55rem;
    background-size: .63rem .55rem;
  }
  .menu_ul li a.active i.hjzl{
    background: url("../../../assets/img/hjzl_on.png");
    width: .62rem;
    height: .55rem;
    background-size: .63rem .55rem;
  }
  .menu_ul li a.active i.zwfw{
    background: url("../../../assets/img/zwfw_on.png");
    width: .62rem;
    height: .55rem;
    background-size: .63rem .55rem;
  }
  .menu_ul li.menu_1,.menu_ul li.menu_7{
    position: relative;
    top: .15rem
  }
  .menu_ul li.menu_6{
    position: relative;
    top: .16rem
  }
  .menu_ul li.menu_3{
    position: relative;
    top: -.05rem
  }
  .menu_ul li.menu_4{
    position: relative;
    top: -.03rem
  }
  .menu_ul li.menu_5{
    position: relative;
    top: .03rem
  }
  .menu_ul li.menu_2{
    position: relative;
    top: .03rem
  }
  .rank_title{
    height:20%;
  }
  .rank_title span{
    display: block;
    font-size: .18rem;
    line-height: .4rem;
    padding-bottom: .1rem;
    background:url("img/line.png")no-repeat .2rem .4rem;
  }
  .rank_title em{
    font-style: normal;
    margin-left: .2rem;
    font-size: .14rem;
  }
  .rank_title em b{
    font-size: .24rem;
    margin-right: .05rem;
  }
  .rank_title i{
    font-style: normal;
    float: left;
    font-size: .2rem;
    margin-top: .1rem;
    margin-right: .15rem;
  }
  .hot_rank1{
    height: 30%;
    margin: .28rem 0 0 1.8rem;
  }
  .rank_1{
    height: 75%;
    widows: 80%;
  }
  .gntz_box{
    height: 50%;
    overflow: hidden;
    margin-top: .1rem;
  }
  .gwtz_box{
    height: 50%;
    overflow: hidden;
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
  .round{
    float: left;
    position: relative
  }
  .round i{
    display: block;
    background: url("img/round_1.png");
    width: .69rem;
    height: .69rem;
    background-size: .69rem .69rem;
    -webkit-animation: animal 4s infinite linear ;
    -webkit-transform-origin: center center;
    -ms-transform-origin: center center;
    transform-origin: center center;
  }
  .round span{
    position: absolute;
    left: 50%;
    top: 50%;
    text-align: center;
    margin-top: -28%;
    margin-left: -25%;
    font-size: .2rem;
    color: #C3F5FF;
  }
  .round span em{
    display: block;
    font-size: .12rem;
    font-style: normal;
  }
  .round_2 i{
    display: block;
    background: url("img/round_2.png");
    width: .69rem;
    height: .69rem;
    background-size: .69rem .69rem;
  }

  .gntz_bar{
    float: left;
    position: relative;
    background: url("img/bar_1.png");
    width:2.68rem;
    height:.58rem;
    background-size: 2.68rem .58rem;
    margin: .07rem 0 0 -.19rem;
  }
  @keyframes myfirst
        {
        from {width: 0;}
        to {width: 2.31rem;}
   }
  .line_1{
    position: absolute;
    background: url("img/line.svg");
    display: block;
    width:2.31rem;
    height: .36rem;
    background-size: 2.31rem .36rem;
    left: .2rem;
    top: .15rem;
    animation: myfirst 5s infinite linear;
  }
  .line_2{
    position: absolute;
    background: url("img/line_2.svg");
    display: block;
    width:2.31rem;
    height: .254rem;
    background-size: 2.31rem .36rem;
    left: .2rem;
    top: .15rem;
    animation: myfirst 5s infinite linear;
  }
  .gwtz_bar{
    float: left;
    position: relative;
    background: url("img/bar_2.png");
    width:2.68rem;
    height:.58rem;
    background-size: 2.68rem .58rem;
    margin: .07rem 0 0 -.19rem;
  }
  .gntz_bar p{
    position: absolute;
    left: 60%;
    margin-left: -21%;
    bottom:-.16rem;
    font-size: .14rem;
    color: #A8E7F6;
  }
  .gwtz_bar p{
    position: absolute;
    left: 60%;
    margin-left: -21%;
    bottom:-.16rem;
    font-size: .14rem;
    color: #A8E7F6;
  }
  .hot_rank2{
    height: 26%;
    margin: 0 0 0 1.8rem;
  }
  .rank_2{
    height: 75%;
    position: relative;
    z-index: 99;
  }
  .hot_rank3{
    height: 30%;
    margin: 0 0 0 3.5rem;
  }
  .rank_3{
    height: 75%;
    position: relative;
    z-index: 99;
    width: 85%;
  }
  .hot_rank4{
    height: 45%;
    margin: .28rem 0 0 .8rem;
  }
  .rank_4{
    height: 80%;
    margin-left: -.2rem;
    position: relative;
    z-index: 99;
  }
  .hot_rank4 .rank_title{
    height:10%;
  }
  .hot_rank5{
    height: 28%;
    margin: 0 0 0 .3rem;
  }
  .hot_rank6{
    height: 30%;
    margin-left:.8rem;
  }
  .rank_5{
    height: 55%;
    position: relative;
    z-index: 99;
  }
  .pillar_tit{
    height: 18%;
    margin-top: 2%;
  }
  .pillar_tit span{
    float: left;
    font-size: .12rem;
    color:#fff;
    margin-right:.5rem;
  }
  .pillar_tit span i{
    display: inline-block;
    width:.142rem;
    height: .088rem;
    margin-right: .05rem
  }
  .pillar_tit span.tit_1 i{
    background:#A8E7F6;
  }
  .pillar_tit span.tit_2 i{
    background:#CC4E32;
  }
  .rank_6{
    height: 75%;
    position: relative;
    color: #fff;
    font-size: .14rem
  }
  .rank_6 p{
    text-align: center;
    padding-top: .15rem
  }
  .rank_6 .circle_6 p{
    padding-top: .1rem
  }
  .rank_6 span{
    font-size:.1rem;
    display: block;
    text-align: center
  }
  .circle_1{
     background: rgba(133,240,249,0.16);
     border: 1px solid #A8E7F6;
     width: .9rem;
     height: .9rem;
     border-radius: 50%;
     position: absolute;
     left: .5rem;
     top: .15rem
  }
  .circle_1 i{
    background:url("../../../assets/img/PM2.5.svg")no-repeat;
    display: block;
    width: .21rem;
    height: .18rem;
    background-size: .21rem .18rem;
    color: #fff;
    margin: .1rem auto 0 auto;
  }
  .circle_2{
     background: rgba(4,218,255,0.23);
     border: 1px solid #08D2FF;
     width: .51rem;
     height: .51rem;
     border-radius: 50%;
     position: absolute;
     left:1.2rem;
     top: .25rem
  }
  .circle_3{
     background: rgba(26,255,213,0.29);
     border: 1px solid #1AFFE9;
     width: .66rem;
     height: .66rem;
     border-radius: 50%;
     position: absolute;
     left:1.8rem;
     top: .1rem
  }
  .circle_4{
     background: rgba(4,218,255,0.23);
     border: 1px solid #08D2FF;
     width: .95rem;
     height: .95rem;
     border-radius: 50%;
     position: absolute;
     left:.25rem;
     top:1.15rem
  }
  .circle_5{
     background: rgba(204,78,50,0.32);
     border: 1px solid #CC4E32;
     width: 1.3rem;
     height: 1.3rem;
     border-radius: 50%;
     position: absolute;
     left:1.3rem;
     top:.4rem
  }
  .circle_5 p{
    font-size: .2rem;
    margin-top: .05rem
  }
  .circle_5 span{
    display: block;
    width:1.2rem;
    margin:.08rem auto 0 auto;
  }
  .circle_6{
     background: rgba(199,221,226,0.10);
     border: 1px solid #A8E7F6;
     width: .75rem;
     height: .75rem;
     border-radius: 50%;
     position: absolute;
     left:2.05rem;
     top: .7rem;
  }
  .left_qyzh{
    position: absolute;
    left: .4rem;
    bottom:.4rem;
  }
  .left_qyzh img{
    width: 2.26rem;
    height:2.53rem;
    display: block
  }
  .left_chart{
    position: relative;
    width: 2.26rem;
    height:2.53rem;
  }
  .left_chart .chart_bg{
    background: url("../../../assets/img/chart.png") no-repeat;
    width:1.47rem;
    height: 2.35rem;
    background-size: 1.47rem 2.35rem;
    margin-left: .4rem;
    position: relative;
  }
  .left_chart .chart_bg i{
    display: block;
    font-style: normal;
    font-size: .12rem;
    position: absolute;
    background: url("../../../assets/img/bq_bg.png") no-repeat;
    width: .58rem;
    height: .24rem;
    background-size: .58rem .24rem;
    text-align: center;
    line-height: .24rem;
    left: .3rem;
    top: -.1rem;

  }
  .right_chart .chart_bg i{
    display: block;
    font-style: normal;
    font-size: .12rem;
    position: absolute;
    background: url("../../../assets/img/bq_bg.png") no-repeat;
    width: .58rem;
    height: .24rem;
    background-size: .58rem .24rem;
    text-align: center;
    line-height: .24rem;
    left:.5rem;
    top:-.05rem;
    /* transform: scaleX(-1); */
  }
  .right_chart .chart_bg i em{
    display: block;
    transform: scaleX(-1);
    font-style: normal;

   }
  .left_chart .chart_bg .chart_on{
     position: absolute;
     background: url("../../../assets/img/chart_on.png") no-repeat bottom;
     width:1.35rem;
     height:60%;
     background-size: 1.35rem 2.21rem;
     left: .15rem;
     bottom: .1rem;
  }
  .left_chart i{
    color: #A8E7F6;
    font-size: .12rem;
    position: absolute;
    font-style: normal;
  }
  .left_chart i.num_1{
    left: 1.45rem;
    bottom:.02rem;
  }
  .left_chart i.num_2{
    left: .7rem;
    bottom: .3rem;
  }
  .left_chart i.num_3{
    left: .3rem;
    bottom: 1.4rem;
  }
  .left_chart i.num_4{
    left: 0;
    bottom: 2.4rem;
  }
  .left_chart span{
    position: absolute;
    color: #A8E7F6;
    font-size: .12rem;
    left: 2rem;
    bottom:.08rem;
  }

  .right_tdmj{
    position: absolute;
    right: .4rem;
    bottom: .4rem;
  }
  .right_tdmj img{
    width:2.75rem;
    height:2.56rem;
    display: block
  }
  .right_chart{
    position: relative;
    width: 2.75rem;
    height:2.56rem;
  }
   .right_chart .chart_bg{
    background: url("../../../assets/img/chart.png") no-repeat;
    width:1.47rem;
    height: 2.35rem;
    background-size: 1.47rem 2.35rem;
    position: absolute;
    left: .9rem;
    transform:scaleX(-1);
  }
  .right_chart .chart_bg .chart_on{
     position: absolute;
     background: url("../../../assets/img/chart_on.png") no-repeat bottom;
     width:1.35rem;
     height:47%;
     background-size: 1.35rem 2.21rem;
     left: .15rem;
     bottom: .1rem;
     transform:scaleX(1);
  }
  .right_chart i{
    color: #A8E7F6;
    font-size: .12rem;
    position: absolute;
    font-style: normal;
  }
  .right_chart i.num_1{
    right: 1.65rem;
    bottom:.02rem;
  }
  .right_chart i.num_2{
    right: .7rem;
    bottom: .3rem;
  }
  .right_chart i.num_3{
    right: .3rem;
    bottom: 1.4rem;
  }
  .right_chart i.num_4{
    right: 0;
    bottom: 2.4rem;
  }
  .right_chart span{
    position: absolute;
    color: #A8E7F6;
    font-size: .12rem;
    right: 2rem;
    bottom:.12rem;
  }
  .title_box{
    font-size: .18rem;
    color: #A8E7F6;
    line-height: .22rem;
    margin-bottom: .2rem;
  }
  .title_box i{
    background:url("../../../assets/img/titicon.png")no-repeat;
    width:.22rem;
    height: .22rem;
    background-size: .22rem .22rem;
    float: left;
    margin-right: .05rem
  }
  .title_box_2{
    margin-left:55%;
  }

</style>
