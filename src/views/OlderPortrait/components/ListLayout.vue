<template>
  <div class="older_box">
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
        <!-- <div class="table_page" v-if="total">
          <span class="total_num">共计 {{total}} {{unit ? '人' : '家'}}</span>
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleChangePage"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="total"
          ></el-pagination>
        </div> -->
      </div>
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
  }
}
</script>

<style>
.older_box {
  width: 100%;
  height: 100%;
}
.table_box {
  padding: 0 .15rem;
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
  background-color: rgba(1,99,255,.1);

}
.el-table th,
.el-table tr {
  background-color: transparent;
  padding: 0;
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
  padding: 0.12rem 0;
  height:.45rem;
  font-size: .13rem;
  font-weight: 400;
  color: #C9EEFF;
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
