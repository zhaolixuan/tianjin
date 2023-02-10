<template>
  <div class="year-rote_box">
    <div class="swiper-cycle-container">
      <p class="ceneter-text">
        {{MenuText}}
        <br>
        <span class="swiper-text">{{menu.data ? menu.data[MenuIndex] : 0}}</span>
         项任务</p>
      </p>
      <div
        v-for="(item, index) in MenuData"
        :key="`${item.label}-${index}`"
        :class="classNames(item)"
        :style="style(item)"
        @click="handleText(item.label,index)"
      >
        <p :class="`label-${item.class}`">
          {{ item.label}}
          <br>
          <span class="swiper-text">{{menu.data ? menu.data[index] : 0}}</span>
         项任务</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'RotateMenu',
  data () {
    return {
      MenuData: [
        { label: '1月份预计完成', class: 'one', active: 'one', backgroundImg: require('@/views/YearKeyWork/assets/oneTask.png'), color: '#FF00EC' },
        { label: '2月份预计完成', class: 'two', active: 'two', backgroundImg: require('@/views/YearKeyWork/assets/twoTask.png'), color: '#B222FF' },
        { label: '3月份预计完成', class: 'three', active: 'three', backgroundImg: require('@/views/YearKeyWork/assets/threeTask.png'), color: '#00D5FF' },
        { label: '4月份预计完成', class: 'four', active: 'four', backgroundImg: require('@/views/YearKeyWork/assets/fourTask.png'), color: '#00FDF0' },
        { label: '5月份预计完成', class: 'five', active: 'five', backgroundImg: require('@/views/YearKeyWork/assets/fiveTask.png'), color: '#00FF7D' },
        { label: '6月份预计完成', class: 'six', active: 'six', backgroundImg: require('@/views/YearKeyWork/assets/sixTask.png'), color: '#00FF09' },
        { label: '7月份预计完成', class: 'seven', active: 'seven', backgroundImg: require('@/views/YearKeyWork/assets/sevenTask.png'), color: '#CCFF00' },
        { label: '8月份预计完成', class: 'eight', active: 'eight', backgroundImg: require('@/views/YearKeyWork/assets/eightTask.png'), color: '#FFD100' },
        { label: '9月份预计完成', class: 'nine', active: 'nine', backgroundImg: require('@/views/YearKeyWork/assets/nineTask.png'), color: '#FF9E00' },
        { label: '10月份预计完成', class: 'ten', active: 'ten', backgroundImg: require('@/views/YearKeyWork/assets/tenTask.png'), color: '#FF572E' },
        { label: '11月份预计完成', class: 'eleven', active: 'eleven', backgroundImg: require('@/views/YearKeyWork/assets/elevenTask.png'), color: '#FF3E1E' },
        { label: '12月份预计完成', class: 'twelve', active: 'twelve', backgroundImg: require('@/views/YearKeyWork/assets/twelveTask.png'), color: '#FF0027' }
      ],
      MenuText: '',
      MenuIndex: 0
    }
  },
  props: {
    menu: {
      type: Object,
      default: () => {}
    }
  },
  created () {
    this.MenuText = this.MenuData[0].label
  },
  methods: {
    classNames (item) {
      return ['swiper-item', item.class]
    },
    style (item) {
      return {
        'background-image': 'url(' + item.backgroundImg + ')'
      }
    },
    handleText (label, index) {
      this.MenuText = label
      this.MenuIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
.year-rote_box{
  position: relative;
  width: 6.3rem;
  height: 6.3rem;
  margin: 13% auto;
  user-select: none;
  background-image: url('~@/views/YearKeyWork/assets/rotate-bg.png');
  background-size: cover;
  .swiper-cycle-container{
  width: 100%;
  height: 100%;
  font-size: 0.2rem;
  position: relative;
  .ceneter-text{
    position: fixed;
    top: 60%;
    left: 46%;
    color: #ffffff;
    font-size: 0.28rem;
  }
  }
  .swiper-text{
    color: orange;
  }

  .swiper-item {
    position: absolute;
    width: 1.3rem;
    height: 1.3rem;
    cursor: pointer;
    transition: all 0.6s;
    transform: translate(50%);
    background-size: 100% 100%;
    z-index: 2;
    color: aliceblue;
  }
  .one {
    top: 5%;
    left: 50%;
    transform: translate(-50%, -50%);
    .label-one {
      width: 150px;
      position: absolute;
      top: -38%;
      left: -10%;
      transition: all 0.6s;
   }
  }
  .two {
    top: 10%;
    left: 73%;
    transform: translate(-50%, -50%);
    .label-two {
      width: 150px;
      position: absolute;
      top: -15%;
      left: 70%;
      transition: all 0.6s;
   }
  }
  .three {
    top: 27%;
    left: 90%;
    transform: translate(-50%, -50%);
    .label-three {
      width: 150px;
      position: absolute;
      top: -15%;
      left: 70%;
      transition: all 0.6s;
   }
  }
  .four {
    top: 50%;
    left: 94%;
    transform: translate(-50%, -50%);
    .label-four {
      width: 150px;
      position: absolute;
      top: 25%;
      left: 86%;
      transition: all 0.6s;
   }
  }
  .five {
    top: 73%;
    left: 90%;
    transform: translate(-50%, -50%);
    .label-five {
      width: 150px;
      position: absolute;
      top: 60%;
      left: 86%;
      transition: all 0.6s;
   }
  }
  .six {
    top: 90%;
    left: 74%;
    transform: translate(-50%, -50%);
    z-index: 0;
    .label-six {
      width: 150px;
      position: absolute;
      top: 60%;
      left: 86%;
      transition: all 0.6s;
   }
  }
  .seven {
    top: 97%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
    .label-seven {
      width: 150px;
      position: absolute;
      top: 80%;
      left: -10%;
      transition: all 0.6s;
   }
  }
  .eight {
    top: 90%;
    left:25%;
    transform: translate(-50%, -50%);
    z-index: 0;
    .label-eight {
      width: 150px;
      position: absolute;
      top: 60%;
      left: -86%;
      transition: all 0.6s;
   }
  }
  .nine {
    top: 73%;
    left: 9%;
    transform: translate(-50%, -50%);
    .label-nine {
      width: 150px;
      position: absolute;
      top: 60%;
      left: -86%;
      transition: all 0.6s;
   }
  }
  .ten {
    top: 50%;
    left: 5%;
    transform: translate(-50%, -50%);
    .label-ten {
      width: 150px;
      position: absolute;
      top: 35%;
      left: -95%;
      transition: all 0.6s;
   }
  }
  .eleven {
    top: 27%;
    left: 7%;
    transform: translate(-50%, -50%);
    .label-eleven {
      width: 150px;
      position: absolute;
      top: -15%;
      left: -75%;
      transition: all 0.6s;
   }
  }
  .twelve {
    top: 10%;
    left: 26%;
    transform: translate(-50%, -50%);
    .label-twelve {
      width: 150px;
      position: absolute;
      top: -15%;
      left: -70%;
      transition: all 0.6s;
   }
  }
}

</style>
