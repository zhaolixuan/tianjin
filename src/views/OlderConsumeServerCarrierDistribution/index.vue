<template>
  <div class="older-page_bg">
    <page-header title="老年人消费频率"></page-header>
    <div class="older-container">
      <!-- header -->
      <div class="bread">
        <norm-layout
          text="老年人消费频率分析——老年人消费人群服务载体分布"
          path="OlderConsumpFrequency"
          :flag="false"
        ></norm-layout>
      </div>
      <!-- formHeader -->
      <div class="from_header">
        <el-form>
          <el-form-item label="起止日期" class="search_select">
            <el-date-picker
              v-model="beginAndEndTime[0]"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="开始日期"
              v-on:change="handleChangeTimeValue"
            >
            </el-date-picker>
            <el-date-picker
              v-model="beginAndEndTime[1]"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="截止日期"
              v-on:change="handleChangeTimeValue"
            >
            </el-date-picker>
          </el-form-item>
          <!-- 服务商 -->
          <el-form-item label="服务商" class="search_select serverPoint">
            <el-select
              placeholder="请选择服务商"
              v-model="serverProvider"
              v-on:change="handleGetServerProvider"
            >
              <el-option
                v-for="(item, index) in ProviderList"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 服务载体级别 -->
          <el-form-item label="服务载体级别" class="search_select provider">
            <el-select
              placeholder="请选择载体级别"
              v-model="carrierLevel"
              multiple
              v-on:change="handleGetCarrierLevel"
            >
              <el-option
                v-for="(item, index) in carrierLevelList"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 消费次数 -->
          <el-form-item label="消费次数" class="search_select consumeTimes">
            <el-input
              placeholder="请输入消费次数"
              v-model="streetDistriForm.consumeCount"
              v-on:change="handleChangeValue"
            ></el-input>
            <el-input
              v-model="streetDistriForm.maxNum"
              placeholder="最大次数"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="年龄段"
            class="search_select search_time ageRange"
          >
            <el-input
              v-model="streetDistriForm.minAge"
              placeholder="起始年龄"
            ></el-input>
            <el-input
              v-model="streetDistriForm.maxAge"
              placeholder="截止年龄"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="养老待遇"
            class="search_select search_time yanglao"
          >
            <el-input
              v-model="streetDistriForm.minAmount"
              placeholder="起始金额"
            ></el-input>
            <el-input
              v-model="streetDistriForm.maxAmount"
              placeholder="截止金额"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="btn_box">
          <el-button
            class="btn"
            icon="el-icon-search"
            :loading="isSearchLoading"
            @click="handleGetSearchValue"
            >查询</el-button
          >
        </div>
      </div>
      <!-- main -->
      <div class="main">
        <vue-scroll :ops="ops">
          <stacked-column-chart
            :serviceData="serviceData"
          ></stacked-column-chart>
        </vue-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/views/OlderDistribution/components/PageHeader/header";
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import PageScroll from "@/views/ProvideAged/vueScroll/index";
import StackedColumnChart from "./StackedColumnChart/index.vue";
import Menu from "@/views/OlderDistribution/components/Menu";
import { mapGetters } from "vuex";
import { formatTime, returnData } from "@/utils/utils";
import api from "@/api/api";

