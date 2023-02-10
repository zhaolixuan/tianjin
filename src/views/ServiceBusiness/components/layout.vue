<template>
  <div class="older_box">
    <vue-scroll>
      <div class="nav_btn" @click="openDialog"></div>
      <el-dialog :fullscreen="fullscreen" :visible.sync="$store.state.navDialogVisible">
        <Navigation></Navigation>
      </el-dialog>
      <page-header></page-header>
      <bread-crumb :crumbData="crumbData"></bread-crumb>

      <div class="search_head">
        <div class="head_box"><slot></slot></div>
      </div>

      <div class="table_box">
        <el-table :data="tableData" stripe>
          <el-table-column
            v-for="(item,index) in columns"
            :key="index"
            align="center"
            :show-overflow-tooltip="true"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
          ></el-table-column>
        </el-table>
        <div class="table_page" v-if="total">
          <span class="total_num">共计 {{total}} {{unit ? '人' : '家'}}</span>
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleChangePage"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
import Header from '@/components/Header/index'
import PageHeader from '@/views/ProvideAged/components/PageHeader/index.vue'
import BreadCrumb from '@/components/BreadCrumb/index'
import Navigation from '@/components/Navigation/index'
import VueScroll from '@/views/ProvideAged/vueScroll/index.vue'
export default {
  name: 'ListLayout',
  components: {
    Header,
    PageHeader,
    BreadCrumb,
    Navigation,
    VueScroll
  },
  props: {
    crumbData: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    unit: {
      type: Boolean,
      default: () => true
    },
    total: [Number],
    pageSize: [Number],
    currentPage: [Number]
  },
  data () {
    return {
      fullscreen: true
    }
  },
  methods: {
    openDialog () {
      this.$store.commit('setNavDialogVisible', true)
    },
    handleChangePage (page) {
      this.$emit('getSearchValue', page)
    }
  }
}
</script>

<style>
.older_box {
  width: 100%;
  height: 100%;
  background: url("~@/assets/img/big_project_bg.gif") 50% 100% no-repeat;
  background-size: cover;
  overflow: auto;
}
.search_head {
  padding: 0 0.5rem;
  /* padding-left: 1rem; */
  /* margin-top: 0.2rem; */
  margin-bottom: 0.1rem;
}
.search_head .head_box {
  width: 100%;
  overflow: hidden;
  position: relative;
  /* margin-bottom: 0.1rem; */
}
.search_head .head_box .el-form {
  width: 100%;
  float: left;
}
.search_select {
  /* border: 2px solid #7dbaf9;
  box-shadow: 0px 0px 0.08rem 0.04rem rgba(39, 145, 248, 0.5);
  border-radius: 4px; */
  margin: 0.1rem 0.3rem;
  color: #a5dcff;
  /* width: 3.5rem; */
}
.search_select .el-form-item__label {
  font-size: 0.19rem;
  color: #a5dcff;
  width: 1.2rem;
  float: left;
}
.el-form-item__content{
  float: left;
  width: 2.2rem;
}
.el-form--inline{
  /* float: left; */
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-left: 5px;
}
.el-form-item{
  width: 3.6rem;
  margin-left: 5px;
 }
.input_num {
  width: 1rem;
}
/* .el-form--inline .el-form-item {
  margin-right: 0.3rem;
  margin-bottom: 0.1rem;
} */
/* .input_select .el-form-item__content {
  width: 215px;
  margin-right: 0;
}
.small_select .el-form-item__content {
  min-width: 180px;
  width: 2rem;
}
.mini_select .el-form-item__content {
  width: 1.4rem;
} */
.btns_box {
  /* position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%); */
  width: 100%;
}
.btns_right{
  float: right;
}
.btns_box .btn {
  padding:0.15rem 0.5rem;
  background-color: #0e3a8d;
  text-align: center;
  border: 0;
  color: #87b7eb;
  margin-right: 0.1rem;
  /* margin-top: 2rem; */
  float: left;
}
.btns_box .btn:focus,
.btns_box .btn:hover {
  background-color: #0e3a8d;
  border: 0;
  color: #87b7eb;
}

