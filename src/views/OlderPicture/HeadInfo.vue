<template>
  <div class="center_box">
    <div class="light_ring">
      <div class="light_inside"></div>
    </div>
    <div class="older_head"></div>
    <div class="bottom_ring"></div>
    <div
      :class="['point_box', 'point_position0', listData&&listData.isDisabled == '1'?'big_point twink_point':'small_point']"
    >
      <div class="point"></div>
      <span>残疾</span>
    </div>
    <div
      :class="['point_box', 'point_position1', listData&&listData.isLiveAlone == '1'?'big_point twink_point':'small_point']"
    >
      <div class="point"></div>
      <span>失独</span>
    </div>
    <!-- <div :class="['point_box', 'point_position1', listData&&listData.isHardpeople == '1'?'big_point twink_point':'small_point']">
      <div class="point"></div>
      <span>困难人员</span>
    </div>-->
    <div
      :class="['point_box', 'point_position2', listData&&listData.monthlyIncome == '1'?'big_point twink_point':'small_point']"
    >
      <div class="point"></div>
      <span>3000元以下</span>
    </div>
    <div
      :class="['point_box', 'point_position3', listData&&listData.ageShow == '1'?'big_point twink_point':'small_point']"
    >
      <div class="point"></div>
      <span>80周岁及以上</span>
    </div>
    <div
      :class="['point_box', 'point_position4', listData&&listData.isShebao == '2'?'big_point twink_point':'small_point']"
    >
      <div class="point"></div>
      <span>无社保信息</span>
    </div>
    <div
      :class="['point_box', 'point_position5', listData&&listData.isWeijian == '2'?'big_point twink_point':'small_point']"
    >
      <div class="point"></div>
      <span>无健康档案</span>
    </div>
    <div
      :class="['point_box', 'point_position6', listData&&listData.personbody == '1'?'big_point twink_point':'small_point']"
    >
      <div class="point"></div>
      <span>失能</span>
    </div>
    <div
      :class="['point_box', 'point_position7', listData&&listData.isLone == '1'?'big_point twink_point':'small_point']"
    >
      <div class="point"></div>
      <span>独居</span>
    </div>
    <div
      :class="['point_box', 'point_position8', listData&&listData.isallowance == '1'?'big_point twink_point':'small_point']"
    >
      <div class="point"></div>
      <span>领取补贴</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listData: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      money: '月总收入',
      age: '年龄',
      live: '独居',
      child: '失独'
    }
  }
}
</script>

<style scoped>
.center_box {
  width: 60vh;
  height: 60vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
  background: url("../../assets/img/light_ring1.png") 50% 50% no-repeat;
  background-size: cover;
}
.light_ring {
  position: absolute;
  width: 80%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url("../../assets/img/light_ring2.png") 50% 50% no-repeat;
  background-size: cover;
}
.light_inside {
  position: absolute;
  width: 80%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url("../../assets/img/light_ring4.png") 50% 50% no-repeat;
  background-size: cover;
}
.older_head {
  position: absolute;
  width: 80%;
  height: 80%;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url("../../assets/img/older_head.png") 50% 50% no-repeat;
  background-size: 45%;
}
.bottom_ring {
  position: absolute;
  width: 26vh;
  height: 8vh;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  background: url("../../assets/img/light_ring3.png") 50% 50% no-repeat;
  background-size: cover;
}

.point_box {
  position: absolute;
  font-size: 0.24rem;
}
.point {
  float: left;
  margin-right: 0.1rem;
}
.small_point .point {
  width: 0.45rem;
  height: 0.45rem;
  background: url("../../assets/img/light_point_small.png") 50% 50% no-repeat;
  background-size: cover;
}
.small_point span {
  color: rgba(39, 77, 107, 1);
  line-height: 0.45rem;
}
.big_point .point {
  width: 0.74rem;
  height: 0.74rem;
  background: url("../../assets/img/light_point_big.png") 50% 50% no-repeat;
  background-size: cover;
}
.big_point span {
  color: rgba(0, 246, 255, 1);
  line-height: 0.74rem;
}
.twink_point .point {
  animation: twinking 1.5s infinite linear alternate;
}
@keyframes twinking {
  from {
    /* opacity: 1; */
    transform: scale(1);
  }
  to {
    /* opacity: 0.6; */
    transform: scale(0.8);
  }
}
.point_position0 {
  top: 0;
  right: 33%;
  /* transform: translateX(-50%); */
}
.point_position1 {
  top: 11%;
  left: 15%;
  /* transform: translateX(-50%); */
}
.point_position2 {
  top: 34%;
  left: -.4rem;
}
.point_position3 {
  top: 17%;
  right: -1rem;
}
.point_position4 {
  top: 60%;
  left: -0.8rem;
}
.point_position5 {
  top: 38%;
  right: -1.3rem;
}
.point_position6 {
  top: 80%;
  left: 0.5rem;
}
.point_position7 {
  top: 60%;
  right: -.4rem;
}
.point_position8{
  top: 80%;
  right: 0;
}
</style>
