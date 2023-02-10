<template>
  <div class="left_top">
    <el-form :inline="true" :model="statisticsForm" class="form">
      <el-form-item label="起止时间" class="search_select search_time">
        <el-date-picker
          v-model="statisticsForm.beginDay"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="开始日期"
          v-on:change="handleChangeBeginDate"
        >
        </el-date-picker>
        <el-date-picker
          v-model="statisticsForm.endDay"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="截止日期"
          v-on:change="handleChangeEndDate"
        >
        </el-date-picker>
      </el-form-item>
      <el-button
        class="btn"
        icon="el-icon-search"
        :loading="isSearchLoading"
        @click="handleGetSearchValue"
        >查询</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { formatTime } from "../../../../utils/utils.js";

export default {
  data() {
    return {
      statisticsForm: {
        beginDay: formatTime(new Date("2021,01,01")),
        endDay: formatTime(new Date()),
      },
      isSearchLoading: false
    };
  },

  methods: {
    handleChangeBeginDate(val) {
      console.log(val);
    },

    handleChangeEndDate(val) {
      console.log(val);
    },

    handleGetSearchValue(val) {
      console.log(val);
      this.$emit('SearchLoading',this.isSearchLoading)
    },

    handleSendStaticsForm() {
      this.$emit("sendStaticsForm", this.statisticsForm);
    },
  }
};
</script>

<style lang="less" scoped>
.left_top {
  height: 0.5rem;
  width: 100%;
  font-size: 0.25rem;
  color: #28e1fe;
  padding-left: 0.2rem;
  font-weight: 600;
  margin: 0rem 0rem 0.3rem 0rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
</style>