/* .search_head .head_left {
  margin-right: 0.3rem;
} */
.search_head .head_left,
.search_head .head_right {
  float: left;
}
.el-input__inner {
  font-size: 0.16rem;
  background-color: transparent;
  border: 0;
  border-bottom: 0.01rem solid #043a6f;
  color: #56a4f7;
  max-width: 2.15rem;

}
.el-range-editor.el-input__inner{
    padding: 3px 0;
}
.el-input__inner::-webkit-input-placeholder {
  color: #436fd2;
}
.el-input__inner:hover,
.el-select:hover .el-input__inner,
.el-cascader .el-input:hover .el-input__inner {
  border-color: #043a6f;
}
.el-input-group__append,
.el-input-group__prepend {
  background-color: #2e5096;
  border: 0;
  color: #87b7eb;
}
.head_left.el-input .el-input__clear,
.head_left.el-input .el-input__clear:hover {
  color: #409eff;
}
.el-radio-button__inner {
  color: #8fc0f3;
  background-color: transparent;
  border: 0;
  border-right: 0.01rem solid #8fc0f3;
  padding: 0.02rem 0.2rem;
  margin: 0.1rem 0;
}
.el-radio-button:first-child .el-radio-button__inner {
  border-left: 0;
  border-right: 0.01rem solid #8fc0f3;
}
.el-radio-button:last-child .el-radio-button__inner {
  border-right: 0;
}
.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: transparent;
  color: #436fd2;
}
.table_box {
  padding: 0 0.5rem;
  position: relative;
}
.el-table {
  color: #a5dcff;
  background: transparent;
}
/* .el-table__body-wrapper{
  height: 9rem;
  overflow: auto;
} */
.el-table::before {
  height: 0;
}
.el-table thead {
  color: #eee;
  background-color: #05173d;
}
.el-table th,
.el-table tr {
  background-color: transparent;
}
.el-table__row {
  cursor: pointer;
}
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: rgba(255, 255, 255, 0.1);
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(255, 255, 255, 0.2);
}
.el-table td,
.el-table th {
  padding: 0.15rem 0;
}
.el-table td,
.el-table th.is-leaf {
  border: 0;
}
.table_page {
  position: absolute;
  right: 1rem;
  bottom: -1.2rem;
}
.table_page .el-pagination {
  float: left;
  height: 0.3rem;
}
.table_page .total_num {
  float: left;
  font-size: 0.14rem;
  color: #416fc4;
  line-height: 0.34rem;
  margin-right: 0.2rem;
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background-color: transparent;
  color: #416fc4;
}
.el-pagination.is-background .btn-next.disabled,
.el-pagination.is-background .btn-next:disabled,
.el-pagination.is-background .btn-prev.disabled,
.el-pagination.is-background .btn-prev:disabled,
.el-pagination.is-background .el-pager li.disabled {
  color: #416fc4;
}
.el-select .el-input .el-select__caret,
.el-cascader .el-input .el-icon-arrow-down {
  color: #409eff;
}
.el-cascader-node.is-selectable.in-active-path {
  color: #409eff;
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
.el-select-dropdown__item,
.el-date-picker__header-label,
.el-date-table td,
.el-month-table td .cell,
.el-year-table td .cell,
.el-picker-panel__icon-btn {
  color: #8fc0f3;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.el-cascader-menu {
  color: #436fd2;
  border-right: 1px solid #436fd2;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  background-color: #032995;
  color: #409eff;
  font-weight: 700;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover,
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover,
.el-cascader-node:not(.is-disabled):focus,
.el-cascader-node:not(.is-disabled):hover {
  background-color: #0148cb;
  color: #8fc0f3;
}
.el-tag.el-tag--info {
  background-color: #0e3a8d;
  border: 0;
  color: #8fc0f3;
}
.el-tag.el-tag--info .el-tag__close {
  background-color: #3b6fd1;
  color: #8fc0f3;
}
.el-tag.el-tag--info .el-tag__close:hover {
  background-color: #3b6fd1;
  color: #8fc0f3;
}
.el-form-item__content .el-date-editor .el-range-input{
background:transparent !important;
font-size: 0.16rem;
color:  #416fc4 !important;
width: 98%;
}
.el-form-item__content .el-date-editor .el-range-separator{
  width: 2%;
}
.el-select .el-input .el-select__caret{
  font-size: 0.18rem;
}
.el-form-item__content .el-date-editor .el-range-input::-webkit-input-placeholder{
  color:  #416fc4;
}
 .el-form-item__content .el-date-editor i{color:  #416fc4;}
 .el-form-item__content .el-date-editor .el-icon-date{display: none}
</style>
