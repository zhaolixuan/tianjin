<template>
  <div class="main_box">
    <!-- 左侧内容 -->
    <div class="left_main">
      <div class="left_top bg_color">
        <i class="lt"></i>
        <i class="rt"></i>
        <i class="lb"></i>
        <i class="rb"></i>
        <span class="line_top"></span>
        <span class="line_bottom"></span>
        <div class="title"><b class="iconfont iconiconchanyefazhan"></b>{{chanyefazhan.title || ''}}</div>
        <CommandLefttop></CommandLefttop>
      </div>
      <div class="left_middle bg_color">
        <i class="lt"></i>
        <i class="rt"></i>
        <i class="lb"></i>
        <i class="rb"></i>
        <span class="line_top"></span>
        <span class="line_bottom"></span>
        <div class="title"><b class="iconfont iconiconshuangzhaoshuangyin"></b><span>全球人工智能投融资行业分布</span>{{szsy.title || ''}}</div>
        <CommandLeftzsyz></CommandLeftzsyz>
      </div>
      <div class="left_bottom bg_color">
        <i class="lt"></i>
        <i class="rt"></i>
        <i class="lb"></i>
        <i class="rb"></i>
        <span class="line_top"></span>
        <span class="line_bottom"></span>
        <div class="title"><span class="hb_tit"><i></i>{{rcyj.hb||''}}</span><span class="ry_tit"><i></i>{{rcyj.hxjsry||''}}</span><b class="iconfont iconrencaiyinjin"></b>{{rcyj.title || ''}}</div>
        <CommandLeftbottom></CommandLeftbottom>
      </div>
    </div>
    <!-- 中间内容 -->
    <div class="middle_main">
      <CommandMiddlegdp></CommandMiddlegdp>
      <CommandMiddlemap></CommandMiddlemap>
    </div>
    <!-- 右侧内容 -->
    <div class="right_main">
      <div class="right_box1 bg_color">
        <i class="lt"></i>
        <i class="rt"></i>
        <i class="lb"></i>
        <i class="rb"></i>
        <span class="line_top"></span>
        <span class="line_bottom"></span>
        <div class="title"><b class="iconfont iconiconhuanjingzhiliang"></b>{{hjzy.title || ''}}</div>
        <CommandRightzyhj></CommandRightzyhj>
      </div>
      <div class="right_box2 bg_color">
        <i class="lt"></i>
        <i class="rt"></i>
        <i class="lb"></i>
        <i class="rb"></i>
        <span class="line_top"></span>
        <span class="line_bottom"></span>
        <div class="title"><b class="iconfont iconiconxiangcunzhenxing"></b>{{tpgj.title || ''}}</div>
        <CommandRighttpgj></CommandRighttpgj>
      </div>
      <div class="right_box3 bg_color">
        <i class="lt"></i>
        <i class="rt"></i>
        <i class="lb"></i>
        <i class="rb"></i>
        <span class="line_top"></span>
        <span class="line_bottom"></span>
        <div class="title"><b class="iconfont iconzhengwufuwu"></b>{{zwfw.title || ''}}</div>
        <CommandRightzwfw></CommandRightzwfw>
      </div>
      <div class="right_box4 bg_color">
        <i class="lt"></i>
        <i class="rt"></i>
        <i class="lb"></i>
        <i class="rb"></i>
        <span class="line_top"></span>
        <span class="line_bottom"></span>
        <div class="title"><span>{{gdpTrend.unit||''}}</span><b class="iconfont icongdpqushi"></b>{{gdpTrend.title || ''}}</div>
        <CommandRightgdpyqs></CommandRightgdpyqs>
      </div>
    </div>
  </div>
