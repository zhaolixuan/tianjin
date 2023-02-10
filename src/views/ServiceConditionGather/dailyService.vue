<template>
  <list-layout
    header="居家养老服务情况汇总统计表(日均)"
    title="五大服务类别数据综合分析——居家养老服务情况汇总统计表"
    backPath="FiveService"
    :tableData="tableData"
    :columns="columns"
    :objectSpanMethod="objectSpanMethod"
  >
    <el-form :inline="true" v-model="dailyServiceForm" ref="dailyServiceForm">
      <el-form-item label="起止时间" class="search_select search_time">
        <el-date-picker
          v-model="dailyServiceForm.beginDay"
          type="date"
          placeholder="开始日期"
          value-format="yyyy-MM-dd"
          clearable
        >
        </el-date-picker>
        <el-date-picker
          v-model="dailyServiceForm.endDay"
          type="date"
          placeholder="截止日期"
          value-format="yyyy-MM-dd"
          clearable
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="是否包含节假日" class="search_select">
        <el-select
          v-model="dailyServiceForm.isHoliday"
          placeholder="请选择"
          clearable
        >
          <el-option
            v-for="(item, index) in isHolidayList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="载体级别" class="search_select">
        <el-select
          v-model="dailyServiceForm.canteenlevel"
          placeholder="请选择"
          clearable
          multiple
        >
          <el-option
            v-for="(item, index) in canteenlevelList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="养老服务商" class="search_select">
        <el-select
          v-model="dailyServiceForm.servicePoint"
          placeholder="请选择"
          clearable
          :disabled="servicePointList.length === 1"
          @change="handleChangeServicePoint"
        >
          <el-option
            v-for="(item, index) in servicePointList"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务载体" class="search_select">
        <!-- <el-select
          v-model="dailyServiceForm.merchantName"
          placeholder="请选择"
          clearable
        >
          <el-option
            v-for="(item, index) in merchantNameList"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select> -->
        <el-autocomplete
          class="dailyService_autocomplete"
          v-model="dailyServiceForm.merchantName"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
          clearable
        ></el-autocomplete>
      </el-form-item>
    </el-form>
    <div class="btns_box">
      <el-button @click="handleResetDailyServiceForm" class="btn"
        >重置</el-button
      >
      <el-button
        class="btn"
        icon="el-icon-search"
        :loading="isSearchLoading"
        @click="handleGetSearchValue"
        >查询
      </el-button>
      <a :href="downloadExcel" target="_blank">
        <el-button class="btn">导出</el-button>
      </a>
    </div>
    <Menu></Menu>
  </list-layout>
</template>

<script>
import Menu from "@/views/OlderDistribution/components/Menu";
import ListLayout from "@/components/TablerList/layout.vue";
import { formatTime } from "../../utils/utils.js";
import api from "@/api/api.js";
import { mapGetters } from "vuex";

