<template>
  <list-layout
    :columns="columns"
    :tableData="tableData"
    :total="total"
    :pageSize="pageSize"
    :currentPage="currentPage"
    v-on:getSearchValue="handleGetSearchValue"
    backPath="ServiceVolunteer"
    header="志愿者服务数据统计"
    title="志愿者服务数据统计————志愿者服务组织架构"
  >
    <el-form :inline="true" :model="formData">
      <el-form-item label="街道" class="search_select">
        <el-select
          v-model="formData.Address"
          clearable
          placeholder="请选择街道"
        >
          <el-option
            v-for="(option, index) in streetData"
            :key="index"
            :label="option.name"
            :value="option.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="志愿者队伍" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入志愿者队伍"
          v-model.trim="formData.volunteerTeamname"
          clearable
          @keyup.enter.native="getSearchValue"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="成员" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入成员"
          v-model.trim="formData.memberName"
          clearable
          @keyup.enter.native="getSearchValue"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div class="btns_box">
      <div class="btns_right">
        <el-button class="btn" @click="clearSearchValue">重置</el-button>
        <el-button
          class="btn"
          icon="el-icon-search"
          :loading="isSearchLoading"
          @click="handleGetSearchValue"
          >查询</el-button
        >
      </div>
    </div>
    <Menu />
  </list-layout>
</template>

<script>
import Menu from "@/views/OlderDistribution/components/Menu";
import ListLayout from "@/components/TablerList/layout.vue";
import { mapGetters } from "vuex";
import api from "@/api/api";

export default {
  data() {
    return {
      isSearchLoading: false,
      ops: {
        vuescroll: {},
        scrollPanel: {
          scrollingX: false
        },
        rail: {},
        bar: {
          background: "#eee"
        }
      },
      tableData: [],
      columns: [
        { label: "所属区域", prop: "address" },
        { label: "志愿者队伍名称", prop: "volunteerTeamname" },
        { label: "成员姓名", prop: "memberName" },
        { label: "成员类型", prop: "memberType" }
      ],
      fullscreen: true,
      formData: {
        Address: "",
        volunteerTeamname: "",
        memberName: ""
      },
      pageSize: 12, // 每页数量
      currentPage: 1, // 当前页数
      total: 0, // 总条数
      streetData: []
    };
  },

  components: {
    ListLayout,
    Menu
  },

  computed: {
    ...mapGetters(["userType", "code"])
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
    this.handleGetSearchValue();
    this.getStreetData();
  },

  methods: {
    getStreetData() {
      api.getStreetInfo().then(res => {
        this.streetData = res || [];
      });
    },

    requestParams(page) {
      var params = {};
      params = Object.assign({}, this.formData, {
        page: typeof page === "number" ? page : 1,
        pageSize: this.pageSize
      });
      return params;
    },

    // 分页器切换
    handleGetSearchValue(page) {
      this.isSearchLoading = true;
      api
        .getVolunteerTeamListInfo(this.requestParams(page))
        .then(res => {
          this.isSearchLoading = false;
          const { records, total, size, current } = res && res.obj;
          this.tableData = records || [];
          this.pageSize = size;
          this.currentPage = current;
          this.total = total;
        })
        .catch(() => {
          this.isSearchLoading = false;
        });
    },

    clearSearchValue() {
      this.formData = {
        sex: "",
        zoneCode: "",
        streetCode: "",
        communityCode: "",
        name: "",
        idCard: "",
        phone: ""
      };
      this.selectedLocation = [];
    }
  }
};
</script>

<style lang="less" scoped>
//
</style>
