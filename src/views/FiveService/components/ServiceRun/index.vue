<template>
  <div class="older-content">
    <norm-layout text="养老服务运营"></norm-layout>
    <div class="top_text">
      <message-item :ServiceData="ServiceData"></message-item>
    </div>
    <div class="service_time fiveService">
      <el-form>
        <el-form-item label="服务时间：" class="search_select">
          <el-date-picker
            v-model="ServiceTime[0]"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="开始日期"
          >
          </el-date-picker>
          <el-date-picker
            v-model="ServiceTime[1]"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="截止日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-button
          class="btn"
          icon="el-icon-search"
          :loading="Loading"
          @click="handleGetSearchValue"
          >查询</el-button
        >
      </el-form>
    </div>
    <div class="top_text">
      <message-item :ServiceData="ConsumeData"></message-item>
    </div>
  </div>
</template>

<script>
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import MessageItem from "@/views/OlderDistribution/components/MessageItem/index";
import { mapGetters } from "vuex";
export default {
  name: "ServiceRun",
  data() {
    return {
      ServiceTime: [],
      timeData: [new Date(), new Date()]
    };
  },
  props: {
    serviceMealMap: {
      type: Object,
      default: () => {}
    },
    Loading: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    ServiceTime: {
      deep: true, // 可以深度检测到 obj 对象的属性值的变化
      handler(newName) {
        this.$emit("setServiceTime", this.ServiceTime);
        //特别注意，不能用箭头函数，箭头函数，this指向全局
      }
    }
  },
  created() {
    this.ServiceTime = [
      this.getDate(this.timeData[0]),
      this.getDate(this.timeData[1])
    ];
    this.$emit("update:Loading", true);
    this.$emit("setServiceTime", this.ServiceTime);
  },
  computed: {
    ...mapGetters(["breadCrumbCodes"]),
    ServiceData() {
      let { canteenTotalCount, companyTotal } = this.serviceMealMap || {};
      return [
        {
          title: "服务载体",
          number: canteenTotalCount || 0,
          text: "个",
          line: true,
          flag: false,
          path: {
            path: "ServiceCarrier",
            query: {
              code: this.breadCrumbCodes,
              header: "五大服务大数据统计分析",
              key: 1
            }
          }
        }
        // 2021年10月26日需求 将 服务商家 隐藏
        // {
        //   title: '服务商家',
        //   number: companyTotal || 0,
        //   text: '家',
        //   flag: false,
        //   path: {
        //     path: 'ServiceProvidersAnalysis'
        //   }
        // }
      ];
    },
    ConsumeData() {
      let { orderCardMonthTotal, consumerMoney } = this.serviceMealMap || {};
      return [
        {
          title: "服务量",
          number: orderCardMonthTotal || 0,
          text: "客次",
          line: true,
          flag: false,
          path: {
            path: "ServiceOlder",
            query: {
              code: this.breadCrumbCodes,
              key: "1",
              header: "五大服务大数据统计分析",
              allStatus: ["未领", "已领"],
              startTime: JSON.stringify(this.ServiceTime[0]),
              endTime: JSON.stringify(this.ServiceTime[1])
            }
          }
        },
        {
          title: "消费金额",
          number: consumerMoney ? consumerMoney.toFixed(0) : 0,
          text: "元",
          flag: true
        }
      ];
    }
  },
  components: {
    NormLayout,
    MessageItem
  },
  methods: {
    getDate(time) {
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let date = time.getDate();
      return year + "-" + month + "-" + date;
    },
    handleGetSearchValue() {
      this.$emit("setServiceTime", this.ServiceTime);
      this.$emit("handleTime");
      this.$emit("update:Loading", true);
    }
  }
};
</script>

<style lang="less" scoped>
.older-content {
  height: 3.5rem;
  .top_text {
    height: 1rem;
  }
  .fiveService {
    display: flex;
    justify-content: flex-start;
    height: 1.2rem !important;
    /deep/ .el-form {
      width: 110% !important;
      height: 1.2rem !important;
      display: flex !important;
      align-items: center !important;
      flex-direction: column !important;
    }
    /deep/ .el-form-item.search_select {
      display: flex !important;
      margin-bottom: 0.1rem !important;
      width: 100%;
      justify-content: flex-start !important;
    }
    /deep/ .el-form-item__label {
      font-size: 0.2rem;
      color: #a6c5fd;
      float: left;
      width: 1.2rem; // 解决 服务时间 这个label 文字折行
    }

    // 这个才是解决 服务 起止时间 input 框组 换行问题的关键
    /deep/ .el-form .el-form-item.search_select .el-form-item__content {
      width: 4.2rem !important;
    }

    /deep/ .el-input__inner {
      font-size: 0.16rem !important;
      background-color: transparent !important;
      border: 0;
      border: 0.01rem solid #043a6f;
      color: #56a4f7;
    }
    /deep/ .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 1.6rem;
      margin-right: 0.2rem;
    }
    /deep/ .el-input__inner::-webkit-input-placeholder {
      color: #436fd2;
    }
    /deep/ .btn {
      /* padding:0.15rem 0.5rem; */
      width: 3.4rem;
      height: 0.4rem;
      /* line-height: .4rem; */
      background: url("~@/assets/img/oldMan_tab.png") no-repeat;
      background-size: 100% 100%;
      text-align: center;
      border: 0;
      color: #4fd0ff;
      margin-right: -0.5rem;
      /* margin-top: 2rem; */
      float: right;
      font-size: 0.14rem;
      display: block;
      margin-left: 0rem;
    }
    /deep/ .btn:focus,
    /deep/ .btn:hover {
      color: #16fff1;
      background: url("~@/assets/img/oldMan_tab.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>

<style>
.el-select-dropdown,
.el-picker-panel,
.el-cascader__dropdown {
  background-color: #032995;
  border: 0;
}
.el-date-picker__header--bordered {
  border-bottom: 1px solid #436fd2;
}
.el-select-dropdown__item,
.el-date-picker__header-label,
.el-date-table td,
.el-month-table td .cell,
.el-year-table td .cell,
.el-picker-panel__icon-btn {
  color: #8fc0f3;
}
.el-popper[x-placement^="bottom"] .popper__arrow,
.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: #032995;
}
.el-date-picker__header--bordered {
  border-bottom: 1px solid #436fd2;
}
.el-date-table th {
  color: #436fd2;
  border-bottom: 1px solid #436fd2;
}
.el-date-table td.next-month,
.el-date-table td.prev-month {
  color: #436fd2;
}
.el-form-item__content .el-date-editor .el-range-input {
  background: transparent !important;
  font-size: 0.16rem;
  color: #416fc4 !important;
  width: 98%;
}
.el-date-editor .el-range-input::-webkit-input-placeholder {
  color: #416fc4;
}
.el-form-item__content .el-date-editor i {
  color: #416fc4;
}
</style>
