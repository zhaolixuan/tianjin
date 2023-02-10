<template>
  <div class="older-content">
    <norm-layout text="家庭养老床位服务记录" :routerPath="path"></norm-layout>
    <list-layout
      :columns="columns"
      :tableData="tableData"
      :pageSize="pageSize"
      :currentPage="currentPage"
    ></list-layout>

    <!-- <detial-tip :serviceData="serviceData" v-if="isShowDetail"></detial-tip> -->
  </div>
</template>

<script>
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import ListLayout from "@/components/TablerList/smallLayout.vue";
import { datas } from "@/views/YanglaoshilaohuaList/communityData.js";

import api from "@/api/api.js";
import { mapGetters } from "vuex";
export default {
  name: "OldmanList",
  data() {
    return {
      columns: [
        { label: "序号", prop: "id" },
        { label: "老年人", prop: "oldPeople" },
        { label: "服务时间", prop: "serviceStartTime" },
        { label: "服务类型", prop: "className" },
        { label: "服务项目", prop: "projectClass" },
      ],
      pageSize: 3,
      currentPage: 1,
      pageIndex: 0,
      data: [],
      start: 0,
      end: 5,
      // tableData: [],
      timer: "",
      total: 3,
      form: {},
      isShowDetail: true,
      serviceData: {},
    };
  },
  props: {
    street: {
      type: String,
      default: () => "",
    },
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    path() {
      let url = {
        path: "YanglaochuangweiList",
        query: { code: this.breadCrumbCodes, isVaccination: "1" },
      };

      return url;
    },
  },
  created() {
    this.handleGetSearchValue();
  },
  methods: {
    handleGetSearchValue() {
      //        this.total = 3
      //          this.tableData = datas.slice(0, 3)
      //  this.formData.page = this.formData.page || 1;
      //       let form = Object.assign({}, this.formData, this.params);
      // api
      //   .getModifyPlanList({page:1,limit:3})
      //   .then((res) => {
      //     this.tableData = res.data;
      //     this.total = 3;
      //   })
      //   .catch(() => {
      //   });
    },
  },
  destroyed() {
    clearInterval(this.timer);
  },
  components: {
    NormLayout,
    ListLayout,
  },
};
</script>

<style lang="less" scoped>
.older-content {
  height: 2.5rem;
}
</style>
