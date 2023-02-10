<template>
  <list-layout
    header="服务载体流量补贴统计表"
    title="五大服务类别数据综合分析————服务载体流量补贴表"
    :tableData="tableData"
    :columns="columns"
    :pageSize="pageForm.pageSize"
    :currentPage="pageForm.page"
    :total="total"
    :unit="unit"
    backPath="FiveService"
    v-on:getSearchValue="getSearchValue"
  >
    <el-form :inline="true" :model="statisticsForm">
      <el-form-item label="起止时间：" class="search_select search_time">
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
      <el-form-item label="是否包含节假日" class="search_select">
        <el-select
          v-model="statisticsForm.isHoliday"
          clearable
          placeholder="是"
        >
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务载体级别" class="search_select">
        <el-select
          v-model="statisticsForm.canteenlevel"
          multiple
          clearable
          placeholder="请选择载体级别"
        >
          <el-option label="街级" value="街级"></el-option>
          <el-option label="社区级" value="社区级"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务商" class="search_select">
        <el-select
          v-model="statisticsForm.servicePoint"
          clearable
          :disabled="companyList.length === 1"
          placeholder="请选择服务商"
        >
          <el-option
            v-for="(option, index) in companyList"
            :key="index"
            :label="option"
            :value="option"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="btns_box">
      <div class="btns_left">
        <span
          v-if="this.tableData.length > 0"
          v-on:click="handleGoDetailsPage"
          class="btns_left_go"
          >查看日均消费金额（去除白卡和床位）大于等于500的居家养老服务中心流量补贴情况</span
        >
      </div>
      <div class="btns_right">
        <el-button @click="resetSearchValue" class="btn">重置</el-button>
        <el-button
          class="btn"
          icon="el-icon-search"
          :loading="isSearchLoading"
          @click="handleGetSearchValue"
          >查询</el-button
        >
        <a :href="downloadExcel" target="_blank">
          <el-button class="btn">导出</el-button>
        </a>
      </div>
    </div>
    <Menu></Menu>
  </list-layout>
</template>

<script>
import Menu from "@/views/OlderDistribution/components/Menu";
import api from "@/api/api.js";
import ListLayout from "@/components/TablerList/layout.vue";
import { formatTime } from "../../utils/utils.js";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      statisticsForm: {
        // beginDay: formatTime(new Date("2021,01,01")), // 默认为 2021-01-01
        // beginDay: formatTime(new Date(new Date() - 1000 * 60 * 60 * 24 * 30)), // 间距30天
        beginDay: formatTime(
          new Date(new Date(`${new Date().getFullYear()}` + ",01,01"))
        ), // 当前年1月1号开始 eg 2022.01.01
        endDay: formatTime(new Date()),
        isHoliday: "0",
        canteenlevel: "",
        servicePoint: "",
      },
      companyList: [],
      tableData: [],
      isSearchLoading: false,
      columns: [
        { label: "养老服务商", prop: "servicePoint" },
        { label: "服务载体", prop: "merchantName" },
        { label: "载体级别", prop: "canteenlevel" },
        { label: "服务量（客次）", prop: "serviceNum" },
        { label: "消费金额（元）", prop: "totalAmount" },
        { label: "日均消费金额（元）", prop: "amountAvgDaily" },
        { label: "白卡服务量", prop: "cardServiceNum" },
        { label: "白卡消费金额（元）", prop: "cardTotalAmount" },
        { label: "老年人服务量（客次）", prop: "oldServiceNum" },
        { label: "老年人消费金额（元）", prop: "oldTotalAmount" },
        { label: "老年人消费人数", prop: "oldPersonNum" },
        {
          label: "日均消费金额（去除白卡和床位）",
          prop: "amountAvgOther",
        },
      ],
      pageForm: {
        page: 1,
        pageSize: 10,
      },
      total: 0,
      unit: "个",
    };
  },

  mounted() {
    this.getServicePointData();
    setTimeout(() => {
      this.getTableListData();
    }, 500);
  },

  methods: {
    resetSearchValue() {
      this.statisticsForm = {
        beginDay: "",
        endDay: "",
        isHoliday: "",
        canteenlevel: "",
        servicePoint: "",
      };
    },

    getTableListData() {
      this.isSearchLoading = true;
      let params = {
        beginDay: this.statisticsForm.beginDay,
        endDay: this.statisticsForm.endDay,
        isHoliday: this.statisticsForm.isHoliday,
        canteenlevel: this.statisticsForm.canteenlevel.join(","),
        servicePoint: this.statisticsForm.servicePoint,
        page: this.pageForm.page,
        pageSize: this.pageForm.pageSize,
      };
      api.getServiceCarrierList(params).then((res) => {
        if (res.msg == "ok" && res.serviceCarrierAllowanceVos) {
          this.isSearchLoading = false;
          this.tableData = res.serviceCarrierAllowanceVos;
          this.page = res.page.currentPage;
          this.total = res.total;
        }
        console.log(this.tableData);
      });
    },

    handleGetSearchValue() {
      this.getTableListData();
    },

    getServicePointData() {
      let roleid = window.localStorage.getItem("roleid");
      let params = {
        servicePoint:
          roleid == "29"
            ? this.useName || window.localStorage.getItem("useName")
            : "",
      };
      api.getServicePoint(params).then((res) => {
        if (res.code == 200) {
          this.companyList = res.data;
          this.statisticsForm.servicePoint =
            this.companyList.length <= 1 ? this.companyList[0] : "";
        }
      });
    },

    handleGoDetailsPage() {
      this.$router.push({
        path: "/butieDetails",
        query: {
          beginDay: this.statisticsForm.beginDay,
          endDay: this.statisticsForm.endDay,
        },
      });
    
    },

    getSearchValue(val) {
      this.pageForm.page = val;
      this.getTableListData();
    },
  },

  computed: {
    ...mapGetters(["useName"]),
    downloadExcel() {
      let data = "/yanglao-api/serviceCarrierAllowance/CarrierExport?";
      let keys = Object.keys(this.statisticsForm);
      keys.forEach((item, index) => {
        data += this.statisticsForm[item]
          ? `${item}=${this.statisticsForm[item]}&`
          : "";
      });
      data += "page=1&pageSize=" + this.total;
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
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 1.6rem;
  margin-right: 0.2rem;
}

.btns_box {
  display: flex;
  justify-content: space-between;
  .btns_left {
    height: 0.5rem;
    font-size: 0.2rem;
    color: #fff;
    text-align: center;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 200px;
    .btns_left_go {
      cursor: pointer;
    }
  }
}
</style>
