<template>
  <list-layout
    :crumbData="[{ title: this.$route.query.label, url: '' }]"
    :columns="columns"
    :tableData="tableData"
    :total="total"
    :pageSize="pageSize"
    :currentPage="currentPage"
    v-on:getSearchValue="handleGetSearchValue"
    :code="$route.query.code"
    title="助餐服务监管大数据统计分析————服务老人"
  >
    <el-form :inline="true" :model="formData">
      <el-form-item label="所属养老驿站" class="search_select">
        <el-input
        class="head_left"
        placeholder="请输入所属养老驿站"
        v-model.trim="formData.DeptName"
        @keyup.enter.native="handleGetSearchValue"
        clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="姓名" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入姓名"
          v-model.trim="formData.orderName"
          @keyup.enter.native="handleGetSearchValue"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="身份证号码" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入身份证号码"
          v-model.trim="formData.orderCard"
          clearable
          @keyup.enter.native="handleGetSearchValue"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="手机号码" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入手机号码"
          v-model.trim="formData.orderPhone"
          @keyup.enter.native="handleGetSearchValue"
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
      <el-form-item label="消费订单数" class="order_Number">
        <el-input
          class="order_item"
          placeholder="起始订单数"
          v-model.trim="formData.payOrderNoTotalStart"
          clearable
          @keyup.enter.native="handleGetSearchValue"
        >
        </el-input>
        <span>-</span>
        <el-input
          class="order_item"
          placeholder="截至订单数"
          v-model.trim="formData.payOrderNoTotalEnd"
          clearable
          @keyup.enter.native="handleGetSearchValue"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div class="btns_box">
      <div class="btns_right">
        <el-button @click="clearSearchValue" class="btn">重置</el-button>
        <el-button class="btn" icon="el-icon-search"
          :loading="isSearchLoading"
          @click="handleGetSearchValue"
        >查询</el-button>
        <!-- <a :href="downloadExcel" target="_blank">
          <el-button class="btn" >导出</el-button>
        </a> -->
      </div>
    </div>
 </list-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '@/api/api.js'
import ListLayout from '@/components/TablerList/layout.vue'

export default {
  data () {
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {
          scrollingX: false
        },
        bar: {
          background: '#eee'
        }
      },
      isSearchLoading: false,
      columns: [
        { label: '序号', prop: 'index', width: '150' },
        { label: '姓名', prop: 'name' },
        { label: '身份证号码', prop: 'idcardNumber' },
        { label: '性别', prop: 'sex' },
        { label: '年龄', prop: 'age' },
        { label: '民族', prop: 'localNation' },
        { label: '手机号码', prop: 'oldphone' },
        { label: '补贴类别', prop: 'serviceType' },
        { label: '所属养老驿站', prop: 'deptName' },
        { label: '户籍地址', prop: 'address' },
        { label: '采集日期', prop: 'createtime' },
        { label: '消费订单数', prop: 'payOrderNoTotal' }
      ],
      tableData: [],
      serviceOrderItemlist: ['全部', '普通老年人', '享受补贴老年人'],
      payList: ['全部', '微信', '支付宝', '现金', '饭卡'],
      fullscreen: true,
      selectedLocation: this.$route.query.code && typeof this.$route.query.code !== 'string'
        ? this.$route.query.code.slice(1) : [], // 地区级联选中内容
      locationOptions: [], // 地区级联选择数据
      orderAll: '',
      index: 1,
      locationProps: {
        value: 'code',
        label: 'name',
        children: 'childs'
      },
      pageSize: 10, // 每页数量
      currentPage: 1, // 当前页数
      total: 0, // 总条数
      formData: {
        DeptName: '',
        orderName: '',
        orderPhone: '',
        orderCard: '',
        streetCode: this.initCodeFromQuery(2),
        zoneCode: this.initCodeFromQuery(1),
        communityCode: this.initCodeFromQuery(3),
        payOrderNoTotalStart: '',
        payOrderNoTotalEnd: ''
      },
      params: {}
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
    }
  },
  created () {
    // this.$store.commit('setActiveName', this.$route.query.label)
    this.$store.dispatch('getUserAuthInfo').then(() => {
      this.getLocation()
      this.handleGetSearchValue()
    }).catch((err) => {
      console.log('获取用户权限失败', err)
    })
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
      console.log(Object.create(null))
      return params
    },
    handleGetSearchValue (page) {
      this.isSearchLoading = true
      let { payOrderNoTotalEnd, payOrderNoTotalStart } = this.formData
      payOrderNoTotalStart = payOrderNoTotalStart ? parseInt(payOrderNoTotalStart) : ''
      payOrderNoTotalEnd = payOrderNoTotalEnd ? parseInt(payOrderNoTotalEnd) : ''
      if (payOrderNoTotalStart && payOrderNoTotalEnd) {
        this.formData.flagpoint = 1
      }
      api.getSecondPageList(this.requestParams(page)).then(res => {
        this.isSearchLoading = false
        const { records, total, size, current } = res && res.obj
        this.tableData = records
        this.pageSize = size
        this.currentPage = current
        this.total = total
      }).catch(() => {
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
              return item.name == '河西区'
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
    getLocalListByCode (localList, code) {
      let list = []
      function loopFilter (loopList) {
        let newList = []
        if (loopList) {
          newList = loopList.filter(item => {
            if (item.code == code) {
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
    handleServiceClass () {
      this.currentPage = 1
    },
    clearSearchValue () {
      this.formData = Object.assign({}, this.formData, {
        DeptName: '',
        orderName: '',
        orderPhone: '',
        orderCard: '',
        zoneCode: '',
        streetCode: '',
        communityCode: '',
        payOrderNoTotalStart: '',
        payOrderNoTotalEnd: ''
      })
      this.selectedLocation = []
    }
  },
  components: {
    ListLayout
  }
}
</script>
<style >

</style>
