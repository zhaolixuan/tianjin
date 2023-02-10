
<template>
  <div class="page_content">
    <div class="title"> <span class="radio"></span>所属社区</div>
    <div class="main">
      <div class="left_content">
        <div class="photo"></div>
      </div>
      <div class="center_content">
        <ul>
          <li><span class="left—text">街道：</span><span class="right—text">{{communityVo.street || '暂无数据'}}</span><span class="left-width">社区：</span><span class="right-width">{{communityVo.community || '暂无数据'}}</span></li>
          <li><span class="left—text">现住址：</span><span class="right—text">{{communityVo.address || '暂无数据'}}</span></li>
          <li><span class="left—text">社区负责养老工作人员：</span><span class="right—text">{{communityVo.houseKeeperName || '暂无数据'}}</span></li>
          <li><span class="left—text">工作人员联系方式：</span><span class="right—text">{{communityVo.oldphone || '暂无数据'}}</span></li>
          <li><span class="left—text">走访次数：</span><span class="right—text">0次</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BelongingCommunity',
  props: {
    communityVo: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="less" scoped>
.page_content{
  width: 100%;
  height: 2.3rem;
  padding: .2rem .25rem;
  box-sizing: border-box;
  .title{
    width: 100%;
    height: .2rem;
    color: #7BD5FF;
    display: flex;
    align-items: center;
    font-size: .19rem;
    font-family: PingFangSC-Medium;
    .radio{
      display: inline-block;
      width: .1rem;
      height: .1rem;
      border-radius: 50%;
      background-color:  #7BD5FF;
      box-shadow: 0 0 4px 0 rgba(207,255,244,0.50);
      margin-right: .12rem;
    }
  }
  .main{
    width: 100%;
    height: 1.8rem;
    display: flex;
    .left_content{
      width: 15%;
      height: 100%;
      padding: .1rem 0;
      .photo{
        width: 1.3rem;
        height: 1.6rem;
        background-image: url('~@/views/OlderPortrait/assets/photo_bg.png');
        background-size: 100% 100%;
      }
    }
    .center_content{
      width: 85%;
      height: 100%;
      ul{
        width: 100%;
        padding-top: .1rem;
        li{
        height: .28rem;
        font-size: .13rem;
        line-height: .28rem;
        padding-left: .1rem;
        display: flex;
        .left—text{
          color: #89A3AE;
          width: 1.5rem;
          display: inline-block;
          font-family: MicrosoftYaHei;
        }
        .right—text{
          color: #C9EEFF;
          width: 2.4rem;
          font-family: MicrosoftYaHei-Bold;
        }
        .left-width{
          width: .43rem;
          color: #89A3AE;
          font-family: MicrosoftYaHei;
        }
        .right-width{
          width: 1.2rem;
          color: #C9EEFF;
          font-family: MicrosoftYaHei-Bold;
        }
      }
      li:nth-child(odd){
        background-image: linear-gradient(90deg, rgba(36,72,133,.6) 1%, rgba(16,35,78,0.49) 97%);
      }
      }
    }
  }
}
</style>
