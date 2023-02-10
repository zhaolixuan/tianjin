<template>
  <div class="older_box">
    <vue-scroll :ops="ops">
      <div class="nav_btn"
           @click="openDialog"></div>
      <el-dialog :fullscreen="fullscreen"
                 :visible.sync="$store.state.navDialogVisible">
        <Navigation></Navigation>
      </el-dialog>
      <!-- <Header></Header> -->
      <page-header></page-header>
      <bread-crumb :crumbData="crumbData"></bread-crumb>
      <div class="search_head">
        <div class="head_box">
          <el-form :inline="true"
                   :model="formData">
            <el-form-item label="姓名"
                          class="search_select">
              <el-input placeholder="请输入姓名"
                        clearable
                        v-model="formData.name"
                        @change="handleChangeName" />
            </el-form-item>
            <el-form-item label="性别"
                          class="search_select">
              <el-select v-model="formData.sex"
                         clearable
                         placeholder="请选择性别">
                <el-option label="男性"
                           value="1"></el-option>
                <el-option label="女性"
                           value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生年月"
                          class="search_select">
              <el-date-picker v-model="formData.birthday"
                              type="month"
                              value-format="yyyy-MM"
                              placeholder="选择出生年月"></el-date-picker>
            </el-form-item>
            <el-form-item label="补贴类别"
                          class="search_select">
              <el-select v-model="formData.allowanceType"
                         clearable
                         placeholder="请选择补贴类别">
                <el-option v-for="(item, index) in allowanceTypeList"
                           :key="index"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="补贴类型"
                          class="search_select">
              <el-select v-model="formData.allowanceCategory"
                         clearable
                         placeholder="请选择补贴类型">
                <el-option label="百岁老人营养补贴"
                           value="百岁老人营养补贴"></el-option>
                <el-option label="居家养老护理补贴"
                           value="居家养老护理补贴"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发放状态"
                          class="search_select">
              <el-select v-model="formData.status"
                         clearable
                         placeholder="请选择发放状态">
                <el-option label="正常"
                           value="正常"></el-option>
                <el-option label="停发"
                           value="停发"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="补贴标准"
                          class="search_select">
              <el-select v-model="formData.allowanceProd"
                         clearable
                         placeholder="请选择补贴标准">
                <el-option label="200"
                           value="1"></el-option>
                <el-option label="400"
                           value="2"></el-option>
                <el-option label="600"
                           value="3"></el-option>
                <el-option label="2000"
                           value="4"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="补贴政策"
                          class="search_select">
               <el-select v-model="formData.allowancePolicy"
                         clearable
                         placeholder="请选择补贴政策"
                         multiple>
                <el-option label="区级政策"
                           value="1"></el-option>
                <el-option label="市级政策"
                           value="2"></el-option>
                <el-option label="市区两级政策"
                           value="3"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="地区筛选"
                          class="search_select">
              <el-cascader placeholder="选择地区"
                           v-model="selectedLocation"
                           :options="locationOptions"
                           @change="handleChangeLocation"
                           :show-all-levels="false"
                           change-on-select
                           filterable
                           clearable
                           :props="locationProps"></el-cascader>
            </el-form-item>
          </el-form>
          <div class="btns_box">
            <el-button @click="clearSearchValue"
                       class="btn">重置</el-button>
            <el-button icon="el-icon-search"
                       @click="getSearchValue"
                       class="btn">查询</el-button>
          </div>
        </div>
      </div>
      <div class="table_box">
        <el-table :data="tableData"
                  stripe
                  @row-click="handleClickRow">
          <el-table-column v-for="(item, index) in columns"
                           :key="index"
                           align="center"
                           :show-overflow-tooltip="true"
                           :prop="item.prop"
                           :label="item.label"
                           :width="item.width"></el-table-column>
        </el-table>
        <div class="table_page">
          <span class="total_num">共计 {{ total }} 人</span>
          <el-pagination background
                         layout="prev, pager, next"
                         @current-change="handleChangePage"
                         :current-page="currentPage"
                         :page-size="pageSize"
                         :total="total"></el-pagination>
        </div>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
import api from '@/api/api'
import Header from '@/components/Header/index'
import PageHeader from '../ProvideAged/components/PageHeader/index.vue'
import BreadCrumb from '@/components/BreadCrumb/index'
import Navigation from '@/components/Navigation/index'