export default {
  name: "DailyServiceStatistics",
  data() {
    return {
      dailyServiceForm: {
        beginDay: formatTime(
          new Date(new Date(`${new Date().getFullYear()}` + ",01,01"))
        ),
        endDay: formatTime(new Date()),
        isHoliday: "0",
        canteenlevel: "",
        servicePoint: "",
        merchantName: "",
      },
      servicePointList: [],
      merchantNameList: [],
      isSearchLoading: false,
      tableData: [],
      table: [
        { A: "助餐服务类", B: "早餐", code: "breakfast" },
        { A: "助餐服务类", B: "午餐", code: "lunch" },
        { A: "助餐服务类", B: "晚餐", code: "dinner" },
        { A: "助餐服务类", B: "小计", code: "accommodation" },
        { A: "生活照料类", code: "lifecare" },
        { A: "助医服务类", code: "medical" },
        { A: "托养床位类", code: "feeding" },
        { A: "其他服务类", code: "other" },
        { A: "合计", code: "total" },
      ],
      columns: [
        { label: "服务", prop: "A", className: "rightText" },
        { label: "类型", prop: "B", className: "leftText" },
        { label: "日均服务老年人（人）", prop: "peopleNumAvg" },
        { label: "日均服务量（客次）", prop: "serviceNumAvg" },
        { label: "日均消费金额（元）", prop: "totalAmountAvg" },
        { label: "其中：日均白卡服务量（客次）", prop: "cardServiceNumAvg" },
        { label: "其中：日均白卡消费金额（元）", prop: "cardTotalAmountAvg" },
        { label: "其中：日均老年人服务量（客次）", prop: "oldServiceNumAvg" },
        { label: "其中：日均老年人消费金额（元）", prop: "oldTotalAmountAvg" },
      ],
      isHolidayList: [
        { label: "是", value: "1" },
        { label: "否", value: "0" },
      ],
      canteenlevelList: [
        { label: "服务站", value: "服务站" },
        { label: "社区级", value: "社区级" },
        { label: "街级", value: "街级" },
      ],
    };
  },

  mounted() {
    this.tableData = this.table;
    this.getServicePointList();
    setTimeout(() => {
      this.getMerchantNameList(this.dailyServiceForm.servicePoint);
      this.getdailyTableData();
    }, 500);
  },

  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 0,0 单元格变成横向占1个单元 纵向占4个单元
      if (rowIndex === 0 && columnIndex === 0) {
        return {
          rowspan: 4,
          colspan: 1,
        };
      } else if (columnIndex === 0 && rowIndex > 0 && rowIndex < 4) {
        // 原来 1,0  2,0  3,0 的单元格变成横向和纵向都不占
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
      // 原来 5,0  6,0  7,0  8,0  9,0 的单元格变成 横向占2个单元 纵向占1个单元
      if (rowIndex >= 4 && columnIndex === 0) {
        return {
          colspan: 2,
          rowspan: 1,
        };
      } else if (rowIndex >= 4 && columnIndex === 1) {
        // 原来 5,1  6,1  7,1  8,1  9,1 的单元格变成横向和纵向都不占
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
    },

    getServicePointList() {
    let roleid = window.localStorage.getItem("roleid");
      let params = {
        servicePoint:
          roleid == "29"
            ? this.useName || window.localStorage.getItem("useName")
            : "",
      };
      api.getServicePointList(params).then((res) => {
        // console.log(res);
        if (res.code == 200) {
          this.servicePointList = res.data;
          this.dailyServiceForm.servicePoint =
            this.servicePointList.length <= 1 ? this.servicePointList[0] : "";
        }
      });
    },

    handleChangeServicePoint(val) {
      this.merchantNameList = [];
      this.dailyServiceForm.servicePoint = val;
      this.getMerchantNameList(this.dailyServiceForm.servicePoint);
    },

    getMerchantNameList(val) {
      let params = {
        servicePoint: val,
      };
      api.getMerchantNameList(params).then((res) => {
        // console.log(res);
        if (res.code && res.code == 200) {
          var data = [];
          for (var i = 0; i < res.data.length; i++) {
            data.push({ value: res.data[i] });
          }
          this.merchantNameList = data;
        }
      });
    },

    handleResetDailyServiceForm() {
      this.dailyServiceForm = {
        beginDay: "",
        endDay: "",
        isHoliday: "",
        canteenlevel: "",
        servicePoint: "",
        merchantName: "",
      };
    },

    handleGetSearchValue() {
      this.getdailyTableData();
    },

    // 获取表格数据
    getdailyTableData() {
      this.isSearchLoading = true;
      let params = {
        beginDay: this.dailyServiceForm.beginDay,
        endDay: this.dailyServiceForm.endDay,
        isHoliday: parseInt(this.dailyServiceForm.isHoliday),
        canteenlevel: this.dailyServiceForm.canteenlevel.join(","),
        servicePoint: this.dailyServiceForm.servicePoint,
        merchantName: this.dailyServiceForm.merchantName,
      };
      api.getSummarizingAvgMap(params).then((res) => {
        // console.log(res);
        if (res.code && res.code == 200 && res.data) {
          this.isSearchLoading = false;
          var tableDataList = [];
          this.table.map((item) => {
            tableDataList.push(Object.assign({}, item, res.data[item.code]));
          });
          this.tableData = tableDataList;
        }
      });
    },

    querySearch(queryString, cb) {
      var merchantNameList = this.merchantNameList;
      var results = queryString
        ? merchantNameList.filter(this.createFilter(queryString))
        : merchantNameList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (merchantNameList) => {
        return (
          merchantNameList.value
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
  },

  computed: {
    ...mapGetters(["useName"]),

    downloadExcel() {
      let data = "/yanglao-api/serviceSummarizingAvg/summarizingAvgExport?";
      let keys = Object.keys(this.dailyServiceForm);
      keys.forEach((item, index) => {
        data += this.dailyServiceForm[item]
          ? `${item}=${this.dailyServiceForm[item]}&`
          : "";
      });
      data = data.slice(0, -1);
      return data;
    },
  },

  components: {
    ListLayout,
    Menu,
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-table thead th.rightText {
  text-align: right !important;
  padding-right: 0 !important;
  border-right: none;
  .cell {
    padding-right: 0 !important;
  }
}
/deep/ .el-table thead th.leftText {
  text-align: left !important;
  padding-left: 0 !important;
  border-left: none;
  .cell {
    padding-left: 0 !important;
  }
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 1.6rem;
  margin-right: 0.2rem;
}

.btns_box {
  height: 0.5rem;
  display: flex;
  justify-content: flex-end;
}
</style>
