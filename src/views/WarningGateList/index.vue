<template>
  <list-layout
    :crumbData="[{ title: this.$route.query.label, url: '' }]"
    :columns="columns"
    :tableData="tableData"
    :total="total"
    :pageSize="formData.pageSize"
    :currentPage="formData.page"
    v-on:getSearchValue="handleGetSearchValue"
    :code="$route.query.code"
    backPath="SmartdeviceStatisticsNew"
    title="门磁设备监测大数据统计————门磁预警记录"
  >
    <el-form :inline="true" :model="formData">
      <el-form-item label="老年人姓名" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入老年人姓名"
          v-model.trim="formData.userName"
          @keyup.enter.native="handleGetSearchValue"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="联系电话" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入联系电话"
          v-model.trim="formData.userPhone"
          @keyup.enter.native="handleGetSearchValue"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="身份证号码" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入身份证号码"
          v-model.trim="formData.idcardNumber"
          clearable
          @keyup.enter.native="handleGetSearchValue"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="处理状态" class="search_select">
        <el-select
          v-model="disposeState"
          clearable
          placeholder="请选择处理状态"
        >
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已处理" value="已处理"></el-option>
          <el-option label="待处理" value="待处理"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="超时状态" class="search_select">
        <el-select
          v-model="overtimeState"
          clearable
          placeholder="请选择超时状态"
        >
          <el-option label="全部" value="全部"></el-option>
          <el-option label="超时" value="已超时"></el-option>
          <el-option label="未超时" value="未超时"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="btns_box">
      <div class="btns_right">
        <el-button @click="clearSearchValue" class="btn">重置</el-button>
        <el-button
          class="btn"
          icon="el-icon-search"
          :loading="isSearchLoading"
          @click="handleGetSearchValue"
          >查询</el-button
        >
        <!-- <a :href="downloadExcel" target="_blank">
          <el-button class="btn" >导出</el-button>
        </a> -->
      </div>
    </div>
  </list-layout>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/api/api.js";
import ListLayout from "@/components/TablerList/layout.vue";

export default {
  data() {
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {
          scrollingX: false
        },
        bar: {
          background: "#eee"
        }
      },
      isSearchLoading: false,
      columns: [
        { label: "用户姓名", prop: "userName", width: "150" },
        { label: "联系电话", prop: "userPhone" },
        { label: "身份证号码", prop: "idcardNumber" },
        { label: "报警时间", prop: "alarmTime" },
        { label: "报警内容", prop: "alarmContent" },
        { label: "处理状态", prop: "disposeState" },
        { label: "超时状态", prop: "overtimeState" },
        { label: "处理时间", prop: "disposeTime" },
        { label: "处理结果", prop: "disposeResult" },
        { label: "操作", prop: "gateWarning" }
      ],
      tableData: [],
      fullscreen: true,
      orderAll: "",
      index: 1,
      locationProps: {
        value: "code",
        label: "name",
        children: "childs"
      },
      pageSize: 10, // 每页数量
      currentPage: 1, // 当前页数
      total: 0, // 总条数
      overtimeState: "",
      disposeState: "",
      formData: {
        userName: "",
        userPhone: "",
        idcardNumber: "",
        overtimeState: "",
        disposeState: "",
        pageSize: 10, // 每页数量
        page: 1 // 当前页数
      }
    };
  },

  components: {
    ListLayout
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
    this.$store
      .dispatch("getUserAuthInfo")
      .then(() => {
        this.handleGetSearchValue();
      })
      .catch(err => {
        console.log("获取用户权限失败", err);
      });
  },

  methods: {
    handleGetSearchValue(page) {
      this.isSearchLoading = true;
      this.formData.disposeState =
        this.disposeState.length > 0 ? this.disposeState : "";
      this.formData.overtimeState =
        this.overtimeState.length > 0 ? this.overtimeState : "";
      this.formData.page = typeof page === "number" ? page : 1;
      let form = Object.assign({}, this.params, this.formData);
      api
        .getAlarmInfoPageList(form)
        .then(res => {
          this.isSearchLoading = false;
          const { records, total, size, current } = res && res.obj;
          this.tableData = records;
          this.formData.pageSize = size;
          this.total = total;
        })
        .catch(() => {
          this.isSearchLoading = false;
        });
    },

    handleServiceClass() {
      this.formData.page = 1;
    },

    clearSearchValue() {
      this.formData = Object.assign({}, this.formData, {
        userName: "",
        userPhone: "",
        idcardNumber: "",
        overtimeState: "",
        disposeState: ""
      });
    }
  }
};
</script>

<style lang="less" scoped>
//
</style>