export default {
  data() {
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {
          scrollingX: false,
        },
        rail: {},
        bar: {
          background: '#eee',
        },
      },
      crumbData: [
        {
          title: '老年人补贴',
          url: '',
        },
      ],
      allowanceTypeList: [
        { label: '80岁困难', value: '1' },
        { label: '低保', value: '2' },
        { label: '低收入', value: '3' },
        { label: '优抚', value: '4' },
        { label: '农村籍士兵', value: '5' },
        { label: '退养主任', value: '6' },
        { label: '在职烈属', value: '7' },
        { label: '百岁老人营养补贴', value: '8' },
      ],
      fullscreen: true,
      // 填充表格列的数组
      columns: [
        // {
        //   prop: "condition",
        //   label: "所属片区"
        // },
        {
          prop: "streetName",
          label: "街道"
        },
        {
          prop: 'communityName',
          label: '社区',
        },
        {
          prop: 'name',
          label: '姓名',
        },
        {
          prop: 'sex',
          label: '性别',
        },
        {
          prop: 'birthday',
          label: '出生年月',
        },
        {
          prop: 'idcardNumber',
          label: '身份证号',
        },
        // {
        //   prop: "homeAddress",
        //   label: "户籍地址"
        // },
        {
          prop: 'liveStation',
          label: '居住地址',
        },
        {
          prop: 'allowanceType',
          label: '补贴类别',
        },
        {
          prop: 'allowanceCategory',
          label: '补贴类型',
        },

        {
          prop: 'allowanceProd',
          label: '补贴标准',
        },
        //    {
        //       prop: 'allowancePolicy',
        //       label: '补贴政策',
        //     },
        {
          prop: 'phone',
          label: '电话',
        },
        {
          prop: 'status',
          label: '发放状态',
        },
      ],
      tableData: [],
      selectedLocation:
        this.$route.query.code && typeof this.$route.query.code !== 'string'
          ? this.$route.query.code.slice(1)
          : [], // 地区级联选中内容
      locationOptions: [], // 地区级联选择数据
      locationProps: {
        value: 'code',
        label: 'name',
        children: 'childs',
      },
      formData: {
        liveStation: null, // 居住地
        name: null, // 姓名
        sex: null, // 性别
        birthday: null, // 出生年月
        allowanceType: this.$route.query.allowanceType || null, // 补贴类型
        allowanceCategory: this.$route.query.allowanceCategory || null,
        status: this.$route.query.allowanceCategory ? '正常' : '',
        allowanceProd: null, // 补贴标准
        // allowancePolicy: [], // 补贴政策
        // allowancePolicy: ['1', this.$route.query.allowancePolicy || null], // 补贴政策
        zoneCode:
          this.$route.query.code && typeof this.$route.query.code !== 'string'
            ? this.$route.query.code[1] || ''
            : null,
        streetCode:
          this.$route.query.code && typeof this.$route.query.code !== 'string'
            ? this.$route.query.code[2] || ''
            : null,
        communityCode:
          this.$route.query.code && typeof this.$route.query.code !== 'string'
            ? this.$route.query.code[3] || ''
            : null,
      },
      pageSize: 10, // 每页数量
      currentPage: 1, // 当前页数
      total: 0, // 总条数
      defaultAllowancePolicy: {
        1: '区级政策',
        2: '市级政策',
        3: '市区两级政策',
      },
    }
  },

  created() {
    this.$store.commit('setActiveName', '老年人补贴')
    this.$store.dispatch('getUserAuthInfo').then(() => {
      this.getLocation()
      this.getOlderSubsidy()
    })

    // let allowancePolicy = this.$route.query.allowancePolicy
    //   ? Array.from(
    //       new Set(["1", "2", ...this.$route.query.allowancePolicy.split(",")])
    //     )
    //   : ["1", "2"]; // 否则是 区级政策,市级政策

    // let allowancePolicy = this.$route.query.allowancePolicy
    //   ? Array.from(
    //       new Set(['1', '2', ...this.$route.query.allowancePolicy.split(',')])
    //     )
    //   : ['3'] // 否则是 市区两级政策
    // this.formData.allowancePolicy = allowancePolicy

    // if (this.$route.query.allowancePolicy.split(',').length >= 2) {
    //   var arr = this.$route.query.allowancePolicy.split(',')
    //   if (arr.includes('1') && !arr.includes('2')) {
    //     arr.push('2')
    //     console.log(arr)
    //   }
    // }
  },

  methods: {
    handleChangeName(value) {
      this.formData.name = value
    },

    handleChangeLocation(value) {
      if (this.$store.state.userType === '3') {
        this.formData.streetCode = value[0] || null
        this.formData.communityCode = value[1] || null
      } else if (this.$store.state.userType === '4') {
        this.formData.communityCode = value[0] || null
      } else {
        this.formData.zoneCode = value[0]
        this.formData.streetCode = value[1] || null
        this.formData.communityCode = value[2] || null
      }
    },

    getLocation() {
      // 由于组件功能限制，片区级联选择器采用查询全量地区数据后前端处理的方式
      api
        .getLocationList()
        .then((res) => {
          let data = res.data
          let code = this.$store.state.code[0] || ''
          if (data && data.length > 0) {
            let allLocalList = data.filter((item) => {
              return item.name === '河西区'
            })[0].childs
            let localListByCode = code
              ? this.getLocalListByCode(allLocalList, code)
              : []
            this.locationOptions =
              localListByCode.length > 0 ? localListByCode : allLocalList
          }
        })
        .catch(() => {
          console.log('查询片区数据失败')
        })
    },

    // 根据code筛选层级数据
    getLocalListByCode(localList, code) {
      let list = []
      function loopFilter(loopList) {
        let newList = []
        if (loopList) {
          newList = loopList.filter((item) => {
            if (item.code === code) {
              return true
            } else {
              if (item.childs && item.childs.length > 0) {
                loopFilter(item.childs)
              } else {
                return false
              }
            }
          })
          if (newList.length > 0) {
            list = newList
            return false
          }
        }
      }
      loopFilter(localList)
      return list
    },

    getOlderSubsidy() {
      let zoneDefaultCode =
        this.$store.state.userType === '2' ? this.$store.state.code[0] : ''
      let streetDefaultCode =
        this.$store.state.userType === '3' ? this.$store.state.code[0] : ''
      let communityDefaultCode =
        this.$store.state.userType === '4' ? this.$store.state.code[0] : ''

      var params = {
        name: this.formData.name || '',
        sex: this.formData.sex || '',
        birthday: this.formData.birthday || '',
        allowanceType: this.formData.allowanceType || '',
        allowanceCategory: this.formData.allowanceCategory || '',
        status: this.formData.status || '',

        allowanceProd: this.formData.allowanceProd || '',
        // allowancePolicy: '',
        zoneCode: this.formData.zoneCode || zoneDefaultCode,
        streetCode: this.formData.streetCode || streetDefaultCode,
        communityCode: this.formData.communityCode || communityDefaultCode,
        page: this.currentPage,
        pageSize: this.pageSize,
      }
      //   if (
      //     this.formData.allowancePolicy &&
      //     this.formData.allowancePolicy.length > 0
      //   ) {
      //     params.allowancePolicy = this.formData.allowancePolicy
      //       .map((item) => {
      //         return this.defaultAllowancePolicy[item]
      //       })
      //       .join(',')
      //   }
      // console.log(params.allowancePolicy);
      api
        .getOlderSubsidy(params)
        .then((res) => {
          var data = res.obj
          this.tableData = data.records
          this.currentPage = data.current
          this.pageSize = data.size
          this.total = data.total
        })
        .catch(() => {
          console.log('查询老年人补贴列表数据失败')
        })
    },

    openDialog() {
      this.$store.commit('setNavDialogVisible', true)
    },

    getSearchValue() {
      this.currentPage = 1
      this.getOlderSubsidy()
    },

    clearSearchValue() {
      this.formData = {
        liveStation: null, // 居住地
        name: null, // 姓名
        sex: null, // 性别
        birthday: null, // 出生年月
        allowanceType: null, // 补贴类型
        allowanceProd: null, // 补贴标准
        // allowancePolicy: null, // 补贴政策
        zoneCode: null,
        streetCode: null,
        communityCode: null,
      }
      this.selectedLocation = []
    },

    handleChangePage(page) {
      this.currentPage = page
      this.getOlderSubsidy()
    },

    handleClickRow(row) {
      return false
      this.$router.push({
        path: '/olderPicture',
        query: { idCard: row.idcardNumber },
      })

    },
  },

  components: {
    Header,
    PageHeader,
    BreadCrumb,
    Navigation,
  },
}
</script>

