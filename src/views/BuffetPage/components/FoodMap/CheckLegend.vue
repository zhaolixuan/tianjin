<template>
  <div class="look_container">
    <div class="tip_item"
         v-for="(item,v) in TipData"
         :key="v">
      <img :src="require(`@/views/OlderDistribution/assets/img/${item.icon}.png`)"
           class="tip_img"
           alt="">
      <span>{{item.text}}</span>
      <!-- <img :src="require(`@/views/OlderDistribution/assets/img/${item.show?'look_true':'look_false'}.png`)"
           class="tip_look"
           alt=""> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckLegend',
  data () {
    return {
      TipData: [
        { text: '订单数量', icon: 'dds1', show: true },
        { text: '街级', icon: 'jj1', show: false },
        { text: '社区级', icon: 'sqj1', show: true },
        { text: '服务点', icon: 'fwd1', show: true }
        // {text: '残疾人', icon: 'tip_pink', show: true}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.look_container {
  width: 1.9rem;
  height: 2.5rem;
  // background: url("~@/views/OlderDistribution/assets/img/look-legend_bg.png");
  background-repeat: repeat;
  background-size: contain;
  position: absolute;
  bottom: 5%;
  left: 1%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 0.33rem;
  padding-left: 0.33rem;
  .tip_item {
    font-size: 0.15rem;
    color: #ffffff;
    margin-bottom: 0.15rem;
    display: flex;
    align-items: center;
    .tip_img {
      width: 0.24rem;
      height: 0.24rem;
      margin-right: 0.14rem;
    }
    .tip_look {
      width: 0.16rem;
      height: 0.1rem;
      margin-left: 0.1rem;
    }
  }
}
</style>
