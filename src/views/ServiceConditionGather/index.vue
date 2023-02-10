<template>
  <list-layout
    header="居家养老服务情况汇总统计表"
    title="五大服务类别数据综合分析——居家养老服务情况汇总统计表"
    backPath="FiveService"
    :tableData="tableData"
    :columns="columns"
    :objectSpanMethod="objectSpanMethod"
  >
    <el-form :inline="true" v-model="gatherForm" ref="gatherForm">
      <el-form-item label="起止时间" class="search_select search_time">
        <el-date-picker
          v-model="gatherForm.beginDay"
          type="date"
          placeholder="开始日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        <el-date-picker
          v-model="gatherForm.endDay"
          type="date"
          placeholder="截止日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="载体级别" class="search_select">
        <el-select
          v-model="gatherForm.canteenlevel"
          placeholder="请选择"
          clearable
          multiple
        >
          <el-option
            v-for="(item, index) in canteenlevelList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="养老服务商" class="search_select">
        <el-select
          v-model="gatherForm.servicePoint"
          placeholder="请选择"
          clearable
          :disabled="servicePointList.length === 1"
          @change="handleChangeServicePoint"
        >
          <el-option
            v-for="(item, index) in servicePointList"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="载体名称" class="search_select">
        <!-- <el-select
          v-model="gatherForm.merchantName"
          placeholder="请选择"
          clearable
        >
          <el-option
            v-for="(item, index) in merchantList"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select> -->
        <el-autocomplete
          class="serviceConditionGather_autocomplete"
          v-model="gatherForm.merchantName"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
          clearable
        ></el-autocomplete>
      </el-form-item>
    </el-form>
    <div class="btns_box">
      <el-button class="btn" @click="handleResetGatherForm">重置</el-button>
      <el-button
        class="btn"
        icon="el-icon-search"
        :loading="isSearchLoading"
        @click="handleGetSearchValue"
        >查询</el-button
      >
      <a :href="downloadExcel" target="_blank">
        <el-button class="btn">导出</el-button>
      </a>
    </div>
    <Menu></Menu>
  </list-layout>
</template>

<script>
import Menu from "@/views/OlderDistribution/components/Menu";
import ListLayout from "@/components/TablerList/layout.vue";
import { formatTime } from "../../utils/utils.js";
import api from "@/api/api.js";
import { mapGetters } from "vuex";

