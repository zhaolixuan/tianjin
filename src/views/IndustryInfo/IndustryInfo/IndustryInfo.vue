<template>
<div class="wrapper-box">
  <a href="#" class="return" @click.prevent="backListPage">返回</a>
  <div class="search search_box">
    <el-input placeholder="请输入内容" @focus="searchFocus" @blur="searchBlur" @change="inputChange" v-model="searchValue" class="input-with-select">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <ul v-if="searchList.length">
      <li v-for="(item, index) of searchList" :key="index" @click="searchItemClick(item.originalName)">{{ item.originalName }}</li>
    </ul>
  </div>
  <div class="info_title">{{ basicInfoData.entName }}</div>
  <div class="info_top">
    <div class="boxbg qyhx_box">
      <i class="lt"></i>
      <i class="rt"></i>
      <i class="lb"></i>
      <i class="rb"></i>
      <div class="line_top"></div>
      <div class="line_bottom"></div>
      <div class="title">
        <i class="i_1"></i>
        <span>企业画像</span>
      </div>
      <div class="hx_chart">
        <portrait :data="scoreData" :id="portrait.id" :clazz="portrait.class" :option="portrait.option"></portrait>
      </div>
      <div class="pf_box">
        <div class="pf_tit">综合评分：{{ scoreData.score }}分</div>
        <ul>
          <li><span>资质评分</span><b>{{ scoreData.qualification }}</b>分</li>
          <li><span>历史沿革评分</span><b>{{ scoreData.modification }}</b>分</li>
          <li><span>经营评分</span><b>{{ scoreData.manage }}</b>分</li>
          <li><span>基础评分</span><b>{{ scoreData.base }}</b>分</li>
          <li><span>司法评分</span><b>{{ scoreData.judicature }}</b>分</li>
        </ul>
      </div>
    </div>
    <div class="boxbg qyxx_box">
      <i class="lt"></i>
      <i class="rt"></i>
      <i class="lb"></i>
      <i class="rb"></i>
      <div class="line_top"></div>
      <div class="line_bottom"></div>
      <div class="title">
        <i class="i_2"></i><span>企业信息</span>
      </div>
      <div class="mc_dz">
        <p><span>企业名称</span>{{ basicInfoData.entName }}</p>
        <p><span>注册地址</span>{{ basicInfoData.dom }}</p>
      </div>
      <div class="info_ul">
        <ul>
          <li><span>统一社会信用代码</span>{{ basicInfoData.creditCode }}
          </li>
          <li><span>经营状态</span>{{ basicInfoData.entStatus }}
          </li>
          <li><span>成立日期</span>{{ basicInfoData.esDate }}</li>
          <li><span>行业门类名称</span>{{ basicInfoData.industryPhyName }}</li>
          <li><span>所在省份</span>{{ basicInfoData.regOrgProvince }}</li>
          <li><span>登记机关</span>{{ basicInfoData.regOrg }}</li>
          <li><span>核准日期</span>{{ basicInfoData.approvedTime }}</li>
          <li><span>公司电话</span>{{ basicInfoData.phoneNumber }}</li>
        </ul>
        <ul>
          <li><span>注册号</span>{{ basicInfoData.regNo }}</li>
          <li><span>注册资本</span>{{ basicInfoData.regCap }}</li>
          <li><span>经营期限自</span>{{ basicInfoData.opFrom }}</li>
          <li><span>行业大类</span>{{ basicInfoData.industryLargeName }}</li>
          <li><span>城市</span>{{ basicInfoData.city || '-' }}</li>
          <li :title="basicInfoData.entType"><span>企业类型</span>{{ basicInfoData.entType }}</li>
          <li><span>有效期</span>{{ basicInfoData.validTime }}</li>
          <li><span>公司邮箱</span>{{ basicInfoData.email }}</li>
        </ul>
        <ul>
          <li><span>组织机构代码</span>{{ basicInfoData.orgCodes }}</li>
          <li><span>法定代表人</span>{{ basicInfoData.frName }}</li>
          <li><span>经营期限至</span>{{ basicInfoData.opTo }}</li>
          <li><span>行业种类</span>{{ basicInfoData.industryMiddleName }}</li>
          <li><span>县</span>{{ basicInfoData.county }}</li>
          <li><span>曾用名</span>{{ basicInfoData.oldName }}</li>
          <li :title="basicInfoData.opScope"><span>经营范围</span>{{ basicInfoData.opScope }}</li>
          <li><span>链接</span>{{ basicInfoData.website || '-' }}</li>
        </ul>
      </div>
      <div class="title">
        <i class="i_3"></i>
        <span>企业简介</span>
      </div>
      <el-popover width="400" title="企业简介" trigger="hover" :content="basicInfoData.opScope">
        <p class="info_p" slot="reference">{{ basicInfoData.opScope }}</p>
      </el-popover>
    </div>
  </div>
  <div class="boxbg tablebox">
    <i class="lt"></i>
    <i class="rt"></i>
    <i class="lb"></i>
    <i class="rb"></i>
    <div class="table_box">
      <div class="tab_box">
        <el-tabs v-model="activeName" @tab-click="handleClick" >
          <el-tab-pane label="历史变更" name="first">
            <div class="table_main_2">
              <el-table :data="alterRecordData" style="width: 100%" :header-cell-style="{background:'rgba(3, 130, 248, 0.1)',color:'#ffffff'}" >
                <el-table-column prop="alterBe" label="变更前内容"></el-table-column>
                <el-table-column prop="alterDate" label="变更日期"></el-table-column>
                <el-table-column prop="alterItem" label="变更事项"></el-table-column>
                <el-table-column prop="alterAf" label="变更后内容"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="企业股东及出资信息" name="second">
            <div class="table_main_2">
              <el-table :data="shareHoldersData" style="width: 100%" :header-cell-style="{background:'rgba(3, 130, 248, 0.1)',color:'#ffffff'}" >
                <el-table-column prop="canDate" label="出资日期"></el-table-column>
                <el-table-column prop="invType" label="股东类型"></el-table-column>
                <el-table-column prop="conForm" label="出资方式"></el-table-column>
                <el-table-column prop="shaName" label="股东名称"></el-table-column>
                <el-table-column prop="subConAm" label="认缴出资额(万元)"></el-table-column>
                <el-table-column prop="fundedRatio" label="出资比例"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="企业分支机构" name="third">
            <div class="table_main_2">
              <el-table :data="branchRecordData" style="width: 100%" :header-cell-style="{background:'rgba(3, 130, 248, 0.1)',color:'#ffffff'}" >
                <el-table-column prop="brName" label="分支机构名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="property1" label="统一社会信用代码" show-overflow-tooltip></el-table-column>
                <el-table-column prop="regInstitute" label="登记机关" show-overflow-tooltip></el-table-column>
                <el-table-column prop="regStatus" label="登记状态" show-overflow-tooltip></el-table-column>
                <el-table-column prop="approvedTime" label="注册时间" show-overflow-tooltip></el-table-column>
                <el-table-column prop="website" label="链接" show-overflow-tooltip></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="主要人员" name="fourth">
            <div class="table_main_2">
              <el-table :data="mainStaff" style="width: 100%" :header-cell-style="{background:'rgba(3, 130, 248, 0.1)',color:'#ffffff'}" >
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="staffTypeName" label="职位"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import api from '@/api/api'
import * as jdChart from '@/components/Echarts/index.js'
export default {
  data () {
    return {
      portrait: {
        id: 'portrait',
        class: '',
        option: {
          style: 'width:100%;height:100%'
        }
      },
      activeName: 'first',
      basicInfoData: {}, // 企业信息
      shareHoldersData: [], // 企业出资股东信息
      mainStaff: [], // 企业主要人员
      alterRecordData: [], // 历史变更
      branchRecordData: [], // 企业分支机构
      scoreData: {}, // 企业评分,
      searchValue: '', // 搜索
      searchList: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    handleClick (tab, event) {
      console.log('切换 tab')
    },
    init () {
      if (!this.$route.query.name) {
        return
      }
      this.getBasicQuery(this.$route.query.name)
      this.getEntScoreQuery(this.$route.query.name)
    },
    inputChange () {
    },
    searchBlur () {
      if (!this.searchList.length) return
      setTimeout(() => {
        this.searchList = []
      }, 1000)
    },
    searchFocus () {
      if (this.searchValue) {
        this.getEntFuzzyQuery()
      }
    },
    searchItemClick (name) {
      this.getBasicQuery(name)
      this.getEntScoreQuery(name)
      this.searchList = []
      this.searchValue = ''
    },
    backListPage () {
      if (this.$route.query.activeTabIndex >= 0 && this.$route.query.currPageNo) {
        this.$router.push({
          name: 'Industry',
          query: {
            activeTabIndex: this.$route.query.activeTabIndex,
            currPageNo: this.$route.query.currPageNo,
            selectType: this.$route.query.selectType,
            inputValue: this.$route.query.inputValue,
            parentId: this.$route.query.parentId,
            flag: 1,
            key: -1
          }
        })
      } else {
        this.$router.go(-1)
      }
    },
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
    getBasicQuery (name) {
      api
        .getBasicQuery({
          queryString: name
        })
        .then(res => {
          console.log(res.result)
          this.mainStaff = res.result.mainStaffInfos
          this.shareHoldersData = res.result.shareHolders
          this.alterRecordData = res.result.alterRecordList
          this.branchRecordData = res.result.branchRecordList
          this.basicInfoData = res.result.basicInfo
        })
    },
    getEntScoreQuery (name) {
      api
        .getEntScoreQuery({
          queryString: name
        })
        .then(res => {
          this.scoreData = res.result
          if (!this.scoreData) {
            this.scoreData = {
              score: 0,
              qualification: 0,
              judicature: 0,
              modification: 0,
              manage: 0,
              base: 0
            }
          }
        })
    }
  },
  watch: {
    searchValue (newValue) {
      if (!newValue) return
      this.getEntFuzzyQuery()
    }
  },
  components: {
    ...jdChart
  }
}
</script>

<style scoped>
.wrapper-box {
    margin: 0 0.2rem;
    height: 100%;
}
.return {
    position: absolute;
    font-size: 0.18rem;
    color: #afdcfd;
    text-decoration: none;
    width: 0.7rem;
    height: 0.3rem;
    background: url('../../../assets/img/return.png') no-repeat;
    display: inline-block;
    line-height: 0.3rem;
    text-align: center;
    top: -0.5rem;
    background-size: 0.7rem 0.3rem;
    z-index: 99;
}
.search {
    font-size: 0;
    position: absolute;
    top: -0.55rem;
    right: 1rem;
    width: 3rem;
    /*height: 0.4rem;*/
    z-index: 99;
    background-color: #133674;
}

.search ul {
    border-top: 1px solid #183f84;
    margin: 0 0.15rem;
    padding: 0.08rem 0;
    font-size: 0.16rem;
    color: #fff;
}
.search ul li {
    padding: 0.05rem;
    cursor: pointer;
}

.info_title {
    position: absolute;
    font-size: 0.14rem;
    color: #fff;
    top: -0.53rem;
    left: 1.2rem;
    background: url('../../../assets/img/btbj.png') no-repeat;
    width: 3.75rem;
    height: 0.45rem;
    line-height: 0.4rem;
    background-size: 3.75rem 0.45rem;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.boxbg {
    background: rgba(3, 130, 248, 0.08);
    position: relative;
}
.boxbg i {
    width: 0.16rem;
    height: 0.1rem;
    position: absolute;
}
.lt {
    border-top: 0.02rem solid #00b2ff;
    border-left: 0.03rem solid #00b2ff;
    top: 0;
    left: 0;
}
.rt {
    border-top: 0.02rem solid #00b2ff;
    border-right: 0.03rem solid #00b2ff;
    top: 0;
    right: 0;
}
.lb {
    border-bottom: 0.02rem solid #00b2ff;
    border-left: 0.03rem solid #00b2ff;
    bottom: 0;
    left: 0;
}
.rb {
    border-bottom: 0.02rem solid #00b2ff;
    border-right: 0.03rem solid #00b2ff;
    bottom: 0;
    right: 0;
}
.line_top,
.line_bottom {
    position: absolute;
    display: block;
    width: 100%;
    height: 1px;
    background: radial-gradient(rgba(31, 172, 255, 0.6), rgba(0, 65, 135, 0.5), rgba(31, 172, 255, 0.3));
}
.line_top {
    left: 0;
    top: 0;
}
.line_bottom {
    left: 0;
    bottom: 0;
}

.hx_chart {
  height: 62%;
}
.pf_box {
    height: 30%;
    margin: 0 0.3rem;
    color: #afdcfd;
    font-size: 0.12rem;
}
.pf_tit {
    font-size: 0.2rem;
    margin-bottom: 0.2rem;
    border-left: 2px solid #00b0fc;
    padding-left: 0.1rem;
    height: 0.2rem;
    line-height: 0.2rem;
}
.pf_box ul {
  padding-left: 0.12rem;
}
.pf_box ul li {
    float: left;
    width: 20%;
}
.pf_box ul li span {
  display: block;
}
.pf_box ul li b {
  font-size: 0.2rem;
}
.table_box {
  padding: 0 0.4rem;
}
  .tablebox {
    height: 40%;
    margin-top: 0.2rem;
  }
  .info_top {
    height: 55%;
  }
  .qyhx_box {
    float: left;
    width: 23%;
    height: 100%;
  }
  .qyxx_box {
    float: left;
    height: 100%;
    margin-left: 1%;
    width: 76%;
    font-size: 0.12rem;
    color: #afdcfd;
  }
  .info_top .title {
    font-size: 0.24rem;
    color: #fff;
    margin: 0.3rem 0 0 0.3rem;
    padding-bottom: 0.2rem;
    background: url('../../../assets/img/t_bg.png') no-repeat 0 0.35rem;
  }
  .info_top .title span {
    margin-left: 0.32rem;
  }
  .info_top .title .i_1 {
    background: url('../../../assets/img/i_1.png') no-repeat;
    width: 0.27rem;
    height: 0.29rem;
    background-size: 0.27rem 0.29rem;
  }
  .info_top .title .i_2 {
    background: url('../../../assets/img/i_2.png') no-repeat;
    width: 0.23rem;
    height: 0.21rem;
    background-size: 0.23rem 0.21rem;
    margin-top: 0.08rem;
  }
  .info_top .title .i_3 {
    background: url('../../../assets/img/i_3.png') no-repeat;
    width: 0.23rem;
    height: 0.23rem;
    background-size: 0.23rem 0.23rem;
    margin-top: 0.03rem;
  }
  .mc_dz {
    padding: 0 0.3rem;
    margin-top: 0.1rem;
  }
  .mc_dz p {
    line-height: 0.24rem;
  }
  .mc_dz p span {
    color: #fff;
    width: 1.3rem;
    display: inline-block;
    font-size: 0.14rem;
  }
  .info_ul {
    overflow: hidden;
    margin: 0.15rem 0 0.3rem 0.3rem;
  }
  .info_ul ul {
    float: left;
    width: 33%;
    background: url('../../../assets/img/ulbg.png') no-repeat 80% 0;
  }
  .info_ul ul:last-child {
    background: none;
  }
  .info_ul ul li {
    line-height: 0.24rem;
    width: 75%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .info_ul ul li span {
    color: #fff;
    width: 1rem;
    display: inline-block;
    font-size: 0.14rem;
  }
  .info_ul ul:first-child li span {
    width: 1.3rem;
  }
  .info_p {
    font-size: 0.14rem;
    padding: 0 0.3rem;
    line-height: 0.24rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  </style>
  <style>
  .input-with-select input,
  .input-with-select input:hover,
  .input-with-select input:focus {
    background-color: rgba(3, 130, 248, 0.1);
    border: 1px solid #0257a8;
    color: #afdcfd;
    border-right: none;
  }
  .input-with-select div {
    background-color: rgba(3, 130, 248, 0.1);
    border: 1px solid #0257a8;
    border-left: none;
    color: #afdcfd;
  }
  .tab_box .el-tabs__item {
    color: #afdcfd;
    font-size: 0.16rem;
    padding: 0 0.3rem;
  }
  .tab_box .el-tabs__header {
    margin: 0;
    top: -0.3rem;
  }
  .tab_box .el-tabs__nav-wrap::after {
    background: none;
  }
  .tab_box .el-tabs__active-bar {
    background: #00ffff;
  }
  .tab_box .el-tabs__content {
    font-size: 0.18rem;
    color: #fff;
    margin-top: -0.3rem;
  }
  .table_main_2 {
    height: 2.36rem;
    overflow: hidden;
  }
  .table_main_2 table {
    border: 1px solid #0257a8;
    border-bottom: none;
  }
  .table_main_2 .el-table {
    font-size: 0.14rem;
    color: #8fc0f3;
  }
  .table_main_2 .el-table__body-wrapper{
    height: 1.8rem;
    overflow-y: auto;
  }
  .table_main_2  .el-table__body-wrapper::-webkit-scrollbar{
    width: 5px;
  }
  .table_main_2 .el-table__body-wrapper::-webkit-scrollbar-track{
    border-radius: 5px;
    background: rgba(3, 130, 248, 0.08);
  }
  .table_main_2 .el-table__body-wrapper::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: rgba(3, 130, 248, 0.1);
  }
  .table_main_2 .el-table thead {
    color: #fff;
  }
  .table_main_2 .el-table .cell {
    width: 3rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: normal;
  }
  .table_main_2 .el-table,.el-table__expanded-cell {
    background: none;
  }
  .table_main_2 .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    background: none;
  }
  .table_main_2 .el-table td,.el-table th {
    padding: 0.12rem 0;
  }
  .table_main_2 .el-table th.is-leaf {
    border-bottom: none;
    background: rgba(3, 130, 248, 0.1);
  }
  .table_main_2 .el-table td {
    border-bottom: 1px solid #0257a8;
  }
  .table_main_2 .el-table th,.el-table tr {
    background: none;
  }
  .table_main_2 .el-table--enable-row-hover .el-table__body tr:hover > td {
    background: none;
  }
</style>
