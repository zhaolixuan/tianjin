<template>
  <div class="middle_total">
    <div class="content">
      <div class="item" v-for="(item, index) in middleTotalList" :key="index">
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
  name: "middleTotal",
  data() {
    return {
      middleTotalList: []
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
      api.getPeopleTotalNum(params).then(res => {
        console.log(res);
        var resData = res.data;
        let resultArr = [];
        Object.keys(resData).forEach(item => {
          resultArr.push({
            label:
              item == "totalAmount"
                ? "消费金额"
                : item == "serviceNum"
                ? "服务量"
                : item == "peopleNum"
                ? "消费人数"
                : "",
            value: resData[item]
          });
        });
        this.middleTotalList = resultArr;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.middle_total {
  // border: 1px dotted #80b5ff;
  height: 0.8rem;
  box-sizing: border-box;
  padding: 0.1rem 0rem 0rem 0rem;
  margin-left: 0.4rem;
  .content {
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    .item {
      height: 0.6rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .name {
        height: 0.3rem;
        font-size: 0.22rem;
        color: #68f4ff;
        font-weight: 700;
        line-height: 0.3rem;
        text-align: center;
      }
      .value {
        height: 0.3rem;
        color: #ff8400;
        text-align: center;
        font-weight: 700;
        font-size: 0.22rem;
        line-height: 0.3rem;
      }
    }
  }
}
</style>
