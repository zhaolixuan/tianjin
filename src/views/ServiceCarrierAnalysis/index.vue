<template>
  <div class="older-page_bg">
    <page-header title="服务商载体运营情况统计分析"></page-header>
    <div class="older-container">
      <div class="left-panels">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="服务时间: " class="search_select">
            <el-date-picker
              v-model="timeData[0]"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="开始日期"
            >
            </el-date-picker>
            <el-date-picker
              v-model="timeData[1]"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="截止日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-button
            class="btn"
            icon="el-icon-search"
            :loading="isSearchLoading"
            @click="handleGetSearchValue"
            >查询</el-button
          >
        </el-form>
        <amout-service
          :serviceTypeMap="merchantServiceTotalMap"
          :time="timeData"
        ></amout-service>
        <money-service
          :serviceTypeMap="merchantMoneyTotalMap"
          :time="timeData"
        ></money-service>
      </div>
      <div class="centre-panels">
        <screening-condition
          @handleChangeForm="handleChangeForm"
          :loading="loading"
        ></screening-condition>
        <all-orders :allOrderMap="moneyServiceTotalMap"></all-orders>
        <service-amount :serviceTypeMap="serviceTypeTotalMap"></service-amount>
        <service-scene :serviceTypeMap="orderTypeTotalMap"></service-scene>
      </div>
      <div class="right-panels">
        <service-way :serviceTypeMap="serviceStyleTotalMap"></service-way>
        <old-age :oldageMap="servicePeopleTotalMap"></old-age>
        <older-list :listForm="listForm"></older-list>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import PageHeader from "@/views/OlderDistribution/components/PageHeader/header";
import ScreeningCondition from "./components/ScreeningCondition/index";
import AllOrders from "./components/AllOrders/index";
import moneyService from "./components/moneyService/index";
import ServiceScene from "./components/ServiceScene/index";
import ServiceAmount from "./components/ServiceAmount/index";
import ServiceWay from "./components/ServiceWay/index";
import OldAge from "./components/OldAge/index";
import AmoutService from "./components/AmoutService/index";
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import OlderList from "./components/OrderList/index";
import { mapGetters } from "vuex";
import Menu from "@/views/OlderDistribution/components/Menu";
import {
  getCarrierOperationInfoOne,
  getCarrierOperationInfoTwo
} from "./apis/index";
import { formatTime } from "@/utils/utils";

