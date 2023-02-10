<template>
  <list-layout
    :crumbData="[{ title: this.$route.query.label, url: '' }]"
    :columns="columns"
    :tableData="tableData"
    :total="total"
    :pageSize="pageSize"
    :currentPage="currentPage"
    v-on:getSearchValue="handleGetSearchValue"
    backPath="SmartdeviceStatistics"
    :code="$route.query.code"
    title="智能设备监测大数据统计分析——一键通预警记录"
  >
    <el-form :inline="true" :model="formData">
      <el-form-item label="姓名" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入姓名"
          v-model.trim="formData.Name"
          @keyup.enter.native="handleGetSearchValue"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" class="search_select">
        <el-select v-model="formData.Sex" clearable placeholder="请选择性别">
          <el-option label="男性" value="男"></el-option>
          <el-option label="女性" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系方式" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入联系方式"
          v-model.trim="formData.OldPhone"
          @keyup.enter.native="handleGetSearchValue"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="预警类型" class="search_select">
        <el-select
          v-model="formData.EventType"
          clearable
          placeholder="请选择预警类型"
        >
          <el-option
            v-for="(option, index) in TypeList"
            :key="index"
            :label="option"
            :value="option"
            @change="handleServiceClass"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="处理状态" class="search_select">
        <el-select
          v-model="formData.state"
          clearable
          placeholder="请选择处理状态"
        >
          <el-option
            v-for="(option, index) in StatusList"
            :key="index"
            :label="option"
            :value="option"
            @change="handleServiceClass"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预警时间" class="search_select">
        <el-date-picker
          v-model="mealTime"
          type="daterange"
          range-separator="-"
          clearable
          start-placeholder="开始时间"
          end-placeholder="截止时间"
        ></el-date-picker>
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
        { label: "序号", prop: "index", width: "150" },
        { label: "姓名", prop: "name" },
        { label: "性别", prop: "sex" },
        { label: "联系方式", prop: "oldPhone" },
        { label: "预警类型", prop: "eventType" },
        { label: "预警时间", prop: "alarmTime" },
        { label: "预警内容", prop: "alarmContent" },
        { label: "处理状态", prop: "state" },
        { label: "操作", prop: "warning" }
      ],
      tableData: [],
      TypeList: ["SOS预警", "低电预警", "健康预警"],
      StatusList: ["未处理", "在处理", "已处理"],
      fullscreen: true,
      selectedLocation:
        this.$route.query.code && typeof this.$route.query.code !== "string"
          ? this.$route.query.code.slice(1)
          : [], // 地区级联选中内容
      index: 1,
      locationProps: {
        value: "code",
        label: "name",
        children: "childs"
      },
      pageSize: 10, // 每页数量
      currentPage: 1, // 当前页数
      total: 0, // 总条数
      mealTime: "",
      formData: {
        Name: "",
        OldPhone: "",
        Sex: "",
        endTime: "",
        beginTime: "",
        EventType: "",
        state: ""
      },
      params: {}
    };
  },

  components: {
    ListLayout
  },

  computed: {
    ...mapGetters(["userType", "code"]),
    userAuthCodeParams() {
      let params = {
        streetCode: "",
        zoneCode: "",
        communityCode: ""
      };
      let urlCodeParams = {};
      if (this.userType === 2) {
        urlCodeParams = { zoneCode: this.initCodeFromQuery(1) };
      }
      if (this.userType === 3) {
        urlCodeParams = { streetCode: this.initCodeFromQuery(2) };
      }
      if (this.userType === 4) {
        urlCodeParams = { communityCode: this.initCodeFromQuery(3) };
      }

      return Object.assign({}, params, urlCodeParams);
    }
  },

  created() {
    // this.$store.commit('setActiveName', this.$route.query.label)
    this.$store
      .dispatch("getUserAuthInfo")
      .then(() => {
        this.getLocation();
        this.handleGetSearchValue();
      })
      .catch(err => {
        console.log("获取用户权限失败", err);
      });
  },

  methods: {
    initCodeFromQuery(codeIndex) {
      return this.$route.query.code &&
        typeof this.$route.query.code !== "string"
        ? this.$route.query.code[codeIndex] || ""
        : "";
    },
    requestParams(page) {
      var params = {};
      this.formData.beginTime = this.mealTime ? new Date(this.mealTime[0]) : "";
      this.formData.endTime = this.mealTime ? new Date(this.mealTime[1]) : "";
      const codeParams =
        this.selectedLocation.length > 0
          ? Object.create(null)
          : this.userAuthCodeParams;
      params = Object.assign(
        {},
        this.formData,
        {
          page: typeof page === "number" ? page : 1,
          pageSize: this.pageSize
        },
        codeParams
      );
      return params;
    },
    handleGetSearchValue(page) {
      this.isSearchLoading = true;
      api
        .getminfoPageList(this.requestParams(page))
        .then(res => {
          this.isSearchLoading = false;
          const { records, total, size, current } = res && res.obj;
          this.tableData = records;
          this.pageSize = size;
          this.currentPage = current;
          this.total = total;
        })
        .catch(() => {
          this.isSearchLoading = false;
        });
    },
    getLocation() {
      // 由于组件功能限制，片区级联选择器采用查询全量地区数据后前端处理的方式
      api
        .getLocationList()
        .then(res => {
          let data = res.data;
          let code = this.$store.state.code[0] || "";
          if (data && data.length > 0) {
            let allLocalList = data.filter(item => {
              return item.name == "河西区";
            })[0].childs;
            let localListByCode = code
              ? this.getLocalListByCode(allLocalList, code)
              : [];
            this.locationOptions =
              localListByCode.length > 0 ? localListByCode : allLocalList;
          }
        })
        .catch(() => {
          console.log("查询片区数据失败");
        });
    },
    handleServiceClass() {
      this.currentPage = 1;
    },
    clearSearchValue() {
      this.formData = Object.assign({}, this.formData, {
        Name: "",
        OldPhone: "",
        Sex: "",
        EventType: "",
        state: ""
      });
      this.mealTime = "";
    }
  }
};
</script>

<style lang="less" scoped>
//
</style>
