<template>
  <div class="older_consumption_frequency_box">
    <page-header title="老年人消费频率分析"></page-header>
    <div class="older_container">
      <!-- 左侧 -->
      <div class="left_panels">
        <div class="left_top">
          <el-form :inline="true" :model="statisticsForm" class="form">
            <el-form-item label="起止时间" class="search_select search_time">
              <el-date-picker
                v-model="statisticsForm.beginDay"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="开始日期"
              >
              </el-date-picker>
              <el-date-picker
                v-model="statisticsForm.endDay"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="截止日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-form>
          <el-button
            class="btn"
            icon="el-icon-search"
            :loading="isSearchLoading"
            @click="handleGetSearchValue"
            >查询</el-button
          >
        </div>
        <!-- 9月13日把 消费次数统计舍弃 新增 leftTotal -->
        <!-- <LeftTotal
          :statisticsForm="statisticsForm"
          :ispressSearchButton="ispressSearchButton"
        /> -->
        <!-- 之后又改成了 LeftTotalSecond 这个子组件  -->
        <LeftTotalSecond :consumptionNumLeftTotal="consumptionNumLeftTotal" />
        <!-- 消费服务量排名 OlderInformation 路由 右侧面板找到的  -->
        <ConsumptionSevices
          :statisticsForm="statisticsForm"
          :ispressSearchButton="ispressSearchButton"
          :count="statisticsForm.count"
          @handleConsumptionNum="handleConsumptionNum"
        ></ConsumptionSevices>
        <!-- 消费金额排名 OlderInformation 路由 右侧面板找到的 -->
        <ConsumptionAmount
          class="amount"
          :statisticsForm="statisticsForm"
          :ispressSearchButton="ispressSearchButton"
          :count="statisticsForm.count"
        ></ConsumptionAmount>
        <!-- 消费次数统计 FiveService 路由 右侧面板第一个模块 -->
        <!-- <ConsumptionStatistics
          class="amount"
          :serviceChannalsMap="serviceChannalsMap"
        ></ConsumptionStatistics> -->
      </div>

      <!-- 中间 -->
      <div class="centre_panels">
        <div class="center_top">
          <span>老年人消费人群分析</span>
          <el-form :inline="true" :model="statisticsForm" class="center_form">
            <el-form-item label="消费次数" class="search_select">
              <el-input
                v-model="statisticsForm.count"
                placeholder="最小次数"
              ></el-input>
              <el-input
                v-model="statisticsForm.MaxNum"
                placeholder="最大次数"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-button
            class="btn"
            icon="el-icon-search"
            :loading="isSearchLoading"
            @click="handleGetSearchCount"
            >查询</el-button
          >
        </div>
        <!-- 老年人年龄性别 SmartdeviceStatisticsNew 路由 左侧面板找到类似-->
        <!-- <AgeAndSex
          :chartsData="devicesSexMap"
          :equipmentSexMap="equipmentSexMap"
          :count="statisticsForm.count"
          :statisticsForm="statisticsForm"
          :ispressSearchButton="ispressSearchButton"
        /> -->
        <!-- 9月13日 舍弃 AgeAndSex 新增 MiddleTotal -->
        <!-- <MiddleTotal
          class="middleTotal"
          :statisticsForm="statisticsForm"
          :ispressSearchButton="ispressSearchButton"
        /> -->
        <MiddleTotalSecond
          class="middleTotal"
          :statisticsForm="statisticsForm"
          :ispressSearchButton="ispressSearchButton"
        />
        <norm-layout text="年龄" :flag="false"></norm-layout>
        <!-- 也可以参考 ServiceVolunteer路由 中间面板最后一个图 -->
        <AgeSecond
          :statisticsForm="statisticsForm"
          :ispressSearchButton="ispressSearchButton"
        />
        <!-- 下面这两个组件 OlderInformation 路由 中找到类似 -->
        <MonthlyIncome
          :incomeElderlyMap="oldincomeMap"
          :ispressSearchButton="ispressSearchButton"
          :fromconFre="fromconFre"
        ></MonthlyIncome>
        <!-- <physical-condition
          :physicalconditionMap="physicalconditionMap"
          :ispressSearchButton="ispressSearchButton"
        ></physical-condition> -->
        <!-- 20210913 use seviceProject replace physical-condition -->
        <!-- seviceProject 可以参考 FiveService 路由左侧面板最后一组件 -->
        <ServiceProject :serviceSortMap="serviceSortMap" />
      </div>

      <!-- 右侧 -->
      <div class="right_panels">
        <div class="right_top">
          <!-- <span>老年人消费人群分析</span> -->
          <!-- <el-button class="btn" @click="handleGetMore">更多</el-button> -->
        </div>
        <norm-layout
          text="老年人消费人群街道分布"
          :flag="true"
          :routeToFromFrequency="routeToFromFrequency"
          v-on:routeToFromFrequency="jump"
        ></norm-layout>
        <div class="content">
          <!-- 老年人消费群体街道分布 -->
          <ConsumpStreetDistribution
            :statisticsForm="statisticsForm"
            :count="statisticsForm.count"
            :ispressSearchButton="ispressSearchButton"
          />
        </div>
        <!-- 消费人群服务商分布 消费人群服务载体分布 -->
        <ConsumptionServicerCarrier
          class="ServicerCarrier"
          :statisticsForm="statisticsForm"
          :count="statisticsForm.count"
          :ispressSearchButton="ispressSearchButton"
        />
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import PageHeader from "@/views/OlderDistribution/components/PageHeader/header"; // 公共大Header
import NormLayout from "@/views/OlderDistribution/components/NormLayout"; // 左上角标题
import Menu from "@/views/OlderDistribution/components/Menu"; // 右侧菜单栏
import ConsumptionSevices from "@/views/OlderConsumpFrequency/components/consumptionSevicesRank/index.vue"; // 左侧 消费服务量排名
import ConsumptionAmount from "@/views/OlderConsumpFrequency/components/consumptionAmountRank/index.vue"; // 左侧 消费金额排名
import ConsumptionStatistics from "./components/consumptionStatistics/index"; // 左侧 消费次数统计
import LeftTotal from "./components/leftTotal/leftTotal"; // 左侧统计 9月13日修改为用这个子组件
import LeftTotalSecond from "./components/leftTotalSecond/index"; // 11月07日修改为使用这个子组件
import AgeAndSex from "./components/ageAndSex/index"; // 中间 年龄和性别
import AgeSecond from "./components/ageSecond/index"; // 中间 年龄 9月13日修改为用这个子组件
import MiddleTotal from "./components/middleTotal/index"; // 中间 统计 9月13日新增这个子组件
import MiddleTotalSecond from "./components/middleTotalSecond/index"; // 11月07日修改为使用这个子组件
import MonthlyIncome from "../OlderInformation/components/MonthlyIncome/index"; // 中间 老年人社保收入
import PhysicalCondition from "./components/PhysicalCondition/index"; // 中间 身体状况
import ServiceProject from "./components/serviceProject/index"; // 中间 服务项目 9月13日更换为这个
import ConsumpStreetDistribution from "./components/consumpStreetDistribution"; // 右侧 街道分布
import ConsumptionServicerCarrier from "./components/consumptionServicerCarrier/index"; // 右侧 服务商和载体
import { formatTime } from "../../utils/utils.js";
import { mapGetters } from "vuex";
import api from "@/api/api.js";

