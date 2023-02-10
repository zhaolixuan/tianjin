<template>
  <div class="older_content">
    <norm-layout text="助医服务记录" :routerPath="path"></norm-layout>
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
    <list-layout
      class="table_box"
      :columns="columns"
      :tableData="tableData"
      :pageSize="pageSize"
      :currentPage="currentPage || 1"
      v-on:getSearchValue="handleGetSearchValue"
    ></list-layout>
  </div>
</template>

<script>
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import ListLayout from "@/components/TablerList/smallLayout.vue";
import api from "@/api/api.js";
import { mapGetters } from "vuex";

export default {
  name: "ServicesRecord",
  data() {
    return {
      tabData: ["助医服务记录", "健康驿站服务记录统计"],
      activeIndex: 0,
      columns: [
        { label: "排.序", prop: "index", width: 80 },
        { label: "健康驿站", prop: "healthStation" },
        { label: "服务时间", prop: "serviceTime" },
        { label: "服务老人", prop: "name" },
        { label: "服务项目", prop: "serviceContent" }
      ],
      pageSize: 100,
      currentPage: 1,
      tableData: [],
      total: 0,
      timer: "",
      strat: 0,
      end: 100,
      newTableData: []
    };
  },

  props: {
    form: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  components: {
    NormLayout,
    ListLayout
  },

  computed: {
    ...mapGetters(["breadCrumbCodes", "typeNew", "codeNew"]),
    params() {
      let params = {};
      const typeCodes = ["code", "zoneCode", "streetCode", "communityCode"];
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0];
      return params;
    },

    path() {
      return this.activeIndex === 0
        ? {
            path: "MedicalList",
            query: {
              code: this.breadCrumbCodes,
              title: "助医运营监管大数据统计分析",
              beginTime: this.form.beginTime,
              endTime: this.form.endTime
            }
          }
        : {
            path: "PoststationRecord",
            query: {
              code: this.breadCrumbCodes,
              title: "助医服务大数据统计分析"
            }
          };
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
    this.init();
  },

  methods: {
    init() {
      // 定时切割数据
      this.timer = setInterval(() => {
        if (this.end < this.newTableData.length) {
          // console.log("1"); // 先走这个 退出的条件是 this.end >= 100
          this.tableData = this.newTableData.slice(
            (this.start += 5),
            (this.end += 5) // end 每段时间加 5
          );
        } else {
          // console.log("2");
          this.tableData = this.newTableData.slice(0, 5);
          this.start = 0;
          this.end = 5;
        }
      }, 3000);
    },

    handleTab(ind) {
      this.activeIndex = ind;
      if (ind == 0) {
        this.tableData = [];
        this.columns = [
          // { label: "序号", prop: "index", width: 50 },
          { label: "排.序", prop: "index", width: 80 },
          { label: "健康驿站", prop: "healthStation" },
          { label: "服务时间", prop: "serviceTime" },
          { label: "服务老人", prop: "name" },
          { label: "服务项目", prop: "serviceContent" }
        ];
      } else {
        this.tableData = [];
        this.columns = [
          // { label: "序号", prop: "index", width: 80 },
          { label: "排序", prop: "index", width: 80 },
          { label: "健康驿站", prop: "healthStation" },
          { label: "服务人次", prop: "serviceTotal" },
          { label: "服务项目数", prop: "total" }
        ];
      }
      this.handleGetSearchValue();
    },

    handleGetSearchValue() {
      switch (this.activeIndex) {
        case 0:
          let form = Object.assign({}, this.params, {
            allowanceMoney: "1",
            pageSize: this.pageSize,
            page: this.currentPage
          });
          api.getRecordsPage(form).then(res => {
            const { records, size, total } = res && res.obj;
            this.total = total;
            records.map((item, index) => {
              item.index = index;
            });
            this.newTableData = records;

            // 给索引加1 做排序用
            this.newTableData.map((item, index) => {
              item.index = item.index + Number(1);
            });
            // console.log(this.newTableData);

            this.tableData = records.slice(0, 5);
            this.pageSize = size;
          });
          break;

        default:
          api.getHealthServiceRecord(this.params).then(res => {
            const { healthServiceRecordMap } = res && res.data;
            healthServiceRecordMap.map((item, index) => {
              item.index = index;
            });
            this.newTableData = healthServiceRecordMap;
            this.newTableData.map(item => {
              item.index = item.index + Number(1);
            });
            // console.log(this.newTableData);
            this.tableData = healthServiceRecordMap.slice(0, 5);
          });
          break;
      }
    }
  },
  
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="less" scoped>
.older_content {
  height: 4rem;
  // 让表格上移 5rem
  // /deep/ .table_box {
  //   margin-top: -5rem;
  // }
  .older-tab {
    width: 100%;
    height: 0.3rem;
    display: flex;
    padding-left: 0.4rem;
    z-index: 99;
    .tab_item {
      width: 1.6rem;
      height: 0.25rem;
      border: 1px solid #00cefe;
      text-align: center;
      line-height: 0.25rem;
      color: rgba(79, 208, 255, 0.7);
      font-size: 0.15rem;
      opacity: 0.6;
    }
    .active {
      border: 1px solid #68f4ff;
      color: #68f4ff;
      opacity: 1;
    }
  }
}
.table_box {
  padding: 0 0.2rem 0 0.3rem;
}
</style>
