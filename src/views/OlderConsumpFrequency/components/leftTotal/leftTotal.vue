<template>
  <div class="left_total">
    <div class="content">
      <div class="item" v-for="(item, index) in leftTotalList" :key="index">
        <div class="name">{{ item.label }}</div>
        <div class="value">
          {{ item.value }}
          {{
            item.label == "消费人数"
              ? "人"
              : item.label == "服务量"
              ? "次"
              : "元"
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api.js";

export default {
  name: "leftTotal",
  data() {
    return {
      leftTotalList: []
    };
  },

  props: {
    statisticsForm: {
      type: Object,
      default: () => {
        return {};
      }
    },

    ispressSearchButton: {
      type: Number
    },

    consumptionNumLeftTotal: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  created() {
    this.getConsumptionList();
  },

  watch: {
    ispressSearchButton() {
      this.getConsumptionList();
    }
  },

  methods: {
    getConsumptionList() {
      let params = {
        beginDay: this.statisticsForm.beginDay,
        endDay: this.statisticsForm.endDay,
        MinNum: this.statisticsForm.count,
        MaxNum: this.statisticsForm.MaxNum
      };
      api.getConsumptionList(params).then(res => {
        console.log(res);
        var consumptionNum = res.consumptionNum;
        let b = [];
        Object.keys(consumptionNum).forEach(i => {
          b.push({
            label:
              i == "amount"
                ? "消费金额"
                : i == "num"
                ? "服务量"
                : i == "peopleNum"
                ? "消费人数"
                : "",
            value: consumptionNum[i]
          });
        });
        // 切割第一项消费金额插入到数组变为第二项
        let first = b.shift();
        b.splice(1, 0, first);
        this.leftTotalList = b;
      });
    }
  },

  computed: {
    leftTotal() {
      var arrCon = [];
      Object.keys(this.consumptionNumLeftTotal).forEach(item => {
        arrCon.push({
          label:
            item == "amount"
              ? "消费金额"
              : item == "num"
              ? "服务量"
              : item == "peopleNum"
              ? "消费人数"
              : "",
          value: this.consumptionNumLeftTotal[item]
        });
        let first = arrCon.shift();
        arrCon.splice(1, 0, first);
        return arrCon;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.left_total {
  // border: 1px dotted #80b5ff;
  height: 1.3rem;
  box-sizing: border-box;
  margin-bottom: 0.3rem;
  // padding: 0rem 0rem;
  margin-top: -0.28rem;
  margin-left: 0.4rem;
  .content {
    display: flex;
    justify-content: space-between;
    .item {
      height: 1.3rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .name {
        height: 0.5rem;
        font-size: 0.22rem;
        color: #68f4ff;
        font-weight: 700;
        line-height: 0.8rem;
        text-align: center;
      }
      .value {
        height: 0.5rem;
        color: #ff8400;
        text-align: center;
        font-weight: 700;
        font-size: 0.22rem;
        line-height: 0.1rem;
      }
    }
  }
}
</style>
