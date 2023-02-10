<template>
  <list-layout
    header="卫健养老服务大数据统计分析"
    title="卫健养老服务大数据统计分析————健康档案信息表"
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
        { label: "姓名", prop: "name" },
        { label: "原档案号", prop: "oldNumber" },
        { label: "性别", prop: "sex" },
        { label: "年龄", prop: "age" },
        { label: "出生日期", prop: "birthday" },
        { label: "身份证号", prop: "idCard" },
        { label: "本人电话", prop: "mobile" },
        { label: "联系电话", prop: "phone" },
        { label: "户主名称", prop: "holder" },
        { label: "上年度体检时间", prop: "tjDateLast" },
        { label: "本年应体检时间", prop: "tjDateShould" },
        { label: "是否体检合格", prop: "isTijian" },
        { label: "是否中医判定", prop: "isJudgeZhongyi" },
        { label: "是否高血压", prop: "isGxy" },
        { label: "是否糖尿病", prop: "isTnb" }
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
    this.healthRecordNewList();
  },

  methods: {
    resetSearchValue() {
      this.HealthRecordForm = {
        name: "",
        idCard: ""
      };
      this.pageForm.page = 1;
      this.healthRecordNewList();
    },
    handleGetSearchValue() {
      this.healthRecordNewList();
    },

    healthRecordNewList() {
      this.isSearchLoading = true;
      let params = {
        page: this.pageForm.page,
        pageSize: this.pageForm.pageSize,
        name: this.HealthRecordForm.name,
        idCard: this.HealthRecordForm.idCard
      };
      api.healthRecordNewList(params).then(res => {
        // console.log(res);
        if (res.msg === "ok") {
          this.isSearchLoading = false;
          this.tableData = res.obj.records;
          this.tableData.map(item => {
            item.isTijian = item.isTijian == "1" ? "体检合格" : "不合格";
            item.isJudgeZhongyi = item.isJudgeZhongyi == "1" ? "是" : "否";
            item.isGxy = item.isGxy == "1" ? "是" : "否";
            item.isTnb = item.isTnb == "1" ? "是" : "否";
          });
          this.total = res.obj.total;
        }
      });
    },

    getSearchValue(val) {
      this.pageForm.page = val;
      this.healthRecordNewList();
    },

    handleClear() {
      this.pageForm.page = 1;
      this.healthRecordNewList();
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
