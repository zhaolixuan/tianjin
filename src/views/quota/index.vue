<template>
  <div class="quota">
    <div class="nav_btn" @click="openDialog"></div>
    <el-dialog :fullscreen="fullscreen" :visible.sync="$store.state.navDialogVisible">
      <Navigation></Navigation>
    </el-dialog>
    <Header></Header>
    <div class="quota-wrapper">
      <div class="left-side">
        <leftWrapper
          @left="queryDataByOption"
          @changePage="setCurPage"
          :allorgList="allorgList"
          :otherOrgList="otherOrgList"
        ></leftWrapper>
      </div>
      <div class="right-side">
        <rightWrapper
          @right="queryDataByOption"
          :searchData="curPageList"
          :hotWordList="hotWordList"
          :typeList="typeList"
          ref="right"
        ></rightWrapper>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/index'
import Navigation from '@/components/Navigation/index'
import leftWrapper from './leftWrapper'
import rightWrapper from './rightWrapper'
import Api from '@/api/api'
export default {
  name: 'index',
  data () {
    return {
      // navDialogVisible: false,
      fullscreen: true,
      curPageList: [],
      allorgList: [], // 组织机构列表
      otherOrgList: [], // 除全部以外的数据
      hotWordList: [], // 热词列表
      typeList: [] // 类型列表
    }
  },
  components: {
    Header,
    Navigation,
    leftWrapper,
    rightWrapper
  },
  created () {
    this.queryEnumList()
    this.queryDataByOption(1)
  },
  methods: {
    // 切换左侧组织机构设置当前页码
    setCurPage () {
      this.$refs.right.setPage()
    },
    openDialog () {
      this.$store.commit('setNavDialogVisible', true)
    },
    // 获取页面左侧组织机构、右侧tab类型和热词
    queryEnumList () {
      Api.getEnumList()
        .then(res => {
          let org = res.data.departmentList
          for (let i = 0; i < org.length; i++) {
            if (org[i].id === -1) {
              this.allorgList.push(org[i])
            } else {
              this.otherOrgList.push(org[i])
            }
          }
          this.hotWordList = res.data.hotWordList
          this.typeList = res.data.typeList
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 设置查询参数
    queryDataByOption (type) {
      if (type === 1) {
        this.$store.commit('setOrgName', -1)
        this.$store.commit('setTypeName', -1)
        this.$store.commit('setKeyword', '')
        this.$store.commit('setPageNo', 1)
        this.$store.commit('setSortType', 0)
      }
      let req = {
        departmentList: this.$store.state.quota.orgName, // 组织机构名称
        keyword: this.$store.state.quota.keyword, // 热词名称,输入框值
        typeList: this.$store.state.quota.typeName, // 指标类型名称
        pageNo: this.$store.state.quota.pageNo, // 当前页数
        tag: this.$store.state.quota.hotWord,
        sortProperty: this.$store.state.quota.sortProperty, // 排序类型：finishDegree完成度，issuesName名称
        sortType: this.$store.state.quota.sortType, // 顺序，0升序，1降序
        pageSize: this.$store.state.quota.pageSize
      }
      this.queryData(req)
    },
    // 后台调用数据查询接口
    queryData (req) {
      let params = req || {}
      Api.getPoinerDataList(params)
        .then(res => {
          this.curPageList = res.data
        })
        .catch(error => {
          console.log(error.message)
        })
    }
  }
}
</script>

<style lang="less">
.quota {
  background: url("../../assets/img/bg2.jpg") no-repeat;
  background-size: cover;
  overflow: hidden;
  .quota-wrapper {
    display: flex;
    width: 100%;
    .left-side {
      width: 21%;
    }
    .right-side {
      flex: 1;
    }
  }
}
</style>
