<template>
  <div class="industrybg" v-loading="loading" element-loading-text="数据加载中"
       element-loading-background="rgba(0, 0, 0, 0.5)">
    <div class="top">
      <div class="left">
        <h-tab :activeIndex="activeTabIndex" :tabList="tabList" @onClick="tabClick"></h-tab>
      </div>
      <div class="right">
        <div class="select">
          <span>筛选类别：</span>
          <el-select v-model="selectvalue" filterable placeholder="请选择" @change="selectType" :clearable="true">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="search">
          <el-input
            placeholder="请输入内容"
            @focus="searchFocus"
            @blur="searchBlur"
            @keyup.enter.native="inputChange"
            v-model.trim="searchValue"
            clearable
            @clear="cancelRadio"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search" @click="inputChange"></el-button>
          </el-input>
          <el-collapse-transition>
            <ul v-if="searchList.length > 0">
              <li v-for="(items, index) of searchList" :key="index" @click="searchItemClick(items.originalName)">{{
                items.originalName }}
              </li>
            </ul>
          </el-collapse-transition>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="table">
        <el-table :data="tableListData" style="width: 100%" @row-click="didClickCell"
                  :header-cell-style="{ background: 'rgba(3, 130, 248, 0.1)', color: '#ffffff' }">
          <el-table-column prop="entName" label="企业名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="industryPhyName" label="所属行业" show-overflow-tooltip
                           :formatter="formatterStr"></el-table-column>
          <el-table-column prop="dom" label="注册地" show-overflow-tooltip :formatter="formatterStr"></el-table-column>
          <el-table-column prop="phoneNumber" label="电话" show-overflow-tooltip
                           :formatter="formatterStr"></el-table-column>
          <el-table-column prop="email" label="邮箱" show-overflow-tooltip :formatter="formatterStr"></el-table-column>
          <el-table-column prop="regCap" label="注册资本" show-overflow-tooltip :formatter="formatterStr"></el-table-column>
          <el-table-column prop="esDate" label="成立日期" show-overflow-tooltip :formatter="formatterStr"></el-table-column>
          <el-table-column prop="param1" label="评分" show-overflow-tooltip :formatter="formatterStr"></el-table-column>
          <el-table-column prop="opScope" label="企业简介" show-overflow-tooltip
                           :formatter="formatterStr"></el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currPageNo"
          :page-size="paginationData.pageSize"
          layout="total, prev, pager, next"
          :total="paginationData.numberRecords"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
