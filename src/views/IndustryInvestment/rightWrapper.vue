<template>
  <div class="industry-right-wrapper">
    <div class="data-wrapper">
      <div class="title">
        <el-radio-group v-model="activeNameId" @change="tabChange">
          <el-radio-button v-for="(type,index) in tabList" :key="index" :label="type.id">{{type.industryName}}</el-radio-button>
        </el-radio-group>
      </div>
      <div class="industry-table-wrapper">
        <el-tabs v-model="activeType" @tab-click="getTypeName">
          <el-tab-pane v-for="item in typeList" :key="item.id" :label="item.name" :name="item.name">
            <div class="tableWrapper">
              <el-table :data="pageData" style="width: 100%" border :header-cell-style="{background:'rgba(3, 130, 248, 0.1)',color:'#ffffff'}">
                <el-table-column v-for="(col,index) in tableContent" :key="index" :prop="col.propValue"
                                 :label="col.labelName" :sortable="col.sort" show-overflow-tooltip></el-table-column>
              </el-table>
            </div>
            <div class="page" v-if="pageData.length > 0">
              <el-pagination @current-change="handleCurrentChange"
                             :page-size="page.size"
                             :current-page.sync="page.pageNum"
                              layout="total, prev, pager, next"
                             :total="page.total"></el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="picMenuNav">
      <picNav ref="picNav"></picNav>
    </div>
  </div>
</template>

