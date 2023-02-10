<template>
  <list-layout
    :crumbData="[{ title: '网格员', url: '' }]"
    :columns="columns"
    :tableData="tableData"
    :total="total"
    :pageSize="pageSize"
    :currentPage="currentPage"
    v-on:getSearchValue="handleGetSearchValue"
    backPath="olderDistribution"
    title="首页————网格员"
  >
    <el-form :inline="true" :model="formData">
      <el-form-item label="姓名" class="search_select">
        <el-input
        class="head_left"
        placeholder="请输入姓名"
        v-model.trim="formData.name"
        clearable
        @keyup.enter.native="getSearchValue"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="性别" class="search_select">
        <el-select v-model="formData.sex" clearable placeholder="请选择性别">
          <el-option label="男性" value="男"></el-option>
          <el-option label="女性" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号码" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入身份证号码"
          v-model.trim="formData.idcardNumber"
          clearable
          @keyup.enter.native="getSearchValue"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="联系电话" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入联系电话"
          v-model.trim="formData.collectionMobile"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="地区筛选" class="search_select">
        <el-cascader
          placeholder="选择地区"
          v-model="selectedLocation"
          :options="locationOptions"
          @change="handleChangeLocation"
          :show-all-levels="false"
          change-on-select
          filterable
          clearable
          :props="locationProps"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <div class="btns_box">
      <div class="btns_right">
        <el-button class="btn" @click="clearSearchValue">重置</el-button>
        <el-button class="btn" icon="el-icon-search"
          :loading="isSearchLoading"
          @click="handleGetSearchValue"
        >查询</el-button>
        <a :href="downloadExcel">
          <el-button class="btn" >导出</el-button>
        </a>
      </div>
    </div>
 </list-layout>
</template>

<script>
import api from '@/api/api'
import ListLayout from '@/components/TablerList/layout.vue'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isSearchLoading: false,
      ops: {
        vuescroll: {},
        scrollPanel: {
          scrollingX: false
        },
        rail: {

        },
        bar: {
          background: '#eee'
        }
      },
      columns: [
        { label: '序号', prop: 'name' },
        { label: '姓名', prop: 'name' },
        { label: '采集公司（部门）', prop: 'collectionDepartment' },
        { label: '采集员类型', prop: 'collectionType' },
        { label: '身份证号码', prop: 'idcardNumber' },
        { label: '性别', prop: 'sex' },
        { label: '住址', prop: 'collectionAddress' },
        { label: '联系电话', prop: 'collectionMobile' },
        { label: '全科网络名称', prop: 'collectionGridName' },
        { label: '全科网络编码', prop: 'collectionGridCode' }
      ],
      fullscreen: true,
      selectedLocation: this.$route.query.code && typeof this.$route.query.code !== 'string'
        ? this.$route.query.code.slice(1)
        : [], // 地区级联选中内容
      locationOptions: [], // 地区级联选择数据
      locationProps: {
        value: 'code',
        label: 'name',
        children: 'childs'
      },
      tableData: [],
      formData: {
        name: '',
        idcardNumber: '',
        sex: '',
        collectionMobile: '',
        zoneCode: this.initCodeFromQuery(1),
        streetCode: this.initCodeFromQuery(2),
        communityCode: this.initCodeFromQuery(3)
      },
      pageSize: 12, // 每页数量
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
      const Api = process.env.NODE_ENV === 'development' ? 'http://tianjin.aioc.dev.xjoycity.com:8204' : ''
      let data = `${Api}/yanglao-api/baseCollectionPerson/downloadExcel?`
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
    this.$store.commit('setActiveName', '网格员')
    this.$store.dispatch('getUserAuthInfo').then(() => {
      this.getLocation()
      this.handleGetSearchValue()
    }).catch((err) => {
      console.log('获取用户权限失败', err)
    })
    this.getLocation()
    this.handleGetSearchValue()
  },
  methods: {
    initCodeFromQuery (codeIndex) {
      return this.$route.query.code && typeof this.$route.query.code !== 'string'
        ? this.$route.query.code[codeIndex] || '' : ''
    },
    requestParams (page) {
      var params = {}
      const codeParams = this.selectedLocation.length > 0
        ? Object.create(null) : this.userAuthCodeParams
      params = Object.assign({}, this.formData, {
        page: typeof page === 'number' ? page : 1,
        pageSize: this.pageSize
      }, codeParams)

      return params
    },
    // 分页器切换
    handleGetSearchValue (page) {
      this.isSearchLoading = true
      api.getPersonInfo(this.requestParams(page)).then(res => {
        this.isSearchLoading = false
        const { records, total, size, current } = res && res.obj
        this.tableData = records || []
        this.pageSize = size
        this.currentPage = current
        this.total = total
      }).catch(() => {
        this.isSearchLoading = false
      })
    },
    handleChangeLocation (value) {
      if (this.$store.state.userType === '3') {
        this.formData.streetCode = value[0] || ''
        this.formData.communityCode = value[1] || ''
      } else if (this.$store.state.userType === '4') {
        this.formData.communityCode = value[0] || ''
      } else {
        this.formData.zoneCode = value[0] || ''
        this.formData.streetCode = value[1] || ''
        this.formData.communityCode = value[2] || ''
      }
    },
    getLocation () {
      // 由于组件功能限制，片区级联选择器采用查询全量地区数据后前端处理的方式
      api.getLocationList().then(res => {
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
      }).catch(() => {
        console.log('查询片区数据失败')
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
    // 获取input框值进行查询
    getSearchValue () {
      this.currentPage = 1
      this.getOlderData()
    },
    clearSearchValue () {
      this.formData = {
        sex: '',
        zoneCode: '',
        streetCode: '',
        communityCode: '',
        name: '',
        idCard: '',
        phone: ''
      }
      this.selectedLocation = []
    }
  },
  components: {
    ListLayout
  }
}
</script>
