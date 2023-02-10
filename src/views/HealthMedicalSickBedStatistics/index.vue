<template>
  <list-layout
    header="卫健养老服务大数据统计分析"
    title="卫健养老服务大数据统计分析————医护一体化病床统计表"
    :tableData="tableData"
    :columns="columns"
    :pageSize="pageForm.pageSize"
    :currentPage="pageForm.page"
    :total="total"
    :unit="unit"
    backPath="HealthCareService"
    v-on:getSearchValue="getSearchValue"
  >
    <el-form :inline="true" :model="HealthRecordForm">
      <el-form-item label="老年人姓名" class="search_select search_time">
        <el-input
          v-model="HealthRecordForm.name"
          placeholder="请输入老年人姓名"
          clearable
          v-on:clear="handleClear"
        ></el-input>
      </el-form-item>
      <el-form-item label="身份证号码" class="search_select search_time">
        <el-input
          v-model="HealthRecordForm.idCard"
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
        { label: "姓名", prop: "name" },
        { label: "性别", prop: "sex" },
        { label: "年龄", prop: "age" },
        { label: "住院日期", prop: "admissionTime" },
        { label: "出院日期", prop: "dischargeTime" },
        { label: "住院天数", prop: "days" },
        { label: "住院指征", prop: "indications" },
        { label: "入院情况", prop: "inState" },
        { label: "出院情况", prop: "outState" },
        { label: "诊断", prop: "diagnosticMsg" },
        { label: "家庭住址", prop: "address" }
      ],
      pageForm: {
        pageSize: 10,
        page: 1
      },
      total: 1,
      unit: "人",
      HealthRecordForm: {
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
    this.integratedMedicalWardList();
  },

  methods: {
    resetSearchValue() {
      this.HealthRecordForm = {
        name: "",
        idCard: ""
      };
      this.pageForm.page = 1;
      this.integratedMedicalWardList();
    },
    handleGetSearchValue() {
      this.integratedMedicalWardList();
    },

    integratedMedicalWardList() {
      this.isSearchLoading = true;
      let params = {
        page: this.pageForm.page,
        pageSize: this.pageForm.pageSize,
        name: this.HealthRecordForm.name,
        idCard: this.HealthRecordForm.idCard
      };
      api.integratedMedicalWardList(params).then(res => {
        // console.log(res);
        if (res.msg === "ok") {
          this.isSearchLoading = false;
          this.tableData = res.obj.records;
          this.total = res.obj.total;
        }
      });
    },

    getSearchValue(val) {
      this.pageForm.page = val;
      this.integratedMedicalWardList();
    },

    handleClear() {
      this.pageForm.page = 1;
      this.integratedMedicalWardList();
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
