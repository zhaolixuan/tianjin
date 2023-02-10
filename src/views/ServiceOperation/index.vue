<template>
  <div class="older-page_bg">
    <page-header title="服务商下属载体服务运营统计"></page-header>
    <div class="older-container">
      <div class="bread">
        <norm-layout
          text="五大服务类别数据综合分析——服务商下属载体服务量统计"
          path="FiveService"
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
          <el-form-item label="服务商" class="search_select">
            <el-select
              v-model.trim="form.companyName"
              clearable
              filterable
              :disabled="companyList.length === 1"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in companyList"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-button
            class="btn"
            icon="el-icon-search"
            :loading="isSearchLoading"
            @click="handleGetSearchValue"
            >查询</el-button
          >
        </el-form>
      </div>
      <div class="main">
        <service-line :serviceData="serviceData"></service-line>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import PageHeader from "@/views/OlderDistribution/components/PageHeader/header";
import BreadCrumb from "@/views/OlderDistribution/components/BreadCrumb";
import ServiceLine from "../ServiceLine/index";
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import { mapGetters } from "vuex";
import Menu from "@/views/OlderDistribution/components/Menu";
import api from "@/api/api";

export default {
  name: "OrderStatisticalAnalysis",
  data() {
    return {
      ServiceTime: [
        new Date(new Date() - 1000 * 60 * 60 * 24 * 28),
        new Date(),
      ],
      isSearchLoading: false,
      serviceAllTotalMap: {},
      companyList: [],
      merchantList: [],
      userName: "",
      form: {
        beginDay: "",
        endDay: "",
        companyName: "",
      },
      xData: [],
      legend: [],
      xDate: [],
    };
  },

  computed: {
    ...mapGetters(["typeNew", "codeNew", "useName"]),
    serviceData() {
      return {
        legend: this.legend,
        xData: this.xData,
        xDate: this.xDate,
      };
    },
  },

  mounted() {
    this.roleid = window.localStorage.getItem("roleid");
    if (
      this.$route.query.code ||
      (this.$route.query.code && this.$route.query.code.length > 0)
    ) {
      this.initCodeFromUrlQuery();
    } else {
      this.initChartInfo();
    }
    this.getOtherPageList(this.useName, this.roleid);
    if (this.form.companyName) {
      setTimeout(() => {
        this.getServiceCarrierInfo();
      }, 500);
    }
  },

  watch: {
    codeNew() {
      setTimeout(() => {
        this.getServiceCarrierInfo();
      }, 500);
    },
    useName(val) {
      this.getOtherPageList(this.useName, this.roleid);
    },
  },

  methods: {
    getOtherPageList(userName, roleid) {
      this.companyList = [];
      api
        .getOtherPageList({
          page: 1,
          pageSize: 12,
          companyName: userName,
          roleId: roleid,
        })
        .then((res) => {
          if (res.obj) {
            res.obj.records.map((item) =>
              this.companyList.push(item.companyName)
            );
            this.form.companyName = this.companyList[0];
          }
        });
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

    handleGetSearchValue() {
      this.getServiceCarrierInfo();
    },

    getServiceCarrierInfo() {
      this.form.beginDay = this.ServiceTime ? this.ServiceTime[0] : "";
      this.form.endDay = this.ServiceTime ? this.ServiceTime[1] : "";
      this.xData = [];
      this.xDate = [];
      api.getServiceCarrierInfo(this.form).then((res) => {
        if (res && res.data) {
          console.log(res);
          let { serviceCarrierMap } = res.data;
          this.legend = Object.keys(serviceCarrierMap);
          let xDate = [];
          Object.getOwnPropertyNames(serviceCarrierMap).forEach((key) => {
            this.xData.push({
              merchantName: key,
              value: serviceCarrierMap[key].map(
                (item) => item.serviceTotal || 0
              ),
            });
          });
          Object.values(serviceCarrierMap)[0].map((item) => {
            xDate.push({
              mealTime: item.datelist,
              weekDay: item.weekDay,
            });
          });
          xDate.map((item, ind) => {
            switch (item.weekDay) {
              case 1:
                item.weekText = "周日";
                break;
              case 2:
                item.weekText = "周一";
                break;
              case 3:
                item.weekText = "周二";
                break;
              case 4:
                item.weekText = "周三";
                break;
              case 5:
                item.weekText = "周四";
                break;
              case 6:
                item.weekText = "周五";
                break;
              case 7:
                item.weekText = "周六";
                break;
            }
            item.mealTime = item.mealTime.slice(5, 10) + "\n" + item.weekText;
            this.xDate.push(item.mealTime);
          });
        }
      });
    },
  },
  components: {
    PageHeader,
    BreadCrumb,
    ServiceLine,
    NormLayout,
    Menu,
  },
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
  height: 100%;
  margin: 0 1.58%;
  display: flex;
  flex-direction: column;
  .from_header {
    width: 100%;
    // height: 1.5rem;
    padding-top: 0.3rem;
    box-sizing: border-box;
    .service_content {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: flex-end;
      font-size: 0.2rem;
      color: #56a4f7;
      font-weight: bold;
      span {
        margin-right: 1rem;
      }
    }
  }
  .main {
    height: 75%;
  }
  .bread {
    position: fixed;
    top: 7%;
    left: 2%;
  }
}
.from_header {
  /deep/ .search_select .el-form-item__label {
    font-size: 0.2rem;
    color: #a6c5fd;
    width: 1.35rem;
    float: left;
  }
  /deep/ .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 1.6rem;
    margin-right: 0.2rem;
  }
  /deep/ .el-input.is-disabled .el-input__inner {
    background: transparent;
    border-color: #043a6f;
    color: #7c7d80;
  }
  /deep/ .el-form {
    width: 90%;
    display: flex;
    float: left;
    align-items: center;
  }
  /deep/ .el-form-item {
    width: 30%;
  }
  /deep/ .search_select.el-form-item .el-form-item__content {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  /deep/ .el-input__inner {
    font-size: 0.16rem;
    background-color: transparent;
    border: 0;
    border: 0.01rem solid #043a6f;
    color: #56a4f7;
    max-width: 3rem;
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
  /deep/ .el-input__inner {
    max-width: 2.7rem;
  }
}
</style>
<style>
.el-input__inner::-webkit-input-placeholder {
  color: #436fd2;
}
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
.el-tag.el-tag--info {
  background-color: #0e3a8d;
  border: 0;
  color: #8fc0f3;
}
.el-tag.el-tag--info .el-tag__close {
  background-color: #3b6fd1;
  color: #8fc0f3;
}
.el-tag.el-tag--info .el-tag__close:hover {
  background-color: #3b6fd1;
  color: #8fc0f3;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  background-color: #032995;
  color: #409eff;
  font-weight: 700;
}
.el-select-dropdown__item.hover,
.el-select-dropdown.is-multiple,
.el-select-dropdown__item.selected.hover {
  background-color: #0148cb;
  color: #8fc0f3;
}
</style>
