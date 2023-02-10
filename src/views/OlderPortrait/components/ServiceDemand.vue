<template>
  <div class="page_content">
    <div class="title"> <span class="radio"></span>养老服务需求</div>
    <div class="main">
      <ul>
          <li><span class="left—text">最急需需求：</span><span class="right—text">{{populationRecordVo.mostUrgentService || '暂无数据'}}</span><span class="left-width">可接受有偿：</span><span class="right-width">{{populationRecordVo.acceptablePaidServices || '暂无数据'}}</span></li>
          <li><span class="left—text">曾购买服务：</span><span class="right—text">{{populationRecordVo.servicePurchased || '暂无数据'}}</span></li>
          <li><span class="left—text">医疗需求服务：</span><span class="right—text">暂无数据</span></li>
          <li><span class="left—text">建议需求前三：</span><span class="right—text">{{populationRecordVo.serviceTop3 || '暂无数据'}}</span></li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceDemand',
  props: {
    populationRecordVo: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="less" scoped>
.page_content{
  width: 100%;
  height: 1.75rem;
  padding: .2rem .25rem;
  box-sizing: border-box;
  margin-top: .15rem;
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
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
          width: 1rem;
          display: inline-block;
          font-family: MicrosoftYaHei;
        }
        .right—text{
          color: #C9EEFF;
          width: 4rem;
          font-family: MicrosoftYaHei-Bold;
        }
        .left-width{
          width: 1rem;
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
</style>
