<template>
  <div class="older-content">
    <norm-layout text="当日服务情况"></norm-layout>
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
      :columns="columns"
      :tableData="newTable"
      :pageSize="pageSize"
      :currentPage="currentPage"
    >
    </list-layout>
    <div class="bottom">
      <div class="bottom_link" @click="handleClickRow">更多 》</div>
    </div>
  </div>
</template>

<script>
import NormLayout from "@/views/OlderDistribution/components/NormLayout";
import ListLayout from "@/components/TablerList/smallLayout.vue";
import api from "@/api/api.js";
import { mapGetters } from "vuex";
import { formatTime } from "@/utils/utils.js";

export default {
  name: "OrderList",
  data() {
    return {
      tabData: ["服务量排名", "消费金额排名"],
      activeIndex: 0,
      columns: [
        { label: "排序", prop: "index", width: 80 },
        { label: "服务商", prop: "companyName" },
        {
          label: "服务量",
          prop: "orderAllCardMonthTotal",
          width: 140
        }
      ],
      pageSize: 5,
      currentPage: 1,
      tableData: [],
      newTable: [],
      timer: "",
      total: 0,
      start: 0,
      end: 5
    };
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

    this.initlunbo();
  },

  methods: {
    initlunbo() {
      this.timer = setInterval(() => {
        if (this.end < this.tableData.length) {
          this.newTable = this.tableData.slice(
            (this.start += 5),
            (this.end += 5)
          );
        } else {
          this.newTable = this.tableData.slice(0, 5);
          this.start = 0;
          this.end = 5;
        }
      }, 5000);
    },

    handleClickRow() {
       this.$router.push({
        path: "ServiceProvidersAnalysis",
        query: {
          title: "居家养老服务载体分布",
          startTime: formatTime(new Date())
        }
      });
     
    },

    handleGetSearchValue() {
      let form = Object.assign({}, this.params, {
        beginDay: formatTime(new Date()),
        endDay: formatTime(new Date())
      });
      switch (this.activeIndex) {
        case 0:
          api.getMerchantOrderInfo(form).then(res => {
            const { merchantTotalMap } = res && res.data;
            this.tableData = merchantTotalMap;
            this.tableData.map((key, val) =>
              key.companyName
                ? key.companyName
                : this.tableData.splice(val, val + 1)
            );
            // 加 index 项 当作序号使用
            this.tableData.map((item, index) => {
              item.index = index + 1;
            });
          });
          break;
        default:
          api.getMerchantOrderInfo(form).then(res => {
            const { merchantTotalMap } = res && res.data;
            this.tableData = merchantTotalMap;
            this.tableData.map((key, val) =>
              key.companyName
                ? key.companyName
                : this.tableData.splice(val, val + 1)
            );
            // 加 index 项 当作序号使用
            this.tableData.map((item, index) => {
              item.index = index + 1;
            });
          });
          break;
      }
    },

    handleTab(ind) {
      this.activeIndex = ind;
      if (ind == 0) {
        this.tableData = [];
        this.columns = [
          { label: "排序", prop: "index", width: 80 },
          { label: "服务商", prop: "companyName" },
          {
            label: "服务量",
            prop: "orderAllCardMonthTotal",
            width: 140
          }
        ];
      } else {
        this.tableData = [];
        this.columns = [
          { label: "排序", prop: "index", width: 80 },
          { label: "服务商", prop: "companyName" },
          { label: "消费金额", prop: "consumerAllMoney", width: 140 }
        ];
      }
      this.handleGetSearchValue();
    }
  },

  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="less" scoped>
.older-content {
  height: 3.8rem;
  position: relative;
}
.older-tab {
  width: 100%;
  height: 0.3rem;
  display: flex;
  padding-left: 0.4rem;
  .tab_item {
    width: 1.4rem;
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
.bottom {
  position: absolute;
  right: 0;
  bottom: -0.8rem;
  width: 86%;
  height: .3rem;
  padding-left: 0.4rem;
  background-image: url("~@/views/ProvideSubsidy/assets/older_tab.png");
  background-size: 100% 100%;
  .bottom_link {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 0.3rem;
    color: #16fff1;
    font-size: 0.14rem;
    margin-top: 0.2rem;
    text-align: center;
    line-height: 0.3rem;
    cursor: pointer;
  }
}
</style>