export default {
  data() {
    return {
      beginAndEndTime: [new Date(new Date("2021,06,01")), new Date()],
      streetDistriForm: {
        consumeCount: "",
        maxNum: "",
        minAge: "",
        maxAge: "",
        minAmount: "",
        maxAmount: ""
      },
      serverProvider: "",
      ProviderList: [],
      carrierLevel: "",
      carrierLevelList: [
        {
          label: "街级",
          value: "街级"
        },
        {
          label: "社区级",
          value: "社区级"
        },
        {
          label: "服务站",
          value: "服务站"
        }
      ],
      isSearchLoading: false,
      ops: {
        vuescroll: {},
        scrollPanel: {
          scrollingX: false
        },
        rail: {},
        bar: {
          background: "#eee"
        }
      },
      serviceData: {
        Data: [],
        moneyValue: [],
        consumeValue: []
      }
    };
  },

  components: {
    PageHeader,
    NormLayout,
    PageScroll,
    StackedColumnChart,
    Menu
  },

  computed: {
    ...mapGetters(["typeNew", "codeNew"]),
    params() {
      let params = {};
      const typeCodes = ["code", "zoneCode", "streetCode", "communityCode"];
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0];
      return params;
    }
  },

  created() {
    if (
      this.$route.query.code ||
      (this.$route.query.code && this.$route.query.code.length > 0)
    ) {
      this.initCodeFromUrlQuery();
    } else {
      this.initChartInfo();
    }
  },

  mounted() {
    this.beginAndEndTime[0] = this.$route.query.beginDay;
    this.beginAndEndTime[1] = this.$route.query.endDay;
    this.streetDistriForm.consumeCount = this.$route.query.MinNum;
    this.streetDistriForm.maxNum = this.$route.query.MaxNum;
    this.getServicePointData();
    // 注意先后顺序 不然会提示 this.carrierLevel.join 报错
    this.getConsumeDistributionList();
  },

  watch: {
    codeNew() {
      //
    }
  },

  methods: {
    // 时间查询改变
    handleChangeTimeValue(val) {
      // console.log(val);
    },

    // 数值查询改变
    handleChangeValue(val) {
      // console.log(val);
    },

    getServicePointData() {
      let params = {};
      api.getServicePoint(params).then(res => {
        if (res.code && res.code == 200) {
          this.ProviderList = res.data;
        }
      });
    },

    // 服务商改变
    handleGetServerProvider(val) {
      // console.log(val);
    },

    // 载体改变
    handleGetCarrierLevel(val) {
      // console.log(val);
    },

    initCodeFromUrlQuery() {
      let code = [];
      let len = 1;
      if (typeof this.$route.query.code !== "string") {
        code[0] = this.$route.query.code[this.$route.query.code.length - 1];
        code[1] = this.$route.query.code[this.$route.query.code.length - 2];
        len = this.$route.query.code.length;
      } else {
        code = [this.$route.query.code, "120100000000"];
      }
      this.$store.commit("setCodeNew", code);
      this.$store.commit("setTypeNew", len);
    },

    initChartInfo() {
      this.$store.dispatch("getUserAuthInfo");
    },

    // 监听查询按钮
    handleGetSearchValue() {
      console.log("handleGetSearchValue");
      // this.form.beginDay = this.beginAndEndTime ? this.beginAndEndTime[0] : "";
      // this.form.endDay = this.beginAndEndTime ? this.beginAndEndTime[1] : "";
      this.getConsumeDistributionList();
    },

    // 实际用到的接口
    getConsumeDistributionList() {
      this.isSearchLoading = true;
      let params = {
        beginDay: this.beginAndEndTime[0],
        endDay: this.beginAndEndTime[1],
        servicePoint: this.serverProvider,
        canteenlevel: this.carrierLevel.join(","),
        MinNum: this.streetDistriForm.consumeCount,
        MaxNum: this.streetDistriForm.maxNum,
        MinAge: this.streetDistriForm.minAge,
        MaxAge: this.streetDistriForm.maxAge,
        MinMoney: this.streetDistriForm.minAmount,
        MaxMoney: this.streetDistriForm.maxAmount,
        classifyType: this.$route.query.classifyType || "merchant_name"
      };
      api.getConsumeDistributionList(params).then(res => {
        // console.log(res);
        this.isSearchLoading = false;
        var resData = res.data.reverse();
        this.serviceData.Data = returnData(resData, "merchantName", "");
        this.serviceData.servicesValue = returnData(resData, "peopleNum", "");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.older-page_bg {
  min-height: 100%;
  font-size: initial;
  user-select: none;
  background-image: url("~@/views/OlderDistribution/assets/img/older-page_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  /deep/ .search_select .el-form-item__label {
    font-size: 0.2rem;
    color: #a6c5fd;
    // width: 1.35rem;
    float: left;
  }
  /deep/ .el-form {
    width: 21rem;
    display: flex;
    float: left;
    margin-left: 0.2rem;
  }
  /deep/ .el-form-item {
    width: 27%;
  }
  /deep/ .el-input__inner {
    font-size: 0.16rem;
    background-color: transparent;
    border: 0;
    border: 0.01rem solid #043a6f;
    color: #56a4f7;
    max-width: 3rem;
  }
  /deep/ .el-form-item__content {
    width: 103%;
    margin-right: 0rem;
  }

  /deep/ .search_select .el-form-item__content .el-input {
    width: 1.5rem;
    margin-right: 0rem;
  }

  /deep/ .serverPoint {
    width: 16%;
  }

  /deep/ .serverPoint .el-form-item__content {
    width: 100%;
  }

  /deep/ .el-form .el-form-item.search_select.provider {
    width: 19% !important;
  }

  /deep/ .consumeTimes {
    width: 22%;
  }

  /deep/ .consumeTimes .el-form-item__content {
    width: 100%;
    margin-right: 0rem;
  }

  /deep/ .consumeTimes .el-form-item__content .el-input {
    width: 1rem;
  }

  /deep/ .ageRange {
    width: 22%;
  }

  /deep/ .ageRange .el-form-item__content {
    width: 100%;
    margin-right: 0rem;
  }

  /deep/ .ageRange .el-form-item__label {
    width: 1.05rem;
  }

  /deep/ .ageRange .el-form-item__content .el-input {
    width: 1rem;
  }

  /deep/ .yanglao {
    width: 22%;
  }

  /deep/ .yanglao .el-form-item__label {
    width: 1.35rem;
  }

  /deep/ .yanglao .el-form-item__content .el-input {
    width: 1rem;
  }

  /deep/ .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 1.6rem;
    margin-right: 0.2rem;
  }
  /deep/ .el-input__inner::-webkit-input-placeholder {
    color: #436fd2;
  }

  /deep/ .el-date-editor .el-range-input::-webkit-input-placeholder {
    color: #416fc4;
  }
  /deep/ .el-form-item__content .el-date-editor i {
    color: #416fc4;
  }
  /deep/ .btn {
    width: 1.3rem;
    height: 0.4rem;
    background: url("~@/assets/img/oldMan_tab.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    border: 0;
    color: #4fd0ff;
    margin-right: 0.1rem;
    float: right;
    font-size: 0.14rem;
  }
  /deep/ .btn:focus,
  /deep/ .btn:hover {
    color: #16fff1;
    background: url("~@/assets/img/oldMan_tab.png") no-repeat;
    background-size: 100% 100%;
  }
}
.older-container {
  height: 100%;
  margin: 0 1.58%;
  display: flex;
  flex-direction: column;
  .from_header {
    width: 100%;
    height: 1rem;
    padding-top: 0.3rem;
    box-sizing: border-box;
    .btn_box {
      height: 1rem;
      width: 21rem;
      display: flex;
      justify-content: flex-end;
      .btn {
        margin-right: 0.2rem;
        z-index: 99;
      }
    }
  }
  .main {
    width: 100%;
    // 这里控制echars在网页中的滚屏
    // height: 8.7rem;
    // overflow: auto;
  }
  .bread {
    position: fixed;
    top: 7%;
    left: 2%;
  }
}

// 让单个 el-form-item label 和 input 一行显示
/deep/ .search_time {
  width: 380px !important;
  display: flex;
  justify-content: flex-start;
}

// 更改宽度
/deep/ .search_time .el-form-item__content .el-input {
  width: 42%;
}

// 更改 OlderConsumpTimesAndAmount 路由 起止日期控件 文本 padding 值
/deep/ .search_time .el-form-item__content .el-date-editor .el-input__inner {
  padding-left: 0.1rem;
}
</style>

<style>
.el-select-dropdown,
.el-cascader__dropdown {
  background-color: #032995;
  border: 0;
}
.el-select-dropdown__item.hover,
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover {
  background-color: #0148cb;
  color: #8fc0f3;
}
.el-input__inner:hover,
.el-select:hover .el-input__inner,
.el-cascader .el-input:hover .el-input__inner {
  border-color: #043a6f;
}
.el-picker-panel {
  background-color: #032995 !important;
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
</style>
