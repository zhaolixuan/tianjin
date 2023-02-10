<template>
  <div class="older-content">
    <norm-layout text="消费金额排名" :routerPath="path"></norm-layout>
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
  name: "consumptionAmountRank",
  data() {
    return {
      columns: [
        { label: "老年人姓名", prop: "name" },
        { label: "性别", prop: "sex" },
        { label: "年龄", prop: "age" },
        { label: "消费金额", prop: "amount" }
      ],
      pageSize: 3,
      currentPage: 1,
      data:[],
      tableData: [],
      orderType: "amount",
      timer: "",
      start: 0,
      end: 4
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

    count:{
      type: String,
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

    // 模块路由跳转
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
        MinNum: this.statisticsForm.count,
        MaxNum: this.statisticsForm.MaxNum
      };
      api.getConsumptionList(params).then(res => {
        if (res.consumptionDetailsVoList.length > 0) {
          this.data = res.consumptionDetailsVoList;
          this.tableData = res.consumptionDetailsVoList.slice(0, 4);
        }
      });
    }
  }
};
</script>
