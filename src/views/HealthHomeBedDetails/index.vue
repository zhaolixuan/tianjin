<template>
  <list-layout
    header="卫健养老服务大数据统计分析"
    title="卫健养老服务大数据统计分析————家庭病床明细表"
    :tableData="tableData"
    :columns="columns"
    :pageSize="pageForm.pageSize"
    :currentPage="pageForm.page"
    :total="total"
    :unit="unit"
    backPath="HealthCareService"
    v-on:getSearchValue="getSearchValue"
  >
    <el-form :inline="true" :model="HealthHomeBedDetails">
      <el-form-item label="老年人姓名" class="search_select search_time">
        <el-input
          v-model="HealthHomeBedDetails.name"
          placeholder="请输入老年人姓名"
          clearable
          v-on:clear="handleClear"
        ></el-input>
      </el-form-item>
      <el-form-item label="身份证号码" class="search_select search_time">
        <el-input
          v-model="HealthHomeBedDetails.idCard"
          placeholder="请输入身份证号码"
          clearable
          v-on:clear="handleClear"
        ></el-input>
      </el-form-item>
      <span class="btns_box">
        <el-button @click="resetSearchValue" class="btn">重置</el-button>
        <el-button
          class="btn"
          icon="el-icon-search"
          :loading="isSearchLoading"
          @click="handleGetSearchValue"
          >查询</el-button
        >
      </span>
    </el-form>
    <Menu />
  </list-layout>
</template>

<script>
import ListLayout from "@/components/TablerList/layout.vue";
import Menu from "@/views/OlderDistribution/components/Menu";
import api from "@/api/api.js";

export default {
  name: "HealthRecordInfoSheet",
  data() {
    return {
      tableData: [],
      columns: [
        { label: "中心名称", prop: "merchantName" },
        { label: "姓名", prop: "name", width: "70" },
        { label: "性别", prop: "sex", width: "70" },
        { label: "年龄", prop: "age", width: "70" },
        { label: "入院科室", prop: "department", width: "80" },
        { label: "是否有医保", prop: "haveInsurance", width: "70" },
        { label: "入院日期", prop: "admissionTime", width: '100' },
        { label: "入院病情", prop: "state" },
        { label: "出院状态", prop: "status", width: "70" },
        { label: "家庭地址", prop: "address" },
        { label: "现病史", prop: "historyPresent" },
        { label: "既往史", prop: "historyPrevious" },
        { label: "体格检查", prop: "physicalExamination" },
        { label: "辅助检查", prop: "auxiliaryExamination" },
        { label: "诊断信息", prop: "diagnosticMsg" }
      ],
      pageForm: {
        pageSize: 10,
        page: 1
      },
      total: 1,
      unit: "人",
      HealthHomeBedDetails: {
        name: "",
        idCard: ""
      },
      isSearchLoading: false
    };
  },

  components: {
    ListLayout,
    Menu
  },

  mounted() {
    this.familySickbedList();
  },

  methods: {
    resetSearchValue() {
      this.HealthHomeBedDetails = {
        name: "",
        idCard: ""
      };
      this.pageForm.page = 1;
      this.familySickbedList();
    },

    handleGetSearchValue() {
      this.familySickbedList();
    },

    familySickbedList() {
      this.isSearchLoading = true;
      let params = {
        page: this.pageForm.page,
        pageSize: this.pageForm.pageSize,
        name: this.HealthHomeBedDetails.name,
        idCard: this.HealthHomeBedDetails.idCard
      };
      api.familySickbedList(params).then(res => {
        console.log(res);
        if (res.msg === "ok") {
          this.isSearchLoading = false;
          this.tableData = res.obj.records;
          this.total = res.obj.total;
          this.tableData.map(item => {
            item.haveInsurance = item.haveInsurance == "1" ? "是" : "否";
            item.status = item.status == "1" ? "住院中" : "已出院";
          });
        }
      });
    },

    getSearchValue(val) {
      this.pageForm.page = val;
      this.familySickbedList();
    },

    handleClear() {
      this.pageForm.page = 1;
      this.familySickbedList();
    }
  }
};
</script>

<style lang="less" scoped>
.btns_box {
  display: flex;
  justify-content: flex-end;
  height: 0.5rem;
  margin-bottom: 0.2rem;
  margin-top: -0.55rem;
}

/deep/.search_time .el-form-item__content .el-input .el-input__inner {
  max-width: 100%;
}
</style>
