<template>
  <div class="older_box">
    <vue-scroll>
      <page-header :title="($route.query.title || header) || '助餐服务监管大数据分析'"></page-header>
      <div class="header-title">
        <norm-layout :text="title" :path="backPath" :flag="false"></norm-layout>
      </div>
      <div class="search_head">
        <div class="head_box">
          <slot></slot>
        </div>
      </div>
      <div v-for="(item,index) in tableData" :key="index"></div>
      <div class="table_box">
        <!-- 8月13日在做消费群体消费次数消费金额统计为 layout 组件新增了sortable属性  -->
        <el-table :data="tableData" stripe style="width: 100%;" :span-method="objectSpanMethod" @cell-click="handelCell">
          <el-table-column
            v-for="(item,index) in columns"
            :key="index"
            align="center"
            :show-overflow-tooltip="true"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.min"
            :class-name="item.className"
            :sortable="item.sortable"
          >
          <template v-if="item.children">
            <el-table-column
            v-for="(col,key) in item.children"
            :key="key"
            align="center"
            :show-overflow-tooltip="true"
            :prop="col.prop"
            :label="col.label"
            :width="col.width"
            :min-width="col.min"
          >
            </el-table-column>
          </template>
            <template slot-scope="scope">
              <span v-if="item.label !== '操作'">{{ item.label == '序号' ? scope.$index+(currentPage - 1) * pageSize + 1 : scope.row[item.prop] === 'NULL' ? '' : scope.row[item.prop]}}</span>
              <span class="Look_btn" v-if="item.label == '操作'" @click="handleClick(scope)" type="text" size="small">查看</span>
              <span class="Look_btn" v-if="item.label == '老年人消费频率人数（人）'" @click="handleDetial(scope)" type="text" size="small">{{scope.row[item.value]}}</span>
              <span class="Look_btn" v-if="item.label == '身份证号'" @click="handleIDCardDetial(scope)" type="text" size="small">{{scope.row[item.value]}}</span>
              <span v-if="item.label == '驿站类型'">{{ scope.row[item.value] === '2' ? '依托社区站' : '健康驿站'}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_page" v-if="total">
          <el-pagination
            background
            layout="prev, pager, next, jumper"
            prev-text="上一页"
            next-text="下一页"
            @current-change="handleChangePage"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="total"
          ></el-pagination>
          <span class="total_num">页数：{{page}}/{{Math.ceil(total/12)}}</span>
          <span class="total_num big">共计：{{total}} {{unit || '人' }}</span>
          <span class="total_num big" v-if="copies">就餐份数：{{copies}} 份</span>
        </div>
      </div>
      <detial-pop :detialData="detialData" :dialogVisible.sync="isShow" :propShow="propShow"></detial-pop>
    </vue-scroll>
  </div>
</template>

<script>
import Header from '@/components/Header/index'
import PageHeader from '@/views/OlderDistribution/components/PageHeader/header'
import BreadCrumb from '@/components/BreadCrumb/index'
import Navigation from '@/components/Navigation/index'
import VueScroll from '@/views/ProvideAged/vueScroll/index.vue'
import NormLayout from '@/views/OlderDistribution/components/NormLayout'
import DetialPop from './DetialPop'

export default {
  name: 'ListLayout',
  components: {
    Header,
    PageHeader,
    BreadCrumb,
    Navigation,
    VueScroll,
    NormLayout,
    DetialPop
  },

  props: {
    attendanceSign: {
      type: String,
      defaule: () => ''
    },
    serviceDate: {
      type: Object,
      default: () => {}
    },
    companyName: {
      type: String,
      defaule: () => ''
    },
    attendanceRate: {
      type: String,
      defaule: () => ''
    },
    getSummaries: {
      type: Function,
      defaule: () => function () {}
    },
    objectSpanMethod: {
      type: Function,
      default: () => function () {}
    },
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
      type: String,
      default: () => ''
    },
    title: {
      type: String,
      default: () => ''
    },
    header: {
      type: String,
      default: () => ''
    },
    code: {
      type: String,
      default: () => ''
    },
    copies: {
      type: Number,
      default: () => 0
    },
    backPath: {
      type: String,
      default: () => 'buffetPage'
    },
    attendNumber: {
      type: Number,
      default: () => 0
    },
    total: [Number],
    pageSize: [Number],
    currentPage: [Number]
  },

  data () {
    return {
      fullscreen: true,
      page: 1,
      detialData: {},
      isShow: false,
      propShow: '',
      serviceStation: '服务站',
      canteenlevelStr: '街级,社区级',
    }
  },

  created () {},

  methods: {
    handleClick (scope) {
      console.log(scope);
      this.$emit('update:dialogVisible', true)
      this.$emit('update:checkData', scope.row)
      this.detialData = scope.row
      this.propShow = scope.column.property
      this.isShow = true
    },
    handleDetial (scope) {
      console.log(scope)
      this.GotoPage('/AgedDetial', {
        canteenNumber: scope.row.canteenNumbera, serviceDate: JSON.stringify(this.serviceDate), attendanceRate: this.attendanceRate, merchantName: scope.row.merchantName, attendNumber: this.attendNumber})
    },
    handleIDCardDetial (scope) {
      this.GotoPage('/ServiceOlder', { code: 120103000000, key: 4, header: '河西区居家养老服务管理平台', idCard: scope.row.idcard, ...this.serviceDate })
    },
    handleChangePage (page) {
      this.page = page
      this.$emit('getSearchValue', page)
    },
    GotoPage (path, query) {
      if (path) {
        this.$router.push({
          path: path,
          query: query
        })
      
      }
    },
    // 点击不同表格 跳转不同页面
    handelCell (row, column) {
      console.log(row, column)
      switch (column.property) {
        case 'payOrderNoTotal':
          this.GotoPage('/ServiceOlder', { code: this.code, idCard: row.idcardNumber })
          break
        case 'canteenNumtotal':
          // this.GotoPage('/ServiceCarrier', { code: this.code, companyName: row.companyName, canteenlevel: JSON.stringify(['街级', '社区']) })
          this.GotoPage('/ServiceCarrier', { code: this.code, companyName: row.companyName, canteenlevel: this.canteenlevelStr })
          break
        case 'orderNum':
          this.GotoPage('/ServiceOlder', { code: this.code, merchantName: row.merchantName })
          break
        case 'servicePointNum':
          // this.GotoPage('/ServiceCarrier', { code: this.code, companyName: row.companyName, canteenlevel: JSON.stringify(['服务点']) })
          this.GotoPage('/ServiceCarrier', { code: this.code, companyName: row.companyName, canteenlevel: this.serviceStation })
          break
        case 'payOrderNo': // 2021年12月21日 需求 去掉 点击支付订单号弹窗 刚开始没有找到逻辑函数在那 就把 ServiceOlder 结构中绑定的 dialogVisible 去掉了 但是感觉不对 还是在这个中修改吧
          this.$emit('update:dialogVisible', false)
      }
    }
  }
}
</script>

