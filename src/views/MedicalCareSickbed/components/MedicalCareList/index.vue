<template>
  <div class="older_content">
    <norm-layout text="医护一体化病床统计表"></norm-layout>
    <list-layout
      :columns="columns"
      :tableData="tableData"
      :pageSize="pageSize"
      :currentPage="currentPage"
    ></list-layout>
  </div>
</template>

<script>
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import ListLayout from "@/components/TablerList/smallLayout.vue";
export default {
  name: "MedicalCareList",
  data() {
    return {
      columns: [
        { label: "中心名称", prop: "centername" },
        { label: "姓名", prop: "name" },
        { label: "性别", prop: "sex" },
        { label: "年龄", prop: "age" },
        { label: "住院日期", prop: "date" }
      ],
      tableData: [],
      pageSize: 3,
      currentPage: 1,
      data: [],
      timer: "",
      start: 0,
      end: 4
    };
  },

  components: {
    NormLayout,
    ListLayout
  },

  created() {
    this.getTableData();
    this.timer = setInterval(() => {
      if (this.end >= 12) {
        this.start = -4;
        this.end = 0;
      }
      this.tableData = this.data.slice((this.start += 4), (this.end += 4));
    }, 4000);
  },

  computed: {
    path() {
      return 1;
    }
  },

  methods: {
    getTableData() {
      var res = {
        code: 200,
        data: [
          {
            centername: "zhangsan1",
            name: "zhangsan",
            sex: "男",
            age: "18",
            date: "2021.09.09"
          },
          {
            centername: "zhangsan2",
            name: "zhangsan",
            sex: "男",
            age: "18",
            date: "2021.09.09"
          },
          {
            centername: "zhangsan3",
            name: "zhangsan",
            sex: "男",
            age: "18",
            date: "2021.09.09"
          },
          {
            centername: "zhangsan4",
            name: "zhangsan",
            sex: "男",
            age: "18",
            date: "2021.09.09"
          },
          {
            centername: "zhangsan5",
            name: "zhangsan",
            sex: "男",
            age: "18",
            date: "2021.09.09"
          },
          {
            centername: "zhangsan6",
            name: "zhangsan",
            sex: "男",
            age: "18",
            date: "2021.09.09"
          },
          {
            centername: "zhangsan7",
            name: "zhangsan",
            sex: "男",
            age: "18",
            date: "2021.09.09"
          },
          {
            centername: "zhangsan8",
            name: "zhangsan",
            sex: "男",
            age: "18",
            date: "2021.09.09"
          },
          {
            centername: "zhangsan9",
            name: "zhangsan",
            sex: "男",
            age: "18",
            date: "2021.09.09"
          },
          {
            centername: "zhangsa10",
            name: "zhangsan",
            sex: "男",
            age: "18",
            date: "2021.09.09"
          },
          {
            centername: "zhangsa11",
            name: "zhangsan",
            sex: "男",
            age: "18",
            date: "2021.09.09"
          },
          {
            centername: "zhangsa12",
            name: "zhangsan",
            sex: "男",
            age: "18",
            date: "2021.09.09"
          },
          {
            centername: "zhangsa13",
            name: "zhangsan",
            sex: "男",
            age: "18",
            date: "2021.09.09"
          },
          {
            centername: "zhangsa14",
            name: "zhangsan",
            sex: "男",
            age: "18",
            date: "2021.09.09"
          }
        ]
      };
      this.data = res.data;
      this.tableData = res.data.slice(0, 4);
    }
  }
};
</script>

<style lang="less" scoped>
.older_content {
  margin-bottom: 0.15rem;
}
</style>
