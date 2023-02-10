<template>
  <div class="older-page_bg">
    <page-header
      :title="$route.query.title || '服务商运营服务统计'"
    ></page-header>
    <div class="older-container">
      <div class="bread">
        <norm-layout
          :text="
            ($route.query.title || '五大服务类别数据综合分析') +
              '——服务商运营服务统计'
          "
          :path="$route.query.title ? 'HomeDistribution' : 'FiveService'"
          :flag="false"
        ></norm-layout>
      </div>
      <div class="from_header">
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
            :loading="isSearchLoading"
            @click="handleGetSearchValue"
            >查询</el-button
          >
        </el-form>
        <a href="/#/ServiceOperation" target="_blank">
          <div class="bottom_link">服务商下属服务载体运营服务统计</div>
        </a>
      </div>
      <div class="main">
        <order-statistical-bar
          :serviceData="serviceData"
        ></order-statistical-bar>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import PageHeader from "@/views/OlderDistribution/components/PageHeader/header";
import BreadCrumb from "@/views/OlderDistribution/components/BreadCrumb";
import OrderStatisticalBar from "../OrderStatisticalBar/index";
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import { mapGetters } from "vuex";
import Menu from "@/views/OlderDistribution/components/Menu";
import api from "@/api/api";
import { formatTime, returnData } from "@/utils/utils";

export default {
  name: "ServiceProvidersAnalysis",
  data() {
    return {
      ServiceTime: [
        new Date(new Date(`${new Date().getFullYear()}` + ",01,01")),
        new Date()
      ],
      isSearchLoading: false,
      form: {
        beginDay: "",
        endDay: ""
      },
      serviceData: {
        xData: [],
        zValue: [],
        rValue: []
      }
    };
  },

  components: {
    PageHeader,
    BreadCrumb,
    OrderStatisticalBar,
    NormLayout,
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
    if (this.$route.query.startTime) {
      this.form.beginDay = this.$route.query.startTime; //接口传参赋值
      this.ServiceTime[0] = new Date(this.$route.query.startTime); // 表单填充 保持一致 程序要严谨
    } else {
      this.form.beginDay = formatTime(this.ServiceTime[0]);
    }
    this.form.endDay = this.ServiceTime ? formatTime(this.ServiceTime[1]) : "";
    if (
      this.$route.query.code ||
      (this.$route.query.code && this.$route.query.code.length > 0)
    ) {
      this.initCodeFromUrlQuery();
    } else {
      this.initChartInfo();
    }
    this.getMerchantOrderInfo();
  },

  watch: {
    codeNew() {
      this.getMerchantOrderInfo();
    }
  },

  methods: {
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

    handleGetSearchValue() {
      this.form.beginDay = this.ServiceTime ? this.ServiceTime[0] : "";
      this.form.endDay = this.ServiceTime ? this.ServiceTime[1] : "";
      this.getMerchantOrderInfo();
    },

    getMerchantOrderInfo() {
      this.isSearchLoading = true;
      let form = Object.assign({}, this.form, this.params);
      api.getMerchantOrderInfo(form).then(res => {
        if (res.data) {
          this.isSearchLoading = false;
          let { merchantTotalMap } = res.data;
          merchantTotalMap.map((item, index) =>
            item.companyName
              ? item.companyName
              : merchantTotalMap.splice(index, 1)
          );
          this.serviceData.xData = merchantTotalMap.map(item =>
            String(item.companyName).length > 8
              ? String(item.companyName).slice(0, 10) +
                "\n" +
                String(item.companyName).slice(10)
              : String(item.companyName)
          );
          this.serviceData.zValue = returnData(
            merchantTotalMap,
            "orderAllCardMonthTotal",
            ""
          );
          this.serviceData.rValue = returnData(
            merchantTotalMap,
            "consumerAllMoney",
            ""
          );
        }
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
    width: 1.35rem;
    float: left;
  }
  /deep/ .el-form {
    width: 8rem;
    display: flex;
    float: left;
  }
  /deep/ .el-form-item {
    width: 70%;
  }
  /deep/ .el-form-item.search_select .el-form-item__content {
    width: auto;
  }
  /deep/ .el-input__inner {
    font-size: 0.16rem;
    background-color: transparent;
    border: 0;
    border: 0.01rem solid #043a6f;
    color: #56a4f7;
    max-width: 3rem;
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
  /deep/ .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 1.6rem;
    margin-right: 0.2rem;
  }
  /deep/ .btn {
    /* padding:0.15rem 0.5rem; */
    width: 1.3rem;
    height: 0.4rem;
    /* line-height: .4rem; */
    background: url("~@/assets/img/oldMan_tab.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    border: 0;
    color: #4fd0ff;
    margin-right: 0.1rem;
    /* margin-top: 2rem; */
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
    .service_content {
      height: 100%;
      float: right;
      font-size: 0.2rem;
      color: #56a4f7;
      font-weight: bold;
      span {
        margin-right: 1rem;
      }
    }
    .bottom_link {
      float: right;
      width: 4rem;
      height: 0.5rem;
      background: url("~@/views/ProvideSubsidy/assets/older_tab.png") no-repeat;
      background-size: 100% 100%;
      color: #16fff1;
      font-size: 0.14rem;
      text-align: center;
      line-height: 0.5rem;
      margin-right: 2rem;
    }
  }
  .main {
    flex: 1;
  }
  .bread {
    position: fixed;
    top: 7%;
    left: 2%;
  }
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
