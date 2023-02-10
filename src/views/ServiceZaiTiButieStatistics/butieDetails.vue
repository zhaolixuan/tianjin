<template>
  <list-layout
    :tableData="tableData"
    header="服务载体流量补贴统计表"
    title="五大服务类别数据综合分析——居家养老服务载体补贴明细表"
    :columns="columns"
    backPath="FiveService"
  >
    <div class="btns_box">
      <div class="data_total">
        <div class="data_total_first">
          <span
            >查询时间：{{ this.$route.query.beginDay }} 至
            {{ this.$route.query.endDay }} </span
          >日均消费金额（去除白卡和床位）大于等于500 居家养老服务中心补贴明细
        </div>
        <div class="data_total_second">
          <span>总计：服务流量收入基数（元）：</span
          ><b>{{ baseThroughputAll }} 元</b>
          <span>服务流量补贴金额（元）：</span
          ><b>{{ allowanceAmountAll }} 元</b> <span>补贴后收入合计（元）：</span
          ><b>{{ allowanceTotalAll }} 元</b>
        </div>
      </div>
      <div class="btns_right">
        <a :href="downloadExcel" target="_blank">
          <el-button class="btn">导出</el-button>
        </a>
      </div>
    </div>
  </list-layout>
</template>

<script>
import api from "@/api/api.js";
import ListLayout from "@/components/TablerList/layout.vue";

export default {
  data() {
    return {
      tableData: [],
      searchDate: new Date(),
      columns: [
        { label: "养老服务商", prop: "servicePoint" },
        { label: "服务载体", prop: "merchantName" },
        { label: "载体级别", prop: "canteenlevel" },
        { label: "服务流量收入基数（元）", prop: "baseThroughput" },
        { label: "服务流量补贴金额（元）", prop: "allowanceAmount" },
        { label: "补贴后收入合计（元）", prop: "allowanceTotal" },
      ],
      // 服务流量收入基数
      baseThroughputAll: 0,
      // 补贴金额
      allowanceAmountAll: 0,
      // 补贴后收入合计
      allowanceTotalAll: 0,
    };
  },

  mounted() {
    this.getCarrierDetailListData();
  },

  methods: {
    getCarrierDetailListData() {
      let params = {
        beginDay: this.$route.query.beginDay,
        endDay: this.$route.query.endDay,
      };
      if (localStorage.getItem("roleid") == 29) {
        params.mealInfoName = localStorage.getItem("useName");
      }
      console.log(params);
      api.getCarrierDetailList(params).then((res) => {
        console.log(res);
        if (res.code == 200 && res.data) {
          this.tableData = res.data.serviceCarrierDetailList;
          this.baseThroughputAll = res.data.baseThroughputAll;
          this.allowanceAmountAll = res.data.allowanceAmountAll;
          this.allowanceTotalAll = res.data.allowanceTotalAll;
        }
      });
    },
  },

  components: {
    ListLayout,
  },

  computed: {
    downloadExcel() {
      const Api =
        process.env.NODE_ENV === "development"
          ? "http://tj-yanglao-test.xjoycity.com/"
          : "";
      let data = `${Api}/yanglao-api/serviceCarrierDetail/CarrierDetailExport?`;
      let params = {
        beginDay: this.$route.query.beginDay,
        endDay: this.$route.query.endDay,
      };
      let keys = Object.keys(params);
      keys.forEach((item, index) => {
        data += params[item] ? `${item}=${params[item]}&` : "";
      });
      console.log(data.slice(0, -1));
      return data.slice(0, -1);
    },
  },
};
</script>

<style lang="less" scoped>
.btns_box {
  height: 0.6rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.1rem;
  .data_total {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
    font-size: 0.16rem;
    color: #a5dcff;
    padding-left: 0.2rem;
    .data_total_second {
      display: flex;
      justify-content: flex-start;
      span {
        color: rgb(5, 230, 255);
      }
      b {
        margin-right: 0.2rem;
      }
    }
  }
  .btns_right {
    display: flex;
    align-items: flex-end;
  }
}

.el-date-editor.el-input__inner {
  width: 1.6rem;
  margin-right: 0.2rem;
}
</style>
