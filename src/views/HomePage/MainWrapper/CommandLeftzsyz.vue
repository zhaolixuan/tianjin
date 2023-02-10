<template>
  <div class="zsyz_box">
    <ul class="column_ul_1">
      <li><i class="cor_1"></i><span>视觉</span>11%</li>
      <li><i class="cor_2"></i><span>智能机器人</span>8%</li>
      <li><p><i class="cor_3"></i><span>语音</span>4%</p><p><i class="cor_4"></i><span>无人机</span>2%</p></li>
      <li><i class="cor_5"></i><span>自然语言处理</span>6%</li>
      <li><i class="cor_6"></i><span>智能驾驶</span>4%</li>
      <li><i class="cor_7"></i><span>大数据及数据服务</span>10%</li>
      <li><i class="cor_8"></i><span>基础硬件</span>3%</li>
      <li><i class="cor_9"></i><span>AR/VR</span>1%</li>
      <li><i class="cor_10"></i><span>AI+</span>53%</li>
    </ul>
    <div class="bar_slip">
      <span class="cor_bg1" style="width: 11%"></span>
      <span class="cor_bg2" style="width: 10%"></span>
      <span class="cor_bg3" style="width: 8%"></span>
      <span class="cor_bg4" style="width: 6%"></span>
      <span class="cor_bg5" style="width: 4%"></span>
      <span class="cor_bg6" style="width: 4%"></span>
      <span class="cor_bg7" style="width: 3%"></span>
      <span class="cor_bg8" style="width: 2%"></span>
      <span class="cor_bg9" style="width: 1%"></span>
      <span class="cor_bg10" style="width: 51%"></span>
    </div>
    <div class="bar_slip bar_slip_bg2">
      <span class="cor_bg1" style="width: 16%"></span>
      <span class="cor_bg2" style="width: 14%"></span>
      <span class="cor_bg3" style="width: 10%"></span>
      <span class="cor_bg4" style="width: 8%"></span>
      <span class="cor_bg5" style="width: 14%"></span>
      <span class="cor_bg6" style="width: 6%"></span>
      <span class="cor_bg7" style="width: 8%"></span>
      <span class="cor_bg8" style="width: 8%"></span>
      <span class="cor_bg9" style="width: 8%"></span>
      <span class="cor_bg10" style="width:8%"></span>
    </div>
    <ul class="column_ul_2">
      <li><i class="cor_1"></i><span>其他</span>11%</li>
      <li><i class="cor_2"></i><span>商业</span>9%</li>
      <li><p><i class="cor_3"></i><span>金融</span>4%</p><p><i class="cor_4"></i><span>文体</span>2%</p></li>
      <li><i class="cor_5"></i><span>医疗健康</span>9%</li>
      <li><i class="cor_6"></i><span>网络安全</span>3%</li>
      <li><i class="cor_7"></i><span>社交</span>2%
      <li><i class="cor_8"></i><span>教育</span>2%</li>
      <li><i class="cor_9"></i><span>安防</span>2%</li>
      <li><i class="cor_10"></i><span>智能家居</span>2%</li>
    </ul>

  </div>
</template>