export default {
  data() {
    return {
      oldincomeMap: {},
      statisticsForm: {
        beginDay: formatTime(
          new Date(new Date(`${new Date().getFullYear()}` + ",01,01"))
        ),
        endDay: formatTime(new Date()),
        count: "1",
        MaxNum: "100"
      },
      isSearchLoading: false,
      physicalconditionMap: {},
      // count: 100,
      serviceChannalsMap: [],
      devicesSexMap: [],
      equipmentSexMap: [],
      page: 1,
      pageSize: 100,
      orderType: "", // num 次数排序/ amount 金额排序
      ispressSearchButton: 0,
      consumptionNum: {},
      maleObj: {},
      femaleObj: {},
      routeToFromFrequency: 1,
      fromconFre: true,
      serviceSortMap: {},
      consumptionNumLeftTotal: {}
    };
  },

  components: {
    PageHeader,
    NormLayout,
    Menu,
    ConsumptionSevices,
    ConsumptionAmount,
    MonthlyIncome,
    PhysicalCondition,
    ConsumptionStatistics,
    ConsumptionServicerCarrier,
    AgeAndSex,
    ConsumpStreetDistribution,
    LeftTotal,
    AgeSecond,
    MiddleTotal,
    ServiceProject,
    LeftTotalSecond,
    MiddleTotalSecond
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

  // mounted() {
  //   this.getOldPersonInfo();
  // },

  watch: {
    codeNew(val) {
      if (!val) {
        return false;
      }
      this.getOldPersonInfo();
    }
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

    async handleGetSearchValue() {
      // ispressSearchButton 控制一些模块的多次调用 关键
      await this.ispressSearchButton++;
      await this.handleGetSearchCount();
    },

    getOldPersonInfo() {
      let params = {
        beginDay: this.statisticsForm.beginDay,
        endDay: this.statisticsForm.endDay,
        MinNum: this.statisticsForm.count,
        MaxNum: this.statisticsForm.MaxNum
      };

      api.getOldIncomeMap(params).then(res => {
        if (res.data) {
          this.oldincomeMap = res.data;
        }
      });

      api.getServiceTypeMap(params).then(res => {
        if (res.code && res.code == 200) {
          let obj = {
            sortTotala: "",
            sortTotalb: "",
            sortTotalc: "",
            sortTotald: "",
            sortTotale: ""
          };
          res.data.forEach(item => {
            let name = item.requirement_big;
            switch (name) {
              case "助餐服务类":
                obj.sortTotala = item.typeNum;
                break;
              case "生活照料类":
                obj.sortTotalb = item.typeNum;
                break;
              case "助医服务类":
                obj.sortTotalc = item.typeNum;
                break;
              case "托养床位类":
                obj.sortTotald = item.typeNum;
                break;
              case "其他服务类":
                obj.sortTotale = item.typeNum;
                break;
            }
          });
          this.serviceSortMap = obj;
        }
        // var obj = {};
        // for (var i = 0; i < resData.length; i++) {
        //   if (resData[i].requirement_big == "助餐服务类") {
        //     obj.sortTotala = resData[i].typeNum;
        //   } else if (resData[i].requirement_big == "生活照料类") {
        //     obj.sortTotalb = resData[i].typeNum;
        //   } else if (resData[i].requirement_big == "助医服务类") {
        //     obj.sortTotalc = resData[i].typeNum;
        //   } else if (resData[i].requirement_big == "托养床位类") {
        //     obj.sortTotald = resData[i].typeNum;
        //   } else if (resData[i].requirement_big == "其他服务类") {
        //     obj.sortTotale = resData[i].typeNum;
        //   }
        // }
        // this.serviceSortMap = obj;
      });
    },

    handleGetSearchCount() {
      this.getOldPersonInfo();
    },

    // 左侧面板饼状图赋值的操作 实际用到这个
    getConsumptionList() {
      let params = {
        beginDay: this.statisticsForm.beginDay,
        endDay: this.statisticsForm.endDay,
        num: this.statisticsForm.count
      };
      api.getConsumptionList(params).then(res => {
        var consumptionNum = res.consumptionNum;
        this.consumptionNum = consumptionNum;
        // console.log(this.consumptionNum);
        // {fiveNum: 1037, oneNum: 3417, tenNum: 498}

        let b = [];
        Object.keys(this.consumptionNum).forEach(i => {
          b.push({
            channalsName: i,
            orderChannalsTotal: this.consumptionNum[i]
          });
        });
        this.serviceChannalsMap = b;

        // this.serviceChannalsMap = this.objToMoreObj(this.consumptionNum);
        // console.log(this.serviceChannalsMap);
        // [{name:undefined,value:undefined},{name:undefined,value:undefined},{name:undefined,value:undefined}]
        // 要改造成上面数组格式的 为什么都是 undefined 呢
      });
    },

    // 对象拆分
    objToMoreObj(obj) {
      var arr = [];
      for (var k in obj) {
        var temp = {};
        temp.name = k;
        temp.value = obj[k];
        // console.log(temp);
        // {name: "fiveNum", value: 1037} {name: "oneNum", value: 3417} {name: "tenNum", value: 498}
        arr.push(temp);
      }
      return arr;
    },

    // 页面级=>老年人消费人群街道分布
    handleGetMore() {
      // 覆盖原窗口的做法
      // this.$router.push({
      //   path: "/OlderConsumeStreetDistribution",
      //   query: {
      //     beginDay: this.statisticsForm.beginDay,
      //     endDay: this.statisticsForm.endDay,
      //     num: this.count,
      //     classifyType: "street"
      //   }
      // });

      // 新窗口的做法
      this.$router.push({
        name: "OlderConsumeStreetDistribution",
        query: {
          beginDay: this.statisticsForm.beginDay,
          endDay: this.statisticsForm.endDay,
          num: this.statisticsForm.count,
          classifyType: "street"
        }
      });
    
    },

    // 老年人消费人群街道分布 更多 跳转
    jump(val) {
      console.log(val);
      this.$router.push({
        name: "OlderConsumeStreetDistribution",
        query: {
          beginDay: this.statisticsForm.beginDay,
          endDay: this.statisticsForm.endDay,
          MinNum: this.statisticsForm.count,
          MaxNum: this.statisticsForm.MaxNum,
          classifyType: "street"
        }
      });
  
    },

    handleConsumptionNum(val) {
      this.consumptionNumLeftTotal = val;
    }
  }
};
</script>

<style lang="less" scoped>
.older_consumption_frequency_box {
  min-height: 100%;
  font-size: initial;
  user-select: none;
  background-image: url("~@/views/OlderDistribution/assets/img/older-page_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.older_container {
  display: flex;
  height: 100%;
  margin: 0 1.58%;
  .left_panels,
  .right_panels {
    width: 6rem;
    height: 10.1rem;
    padding: 1% 1% 0 1%;
    box-sizing: border-box;
    z-index: 3;
    margin-top: -0.2rem;
  }
  .left_top {
    height: 0.5rem;
    width: 100%;
    font-size: 0.25rem;
    color: #28e1fe;
    font-weight: 600;
    margin: -0.2rem 0rem 0.3rem 0rem;
    display: flex;
    align-items: center;
    /deep/ .el-form {
      height: 0.5rem;
      display: flex !important;
      flex-direction: column;
      justify-content: center;
      .el-form-item.search_select.search_time {
        margin-right: 0rem;
        margin-bottom: 0rem;
        display: flex;
        .el-form-item__label {
          text-align: right;
        }
      }
    }
  }
  .centre_panels {
    flex: 1;
    width: 6.6rem;
    height: 10.1rem;
    padding: 0 2%;
    .center_top {
      padding: 0px 0.3rem;
      display: flex;
      align-items: center;
      height: 0.5rem;
      margin-top: -0.2rem;
      span {
        display: inline-block;
        font-size: 0.2rem;
        color: #68f4ff;
        font-weight: 600;
        width: 3rem;
        height: 0.5rem;
        line-height: 0.5rem;
        overflow: hidden;
      }
      /deep/.center_form.el-form {
        height: 0.5rem;
        display: flex !important;
        justify-content: flex-start;
        align-items: center;
        .el-form-item {
          margin-bottom: 0rem;
          display: flex;
          .el-form-item__content .el-input {
            width: 1.2rem;
          }
        }
      }
    }
  }
  .right_panels {
    .right_top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 0px 0px 0.3rem;
      height: 0.5rem;
      span {
        display: block;
        font-size: 0.2rem;
        margin-right: -0.2rem;
        color: #68f4ff;
        font-weight: 600;
      }
      /deep/.el-button {
        margin: 0rem;
      }
    }
    .content {
      height: 3.5rem;
    }
    .ServicerCarrier {
      margin-top: 0.5rem;
    }
  }
  .amount {
    margin-top: 20px;
  }
  .bread {
    position: fixed;
    top: 6%;
    left: 2%;
  }
}

/deep/ .el-form-item__content {
  display: flex !important;
}

/deep/ .el-form .el-form-item__label {
  font-size: 0.2rem;
  color: #68f4ff;
  width: 1.3rem;
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
  margin: 0 auto;
  height: 0.4rem;
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
