<template>
  <div class="container">
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item label="服务商：" class="search_select">
        <el-select v-model="formData.companyName" clearable placeholder="请选择服务商">
          <el-option
            v-for="(option,index) in  serviceShop"
            :key="index"
            :label="option.companyName"
            :value="option.companyName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="下属服务载体：" class="search_select">
        <el-select v-model="formData.merchantName" clearable placeholder="请选择服务商">
          <el-option
            v-for="(option,index) in  serviceCarrierMap"
            :key="index"
            :label="option.merchantName"
            :value="option.merchantName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务时间" class="search_select">
            <el-date-picker
              v-model="ServiceTime"
              type="daterange"
              range-separator="-"
              clearable
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-button
            class="btn"
            icon="el-icon-search"
            :loading="isSearchLoading"
            @click="handleGetSearchValue"
          >查询</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        companyName: '',
        merchantName: '',
        beginDay: '',
        endDay: ''
      },
      isSearchLoading: false,
      ServiceList: [],
      ServiceTime: []
    }
  },
  props: {
    serviceCarrierMap: {
      type: Array,
      default: () => []
    },
    serviceShop: {
      type: Array,
      default: () => []
    }
  },
  created () {
    this.formData.companyName = this.serviceShop[0].companyName
    this.$emit('handleChangeForm', this.formData)
  },
  methods: {
    handleGetSearchValue () {
      this.formData.beginDay = this.ServiceTime ? this.ServiceTime[0] : ''
      this.formData.endDay = this.ServiceTime ? this.ServiceTime[1] : ''
      this.$emit('handleChangeForm', this.formData)
    }
  }
}
</script>

<style>
.container{
  height: 2.5rem;
  padding-left: .5rem;
  display: flex;
  align-items: center;
}
.el-form{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.el-form-item{
  margin-bottom: .1rem;
}
.el-form .el-form-item__label{
  font-size: .2rem;
  color: #68f4ff;
  width: 1.6rem;
  font-weight: 600;
}
.el-form .el-input__inner{
  background-color: transparent;
  color: #56a4f7;
  border: 0.01rem solid #043a6f;
  width: 3rem;
}
.el-input .el-select__caret{
  color: #409eff;
}
.el-input__inner::-webkit-input-placeholder {
  color: #436fd2;
}
.el-select-dropdown,
.el-picker-panel,
.el-cascader__dropdown {
  background-color: #032995;
  border: 0;
}
.el-popper[x-placement^="bottom"] .popper__arrow,
.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: #032995;
}
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
  background-color: #032995;
}
.el-select-dropdown__item{
  color: #8fc0f3;
}
.el-input__inner:hover,
.el-select:hover .el-input__inner,
.el-cascader .el-input:hover .el-input__inner {
  border-color: #043a6f;
}
.btn:focus,
.btn:hover {
  color: #16fff1;
  background: url("~@/assets/img/oldMan_tab.png") no-repeat;
  background-size: 100% 100%;
}
.el-select-dropdown__item.hover,
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover {
  background-color: #0148cb;
  color: #8fc0f3;
}
.el-date-editor .el-range-input::-webkit-input-placeholder {
  color: #416fc4;
}
.el-date-picker__header--bordered {
  border-bottom: 1px solid #436fd2;
}
.el-date-table th {
  color: #436fd2;
  border-bottom: 1px solid #436fd2;
}
.el-date-table td.next-month,
.el-date-table td.prev-month {
  color: #436fd2;
}
.el-form-item__content .el-date-editor .el-range-input {
  background: transparent !important;
  font-size: 0.16rem;
  color: #416fc4 !important;
  width: 98%;
}
.btn {
  /* padding:0.15rem 0.5rem; */
  margin:  0 auto;
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
.el-select-dropdown__item.hover,
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover {
  background-color: #0148cb;
  color: #8fc0f3;
}
.el-select-dropdown__item,
.el-date-picker__header-label,
.el-date-table td,
.el-month-table td .cell,
.el-year-table td .cell,
.el-picker-panel__icon-btn {
  color: #8fc0f3;
}
</style>
