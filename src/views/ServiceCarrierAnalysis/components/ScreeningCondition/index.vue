<template>
  <div class="container">
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item label="服务时间" class="search_time">
        <el-date-picker
          v-model="ServiceTime[0]"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="开始日期"
        >
        </el-date-picker>
        <el-date-picker
          v-model="ServiceTime[1]"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="截止日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="服务商" class="search_select">
        <el-select
          v-model="formData.companyName"
          clearable
          :disabled="serviceShop.length === 1"
          placeholder="请选择服务商"
        >
          <el-option
            v-for="(option, index) in serviceShop"
            :key="index"
            :label="option"
            :value="option"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="下属服务载体" class="search_select">
        <el-select
          v-model="formData.merchantName"
          clearable
          placeholder="请选择服务载体"
        >
          <el-option
            v-for="(option, index) in serviceCarrierMap"
            :key="index"
            :label="option.MerchantName"
            :value="option.MerchantName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-button
        class="btn"
        icon="el-icon-search"
        :loading="loading"
        @click="handleGetSearchValue"
        >查询</el-button
      >
    </el-form>
  </div>
</template>

<script>
import api from "@/api/api";
import { formatTime } from "@/utils/utils";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      formData: {
        companyName: "",
        merchantName: "",
        beginDay: "",
        endDay: "",
        statusFlag: "1",
      },
      isSearchLoading: false,
      ServiceList: [],
      ServiceTime: [formatTime(new Date()), formatTime(new Date())],
      serviceShop: [],
      serviceCarrierMap: [],
      roleid: "",
      userName: "",
    };
  },
  props: {
    loading: [Boolean],
  },
  computed: {
    ...mapGetters(["typeNew", "codeNew", "useName"]),
  },
  created() {},
  mounted() {
    this.roleid = window.localStorage.getItem("roleid");
    this.getOtherPageList(this.useName, this.roleid);
  },
  methods: {
    handleGetSearchValue() {
      this.formData.beginDay = this.ServiceTime
        ? formatTime(new Date(this.ServiceTime[0]))
        : "";
      this.formData.endDay = this.ServiceTime
        ? formatTime(new Date(this.ServiceTime[1]))
        : "";
      this.$emit("handleChangeForm", this.formData);
    },
    getmerchantServicesList() {
      api
        .getmerchantServicesList({ companyName: this.formData.companyName })
        .then((res) => {
          if (res.data) {
            this.serviceCarrierMap = res.data.merchantMap;
          }
        });
    },
    getOtherPageList(userName, roleid) {
      if (roleid == 29 && userName == "") {
          return
      }
      this.serviceShop = [];
      api
        .getOtherPageList({
          page: 1,
          pageSize: 12,
          companyName: userName,
          roleId: roleid,
        })
        .then((res) => {
          if (res.obj) {
            res.obj.records.map((item) =>
              this.serviceShop.push(item.companyName)
            );
            if (this.serviceShop.length <= 1) {
              this.formData.companyName = this.serviceShop[0];
            } else if (roleid == 29) {
              this.serviceShop.forEach((i) => {
                if (i.includes(this.userName)) {
                  this.formData.companyName = i.companyName;
                }
              });
            }
            this.handleGetSearchValue();
          }
        });
    },
  },
  watch: {
    "formData.companyName": {
      handler(val) {
        this.getmerchantServicesList();
      },
    },
    useName(val) {
      this.getOtherPageList(this.useName, this.roleid);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  height: 2.5rem;
  padding-left: 0.5rem;
  display: flex;
  align-items: center;
  /deep/ .el-form {
    width: 100%;
    height: 100% !important;
    display: flex !important;
    flex-direction: column;
    justify-content: center;
  }
  /deep/ .el-form-item {
    margin-bottom: 0.15rem !important;
    width: 80%;
  }
  /deep/ .el-form-item__content {
    display: flex !important;
    width: 3.4rem !important;
  }
  /deep/ .el-form .el-form-item__label {
    font-size: 0.18rem;
    color: #68f4ff;
    width: 1.6rem;
    font-weight: 600;
  }
  /deep/ .search_select .el-input__inner {
    background-color: transparent;
    color: #56a4f7;
    border: 0.01rem solid #043a6f;
    width: 3rem;
  }
  /deep/ .el-input.is-disabled .el-input__inner {
    background: transparent;
    border-color: #043a6f;
    color: #7c7d80;
  }
  /deep/ .el-input .el-select__caret {
    color: #409eff;
  }
  /deep/ .el-input__inner::-webkit-input-placeholder {
    color: #436fd2;
  }
  /deep/ .el-select-dropdown,
  /deep/ .el-picker-panel,
  /deep/ .el-cascader__dropdown {
    background-color: #032995;
    border: 0;
  }
  /deep/ .el-popper[x-placement^="bottom"] .popper__arrow,
  /deep/ .el-popper[x-placement^="bottom"] .popper__arrow::after {
    border-bottom-color: #032995;
  }
  /deep/ .el-select-dropdown__item.hover,
  /deep/ .el-select-dropdown__item:hover {
    background-color: #032995;
  }
  /deep/ .el-select-dropdown__item {
    color: #8fc0f3;
  }
  /deep/ .el-input__inner:hover,
  /deep/ .el-select:hover .el-input__inner,
  /deep/ .el-cascader .el-input:hover .el-input__inner {
    border-color: #043a6f;
  }
  /deep/ .btn:focus,
  /deep/ .btn:hover {
    color: #16fff1;
    background: url("~@/assets/img/oldMan_tab.png") no-repeat;
    background-size: 100% 100%;
  }
  /deep/ .el-select-dropdown__item.hover,
  /deep/
    .el-select-dropdown.is-multiple
    .el-select-dropdown__item.selected.hover {
    background-color: #0148cb;
    color: #8fc0f3;
  }
  /deep/ .el-date-editor .el-range-input::-webkit-input-placeholder {
    color: #416fc4;
  }
  /deep/ .el-date-picker__header--bordered {
    border-bottom: 1px solid #436fd2;
  }
  /deep/ .el-date-table th {
    color: #436fd2;
    border-bottom: 1px solid #436fd2;
  }
  /deep/ .el-date-table td.next-month,
  /deep/ .el-date-table td.prev-month {
    color: #436fd2;
  }
  /deep/ .el-form-item__content .el-date-editor .el-range-input {
    background: transparent !important;
    font-size: 0.16rem;
    color: #416fc4 !important;
    width: 98%;
  }
  /deep/ .btn {
    /* padding:0.15rem 0.5rem; */
    margin: 0 auto;
    width: 1.3rem;
    height: 0.4rem;
    /* line-height: .4rem; */
    background: url("~@/assets/img/oldMan_tab.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    border: 0;
    color: #4fd0ff;
    float: right;
    font-size: 0.14rem;
  }
  /deep/ .el-select-dropdown__item.hover,
  /deep/
    .el-select-dropdown.is-multiple
    .el-select-dropdown__item.selected.hover {
    background-color: #0148cb;
    color: #8fc0f3;
  }
  /deep/ .el-select-dropdown__item,
  /deep/ .el-date-picker__header-label,
  /deep/ .el-date-table td,
  /deep/ .el-month-table td .cell,
  /deep/ .el-year-table td .cell,
  /deep/ .el-picker-panel__icon-btn {
    color: #8fc0f3;
  }
}
</style>