<style>
.older_box {
  width: 100%;
  height: 100%;
  background: url('../../assets/img/big_project_bg.gif') 50% 100% no-repeat;
  background-size: cover;
}
.search_head {
  padding: 0 1rem;
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
  width: 85%;
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
  color: #a5dcff;
  width: 1rem;
  float: left;
}
.search_select .el-form-item__content,
.el-form--inline .el-form-item {
  float: left;
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
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  overflow: hidden;
}
.btns_box .btn {
  width: 1.2rem;
  background-color: #0e3a8d;
  border: 0;
  color: #87b7eb;
  margin-right: 0.1rem;
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
  background-color: transparent;
  border: 0;
  border-bottom: 0.01rem solid #043a6f;
  color: #56a4f7;
  max-width: 2.15rem;
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
  font-size: 0.22rem;
  font-weight: bold;
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
.el-select-dropdown,
.el-picker-panel,
.el-cascader__dropdown {
  background-color: #032995;
  border: 0;
}
.el-popper[x-placement^='bottom'] .popper__arrow,
.el-popper[x-placement^='bottom'] .popper__arrow::after {
  border-bottom-color: #032995;
}
.el-date-picker__header--bordered {
  border-bottom: 1px solid #436fd2;
}
.el-select-dropdown__item,
.el-date-picker__header-label,
.el-month-table td .cell,
.el-year-table td .cell,
.el-picker-panel__icon-btn {
  color: #8fc0f3;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  background-color: #032995;
  color: #409eff;
  font-weight: 700;
}
.el-cascader-menu {
  color: #436fd2;
  border-right: 1px solid #436fd2;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover,
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover,
.el-cascader-node:not(.is-disabled):focus,
.el-cascader-node:not(.is-disabled):hover {
  background-color: #0148cb;
  color: #8fc0f3;
}
.el-cascader-node.is-selectable.in-active-path {
  color: #409eff;
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
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 200px;
}
</style>