import HTab from './Tab.vue'
export default {
  data () {
    return {
      tabList: [],
      parentId: '',
      activeName: '',
      tableListData: [], // 服务器获得的表格数据
      paginationData: {}, // 服务器获得的分页数据
      activeTabIndex: 0, // tab 当前显示（可以直接设定tab，索引从 0 开始）
      searchValue: '', // 搜索
      searchList: [], // 搜索列表,
      currPageNo: 1, // 分页的当前页
      options: [], // 下拉框
      selectvalue: '', // 下拉框选中的值
      loading: true,
      flag: 0
    }
  },
  created () {
    if (this.$route.query.activeTabIndex >= 0 && !this.$route.query.childName) {
      this.activeTabIndex = Number(this.$route.query.activeTabIndex)
      this.selectvalue = this.$route.query.selectType
      this.searchValue = this.$route.query.inputValue
      this.parentId = Number(this.$route.query.parentId)
      this.currPageNo = Number(this.$route.query.currPageNo)
      this.flag = Number(this.$route.query.flag)
    }
    if (this.$route.query.parentId && this.$route.query.childName) {
      this.parentId = this.$route.query.parentId
      this.selectvalue = this.$route.query.childName
      this.activeTabIndex = this.parentId - 1
    }
    this.queryEnumList()
  },
  methods: {
    // 获取页面静态资源
    queryEnumList () {
      api
        .getProductTypeList()
        .then(res => {
          this.tabList = res.obj
          this.activeName = this.tabList[this.activeTabIndex].industryName
          if (this.parentId) {
            this.getTypeListData(this.parentId)
          } else {
            this.getTypeListData(1)
          }
          this.loadListData()
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 获取下拉列表数据
    getTypeListData (id) {
      let req = {
        id: id
      }
      api
        .getPicList(req)
        .then(res => {
          let pic = res.obj
          let obj = {}
          for (let i = 0; i < pic.length; i++) {
            let detial = pic[i].industryDirections
            for (let j = 0; j < detial.length; j++) {
              let picList = {}
              if (!obj[detial[j].name]) {
                obj[detial[j].name] = detial[j].name
                picList.value = detial[j].name
                picList.label = detial[j].name
                picList.code = detial[j].id
                this.options.push(picList)
              }
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 选中下拉列表
    selectType () {
      this.currPageNo = 1
      this.loading = true
      this.setParams()
      this.loadListData()
    },
    formatterStr (row, column, cellValue, index) {
      if (cellValue && cellValue.length > 0) {
        return cellValue
      } else {
        return '-'
      }
    },
    // 分页的回调
    handleCurrentChange (index) {
      this.currPageNo = index
      this.loading = true
      this.setParams()
      this.loadListData()
    },
    // 新tab 切换  item:包含传入data 的数据，如 { title: '大数据' }，index:数组索引，从0开始
    tabClick (item, index) {
      this.searchValue = ''
      this.selectvalue = ''
      this.activeName = item.industryName
      this.activeTabIndex = parseInt(index)
      this.parentId = item.id
      this.currPageNo = 1
      this.options = []
      this.loading = true
      this.setParams()
      this.loadListData()
      this.getTypeListData(item.id)
    },
    // 点击列表行的回调
    didClickCell (row) {
      this.$router.push({
        name: 'IndustryInfo',
        query: {
          name: row.entName,
          activeTabIndex: this.activeTabIndex,
          currPageNo: this.currPageNo,
          selectType: this.selectvalue,
          inputValue: this.searchValue,
          parentId: this.parentId,
          key: 5
        }
      })
    },
    // 请求数据
    loadListData () {
      this.getEntList()
    },
    // 失去焦点回调
    searchBlur () {
      if (!this.searchList.length) return
      setTimeout(() => {
        this.searchList = []
      }, 300)
    },
    // 获得焦点回调
    searchFocus () {
      this.setParams()
			this.flag=0
      if (this.searchValue) {
        this.getEntFuzzyQuery()
        this.setParams()
			
      }
    },
    // 搜索框的回调
    inputChange () {
      this.currPageNo = 1
      this.loading = true
      this.setParams()
      this.getEntList(() => {
        this.searchList = []
      })
    },
    // input 框清除
    cancelRadio () {
      this.searchList = []
      this.searchValue = ''
      this.currPageNo = 1
      this.loading = true
      this.setParams()
      this.getEntList()
    },
    // 搜索内容点击回调
    searchItemClick (name) {
      this.$router.push({
        name: 'IndustryInfo',
        query: {
          name: name
        }
      })
      this.searchList = []
      this.searchValue = ''
    },
    // 模糊搜索回调
    getEntFuzzyQuery () {
      api
        .getEntFuzzyQuery({
          queryString: this.searchValue
        })
        .then(res => {
          this.searchList = []
          if (res.result) {
            this.searchList = res.result.result
          }
        })
    },
    // 获得列表数据
    getEntList (callBack) {
      api
        .getEntList({
          queryString: this.searchValue,
          industryType: this.activeName,
          pageIndex: this.currPageNo,
          industryThirdQuery: this.selectvalue,
          pageSize: 12
        })
        .then(
          data => {
            let result = data.result
            let r = []
            this.paginationData = result.pagination
            result.result.forEach((item, index) => {
              r.push(item.basicInfo)
            })
            this.tableListData = r
            this.loading = false
            if (callBack) callBack()
          },
          error => {
            console.log('error', error)
            this.loading = false
          }
        )
    },
    // 设置页面参数
    setParams () {
      this.$router.push({
        name: 'Industry',
        query: {
          activeTabIndex: this.activeTabIndex,
          parentId: this.parentId,
          selectType: this.selectvalue,
          inputValue: this.searchValue,
          currPageNo: this.currPageNo,
          key: 5,
          flag: 0
        }
      })
    }
  },
  watch: {
    searchValue (newValue) {
      if (!newValue) return
      if (!this.flag) {
        this.getEntFuzzyQuery()
      }
    }
  },
  components: {
    HTab
  }
}
</script>

<style lang="less">
  .industrybg {
    height: 9rem;
    background: url('../../../assets/img/cylzsbg.png') no-repeat;
    background-size: cover;
    width: 97%;
    margin: 0 0.3rem;
    overflow: hidden;
    .top {
      margin: 0.4rem 0.35rem 0.3rem 0.35rem;
      min-height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0;
      position: relative;
      .left {
        position: absolute;
        top: 0;
        left: 0;
      }
      .right {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        .select {
          span {
            color: #436fd2;
            font-size: 0.16rem;
          }
          .el-select .el-input .el-select__caret {
            color: #2766f9;
          }
          .el-input__inner {
            background-color: transparent;
            border: 1px solid #2f5bad;
            color: #8fc0f3;
          }
          input::-webkit-input-placeholder,
          textarea::-webkit-input-placeholder {
            color: #436fd2;
          }
          input:-moz-placeholder,
          textarea:-moz-placeholder {
            color: #436fd2;
          }
          input::-moz-placeholder,
          textarea::-moz-placeholder {
            color: #436fd2;
          }
          input:-ms-input-placeholder,
          textarea:-ms-input-placeholder {
            color: #436fd2;
          }
        }
        .search {
          margin-left: 0.3rem;
          width: 2.5rem;
          .el-input-group__append,
          .el-input-group__prepend {
            border: 1px solid transparent;
            border-bottom: 1px solid #2f5bad;
            background-color: transparent;
            border-radius: 0px;
          }
          .el-button {
            border-radius: 0;
          }
          .el-icon-search {
            color: #8fc0f3;
            font-size: 0.16rem;
          }
          .el-input__inner {
            background-color: transparent;
            border: none;
            border-bottom: 1px solid #2f5bad;
            color: #8fc0f3;
            border-radius: 0rem;
          }
          input::-webkit-input-placeholder,
          textarea::-webkit-input-placeholder {
            color: #436fd2;
          }
          input:-moz-placeholder,
          textarea:-moz-placeholder {
            color: #436fd2;
          }
          input::-moz-placeholder,
          textarea::-moz-placeholder {
            color: #436fd2;
          }
          input:-ms-input-placeholder,
          textarea:-ms-input-placeholder {
            color: #436fd2;
          }
          ul {
            border-top: 1px solid #183f84;
            // margin: 0 0.15rem;
            padding: 0.04rem 0;
            font-size: 0.14rem;
            color: #fff;
            background-color: #032995;
            position: relative;
            z-index: 9999 !important;
            box-sizing: border-box;
            width: 2.5rem;
            li {
              width: 2.3rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              padding: 0rem 0.1rem;
              box-sizing: border-box;
              cursor: pointer;
            }
            li:hover {
              background-color: #0148cb;
            }
          }
        }
      }
    }
    .bottom {
      margin: 0 0.35rem 0.3rem 0.35rem;
      .table {
        .el-table {
          color: #8fc0f3;
          font-size: 0.14rem;
          border: 1px solid #0480ff;
          background: none;
          thead {
            color: #ffffff;
          }
          th,tr {
            background: none;
            height: 0.52rem;
          }
          th.is-leaf {
            border-bottom: none;
            border-right: 1px solid transparent;
            background: rgba(3, 130, 248, 0.1);
            color: #fff !important;
            font-size: 0.16rem;
            height: 0.52rem;
            font-weight: normal;
          }
          td {
            border-bottom: 1px solid #0257a8;
          }
          tr:last-child td {
            border-bottom: none;
          }
        }
        .el-table--enable-row-hover .el-table__body tr:hover > td {
          background: none;
        }
        .el-table--border::after,
        .el-table--group::after,
        .el-table::before {
          background: none;
        }
        .el-table__empty-text {
          color: #8fc0f3;
        }
        .el-table__body-wrapper{
          height: 6.25rem;
          overflow-y: auto;
        }
        .el-table__body-wrapper::-webkit-scrollbar{
          width: 5px;
        }
        .el-table__body-wrapper::-webkit-scrollbar-track{
          border-radius: 5px;
          background: rgba(3, 130, 248, 0.08);
        }
        .el-table__body-wrapper::-webkit-scrollbar-thumb {
          border-radius: 5px;
          background: rgba(3, 130, 248, 0.1);
        }
      }
      .page {
        margin-top: 0.2rem;
        float: right;
        .el-pagination__total {
          color: #8fc0f3;
          line-height: 36px;
        }
        .el-pagination .btn-prev,
        .btn-next,
        .el-pager li {
          background: transparent;
          color: #436fd2;
          border: 1px solid #0257a8;
          height: 36px;
          line-height: 36px;
          min-width: 37px;
        }
        .el-pager li.active {
          color: #ffffff;
        }
      }
    }
  }

  .el-select-dropdown {
    background-color: #032995;
    border: 1px solid transparent;
  }

  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background-color: #0148cb;
    color: #8fc0f3;
  }

  .el-select-dropdown__item {
    color: #436fd2;
  }

  .el-popper[x-placement^='bottom'] .popper__arrow {
    border-bottom-color: #0148cb;
  }

  .el-popper[x-placement^='bottom'] .popper__arrow::after {
    border-bottom-color: #0148cb;
  }

  .el-tooltip__popper {
    max-width: 3rem;
  }

  .el-loading-spinner {
    top: 38%;
  }
</style>