<style>
.older_box {
  width: 100%;
  height: 100%;
  background: url("~@/views/ProvideSubsidy/assets/older-page_bg.png") no-repeat;
  background-size: cover;
  overflow: auto;
}
.header-title {
  width: 6rem;
  padding-left: 0.3rem;
}
.search_head {
  padding: 0 0.5rem;
  /* padding-left: 1rem; */
  /* margin-top: 0.2rem; */
  margin-bottom: 0.1rem;
}
.tit{
 color: #ffffff;
 margin-top: .2rem;
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
.el-input__inner {
  padding: 0 10px;
}
.Look_btn{
  color: #409EFF;
}
.search_select,
.order_Number {
  /* border: 2px solid #7dbaf9;
  box-shadow: 0px 0px 0.08rem 0.04rem rgba(39, 145, 248, 0.5);
  border-radius: 4px; */
  margin: 0.1rem 0.3rem;
  color: #a5dcff;
  /* width: 3.5rem; */
}
.el-input.is-disabled .el-input__inner{
  background: transparent;
  border-color: #043a6f;
  color: #7c7d80;
}
.el-input--prefix .el-input__inner{
  padding-left: .2rem;
}
.search_select .el-form-item__label,
.order_Number .el-form-item__label {
  font-size: 0.15rem;
  color: #2c799a;
  width: 1.35rem;
  float: left;
}
.search_time {
  width: 5.2rem !important;
}
.search_time .el-form-item__content {
  width: 3.7rem;
}
.el-form-item__content {
  float: left;
  width: 2.2rem;
}
.order_Number .el-input__inner {
  border: 0;
  padding-right: 0;
}
.order_Number .el-form-item__content {
  border: 0.01rem solid #043a6f;
  display: flex;
  width: 2.1rem;
  border-radius: 0.05rem;
}
.order_Number .el-form-item__content span {
  color: #303133;
}
.el-form-item__content .order_item {
  width: 49%;
}
.el-form--inline {
  /* float: left; */
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-left: 5px;
}
.el-form-item {
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
.btns_right {
  float: right;
  height: 0.5rem;
}
.btns_box .btn {
  /* padding:0.15rem 0.5rem; */
  width: 1.3rem;
  height: 0.4rem;
  /* line-height: .4rem; */
  background: url("~@/assets/img/oldMan_tab.png") no-repeat;
  background-size: 100% 100%;
  text-align: center;
  border: 0;
  color: #4fd0ff;
  margin-right: 0.1rem;
  /* margin-top: 2rem; */
  float: left;
  font-size: 0.14rem;
}
.btns_box .btn:focus,
.btns_box .btn:hover {
  color: #16fff1;
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
  border: 0.01rem solid #043a6f;
  color: #56a4f7;
  max-width: 2.15rem;
}
.el-range-editor.el-input__inner {
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
  padding-bottom: .5rem;
  position: relative;
}

.el-table th.gutter {
  width: 0 !important;
  display: block !important;
}
.el-table {
  color: #a5dcff;
  background: transparent;
  border: 1px solid #80b5ff;
}
.el-table--border th, .el-table__fixed-right-patch{
  border-bottom: 1px dotted #80b5ff;
  border-right: 1px dotted #80b5ff;
}
.el-table::before {
  height: 0;
}
.el-table th, .el-table tr{
  background: transparent !important;
}
.el-table thead {
  color: #05e6ff;
  background-color: rgba(3, 59, 107, 0.8);
}
/* .el-table thead, */
.el-table thead tr th {
  width: 100% !important;
}
.el-table th,
.el-table tr {
  background-color: transparent;
  padding: 0.08rem !important;
}
.el-table__row {
  cursor: pointer;
}
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: rgba(255, 255, 255, 0);
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(255, 255, 255, 0);
}
.el-table td,
.el-table th {
  padding: 0.1rem 0 !important;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px dotted #80b5ff;
  border-right: 1px dotted #80b5ff;
}
.el-table th.gutte {
  width: 0 !important;
}
.el-table tr {
  border-bottom: 1px dotted #80b5ff;
  /* border-right: 1px dotted #80B5FF; */
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
  color: #4fd0ff;
  line-height: 0.34rem;
  margin-right: 0.15rem;
  margin-left: 0.15rem;
}
.table_page .big{
  font-size: .2rem;
  font-weight: 500;
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background-color: transparent;
  color: #4fd0ff;
  border: 1px solid #4fd0ff;
  padding: 0 0.1rem;
}
.el-pagination__jump {
  color: #4fd0ff;
}
.el-pagination.is-background .btn-next.disabled,
.el-pagination.is-background .btn-next:disabled,
.el-pagination.is-background .btn-prev.disabled,
.el-pagination.is-background .btn-prev:disabled,
.el-pagination.is-background .el-pager li.disabled {
  color: #4fd0ff;
}
.el-select .el-input .el-select__caret,
.el-cascader .el-input .el-icon-arrow-down {
  color: #409eff;
}
.el-cascader-node.is-selectable.in-active-path {
  color: #4fd0ff;
}
.el-pager li:not(.disabled).active {
  background-color: #4fd0ff !important;
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
.el-form-item__content .el-date-editor .el-range-input {
  background: transparent !important;
  font-size: 0.16rem;
  color: #416fc4 !important;
  width: 98%;
}
.el-form-item__content .el-date-editor .el-range-separator {
  width: 2%;
}
.el-select .el-input .el-select__caret {
  font-size: 0.18rem;
}
.el-form-item__content
  .el-date-editor
  .el-range-input::-webkit-input-placeholder {
  color: #416fc4;
}
.el-form-item__content .el-date-editor i {
  color: #416fc4;
}
.el-form-item__content .el-date-editor .el-icon-date {
  display: none;
}

/* 
  7月21 add with modified 居家养老服务情况汇总统计表(日均) and
  居家养老服务情况汇总统计表的 的 el-autocomplete css style
*/
.el-autocomplete-suggestion{
  background-color: #032995;
  border: none;
}
.el-autocomplete-suggestion__list>li{
  color: #7dc0e4;
}
.el-autocomplete-suggestion__list>li:hover{
  background-color: #0148cb;
}

.el-tooltip__popper {
  max-width: 400px;
}
</style>