<script>
import picNav from './picNav'
import Api from '@/api/api'
export default {
  name: 'rightWrapper',
  data () {
    return {
      activeNameId: 1,
      activeType: '产业链财务分析',
      tabList: [],
      typeList: [{id: 1, name: '产业链财务分析'}, {id: 2, name: '产业链相关公司'}, {id: 3, name: '产业链相关投资机构'}],
      pageData: [], // 查询结果
      tableContent: [], // table表格信息
      firstTable: [{propValue: 'industry', labelName: '行业名称', sort: false},
        {propValue: 'sr', labelName: '平均收入', sort: false},
        {propValue: 'ml', labelName: '平均毛利率', sort: false},
        {propValue: 'jlr', labelName: '平均净利率', sort: false},
        {propValue: 'zcfzl', labelName: '平均资产负债率', sort: false}], // 产业链财务分析表头
      secondTable: [
        {propValue: 'industry', labelName: '行业名称', sort: false},
        {propValue: 'aCNumber', labelName: 'A股公司', sort: false},
        {propValue: 'threeCNumber', labelName: '三板公司', sort: false},
        {propValue: 'fourCNumber', labelName: '四板公司', sort: false},
        {propValue: 'smCNumber', labelName: '已私募融资公司', sort: false}], // 产业链相关公司
      thirdTable: [
        {propValue: 'industry', labelName: '行业名称', sort: false},
        {propValue: 'smjj', labelName: '私募基金', sort: false},
        {propValue: 'qszt', labelName: '券商及直投', sort: false},
        {propValue: 'banks', labelName: '银行系机构', sort: false},
        {propValue: 'bxs', labelName: '保险系机构', sort: false}
      ], // 产业链相关投资机构
      page: {
        total: 0,
        size: 10,
        pageNum: 1
      }
    }
  },
  components: {
    picNav
  },
  created () {
    this.tableInit()
    this.queryEnumList()
    this.queryDataByOption(1)
  },
  methods: {
    // 页面表格初始化
    tableInit () {
      this.activeNameId = 1
      this.activeType = '产业链财务分析'
      this.tableContent = this.firstTable
    },
    // 切换一级类目
    tabChange () {
      this.activeType = '产业链财务分析'
      this.tableContent = this.firstTable
			this.page.pageNum = 1
      this.queryDataByOption()
      this.$refs.picNav.getPicNavList(this.activeNameId)
    },
    // 切换不同table
    getTypeName () {
      let name = this.activeType
      switch (name) {
        case '产业链财务分析':
          this.tableContent = this.firstTable
          break
        case '产业链相关公司':
          this.tableContent = this.secondTable
          break
        case '产业链相关投资机构':
          this.tableContent = this.thirdTable
          break
      }
			this.page.pageNum = 1
      this.queryDataByOption()
    },
    // 获取页面静态资源
    queryEnumList () {
      Api.getProductTypeList()
        .then(res => {
          this.tabList = res.obj
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 获取页面查询参数
    queryDataByOption (type) {
      let req = {}
      if (type === 1) {
        req = {
          id: 1,
          page: 1,
          pageSize: 10
        }
      } else {
        req = {
          id: this.activeNameId,
          page: this.page.pageNum,
          pageSize: 10
        }
      }
      this.queryData(req)
    },
    // 数据查询
    queryData (req) {
      let params = req || {}
      if (this.activeType === '产业链财务分析') {
        Api.getFirstDimensionListData(params)
          .then(res => {
            this.pageData = res.obj
            this.page.total = res.count
          })
          .catch(error => {
            console.log(error.message)
          })
      }
      if (this.activeType === '产业链相关公司') {
        Api.getSecondDimensionListData(params)
          .then(res => {
            this.pageData = res.obj
            this.page.total = res.count
          })
          .catch(error => {
            console.log(error.message)
          })
      }
      if (this.activeType === '产业链相关投资机构') {
        Api.getThirdDimensionListData(params)
          .then(res => {
            this.pageData = res.obj
            this.page.total = res.count
          })
          .catch(error => {
            console.log(error.message)
          })
      }
    },
    // 分页
    handleCurrentChange (val) {
      this.queryDataByOption()
    }
  }
}
</script>

<style lang="less">
  .industry-right-wrapper{
    display: flex;
    flex-direction: row;
    height: 9rem;
    background: url("../../assets/img/cylzsbg.png")no-repeat;
    background-size: cover;
    overflow: hidden;
    .data-wrapper{
      margin: .2rem .2rem 0rem 0rem;
      .title{
        font-size: .16rem;
        width: 10rem;
        margin: .15rem 0rem .2rem .12rem;
        position: absolute;
        top: 1.5rem;
        z-index: 999;
        .el-radio-button {
          height: .5rem;
          width: 1.5rem;
          /*border:1px solid #1e4a8e;*/
          margin: .1rem .1rem  .2rem .1rem;
          /*float: left;*/
        }
        .el-radio-button__inner{
          /*background-color: #032251;*/
          background: url("../../assets/img/btnbg.png")no-repeat;
          background-size: 1.5rem .45rem;
          font-size: .16rem;
          color: #436fd2;
          border: none;
          border-radius: 0;
          text-align: center;
          line-height: .45rem;
          width: 1.5rem;
          padding: 0px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
        }
        .el-radio-button.is-active .el-radio-button__inner{
          -webkit-box-shadow:none;
          box-shadow: none;
          background: url("../../assets/img/bg1.jpg")no-repeat;
          color: #8fc0f3;
          /*border: 1px solid #068ff9;*/
          background-size: 1.5rem .45rem;
        }
      }
      .industry-table-wrapper{
        width: 10rem;
        margin: .1rem 0rem .1rem .25rem;
        .el-tabs__item {
          color: #436fd2;
          font-size: 0.14rem;
          margin:  0.1rem 0rem
        }
        .el-tabs__header {
          margin: 0;
        }
        .el-tabs__nav-wrap::after {
          background: none;
        }
        .el-tabs__item.is-active{
          color: #ffffff;
        }
        .el-tabs__active-bar {
          background: #00ffff;
          top:1.2rem;
        }
        .el-tabs__content {
          font-size: 0.18rem;
          color: #fff;
          /*margin-top: -0.8rem;*/
          /*height: 7rem;*/
        }
        .tableWrapper{
          margin-top: .1rem;
          .el-table {
            color: #8fc0f3;
            font-size: 0.14rem;
            border: 1px solid #0a2f7e;
          }
          .el-table th, .el-table tr {
            background: none;
            border-bottom: 1px solid #0a2f7e;
            height: .52rem;
          }
          .el-table tr:last-child td {
            border-bottom: none;
          }
          .el-table, .el-table__expanded-cell {
            background: none;
          }
          .el-table td {
            border-bottom: 1px solid #0a2f7e;
          }
          .el-table .cell {
            font-weight: normal;
          }
          .el-table .el-table_1_column_7 .cell {
            font-weight: normal;
          }
          .el-table td, .el-table th {
            padding: 0.1rem 0;
          }
          .el-table th.is-leaf {
            border-bottom: 1px solid #0a2f7e;
            border-right: 1px solid transparent;
            background: rgba(3, 130, 248, 0.1);
            color: #fff!important;
            font-size: 0.16rem;
            height: .52rem;
            font-weight: normal;
          }
          .el-table td {
            border-bottom: 1px solid #0a2f7e;
            border-right: 1px solid transparent;
          }
          .el-table tr:last-child td {
            border-bottom: none;
          }
          .el-table--enable-row-hover .el-table__body tr:hover > td {
            background: none;
          }
          .el-table--border::after, .el-table--group::after, .el-table::before {
            background: none;
          }
          .el-table__empty-text{
            color: #87bdff;
          }
        }
        .page{
          display: flex;
          justify-content: flex-end;
          width: 10rem;
          height: .5rem;
          margin-top: .3rem;
          text-align: right;
          font-size: .18rem;
          .el-pagination__total{
            color:#8fc0f3 ;
          }
          .el-pagination .btn-prev, .btn-next, .el-pager li {
            background: transparent;
            color: #436fd2;
            border: 1px solid #0257a8;
          }
          .el-pager li.active{
            color: #ffffff;
          }
        }
      }
    }
    .picMenuNav{
      margin-top: .2rem;
      flex:1;
      padding-top: .2rem;
    }
  }
  .el-tooltip__popper {
    max-width: 2rem;
  }
</style>