export default {
  name: "FacilitatorAnalytical",
  data() {
    return {
      merchantServiceTotalMap: [],
      companyServiceTotalMap: [],
      timeData: [formatTime(new Date()), formatTime(new Date())],
      moneyServiceTotalMap: {},
      serviceTypeTotalMap: {},
      orderTypeTotalMap: [],
      serviceStyleTotalMap: [],
      servicePeopleTotalMap: {},
      serviceShop: [],
      serviceCarrierMap: [],
      isSearchLoading: false,
      loading: false,
      merchantMoneyTotalMap: [],
      formData: {
        beginDay: "",
        endDay: ""
      },
      listForm: {}
    };
  },

  computed: {
    ...mapGetters(["typeNew", "codeNew", "useName"]),
    params: {
      get: function() {
        let params = {};
        const typeCodes = ["code", "zoneCode", "streetCode", "communityCode"];
        params[typeCodes[this.typeNew - 1]] = this.codeNew[0];
        return params;
      },
      set: function() {}
    }
  },

  watch: {
    codeNew(val) {
      this.getCarrierOperationInfoOne();
    }
  },

  created() {
    this.$store.dispatch("getUserAuthInfo");
    this.formData.beginDay = formatTime(new Date(this.timeData[0]));
    this.formData.endDay = formatTime(new Date(this.timeData[1]));
    // this.getCarrierOperationInfoOne();
    if (
      this.$route.query.code ||
      (this.$route.query.code && this.$route.query.code.length > 0)
    ) {
      this.initCodeFromUrlQuery();
    }
  },

  methods: {
    handleGetSearchValue() {
      this.formData.beginDay = this.timeData ? this.timeData[0] : "";
      this.formData.endDay = this.timeData ? this.timeData[1] : "";
      this.getCarrierOperationInfoOne();
    },
    handleChangeForm(form) {
      this.listForm = form;
      this.getCarrierOperationInfoTwo(form);
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

    getCarrierOperationInfoOne() {
      let roleid = window.localStorage.getItem("roleid");
      let params = Object.assign({}, this.params, this.formData, {
        companyName: roleid === "28" || roleid === "29" ? this.useName : null
      });
      this.isSearchLoading = true;
      getCarrierOperationInfoOne(params)
        .then(res => {
          this.isSearchLoading = false;
          if (res.data) {
            this.merchantServiceTotalMap =
              res.data.merchantServiceTotalMap || [];
            this.companyServiceTotalMap = res.data.companyServiceTotalMap || [];
            this.merchantMoneyTotalMap = res.data.merchantMoneyTotalMap || [];
          }
        })
        .catch(() => {
          this.isSearchLoading = false;
        });
    },
    getCarrierOperationInfoTwo(form) {
      this.loading = true;
      getCarrierOperationInfoTwo(form)
        .then(res => {
          this.loading = false;
          if (res.data) {
            this.moneyServiceTotalMap =
              (res.data.moneyServiceTotalMap &&
                res.data.moneyServiceTotalMap[0]) ||
              [];
            this.serviceTypeTotalMap =
              (res.data.serviceTypeTotalMap &&
                res.data.serviceTypeTotalMap[0]) ||
              [];
            this.orderTypeTotalMap = res.data.orderTypeTotalMap || [];
            this.serviceStyleTotalMap = res.data.serviceStyleTotalMap || [];
            this.servicePeopleTotalMap =
              (res.data.servicePeopleTotalMap &&
                res.data.servicePeopleTotalMap[0]) ||
              {};
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    debounce(fn, wait) {
      if (this.fn !== null) {
        clearTimeout(this.fn);
      }
      this.fn = setTimeout(fn, wait);
    }
  },

  components: {
    PageHeader,
    ScreeningCondition,
    AllOrders,
    moneyService,
    ServiceScene,
    ServiceAmount,
    ServiceWay,
    OldAge,
    AmoutService,
    NormLayout,
    OlderList,
    Menu
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
}
.older-container {
  display: flex;
  height: 100%;
  margin: 0 1.58%;
  .left-panels,
  .right-panels {
    width: 5rem;
    height: 10.1rem;
    padding: 1% 1% 0 1%;
    box-sizing: border-box;
    z-index: 3;
    margin-top: -0.2rem;
  }
  .left-panels {
    width: 7rem;
  }
  .centre-panels {
    flex: 1;
    width: 6rem;
    height: 10.1rem;
    position: relative;
    // padding: 0 2%;
  }
  // .right-panels {
  //   width: 6rem;
  // }
  .bread {
    position: fixed;
    top: 6%;
    left: 1%;
  }
}
.older-container {
  /deep/ .el-form {
    width: 100%;
    height: 1rem;
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
  }
  /deep/ .el-form-item {
    margin-bottom: 0.2rem;
    display: flex;
    width: 73%;
  }
  /deep/ .el-form-item__content {
    width: 3.4rem !important;
    display: flex !important;
    height: 0.5rem;
  }
  /deep/ .el-form .el-form-item__label {
    font-size: 0.2rem;
    color: #68f4ff;
    width: 1.6rem;
    font-weight: 600;
  }
  /deep/ .el-form .el-input__inner {
    background-color: transparent;
    color: #56a4f7;
    border: 0.01rem solid #043a6f;
  }
  /deep/ .el-input .el-select__caret {
    color: #409eff;
  }
  /deep/ .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 1.5rem;
    margin-right: 0.2rem;
  }
  /deep/ .el-input__inner::-webkit-input-placeholder {
    color: #436fd2;
  }
  /deep/ .el-select-dropdown__item {
    color: #8fc0f3;
  }
  /deep/ .el-input__inner:hover,
  /deep/ .el-select:hover .el-input__inner,
  /deep/ .el-cascader .el-input:hover .el-input__inner {
    border-color: #043a6f;
  }
  /deep/ .btn:focus,
  /deep/ .btn:hover {
    color: #16fff1;
    background: url("~@/assets/img/oldMan_tab.png") no-repeat;
    background-size: 100% 100%;
  }
  /deep/ .el-form-item__content .el-date-editor .el-range-input {
    background: transparent !important;
    font-size: 0.16rem;
    color: #416fc4 !important;
    width: 98%;
  }
  /deep/ .btn {
    /* padding:0.15rem 0.5rem; */
    margin: 0 auto;
    width: 1.3rem;
    height: 0.4rem;
    /* line-height: .4rem; */
    background: url("~@/assets/img/oldMan_tab.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    border: 0;
    color: #4fd0ff;
    float: right;
    font-size: 0.14rem;
  }
  /deep/ .el-select-dropdown__item.hover,
  /deep/
    .el-select-dropdown.is-multiple
    .el-select-dropdown__item.selected.hover {
    background-color: #0148cb;
    color: #8fc0f3;
  }
}
</style>
<style>
.el-select-dropdown__item,
.el-date-picker__header-label,
.el-date-table td,
.el-month-table td .cell,
.el-year-table td .cell,
.el-picker-panel__icon-btn {
  color: #8fc0f3;
}
.el-select-dropdown,
.el-picker-panel,
.el-cascader__dropdown {
  background-color: #032995;
  border: 0;
}
.el-select-dropdown__item.hover,
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover {
  background-color: #0148cb;
  color: #8fc0f3;
}
.el-date-editor .el-range-input::-webkit-input-placeholder {
  color: #416fc4;
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
.el-select-dropdown,
.el-picker-panel,
.el-cascader__dropdown {
  background-color: #032995;
  border: 0;
}
.el-popper[x-placement^="bottom"] .popper__arrow,
.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: #032995;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #032995;
}
</style>
