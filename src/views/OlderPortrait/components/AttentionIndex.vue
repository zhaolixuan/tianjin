<template>
  <div class="page_content">
    <div class="title"> <span class="radio"></span>重点关注指标</div>
    <div class="main">
      <button :class="[item.isFlag === '1' ? 'btn active' : 'btn']" v-for="(item,index) in IndexData" :key="index">{{item.label}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttentionIndex',
  props: {
    populationRecordVo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    IndexData () {
      return [
        {label: '失能', isFlag: this.populationRecordVo.personbody},
        {label: '独居', isFlag: this.populationRecordVo.isLone},
        {label: '失独', isFlag: this.populationRecordVo.isLiveAlone},
        {label: '高龄', isFlag: this.populationRecordVo.ageShow},
        {label: '残疾', isFlag: this.populationRecordVo.isDisabled},
        {label: '无健康档案', isFlag: this.populationRecordVo.isWeijian},
        {label: '无社保', isFlag: this.populationRecordVo.isShebao},
        {label: '领取补贴', isFlag: this.populationRecordVo.isallowance}
      ]
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
    margin-top: .1rem;
    .btn{
      box-sizing: border-box;
      width: 1.5rem;
      height: .43rem;
      background-image: url('~@/views/OlderPortrait/assets/button_bg.png');
      background-size: 100% 100%;
      background-color: rgba(0,0,0,0.00) ;
      box-shadow: inset 0 0 3px 2px rgba(14,185,254,0.23);
      border: 0;
      margin: .07rem .23rem;
      color: #C9EEFF;
      font-size: .14rem;
    }
    .active{
      background-image: linear-gradient(180deg, #008CFF 0%, rgba(70,200,255,0.00) 100%);
    }
  }
}
</style>
