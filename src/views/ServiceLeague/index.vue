<template>
  <list-layout
    :crumbData="[{ title: this.$route.query.label, url: '' }]"
    :columns="columns"
    :tableData="tableData"
    unit="个"
    :pageSize="pageSize"
    :currentPage="currentPage"
    backPath="HomeDistribution"
    title="居家养老服务载体分布————居家养老服务联盟库"
  >
    <div class="older-tab">
      <p
        :class="[activeIndex === index ? 'tab_item active' : 'tab_item']"
        v-for="(item, index) in tabData"
        :key="index"
        @click="handleTab(index)"
      >
        {{ item }}
      </p>
    </div>
  </list-layout>
</template>

<script>
import { mapGetters } from "vuex";
import ListLayout from "@/components/TablerList/layout.vue";
import serviceLeague from "../../../static/json/serviceLeague.json";
import service from "../../../static/json/service.json";

export default {
  data() {
    return {
      tabData: ["居家养老服务商", "服务商联盟"],
      activeIndex: 0,
      index: 1,
      columns: [
        { label: "序号", prop: "index", width: "150" },
        { label: "载体服务商", prop: "companyName" },
        { label: "关联企业", prop: "enterprise" },
        { label: "服务类别", prop: "classess" },
        { label: "服务项目", prop: "project" },
        { label: "关联企业联系人", prop: "enterpriseName" },
        { label: "关联企业联系电话", prop: "enterprisePhone" }
      ],
      tableData: [],
      pageSize: 10, // 每页数量
      currentPage: 1 // 当前页数
    };
  },

  components: {
    ListLayout
  },

  computed: {
    ...mapGetters(["userType", "code"])
  },

  created() {
    this.tableData = service;
    this.$store
      .dispatch("getUserAuthInfo")
      .then(() => {
        // this.handleGetSearchValue()
      })
      .catch(err => {
        console.log("获取用户权限失败", err);
      });
  },

  methods: {
    handleTab(id) {
      this.activeIndex = id;
      if (id === 0) {
        this.tableData = service;
        this.columns = [
          { label: "序号", prop: "index", width: "150" },
          { label: "载体服务商", prop: "companyName" },
          { label: "关联企业", prop: "enterprise" },
          { label: "服务类别", prop: "classess" },
          { label: "服务项目", prop: "project" },
          { label: "关联企业联系人", prop: "enterpriseName" },
          { label: "关联企业联系电话", prop: "enterprisePhone" }
        ];
      } else {
        this.tableData = serviceLeague;
        this.columns = [
          { label: "序号", prop: "index", width: "150" },
          { label: "统一社会信用代码", prop: "code" },
          { label: "企业名称", prop: "firmName" },
          { label: "法定代表人", prop: "representative" },
          { label: "联系电话", prop: "phone" },
          { label: "住所经营场所", prop: "address" },
          { label: "经营范围", prop: "range" },
          { label: "企业信用", prop: "credit" }
        ];
      }
    }
  }
};
</script>

<style lang="less" scoped>
.older-tab {
  display: flex;
  width: 100%;
  height: 1rem;
  margin-top: 0.2rem;
  box-sizing: border-box;
  .tab_item {
    width: 2.85rem;
    height: 0.5rem;
    border: 1px solid #00cefe;
    text-align: center;
    line-height: 0.5rem;
    color: rgba(79, 208, 255, 0.7);
    font-size: 0.17rem;
    opacity: 0.6;
  }
  .active {
    border: 1px solid #68f4ff;
    color: #68f4ff;
    opacity: 1;
  }
}
</style>
