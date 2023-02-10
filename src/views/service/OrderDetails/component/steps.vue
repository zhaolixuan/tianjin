<template>
  <div class="overall">
    <nav class="header_box">
      <h1
        :class="{
          yellow: [1, 2, 3].includes(activeIndex),
          green: [4].includes(activeIndex),
          red: [0].includes(activeIndex),
        }"
      >
        {{ statusText }}
      </h1>
      <p>{{ statusDes }}</p>
      <!-- 已预约 -->
      <div class="btnbox">
        <!-- <van-button
          class="btn"
          v-if="[1, 2].includes(activeIndex)"
          @click="handelClick('取消')"
          plain
          round
          >申请取消</van-button
        > -->
        <!-- <van-button
          class="btn"
          v-if="[2].includes(activeIndex)"
          color="#E62C3B"
          round
          >已到达</van-button
        > -->
        <van-button
          v-if="[3].includes(activeIndex)"
          class="btn"
          color="#E62C3B"
          @click="handelClick('结束')"
          round
          >{{ this.type == "助餐服务类" ? "已到达" : "结束服务" }}</van-button
        >

        <van-button
          class="btn"
          v-if="[0, 4].includes(activeIndex)"
          @click="handelClick('删除')"
          color="#E62C3B"
          round
          >删除订单</van-button
        >
        <van-button
          v-if="[0, 4].includes(activeIndex)"
          class="btn"
          @click="handelClick('购买')"
          round
          >再次购买</van-button
        >
        <van-button
          v-if="[4].includes(activeIndex)"
          class="btn"
          color="#E62C3B"
          @click="handelClick('评价')"
          round
          >评价</van-button
        >
        <van-button
          v-if="[0].includes(activeIndex)"
          class="btn"
          @click="handelClick('返回')"
          round
          >返回首页</van-button
        >
      </div>
    </nav>
    <nav class="speedprogress" v-if="activeIndex">
      <!-- 步骤条盒子 -->
      <div class="steps-box">
        <!-- 步骤条 -->
        <div
          class="Article-steps"
          :class="stepList.length < activeIndex ? 'step-over' : ''"
        >
          <!-- 步骤条背景进度条 -->
          <div class="line">
            <span
              class="plan"
              :style="`width:${
                activeIndex * (100 / (stepList.length - 1)) -
                100 / (stepList.length - 1) / 2
              }%`"
            ></span>
          </div>
          <!-- 每步部分 -->
          <span
            class="step"
            v-for="(i, index) in stepList"
            :key="index"
            :class="
              activeIndex == i.stepIndex
                ? 'step-acting'
                : activeIndex > i.stepIndex
                ? 'step-active'
                : ' '
            "
          >
            <span class="step-num">
              <span class="num">{{ i.title }}</span>
            </span>
          </span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  // props: ["status"],
  props: {
    status: {
      type: Number,
      default: () => {
        return null;
      },
    },
    type: {
      type: String,
      default: () => {
        return "";
      },
    },
    time: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      //当前位置
      activeIndex: 0,
      statusDes: "订单已支付，请耐心等待！",
      //步骤条步数
      stepList: [
        {
          stepIndex: 0,
          title: "已付款",
        },
        {
          stepIndex: 1,
          title: "派单中",
        },
        {
          stepIndex: 2,
          title: "服务中",
        },
        {
          stepIndex: 3,
          title: "已完成",
        },
      ],
      statusText: "已预约",
    };
  },
  watch: {
    /*
      0:订单取消
      1:新建
      2:接单
      3:拒单
      4:接受派单
      5:拒绝派单
      6:开始服务
      7:结束服务
      8:评价
      9:回访
    */
    status() {
      switch (this.status) {
        case 0:
          this.activeIndex = 0;
          this.statusText = "订单已取消";
          this.statusDes = "取消时间：" + this.time.cancelTime;
          break;
        case 1:
          this.activeIndex = 1;
          this.statusText = "已预约";
          this.statusDes = "订单已支付，请耐心等待！";
          break;
        case 2:
          this.activeIndex = 2;
          this.statusText = "派单中";
          this.statusDes = "已派单至服务人员中，请注意来电消息！";
          break;
        case 3:
          this.activeIndex = 0;
          this.statusText = "订单已拒单";
          this.statusDes = "拒单时间：" + this.time.rejectionTime;
          break;
        case 4:
          this.activeIndex = 2;
          this.statusText = "派单中";
          this.statusDes = "已派单至服务人员中，请注意来电消息！";
          break;
        case 5:
          this.activeIndex = 2;
          this.statusText = "派单中";
          this.statusDes = "已派单至服务人员中，请注意来电消息！";
          break;
        case 6:
          this.activeIndex = 3;
          this.statusText = "服务中";
          this.statusDes = "服务人员结束后，点击“结束服务”完成订单";
          break;
        case 7:
          this.activeIndex = 4;
          this.statusText = "订单已完成";
          this.statusDes = "感谢您的信任";
          break;
        // 默认
        default:
          this.activeIndex = 4;
          this.statusText = "订单已完成";
          this.statusDes = "感谢您的信任";
          break;
      }
    },
  },

  computed: {},

  mounted() {
    // window.localStorage.removeItem("type")
    // this.type = window.localStorage.getItem("type");

    // 将回调延迟到下次 DOM 更新循环结束之后执行
    this.$nextTick(() => {
      // console.log(this.type);
      if (this.type == "助餐服务类") {
        this.stepList[2].title = "配送中";
      }
    });
  },

  methods: {
    handelClick(n) {
      this.$emit("cancel", n);
    },
  },
};
</script>

<style lang="less" scoped>
.header_box {
  height: 174px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 39px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    letter-spacing: 3px;
  }
  .yellow {
    color: #ff9900;
  }
  .green {
    color: #018a5d;
  }
  .red {
    color: #f56c6c;
  }
  p {
    font-size: 17px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #000000;
  }
  .btnbox {
    margin-top: 16px;
    display: flex;
    align-items: center;
    .btn {
      width: 112px;
      height: 30px;
      background: rgba(5, 177, 120, 0.1);
      border-radius: 25px;
      border: 1px solid rgba(1, 138, 93, 0.22);
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #007f55;
      line-height: 30px;
      text-align: center;
      box-sizing: border-box;
      margin-right: 8px;
    }
  }
}

.speedprogress {
  padding: 28px 9px;
  background: #fff;
  .steps-box {
    user-select: none;
    position: relative;
    // <!-- 步骤条背景进度条 -->
    .line {
      display: block;
      margin: 0 auto;
      position: absolute;
      top: 16px;
      left: 5%;
      background: #ccc;
      width: 90%;
      height: 2px;
      overflow: hidden;
      z-index: 8;

      .plan {
        position: absolute;
        top: 0;
        left: 0;
        height: 2px;
        transition: 0.5s;
        background: #05b178;
      }
    }
    .Article-steps {
      display: flex;
      justify-content: space-between;
      .step {
        position: relative;
        z-index: 9;
        width: 70px;
        height: 30px;
        display: flex;
        align-items: center;
        .title {
          font-size: 17px;
          font-weight: bold;
          color: #808080;
        }
        .step-num {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          border-radius: 15px;
          text-align: center;
          border: 1px solid rgba(0, 0, 0, 0.2);
          background: #fff;
          .num {
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.5);
          }
        }
      }
    }

    // 已经走过的样式
    .step-active {
      .step-num {
        background: #05b178 !important;
        border: 1px solid #05b178 !important;
        .num {
          color: #fff !important;
        }
      }
    }
    //当前所在位置样式
    .step-acting {
      .step-num {
        border: 1px solid #05b178 !important;
        .num {
          color: #05b178 !important;
        }
      }
    }

    //全部完成样式
    .step-over {
      .plan {
        background: #91f062 !important;
      }
      .step-num {
        background: #67c23a !important;
      }
      .title {
        color: #67c23a !important;
      }
    }
  }
}
</style>