</template>
<script>
import CommandLefttop from './CommandLefttop'
import CommandLeftzsyz from './CommandLeftzsyz'
import CommandLeftbottom from './CommandLeftbottom'
import CommandMiddlegdp from './CommandMiddlegdp'
import CommandMiddlemap from './CommandMiddlemap'
import CommandRightzyhj from './CommandRightzyhj'
import CommandRighttpgj from './CommandRighttpgj'
import CommandRightzwfw from './CommandRightzwfw'
import CommandRightgdpyqs from './CommandRightgdpyqs'
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
    chanyefazhan () {
      return this.data.chanyefazhan || {}
    },
    szsy () {
      return this.data.szsy || {}
    },
    rcyj () {
      return this.data.rcyj || {}
    },
    hjzy () {
      return this.data.hjzy || {}
    },
    tpgj () {
      return this.data.tpgj || {}
    },
    zwfw () {
      return this.data.zwfw || {}
    },
    gdpTrend () {
      return this.data.gdpTrend || {}
    }
  },
  methods: {

  },
  components: {
    CommandLefttop,
    // CommandLeftmiddle,
    CommandLeftzsyz,
    CommandLeftbottom,
    CommandMiddlegdp,
    CommandMiddlemap,
    CommandRightzyhj,
    CommandRighttpgj,
    CommandRightzwfw,
    CommandRightgdpyqs

  }
}
</script>
<style scoped>
  .left_main {
    width: 24%;
    height: 100%;
    position: absolute;
    left:.2rem;
    top:-4%;
  }
  .middle_main {
    width: 44%;
    height: 100%;
    position: absolute;
    left: 28%;
    top: 0;
  }
  .left_top{
    height: 46%;
  }
  .left_middle{
    height: 31%;
    margin-top:.13rem;
  }
  .left_bottom{
    height: 26%;
    margin-top: .13rem;
  }
  .bg_color{
    width: 100%;
    background-image: radial-gradient(50% 107%, rgba(0,40,102,0.11) 52%, rgba(7,64,154,0.18) 100%);
    border: 1px solid rgba(0,177,255,0.12);
    position: relative;
  }
  .bg_color i{
    width: .16rem;
    height: .10rem;
    position: absolute;
  }
  .bg_color span{
    position: absolute;
    display:block;
    width: 100%;
    height:1px;
    background: -webkit-radial-gradient(rgba(31,172,255,0.8),rgba(0,65,135,0.8), rgba(31,172,255,0.8));
    background: -o-radial-gradient(rgba(31,172,255,0.8),rgba(0,65,135,0.8), rgba(31,172,255,0.8));
    background: -moz-radial-gradient(rgba(31,172,255,0.8),rgba(0,65,135,0.8), rgba(31,172,255,0.8));
    background: radial-gradient(rgba(31,172,255,0.8),rgba(0,65,135,0.8), rgba(31,172,255,0.8));
  }
  .lt {
    border-top: .02rem solid #00B2FF;
    border-left: .03rem solid #00B2FF;
    top: 0;
    left: 0;
  }
  .rt {
    border-top: .02rem solid #00B2FF;
    border-right: .03rem solid #00B2FF;
    top: 0;
    right: 0;
  }
  .lb {
    border-bottom: .02rem solid #00B2FF;
    border-left: .03rem solid #00B2FF;
    bottom: 0;
    left: 0;
  }
  .rb {
    border-bottom: .02rem solid #00B2FF;
    border-right: .03rem solid #00B2FF;
    bottom: 0;
    right: 0;
  }
  .line_top{
    top: 0;
    left: 0;
  }
  .line_bottom{
    bottom: -1px;
    left: 0;
  }
  .right_main {
    width: 24%;
    height: 100%;
    position: absolute;
    right:.2rem;
    top:-4%;
  }
  .right_box1{
    height: 21%;
  }
  .right_box2{
    height: 32%;
    margin-top: .13rem;
  }
  .right_box3{
    height: 24%;
    margin-top: .13rem;
  }
  .right_box4{
    height: 24%;
    margin-top: .13rem;
  }
  .title{
    font-size: .16rem;
    color: #B1DFFF;
    margin: .15rem 0 0 .28rem;
    padding-bottom: .1rem;
    background: url("../../../assets/img/tit_line.png") no-repeat 0 .25rem;
    position: relative;
  }
  .title b{
    font-weight: normal;
    margin-right:.1rem;
    font-size: .16rem;
  }
  .title span{
    float:right;
    position: static;
    margin-right: .2rem;
    font-size: .12rem;
    color:#A1D8FB;
    font-style: normal;
    background: none;
    width: auto;
    height: auto;
  }
  .title span.ry_tit i{
    background: #44C4E3;
    width: .1rem;
    height: .1rem;
    position: static;
    display: inline-block;
    margin-right: .05rem;
    vertical-align: middle;
  }
  .title span.hb_tit i{
    position: static;
    display: inline-block;
    margin-right: .05rem;
    background: url("../../../assets/img/hb_line.png") no-repeat;
    width: .29rem;
    height: .08rem;
    background-size: .29rem .08rem;

  }
</style>