export default {
  name: "ServiceConditionGather",
  data() {
    return {
      gatherForm: {
        beginDay: formatTime(
          new Date(new Date(`${new Date().getFullYear()}` + ",01,01"))
        ),
        endDay: formatTime(new Date()),
        canteenlevel: "",
        servicePoint: "",
        merchantName: "",
      },
      servicePointList: [],
      merchantList: [],
      merchantListload: [],
      table: [
        { A: "助餐服务类", B: "早餐", code: "breakfast" },
        { A: "助餐服务类", B: "午餐", code: "lunch" },
        { A: "助餐服务类", B: "晚餐", code: "dinner" },
        { A: "助餐服务类", B: "小计", code: "accommodation" },
        { A: "生活照料类", code: "lifecare" },
        { A: "助医服务类", code: "medical" },
        { A: "托养床位类", code: "feeding" },
        { A: "其他服务类", code: "other" },
        { A: "合计", code: "total" },
      ],
      tableData: [],
      columns: [
        { label: "服务", prop: "A", className: "rightText" },
        { label: "类型", prop: "B", className: "leftText" },
        { label: "服务量（客次）", prop: "serviceNum" },
        { label: "消费金额（元）", prop: "totalAmount" },
        { label: "服务人口数（人）", prop: "peopleNum" },
        { label: "其中：白卡服务量（客次）", prop: "cardServiceNum" },
        { label: "其中：白卡消费金额（元）", prop: "cardTotalAmount" },
        { label: "其中：老年人服务量（客次）", prop: "oldServiceNum" },
        { label: "其中：老年人消费金额（元）", prop: "oldTotalAmount" },
        {
          label: "服务方式",
          prop: "fieldNum/visitingNum",
          children: [
            { label: "现场服务（客次）", prop: "fieldNum" },
            { label: "现场服务消费金额", prop: "sceneMoney" },
            { label: "入户服务（客次）", prop: "visitingNum" },
            { label: "入户服务消费金额", prop: "homeMoney" },
          ],
        },
      ],
      isSearchLoading: false,
      canteenlevelList: [
        { label: "服务站", value: "服务站" },
        { label: "社区级", value: "社区级" },
        { label: "街级", value: "街级" },
      ],
    };
  },

  components: {
    ListLayout,
    Menu,
  },
  mounted() {
    this.tableData = this.table;
    this.getServicePointListData();
    this.getMerchantNameListData();
    setTimeout(() => {
      this.getServiceSummarizingMapData();
    }, 500);
  },

  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 && rowIndex === 0) {
        return {
          rowspan: 4,
          colspan: 1,
        };
      } else if (columnIndex === 0 && rowIndex < 4 && rowIndex > 0) {
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
      if (rowIndex >= 4 && columnIndex === 0) {
        return {
          rowspan: 1,
          colspan: 2,
        };
      } else if (rowIndex >= 4 && columnIndex > 0 && columnIndex < 2) {
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
    },

    getServicePointListData() {
      let roleid = window.localStorage.getItem("roleid");
      let params = {
        servicePoint:
          roleid == "29"
            ? this.useName || window.localStorage.getItem("useName")
            : "",
      };
      api.getServicePointList(params).then((res) => {
        if (res.code == 200) {
          this.servicePointList = res.data;
          this.gatherForm.servicePoint =
            this.servicePointList.length <= 1 ? this.servicePointList[0] : "";
        }
      });
    },

    handleChangeServicePoint(val) {
      this.gatherForm.servicePoint = val;
      this.getMerchantNameListData(this.gatherForm.servicePoint);
    },

    getMerchantNameListData(val) {
      let parmas = {
        servicePoint: val,
      };
      api.getMerchantNameList(parmas).then((res) => {
        // var data = [];
        // for (var i = 0; i < res.data.length; i++) {
        //   data.push({ value: res.data[i] });
        // }
        // this.merchantList = data;
        this.merchantList = [];
        res.data.forEach((item) => {
          this.merchantList.push({ value: item });
        });
      });
    },

    handleResetGatherForm() {
      this.gatherForm = {
        beginDay: "",
        endDay: "",
        canteenlevel: "",
        servicePoint: "",
        merchantName: "",
      };
    },

    handleGetSearchValue() {
      this.getServiceSummarizingMapData();
    },

    getServiceSummarizingMapData() {
      this.isSearchLoading = true;
      let params = {
        beginDay: this.gatherForm.beginDay,
        endDay: this.gatherForm.endDay,
        canteenlevel: this.gatherForm.canteenlevel.join(","),
        servicePoint: this.gatherForm.servicePoint,
        merchantName: this.gatherForm.merchantName,
      };
      api.getServiceSummarizingMap(params).then((res) => {
        // console.log(res);
        if (res.code && res.code == 200 && res.data) {
          this.isSearchLoading = false;
          var tableDataList = [];
          this.table.map((item) => {
            tableDataList.push(Object.assign({}, item, res.data[item.code]));
          });
          this.tableData = tableDataList;
        }
      });
    },

    // 切换搜索建议的处理函数
    handleSelect(item) {
      console.log(item);
    },

    querySearch(queryString, cb) {
      var merchantList = this.merchantList;
      var results = queryString
        ? merchantList.filter(this.createFilter(queryString))
        : merchantList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (merchantList) => {
        return (
          merchantList.value
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
  },

  computed: {
    ...mapGetters(["useName"]),
    downloadExcel() {
      var data = "/yanglao-api/serviceSummarizing/summarizingExport?";
      let keys = Object.keys(this.gatherForm);
      keys.forEach((item, index) => {
        data += this.gatherForm[item]
          ? `${item}=${this.gatherForm[item]}&`
          : "";
      });
      data = data.slice(0, -1);
      return data;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-table thead th.rightText {
  text-align: right !important;
  padding-right: 0 !important;
  border-right: none;
  .cell {
    padding-right: 0 !important;
  }
}

/deep/ .el-table thead th.leftText {
  text-align: left !important;
  padding-left: 0 !important;
  border-left: none;
  .cell {
    padding-left: 0 !important;
  }
}

/deep/ .el-table--border::after,
.el-table--group::after {
  background-color: #80b5ff;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 1.6rem;
  margin-right: 0.2rem;
}

.btns_box {
  height: 0.5rem;
  display: flex;
  justify-content: flex-end;
}
</style>
