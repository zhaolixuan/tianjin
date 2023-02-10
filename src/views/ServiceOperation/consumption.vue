<template>
  <div class="older_page_bg">
    <!-- 新增的页面 服务商下属载体消费金额统计 -->
    <page-header title="服务商下属载体服务运营统计"></page-header>
    <div class="older_container">
      <div class="bread_container">
        <norm-layout
          text="五大服务类别数据综合分析——服务商下属载体消费金额统计"
          path="FiveService"
          :flag="false"
        >
        </norm-layout>
      </div>
      <div class="form_header">
        <el-form>
          <el-form-item label="服务时间" class="search_select">
            <el-date-picker
              v-model="serviceTime[0]"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="开始时间"
              v-on:change="handleChangeTime"
            >
            </el-date-picker>
            <el-date-picker
              v-model="serviceTime[1]"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="截止日期"
              v-on:change="handleChangeTime"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="服务商" class="search_select">
            <el-select
              v-model.trim="consumptionForm.companyName"
              placeholder="请选择"
              clearable
              :disabled="companyList.length === 1"
            >
              <el-option
                v-for="(item, index) in companyList"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-button
            class="btn"
            icon="el-icon-search"
            :loading="isSearchLoading"
            v-on:click="handleGetSearchValue"
            >查询
          </el-button>
        </el-form>
      </div>
      <div class="main">
        <service-line :serviceData="serviceData"> </service-line>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import pageHeader from "@/views/OlderDistribution/components/PageHeader/header";
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import ServiceLine from "../ServiceLine/index";
import Menu from "@/views/OlderDistribution/components/Menu";
import { mapGetters } from "vuex";
import api from "@/api/api";

export default {
  name: "ServiceConsumptionStatistic",
  data() {
    return {
      serviceTime: [new Date(new Date() - 1000 * 60 * 60 * 24 * 28), new Date()],
      consumptionForm: {
        companyName: "",
        beginDay: "",
        endDay: ""
      },
      companyList: [],
      isSearchLoading: false,
      legend: [],
      xData: [],
      xDate: [],
      username: ""
    };
  },

  computed: {
    ...mapGetters(["codeNew", "typeNew", "useName"]),

    serviceData() {
      return {
        legend: this.legend,
        xData: this.xData,
        xDate: this.xDate
      };
    },

    params() {
      let params = {};
      const typeCodes = ["code", "zoneCode", "streetCode", "communityCode"];
      // 让 params 第一个属性 code 的值为空串 ''
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0];
      return params;
    }
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
  },

  watch: {
    codeNew() {
      setTimeout(() => {
          this.getServiceCarrierInfo();
      }, 500);
    },

    userName() {
      this.getOtherPageList(this.useName, this.roleid);
    }
  },

  methods: {
    // 获取服务商
    getOtherPageList(userName, roleid) {
      this.companyList = [];
      let params = {
        page: 1,
        pageSize: 12,
        companyName: userName,
        roleId: roleid
      };
      api.getOtherPageList(params).then(res => {
        if (res.obj) {
          res.obj.records.map(item => {
            this.companyList.push(item.companyName);
            this.consumptionForm.companyName = this.companyList[0];
          });
        }
      });
    },

    // 监听日期改变
    handleChangeTime(val){
      console.log(val);
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

    // 监听查询
    handleGetSearchValue() {
      this.getServiceCarrierInfo();
    },

    getServiceCarrierInfo() {
      this.consumptionForm.beginDay = this.serviceTime ? this.serviceTime[0] : '';
      this.consumptionForm.endDay = this.serviceTime ? this.serviceTime[1] : '';
      this.xData = [];
      this.xDate = [];
      api.getServiceCarrierInfo(this.consumptionForm).then(res => {
        if (res.code && res.code == 200 && res.data) {
          console.log(res);
          let { serviceCarrierMap } = res.data;
          // 渲染echart_legend属性
          this.legend = Object.keys(serviceCarrierMap);
          let xDate = [];
          Object.getOwnPropertyNames(serviceCarrierMap).forEach(key => {
            this.xData.push({
              merchantName: key,
              value: serviceCarrierMap[key].map(item => item.totalAmount || 0)
            })
          })
          Object.values(serviceCarrierMap)[0].map(item => {
            xDate.push({
              mealTime: item.datelist,
              weekDay: item.weekDay
            })
          })
          // 处理X轴上的日期
          xDate.map((item, index) => {
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
    }
  },

  components: {
    pageHeader,
    NormLayout,
    ServiceLine,
    Menu
  }
};
</script>

<style lang="less" scoped>
.older_page_bg {
  min-height: 100%;
  font-size: initial;
  user-select: none;
  background-image: url("~@/views/OlderDistribution/assets/img/older-page_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.older_container {
  height: 100%;
  margin: 0 1.58%;
  display: flex;
  flex-direction: column;
  .form_header {
    width: 100%;
    height: 1.5rem;
    padding-top: 0.3rem;
    box-sizing: border-box;
  }
  .bread_container {
    position: fixed;
    top: 7%;
    left: 2%;
  }
  .main {
    height: 75%;
  }
}
.form_header {
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
