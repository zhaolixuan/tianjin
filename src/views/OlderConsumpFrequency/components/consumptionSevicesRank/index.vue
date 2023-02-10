<template>
  <div class="older-content">
    <norm-layout text="消费服务量排名" :routerPath="path"></norm-layout>
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
import { mapGetters } from "vuex";
import api from "@/api/api.js";

export default {
  name: "consumptionSevices",
  data() {
    return {
      columns: [
        { label: "老年人姓名", prop: "name" },
        { label: "性别", prop: "sex" },
        { label: "年龄", prop: "age" },
        { label: "消费次数", prop: "num" }
      ],
      pageSize: 3,
      currentPage: 1,
      data: [],
      tableData: [],
      orderType: "num",
      timer: "",
      start: 0,
      end: 4,
      consumptionNum: {},
    };
  },

  props: {
    statisticsForm: {
      type: Object,
      default: () => {
        return {};
      }
    },

    ispressSearchButton: {
      type: Number
    },

    count: {
      type: String
    }
  },

  components: {
    NormLayout,
    ListLayout
  },

  created() {
    this.getConsumptionList();
    // 定时滚动
    this.timer = setInterval(() => {
      // 这里之前是 this.end >= 100 9月13日是 16 数组的长度吧
      if (this.end >= 16) {
        this.start = 0;
        this.end = 4;
      }
      this.tableData = this.data.slice((this.start += 4), (this.end += 4));
    }, 4000);
  },

  watch: {
    ispressSearchButton() {
      this.getConsumptionList();
    }
  },

  computed: {
    ...mapGetters(["typeNew", "codeNew", "breadCrumbCodes"]),
    type() {
      return this.$store.state.type;
    },
    params() {
      let params = {};
      const typeCodes = ["code", "zoneCode", "streetCode", "communityCode"];
      params[typeCodes[this.typeNew - 1]] = this.codeNew[0];
      return params;
    },

    // 模块更多按钮跳转
    path() {
      return {
        path: "OlderConsumpTimesAndAmount",
        query: {
          orderType: this.orderType,
          code: this.$route.query.code,
          type: this.type
        }
      };
    }
  },

  methods: {
    getConsumptionList() {
      let params = {
        beginDay: this.statisticsForm.beginDay,
        endDay: this.statisticsForm.endDay,
        orderType: this.orderType,
        page: this.currentPage,
        pageSize: 100,
        // num: this.count
        MinNum: this.statisticsForm.count,
        MaxNum: this.statisticsForm.MaxNum
      };
      api.getConsumptionList(params).then(res => {
        if (res.consumptionDetailsVoList.length > 0) {
          this.data = res.consumptionDetailsVoList;
          this.tableData = res.consumptionDetailsVoList.slice(0, 4);
          // 11月07日改造
          this.consumptionNum = res.consumptionNum;
          this.$emit('handleConsumptionNum',this.consumptionNum)
        }
      });
    },
  }
};
</script>

<style lang="less" scoped>
.older-content{
  margin-bottom: .55rem;
}
</style>
