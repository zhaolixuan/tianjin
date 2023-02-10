<template>
  <list-layout
    :crumbData="[{ title: this.$route.query.label, url: '' }]"
    :columns="columns"
    :tableData="tableData"
    :total="total"
    :pageSize="pageSize"
    :currentPage="currentPage"
    backPath="MedicalPage"
    v-on:getSearchValue="handleGetSearchValue"
    unit="次"
    title="助医运营监管大数据统计分析————健康驿站服务记录"
    header="助医运营监管大数据统计分析"
  >
    <el-form :inline="true" :model="formData">
      <el-form-item
        label="服务时间"
        class="search_select"
        label-width="1.85rem"
      >
        <el-date-picker
          v-model="ServicesTime"
          type="daterange"
          range-separator="-"
          clearable
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="老人姓名" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入老人姓名"
          v-model.trim="formData.name"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="身份证号码" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入身份证号码"
          v-model.trim="formData.idCard"
          clearable
          @keyup.enter.native="handleGetSearchValue"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="服务内容" class="search_select">
        <el-select
          v-model="formData.serviceContent"
          clearable
          placeholder="请选择服务内容"
        >
          <el-option
            v-for="(option, index) in serviceOrderItemlist"
            :key="index"
            :label="option.label"
            :value="option.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="60岁以上失能半失能服务"
        class="search_select"
        label-width="1.85rem"
      >
        <el-select
          v-model="formData.incapacitatedService"
          clearable
          placeholder="请选择60岁以上失能半失能服务"
        >
          <el-option
            v-for="(option, index) in serviceSix"
            :key="index"
            :label="option.label"
            :value="option.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="健康驿站" class="search_select">
        <el-select
          v-model="formData.healthStation"
          clearable
          placeholder="请选择健康驿站"
        >
          <el-option
            v-for="(option, index) in postData"
            :key="index"
            :label="option.healthStation"
            :value="option.healthStation"
          >
          </el-option>
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
      </div>
    </div>
  </list-layout>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/api/api.js";
import ListLayout from "@/components/TablerList/layout.vue";
let formatTime = date => {
  let formatData = "";
  if (date) {
    let month =
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1);
    let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    formatData = date.getFullYear() + "-" + month + "-" + day;
  }
  return formatData;
};

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
        { label: "序号", prop: "index" },
        { label: "健康驿站", prop: "healthStation" },
        { label: "服务时间", prop: "serviceTime" },
        { label: "老人姓名", prop: "name" },
        { label: "性别", prop: "sex" },
        { label: "身份证号", prop: "idCard" },
        { label: "联系电话", prop: "phone" },
        { label: "服务内容", prop: "serviceContent" },
        { label: "操作", prop: "medical" }
      ],
      tableData: [],
      serviceOrderItemlist: [
        { label: "全部", value: "" },
        { label: "血压测量", value: "血压测量" },
        { label: "血糖测量", value: "血糖测量" },
        { label: "用药指导", value: "用药指导" },
        { label: "健康宣教", value: "健康宣教" },
        { label: "社区康复管理", value: "社区康复管理" }
      ],
      serviceSix: [
        { label: "全部", value: "" },
        { label: "入户查体", value: "入户查体" },
        { label: "入户随访", value: "入户随访" },
        { label: "特需服务", value: "特需服务" },
        { label: "家床", value: "家床" }
      ],
      postData: [],
      fullscreen: true,
      index: 1,
      locationProps: {
        value: "code",
        label: "name",
        children: "childs"
      },
      pageSize: 10, // 每页数量
      currentPage: 1, // 当前页数
      total: 0, // 总条数
      ServicesTime: [],
      payTime: [],
      formData: {
        name: "",
        idCard: "",
        serviceContent: "",
        incapacitatedService: "",
        endTime: "",
        beginTime: "",
        healthStation: ""
      }
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
      if (this.userType === 1) {
        urlCodeParams = {
          zoneCode: this.initCodeFromQuery(1),
          streetCode: this.initCodeFromQuery(2),
          communityCode: this.initCodeFromQuery(3)
        };
      }
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
    this.$store
      .dispatch("getUserAuthInfo")
      .then(() => {
        this.handleGetSearchValue();
      })
      .catch(err => {
        console.log("获取用户权限失败", err);
      });
    this.getPostData();
    this.initTime();
  },

  methods: {
    initTime() {
      this.ServicesTime[0] = this.$route.query.beginTime
        ? formatTime(new Date(this.$route.query.beginTime))
        : formatTime(new Date());
      this.ServicesTime[1] = this.$route.query.endTime
        ? formatTime(new Date(this.$route.query.endTime))
        : formatTime(new Date());
    },

    initCodeFromQuery(codeIndex) {
      return this.$route.query.code &&
        typeof this.$route.query.code !== "string"
        ? this.$route.query.code[codeIndex] || ""
        : "";
    },

    requestParams(page) {
      var params = {};
      const codeParams = this.userAuthCodeParams;
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
      this.formData.beginTime =
        formatTime(new Date(this.ServicesTime[0])) ||
        this.$route.query.beginTime;
      this.formData.endTime =
        formatTime(new Date(this.ServicesTime[1])) || this.$route.query.endTime;
      this.isSearchLoading = true;
      api
        .getRecordsPage(this.requestParams(page))
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

    clearSearchValue() {
      this.formData = Object.assign({}, this.formData, {
        name: "",
        idCard: "",
        serviceContent: "",
        incapacitatedService: "",
        endTime: "",
        beginTime: ""
      });
      this.searchService = "";
      this.ServicesTime = "";
    },

    getPostData() {
      let form = {
        page: 1,
        pageSize: 30
      };
      api.gethealthStation(form).then(res => {
        const { records } = res && res.obj;
        this.postData = records;
      });
    }
  }
};
</script>

<style scoped>
.el-form-item {
  width: 4.1rem !important;
}
</style>
