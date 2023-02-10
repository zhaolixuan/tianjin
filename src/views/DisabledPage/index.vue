<template>
  <div class="older_box">
    <vue-scroll :ops="ops">
      <div class="nav_btn" @click="openDialog"></div>
      <el-dialog :fullscreen="fullscreen" :visible.sync="$store.state.navDialogVisible">
        <Navigation></Navigation>
      </el-dialog>
      <page-header></page-header>
      <bread-crumb :crumbData="crumbData"></bread-crumb>
      <div class="search_head">
        <div class="head_box">
          <el-form :inline="true" :model="formData">
            <el-form-item label="姓名" class="search_select">
              <el-input
                class="head_left"
                placeholder="请输入姓名"
                v-model.trim="formData.name"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" class="search_select">
              <el-input
                class="head_left"
                placeholder="请输入身份证号码"
                v-model.trim="formData.idcardNumber"
                clearable
                @keyup.enter.native="handleGetSearchValue"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别" class="search_select">
              <el-select v-model="formData.sex" clearable placeholder="请选择性别">
                <el-option label="男性" value="男"></el-option>
                <el-option label="女性" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="户口性质" class="search_select">
              <el-select v-model="formData.disabledAccount" clearable placeholder="请选择户口性质">
                <el-option
                  v-for="(option,index) in residenceList"
                  :key="index"
                  :label="option"
                  :value="option"
                  @change="handleServiceClass"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生年月" class="search_select seach_date">
              <el-date-picker
                v-model="formData.birthday"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                clearable
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="残疾人证号" class="search_select">
              <el-input
                class="head_left"
                placeholder="请输入残疾人证号"
                v-model.trim="formData.disabledNo"
                clearable
                @keyup.enter.native="handleGetSearchValue"
              ></el-input>
            </el-form-item>
            <el-form-item label="残疾类别" class="search_select">
              <el-select v-model="formData.disabledType" clearable placeholder="请选择残疾类别">
                <el-option
                  v-for="(option,index) in disabledList"
                  :key="index"
                  :label="option"
                  :value="option"
                  @change="handleServiceClass"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="残疾等级" class="search_select">
              <el-select v-model="formData.disabledLevel" clearable placeholder="请选择残疾等级">
                <el-option
                  v-for="(option,index) in LevelList"
                  :key="index"
                  :label="option"
                  :value="option"
                  @change="handleServiceClass"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="残疾类别等级说明" class="search_select">
              <el-input
                class="head_left"
                placeholder="请输入残疾类别说明"
                v-model.trim="formData.disabledExplain"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="联系人姓名" class="search_select">
              <el-input
                class="head_left"
                placeholder="请输入联系人姓名"
                v-model.trim="formData.emergencyPerson"
                clearable
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="btns_box">
            <div class="btns_right">
              <el-button @click="clearSearchValue" class="btn">重置</el-button>
              <el-button
                icon="el-icon-search"
                class="btn"
                :loading="getDataLoading"
                @click="handleGetSearchValue"
              >查询</el-button>
              <a :href="downloadExcel" target="_blank">
                <el-button class="btn">导出</el-button>
              </a>
            </div>
          </div>
        </div>
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
        <div class="table_page">
          <span class="total_num">共计 {{total}} 人</span>
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
import api from '@/api/api'
import Header from '@/components/Header/index'
import { mapGetters } from 'vuex'
import PageHeader from '../ProvideAged/components/PageHeader/index.vue'
import BreadCrumb from '@/components/BreadCrumb/index'
import Navigation from '@/components/Navigation/index'
export default {
  data () {
    return {
      getDataLoading: false,
      ops: {
        vuescroll: {},
        scrollPanel: {
          scrollingX: false
        },
        rail: {},
        bar: {
          background: '#eee'
        }
      },
      crumbData: [
        {
          title: '残疾',
          url: ''
        }
      ],
      fullscreen: true,
      searchValue: '',
      columns: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'idcardNumber',
          label: '公民身份证'
        },
        {
          prop: 'sex',
          label: '性别'
        },
        {
          prop: 'birthday',
          label: '出生日期'
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'disabledAccount',
          label: '户口性质'
        },
        {
          prop: 'disabledNo',
          label: '残疾人证号'
        },
        {
          prop: 'disabledType',
          label: '残疾类别'
        },
        {
          prop: 'disabledLevel',
          label: '残疾等级'
        },
        {
          prop: 'disabledExplain',
          label: '残疾类别等级说明'
        },
        {
          prop: 'disabledStatuse',
          label: '持证状态'
        },
        {
          prop: 'disabledPhone',
          label: '固定电话'
        },
        {
          prop: 'disabledMobile',
          label: '移动电话'
        },
        {
          prop: 'disabledState',
          label: '所在地区'
        },
        {
          prop: 'disabledAccountAddress',
          label: '户籍地址'
        },
        {
          prop: 'disabledAddress',
          label: '现住址'
        },
        {
          prop: 'emergencyPerson',
          label: '联系人姓名'
        },
        {
          prop: 'disabledReleation',
          label: '伴随关系'
        },
        {
          prop: 'emergencyPhone',
          label: '联系人固定电话'
        },
        {
          prop: 'emergencyMobile',
          label: '联系人移动电话'
        }
      ],
      tableData: [],
      residenceList: ['农业户口', '非农业户口'],
      disabledList: ['多重', '精神', '视力', '听力', '言语', '肢体', '智力'],
      LevelList: ['一级', '二级', '三级', '四级'],
      selectedLocation:
        this.$route.query.code && typeof this.$route.query.code !== 'string'
          ? this.$route.query.code.slice(1)
          : [], // 地区级联选中内容
      locationOptions: [], // 地区级联选择数据
      locationProps: {
        value: 'code',
        label: 'name',
        children: 'childs'
      },
      formData: {
        name: '',
        idcardNumber: '',
        sex: '',
        disabledAccount: '', // 户口性质
        birthday: '', // 出生年月
        disabledNo: '', // 残疾证号
        disabledType: '', // 残疾类别
        disabledLevel: '', // 残疾等级
        disabledExplain: '', // 残疾等级说明
        emergencyPerson: '', // 联系人姓名
        streetCode: this.initCodeFromQuery(2),
        zoneCode: this.initCodeFromQuery(1),
        communityCode: this.initCodeFromQuery(3)
      },
      pageSize: 10, // 每页数量
      currentPage: 1, // 当前页数
      total: 0 // 总条数
    }
  },
  computed: {
    ...mapGetters(['userType', 'code']),
    userAuthCodeParams () {
      let params = {
        streetCode: '',
        zoneCode: '',
        communityCode: ''
      }
      let urlCodeParams = {}
      if (this.userType === 2) {
        urlCodeParams = { zoneCode: this.initCodeFromQuery(1) }
      }
      if (this.userType === 3) {
        urlCodeParams = { streetCode: this.initCodeFromQuery(2) }
      }
      if (this.userType === 4) {
        urlCodeParams = { communityCode: this.initCodeFromQuery(3) }
      }

      return Object.assign({}, params, urlCodeParams)
    },
    downloadExcel () {
      const Api =
      // 'http://tianjin.aioc.dev.xjoycity.com:8204'
        process.env.NODE_ENV === 'development'
          ? 'http://tj-yanglao-test.xjoycity.com'
          : ''
      let data = `${Api}/yanglao-api/baseDisabledPerson/downloadExcel?`
      const formData = Object.assign({}, this.requestParams(), {
        page: '',
        pageSize: ''
      })
      let keys = Object.keys(formData)

      keys.forEach((item, index) => {
        data += formData[item] ? `${item}=${formData[item]}&` : ''
      })
      return data.slice(0, -1)
    }
  },
  created () {
    this.$store.commit('setActiveName', this.$route.query.label)
    this.$store
      .dispatch('getUserAuthInfo')
      .then(() => {
        this.getLocation()
        this.handleGetSearchValue()
      })
      .catch(err => {
        console.log('获取用户权限失败', err)
      })
  },
  methods: {
    initCodeFromQuery (codeIndex) {
      return this.$route.query.code &&
        typeof this.$route.query.code !== 'string'
        ? this.$route.query.code[codeIndex] || ''
        : ''
    },
    requestParams (page) {
      var params = {}

      const codeParams =
        this.selectedLocation.length > 0
          ? Object.create(null)
          : this.userAuthCodeParams
      params = Object.assign(
        {},
        this.formData,
        {
          page: typeof this.currentPage === 'number' ? this.currentPage : 1,
          pageSize: this.pageSize
        },
        codeParams
      )
      return params
    },
    handleGetSearchValue (page) {
      this.isSearchLoading = true
      api
        .getDisabledInfo(this.requestParams(page))
        .then(res => {
          this.isSearchLoading = false
          const { records, total, size, current } = res && res.obj
          this.tableData = records
          this.pageSize = size
          this.currentPage = current
          this.total = total
        })
        .catch(() => {
          this.isSearchLoading = false
        })
    },
    handleChangeLocation (value) {
      if (this.userType === '3') {
        this.formData.streetCode = value[0] || ''
        this.formData.communityCode = value[1] || ''
      } else if (this.userType === '4') {
        this.formData.communityCode = value[0] || ''
      } else {
        this.formData.zoneCode = value[0] || ''
        this.formData.streetCode = value[1] || ''
        this.formData.communityCode = value[2] || ''
      }
    },
    getLocation () {
      // 由于组件功能限制，片区级联选择器采用查询全量地区数据后前端处理的方式
      api
        .getLocationList()
        .then(res => {
          let data = res.data
          let code = this.$store.state.code[0] || ''
          if (data && data.length > 0) {
            let allLocalList = data.filter(item => {
              return item.name === '河西区'
            })[0].childs
            let localListByCode = code
              ? this.getLocalListByCode(allLocalList, code)
              : []
            this.locationOptions =
              localListByCode.length > 0 ? localListByCode : allLocalList
          }
        })
        .catch(err => {
          console.log('查询片区数据失败', err)
        })
    },
    // 根据code筛选层级数据
    getLocalListByCode (localList, code) {
      let list = []
      function loopFilter (loopList) {
        let newList = []
        if (loopList) {
          newList = loopList.filter(item => {
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
    openDialog () {
      this.$store.commit('setNavDialogVisible', true)
    },
    handleServiceClass () {
      // this.currentPage = 1
      this.getOlderData()
    },
    handleChangePage (page) {
      this.currentPage = page
      this.handleGetSearchValue()
    },
    clearSearchValue () {
      this.formData = Object.assign({}, this.formData, {
        userName: '',
        phone: '',
        serviceOrderCard: '',
        orderPerson: '',
        orderCreateTimeBegin: '',
        orderCreateTimeEnd: '',
        serviceCategory: '',
        serviceOrderItem: '',
        zoneCode: '',
        streetCode: '',
        communityCode: ''
      })
      this.searchService = ''
      this.selectedLocation = []
      this.time = null
    }
  },
  components: {
    Header,
    PageHeader,
    BreadCrumb,
    Navigation
  }
}
</script>

<style>
.older_box {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/big_project_bg.gif") 50% 100% no-repeat;
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
  width: 1.8rem;
  float: left;
}
.el-form-item__content {
  float: left;
}
.el-input__prefix {
  display: none !important;
}
.el-form--inline {
  /* float: left; */
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-left: 5px;
}
.el-form-item {
  width: 4.7rem;
  margin-left: 5px;
}
.input_num {
  width: 1rem;
}
.seach_date .el-form-item__content {
  width: 2.6rem;
}
.seach_date .el-input--prefix .el-input__inner {
  padding-left: 0.13rem;
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
}
.btns_box .btn {
  padding: 0.15rem 0.5rem;
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
  background-color: transparent;
  font-size: 0.17rem;
  border: 0;
  border-bottom: 0.01rem solid #043a6f;
  color: #56a4f7;
  max-width: 100%;
  padding-left: 0.13rem;
  padding-right: 0;
}
.el-select .el-input .el-select__caret {
  font-size: 0.18rem;
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
</style>
