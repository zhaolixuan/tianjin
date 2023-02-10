<template>
  <div class="page_content">
    <div class="left-container">
      <div class="title">
        <span class="radio"></span>购买智能设备
      </div>
      <div class="page_main">
        <img
          class="column-split"
          src="@/views/ProvideAged/assets/column-split.png"
          alt
        />
        <div class="left_item" v-for="(item,index) in facilityData" :key="index">
          <img :class="[item.flag == '1' ? 'active icon' : 'icon']" :src="require(`@/views/OlderPortrait/assets/${item.value}.png`)" alt="">
          <span>{{item.label}}</span>
        </div>
      </div>
    </div>
    <div class="right-container">
      <div class="title">
        <span class="radio"></span>近期购买服务
      </div>
      <div class="page_main">
        <div class="left_item" v-for="(item,index) in serviceData" :key="index">
          <img :class="[item.flag == '1' ? 'active icon' : 'icon']" :src="require(`@/views/OlderPortrait/assets/${item.value}.png`)" alt="">
          <span>{{item.label}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceFacility',
  props: {
    smartServeyVo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      facilityData: [
        { label: '一键通', value: 'alarm_icon', flag: this.smartServeyVo.isSmart },
        { label: '烟感设备', value: 'siren_icon' },
        { label: '健康监测手表', value: 'watch_icon' }
      ],
      serviceData: [
        { label: '助餐', value: 'buffet_icon', flag: this.smartServeyVo.isMeal },
        { label: '代购药', value: 'medicine_icon' },
        { label: '预约口罩', value: 'gauze_icon', flag: this.smartServeyVo.isAppointment }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.page_content {
  width: 100%;
  height: 1.85rem;
  padding: 0.2rem 0.25rem;
  box-sizing: border-box;
  margin-top: 0.15rem;
  display: flex;
  .left-container,
  .right-container {
    width: 50%;
    height: 100%;
    .title {
      width: 100%;
      height: 0.2rem;
      color: #7bd5ff;
      display: flex;
      align-items: center;
      font-size: 0.19rem;
      font-family: PingFangSC-Medium;
      .radio {
        display: inline-block;
        width: 0.1rem;
        height: 0.1rem;
        border-radius: 50%;
        background-color: #7bd5ff;
        box-shadow: 0 0 4px 0 rgba(207, 255, 244, 0.5);
        margin-right: 0.12rem;
      }
    }
    .page_main{
      width: 97%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      padding-left: .1rem;
      box-sizing: border-box;
      .left_item{
        display: flex;
        width: 1.7rem;
        height: .5rem;
        color: #C9EEFF;
        font-size: .14rem;
        align-items: center;
        .icon{
          width: .5rem;
          height: .5rem;
          margin-right: .06rem;
        }
        .active{
          background-image: url("~@/views/OlderPortrait/assets/active.png");
          background-size: 100% 100%;
        }
      }
      .column-split {
      position: absolute;
      right: 0;
      top:0;
      height: 100%;
      padding: .2rem 0;
      box-sizing: border-box;
    }
    }
  }
}
</style>
