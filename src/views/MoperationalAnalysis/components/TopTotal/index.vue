<template>
  <div class="toptal">
    <div class="total_item" v-for="(item, index) in toptotalList" :key="index">
      <div class="img">
        <img :src="item.img" alt="" />
      </div>
      <p class="number">
        {{ item.number }}
        <span class="unit">{{ item.unit }}</span>
      </p>
      <p class="desc">{{ item.des }}</p>
    </div>
  </div>
</template>

<script>
import api from "@/api/api.js";

export default {
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    seviceName: {
      type: String,
      default: () => {
        return "";
      }
    }
  },

  data() {
    return {
      toptotalList: [
        {
          img: require("@/views/MoperationalAnalysis/imgs/Slice_times@2x.png"),
          number: "",
          unit: "次",
          des: "服务客次"
        },
        {
          img: require("@/views/MoperationalAnalysis/imgs/Slice_older@2x.png"),
          number: "",
          unit: "人",
          des: "服务老年人"
        },
        {
          img: require("@/views/MoperationalAnalysis/imgs/Slice_white_card@2x.png"),
          number: "",
          unit: "个",
          des: "白卡"
        },
        {
          img: require("@/views/MoperationalAnalysis/imgs/Slice_shishoujine@2x.png"),
          number: "",
          unit: "元",
          des: "实收金额"
        },
        {
          img: require("@/views/MoperationalAnalysis/imgs/Slice_xianjiabutie@2x.png"),
          number: "",
          unit: "元",
          des: "限价补贴"
        },
        {
          img: require("@/views/MoperationalAnalysis/imgs/Slice_qiyebutie@2x.png"),
          number: "",
          unit: "元",
          des: "企业补贴"
        }
      ]
    };
  },

  mounted() {
    this.getSixTopData();
  },

  watch: {
    formData: {
      handler(newVal, oldVal) {
        // console.log(newVal);
        this.getSixTopData();
      },
      deep: true
    },
    seviceName: {
      handler(newVal, oldVal) {
        this.getSixTopData();
      }
    }
  },

  methods: {
    getSixTopData() {
      let params = {
        startTime: this.formData.beginTime,
        endTime: this.formData.endTime,
        name: this.seviceName
      };
      console.log(params);
      api.sixTopCount(params).then(res => {
        // console.log(res);
        if (res.code && res.code == 200) {
          let {
            count,
            serviceOld,
            whiteCar,
            paidMoney,
            subsidyMoney,
            companyMoney
          } = res.data;
          this.toptotalList.forEach(item => {
            switch (item.des) {
              case "服务客次":
                item.number = count;
                break;
              case "服务老年人":
                item.number = serviceOld;
                break;
              case "白卡":
                item.number = whiteCar;
                break;
              case "实收金额":
                item.number = paidMoney;
                break;
              case "限价补贴":
                item.number = subsidyMoney;
                break;
              case "企业补贴":
                item.number = companyMoney;
                break;
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.toptal {
  height: 1.02rem;
  width: 100%;
  padding: 0.2rem 0rem;
  display: flex;
  justify-content: space-between;
  .total_item {
    flex: 1;
    height: 100%;
    width: 2.06rem;
    background-color: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 0.2rem;
    box-shadow: 0rem 0.02rem 0.08rem 0.01rem rgba(4, 38, 72, 0.059);
    opacity: 1;
    &:nth-last-child(1) {
      margin-right: 0rem;
    }
    .img {
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-50%, -50%);
      border: 0.02rem dotted #ccc;
      width: 0.33rem;
      height: 0.31rem;
      opacity: 1;
      display: flex;
      img {
        width: 102%;
        height: 102%;
      }
    }
    .number {
      height: 0.42rem;
      font-size: 0.34rem;
      font-weight: 700;
      text-align: center;
      font-family: DIN Alternate-Bold, DIN Alternate;
      font-weight: bold;
      color: #333333;
      line-height: 0.44rem;
      letter-spacing: 0.02rem;
      margin-top: 0.16rem;
      .unit {
        width: 0.3rem;
        height: 0.26rem;
        font-size: 0.14rem;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 0.26rem;
      }
    }
    .desc {
      font-weight: 400;
      text-align: center;
      margin-top: 0.1rem;
      height: 0.2rem;
      font-size: 0.14rem;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #666666;
      line-height: 0.2rem;
    }
  }
}
</style>
