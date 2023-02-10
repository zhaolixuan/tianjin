<template>
  <div class="older_content">
    <NormLayout text="家庭床位明细" :routerPath="path" :flag="false" />
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
  name: "HomeBedDetails",
  data() {
    return {
      columns: [
        { label: "老年人姓名", prop: "name" },
        { label: "性别", prop: "sex" },
        { label: "年龄", prop: "age" },
        { label: "入院日期", prop: "admissionTime" },
        { label: "当前状态", prop: "status" }
      ],
      tableData: [],
      pageSize: 9,
      currentPage: 1,
      data: [],
      timer: "",
      start: 0,
      end: 3
    };
  },

  components: {
    NormLayout,
    ListLayout
  },

  computed: {
    path() {
      return {
        path: "HealthHomeBedDetails",
        query: {}
      };
    }
  },

  created() {
    this.getData();
    this.timer = setInterval(() => {
      if (this.end >= 3) {
        this.start = -3;
        this.end = 0;
      }
      this.tableData = this.data.slice((this.start += 3), (this.end += 3));
    }, 4000);
  },

  methods: {
    getData() {
      let params = {
        page: this.currentPage,
        pageSize: this.pageSize
      };
      api.familySickbedList(params).then(res => {
        if (res.msg === "ok") {
          res.obj.records.map(item => {
            item.status =
              item.status == 0 ? "已出院" : item.status == 1 ? "住院中" : "";
          });
          this.data = res.obj.records;
          this.tableData = res.obj.records.slice(0, 3);
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
