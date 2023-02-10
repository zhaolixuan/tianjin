<template>
  <div class="older_content">
    <NormLayout text="医护一体化病床统计表" :routerPath="path" :flag="false" />
    <ListLayout
      :columns="columns"
      :tableData="tableData"
      :pageSize="pageSize"
      :currentPage="currentPage"
    />
  </div>
</template>

<script>
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import ListLayout from "@/components/TablerList/smallLayout.vue";
import api from "@/api/api.js";

export default {
  name: "MedicalSickBedStatistics",
  data() {
    return {
      columns: [
        { label: "中心名称", prop: "merchantName" },
        { label: "姓名", prop: "name" },
        { label: "性别", prop: "sex" },
        { label: "年龄", prop: "age" },
        { label: "住院日期", prop: "admissionTime" }
      ],
      tableData: [],
      pageSize: 15,
      currentPage: 1,
      data: [],
      timer: "",
      start: 0,
      end: 5
    };
  },

  components: {
    NormLayout,
    ListLayout
  },

  computed: {
    path() {
      return {
        path: "HealthMedicalSickBedStatistics",
        query: {}
      };
    }
  },

  created() {
    this.getData();
    this.timer = setInterval(() => {
      if (this.end >= 4) {
        this.start = -5;
        this.end = 0;
      }
      this.tableData = this.data.slice((this.start += 5), (this.end += 5));
    }, 4000);
  },

  methods: {
    getData() {
      let params = {
        page: this.currentPage,
        pageSize: this.pageSize
      };
      api.integratedMedicalWardList(params).then(res => {
        if (res.msg === "ok") {
          this.data = res.obj.records;
          // this.data.push({
          //   merchantName: "测试",
          //   name: "小花",
          //   sex: "女",
          //   age: "77",
          //   admissionTime: "2021.10.08"
          // });
          this.tableData = res.obj.records.slice(0, 5);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.older_content {
  margin-bottom: 0.15rem;
  margin-top: 0.35rem;
}
</style>
