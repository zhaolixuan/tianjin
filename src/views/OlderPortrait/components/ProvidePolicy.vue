<template>
  <div class="page_content">
    <div class="title"> <span class="radio"></span>养老政策落实情况</div>
    <div class="main">
      <p class="text_list"><span class="left_text">满足养老政策：</span><span class="right_text">暂无数据</span></p>
      <p class="text_list"><span class="left_text">已享受养老政策：</span><span class="right_text">{{basePersonAllowanceVo.allowancePolicy || '暂无数据'}}</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProvidePolicy',
  props: {
    basePersonAllowanceVo: {
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
    .text_list{
      width: 95%;
      height: .26rem;
      background-image: linear-gradient(90deg, rgba(36,72,133,.6) 3%, rgba(16,35,78,0.49) 97%);
      font-size: .14rem;
      line-height: .26rem;
      margin-left: .2rem;
      padding-left: .1rem;
      box-sizing: border-box;
      margin-bottom: .15rem;
      color: #C9EEFF;
      .left_text{
        color: #89A3AE;
        width: 1.2rem;
        display: inline-block;
      }
    }
  }
}
</style>
