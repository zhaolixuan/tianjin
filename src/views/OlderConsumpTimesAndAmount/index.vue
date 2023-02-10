<template>
  <list-layout
    header="老年人消费频率分析"
    title="老年人消费频率分析—老年人消费群体消费次数消费金额统计"
    :columns="columns"
    :tableData="tableData"
    :total="total"
    :currentPage="this.pageForm.page"
    :pageSize="this.pageForm.pageSize"
    @getSearchValue="getSearchValue"
    backPath="OlderConsumpFrequency"
  >
    <el-form :inline="true" :model="streetDistriForm">
      <el-form-item label="起止时间" class="search_select search_time">
        <el-date-picker
          v-model="streetDistriForm.beginDay"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="开始日期"
        >
        </el-date-picker>
        <el-date-picker
          v-model="streetDistriForm.endDay"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="截止日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="消费次数" class="search_select search_time">
        <el-input
          v-model="streetDistriForm.consumeCount"
          placeholder="最小次数"
        ></el-input>
        <!-- 9月13新增最大次数 -->
        <el-input
          v-model="streetDistriForm.maxNum"
          placeholder="最大次数"
        ></el-input>
      </el-form-item>
      <el-form-item label="年龄段" class="search_select search_time">
        <el-input
          v-model="streetDistriForm.minAge"
          placeholder="起始年龄"
        ></el-input>
        <el-input
          v-model="streetDistriForm.maxAge"
          placeholder="截止年龄"
        ></el-input>
      </el-form-item>
      <el-form-item label="养老待遇" class="search_select search_time">
        <el-input
          v-model="streetDistriForm.MinMoney"
          placeholder="起始金额"
        ></el-input>
        <el-input
          v-model="streetDistriForm.MaxMoney"
          placeholder="截止金额"
        ></el-input>
      </el-form-item>
      <span class="btns_box">
        <el-button @click="resetSearchValue" class="btn">重置</el-button>
        <el-button
          class="btn"
          icon="el-icon-search"
          :loading="isSearchLoading"
          @click="handleGetSearchValue"
          >查询</el-button
        >
      </span>
    </el-form>
    <Menu></Menu>
  </list-layout>
</template>

<script>
import ListLayout from "@/components/TablerList/layout.vue";
import { formatTime } from "@/utils/utils.js";
import Menu from "@/views/OlderDistribution/components/Menu";
import api from "@/api/api.js";

export default {
  components: { ListLayout },
  data() {
    return {
      tableData: [],
      streetDistriForm: {
        beginDay: formatTime(
          new Date(new Date(`${new Date().getFullYear()}` + ",01,01"))
        ),
        endDay: formatTime(new Date()),
        consumeCount: "",
        maxNum: "",
        minAge: "",
        maxAge: "",
        MinMoney: "",
        MaxMoney: ""
      },
      isSearchLoading: false,
      columns: [
        { label: "序号", prop: "" },
        { label: "老年人姓名", prop: "name" },
        { label: "性别", prop: "sex" },
        { label: "养老待遇", prop: "monthlyIncomeShe" },
        { label: "年龄", prop: "age" },
        { label: "居住街道", prop: "streetName" },
        { label: "居住社区", prop: "communityName" },
        { label: "消费次数", prop: "num", sortable: true },
        { label: "消费金额", prop: "amount", sortable: true }
      ],
      pageForm: {
        page: 1,
        pageSize: 10
      },
      total: 1
    };
  },

  components: {
    ListLayout,
    Menu
  },

  mounted() {
    this.getConsumptionListByOrderType();
  },

  methods: {
    resetSearchValue() {
      this.streetDistriForm = {};
    },

    handleGetSearchValue() {
      this.getConsumptionListByOrderType();
    },

    getConsumptionListByOrderType() {
      this.isSearchLoading = true;
      let params = {
        beginDay: this.streetDistriForm.beginDay,
        endDay: this.streetDistriForm.endDay,
        orderType: this.$route.query.orderType,
        MinNum: this.streetDistriForm.consumeCount,
        MaxNum: this.streetDistriForm.maxNum,
        MinAge: this.streetDistriForm.minAge,
        MaxAge: this.streetDistriForm.maxAge,
        MinMoney: this.streetDistriForm.MinMoney,
        MaxMoney: this.streetDistriForm.MaxMoney,
        page: this.pageForm.page,
        pageSize: this.pageForm.pageSize
      };
      api.getConsumptionList(params).then(res => {
        this.isSearchLoading = false;
        // console.log(res);
        this.tableData = res.consumptionDetailsVoList;
        this.pageForm.page = res.page.currentPage;
        this.total = res.total;
      });
    },

    // pageSize改变
    getSearchValue(val) {
      this.pageForm.page = val;
      this.getConsumptionListByOrderType();
    }
  }
};
</script>

<style lang="less" scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 1.6rem;
  margin-right: 0.2rem;
}

// 让单个 el-form-item label 和 input 一行显示
/deep/ .search_time {
  width: 380px !important;
  display: flex;
  justify-content: flex-start;
}

// 更改宽度
/deep/ .search_time .el-form-item__content .el-input {
  width: 42%;
}

// 更改 OlderConsumpTimesAndAmount 路由 起止日期控件 文本 padding 值
/deep/ .search_time .el-form-item__content .el-date-editor .el-input__inner {
  padding-left: 0.1rem;
}

// 更改起止日期 input 框间隔问题
/deep/
  .search_time
  .el-form-item__content
  .el-date-editor.el-input.el-input--prefix.el-input--suffix.el-date-editor--date {
  margin-right: 0rem;
}

.btns_box {
  display: flex;
  justify-content: flex-end;
  height: 0.5rem;
  margin-bottom: 0.2rem;
  margin-top: -0.55rem;
}
</style>