<script>
// import { fetch } from '@/api/base'
// import * as jdChart from '@/components/Echarts/index.js'
export default {
  data () {
    return {

    }
  }

}
</script>
<style scoped>
  .zsyz_box{
    height: 80%;
    font-size: .12rem;
    color: #A1D8FB;
  }
  .zsyz_box ul{
    margin: .1rem .3rem;
    overflow: hidden;
  }
  .zsyz_box ul li{
    float: left;
    width: 30%;
    height: .24rem;
    line-height: .24rem;
  }
  .zsyz_box ul li:nth-child(3){
    width: 40%;
  }
  .zsyz_box ul li:nth-child(6){
    width: 40%;
  }
  .zsyz_box ul li:nth-child(9){
    width: 40%;
  }
  .zsyz_box ul li p{
    float: left;
    width: 50%;
  }
  .zsyz_box ul li i{
    display: inline-block;
    width: .1rem;
    height: .1rem;
    margin-right: .05rem;
    vertical-align: middle;
  }
  .column_ul_1 li i.cor_1{
    background: #DC1E4E;
  }
  .column_ul_1 li i.cor_2{
    background: #EC00FF;
  }
  .column_ul_1 li i.cor_3{
    background: #7E77E9;
  }
  .column_ul_1 li i.cor_4{
    background: #332BA5;
  }
  .column_ul_1 li i.cor_5{
    background: #7947FF;
  }
  .column_ul_1 li i.cor_6{
    background: #C177E8;
  }
  .column_ul_1 li i.cor_7{
    background: #F45690;
  }
  .column_ul_1 li i.cor_8{
    background: #5249DC;
  }
  .column_ul_1 li i.cor_9{
    background: #30A1FD;
  }
  .column_ul_1 li i.cor_10{
    background: #16FFF9;
  }
  .column_ul_2 li i.cor_1{
    background: #F45690;
  }
  .column_ul_2 li i.cor_2{
    background: #696EFF;
  }
  .column_ul_2 li i.cor_3{
    background: #FF985E;
  }
  .column_ul_2 li i.cor_4{
    background: #FFCB5E;
  }
  .column_ul_2 li i.cor_5{
    background: #FF4A7D;
  }
  .column_ul_2 li i.cor_6{
    background: #FF8D8D;
  }
  .column_ul_2 li i.cor_7{
    background: #994D4D;
  }
  .column_ul_2 li i.cor_8{
    background: #A5322B;
  }
  .column_ul_2 li i.cor_9{
    background: #FFDA31;
  }
  .column_ul_2 li i.cor_10{
    background: #FF9315;
  }
  .bar_slip{
    width:auto;
    height: .13rem;
    background: #16FFF9;
    border-radius:.1rem;
    margin:.13rem .3rem;
  }
  .bar_slip_bg2{
    background:#093D79;
  }
  .bar_slip span{
    height: .13rem;
    float: left;
  }
  .bar_slip span.cor_bg1{
    background:#DC1E4E;
    border-top-left-radius:.1rem;
    border-bottom-left-radius:.1rem;
    margin-left: 0;
  }
  .bar_slip span:last-child{
    border-top-right-radius:.1rem;
    border-bottom-right-radius:.1rem;
  }
  .cor_bg2{
    background:#F45690;
  }
  .cor_bg3{
    background:#EC00FF;
  }
  .cor_bg4{
    background:#7947FF;
  }
  .cor_bg5{
    background:#7E77E9;
  }
  .cor_bg6{
    background:#C177E8;
  }
  .cor_bg7{
    background:#5249DC;
  }
  .cor_bg8{
    background:#332BA5;
  }
  .cor_bg9{
    background:#30A1FD;
  }
  .cor_bg9{
    background:#30A1FD;
  }
  .cor_bg10{
    background:#16FFF9;
  }
  .bar_slip_bg2 .cor_bg1{
    background: #F45690;
  }
  .bar_slip_bg2 .cor_bg2{
    background: #696EFF;
  }
  .bar_slip_bg2 .cor_bg3{
    background: #FF985E;
  }
  .bar_slip_bg2 .cor_bg4{
    background: #FFCB5E;
  }
  .bar_slip_bg2 .cor_bg5{
    background: #FF4A7D;
  }
  .bar_slip_bg2 .cor_bg6{
    background: #FF8D8D;
  }
  .bar_slip_bg2 .cor_bg7{
    background: #994D4D;
  }
  .bar_slip_bg2 .cor_bg8{
    background: #A5322B;
  }
  .bar_slip_bg2 .cor_bg9{
    background: #FFDA31;
  }
  .bar_slip_bg2 .cor_bg10{
    background: #FF9315;
  }

</style>
