<template>
  <list-layout
    :crumbData="[{ title: this.$route.query.label, url: '' }]"
    :columns="columns"
    :tableData="tableData"
    :total="total"
    :pageSize="pageSize"
    :currentPage="currentPage"
    v-on:getSearchValue="handleGetSearchValue"
  >
    <el-form :inline="true" :model="formData">
      <el-form-item label="用户姓名" class="search_select">
        <el-input
        class="head_left"
        placeholder="请输入用户姓名"
        v-model.trim="formData.userName"
        clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="联系电话" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入联系电话"
          v-model.trim="formData.phone"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="工单编号" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入工单编号"
          v-model.trim="formData.serviceOrderCard"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="下单人" class="search_select">
        <el-input
        class="head_left"
        placeholder="请输入下单人"
        v-model.trim="formData.orderPerson"
        clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="下单时间" class="search_select">
        <el-date-picker
          v-model="time"
          type="daterange"
          range-separator="-"
          clearable
          start-placeholder="开始日期"
          end-placeholder="结束日期">
      </el-date-picker>
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
       <el-form-item label="服务大类" class="search_select">
        <el-select v-model="formData.serviceCategory" clearable placeholder="请选择服务大类">
          <el-option
            v-for="(option,index) in serviceCategoryList"
            :key="index"
            :label="option"
            :value="option"
            @change="handleServiceClass">
          </el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="服务项目" class="search_select">
        <el-select v-model="formData.serviceOrderItem" clearable placeholder="请选择服务项目">
          <el-option
            v-for="(option,index) in  serviceOrderItemlist"
            :key="index"
            :label="option"
            :value="option"
            @change="handleServiceClass">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="btns_box">
      <div class="btns_right">
        <el-button @click="clearSearchValue" class="btn">重置</el-button>
        <el-button class="btn" icon="el-icon-search"
          :loading="isSearchLoading"
          @click="handleGetSearchValue"
        >查询</el-button>
        <a :href="downloadExcel" target="_blank">
          <el-button class="btn" >导出</el-button>
        </a>
      </div>
    </div>
 </list-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '@/api/api.js'
import ListLayout from '../ServiceBusiness/components/layout.vue'

let formatTime = (date) => {
  let formatData = ''
  if (date) {
    let month = (date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1))
    let day = (date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
    formatData = date.getFullYear() + '-' + month + '-' + day
  }
  return formatData
}
export default {
  data () {
    return {
      isSearchLoading: false,
      time: [
        this.$route.query.startTime ? new Date(this.$route.query.startTime) : '',
        this.$route.query.endTime ? new Date(this.$route.query.endTime) : ''
      ],
      ops: {
        vuescroll: {},
        scrollPanel: {
          scrollingX: false
        },
        bar: {
          background: '#eee'
        }
      },
      columns: [
        { label: '下单时间', prop: 'serviceOrderTime' },
        { label: '预约时间', prop: 'appointmentsTime' },
        { label: '下单人', prop: 'serviceOrderPerson' },
        { label: '工单编号', prop: 'serviceOrderCard' },
        { label: '老人姓名', prop: 'serviceOrderName' },
        { label: '联系电话', prop: 'serviceOrderPhone' },
        { label: '服务大类', prop: 'serviceCategory' },
        { label: '服务项目', prop: 'serviceOrderItem' },
        { label: '工单状态', prop: 'serviceOrderStatus' },
        { label: '收费标准', prop: 'serviceOrderMoney' },
        { label: '工单等级', prop: 'serviceOrderLevel' },
        { label: '家庭地址', prop: 'serviceOrderAddress' },
        { label: '户籍地址', prop: 'address' },
        { label: '服务商家', prop: 'serviceOrderMerchant' },
        { label: '所属服务点', prop: 'serviceOrderPoint' }
      ],
      tableData: [],
      serviceOrderItemlist: ['鲜鸡蛋一份', '配餐', '10元标准餐', '15元标准餐', '15元标准餐试餐', '15元标准餐（12元补贴）'],
      serviceCategoryList: ['居家保赠品', '配餐'],
      fullscreen: true,
      selectedLocation: this.$route.query.code && typeof this.$route.query.code !== 'string'
        ? this.$route.query.code.slice(1) : [], // 地区级联选中内容
      locationOptions: [], // 地区级联选择数据
      locationProps: {
        value: 'code',
        label: 'name',
        children: 'childs'
      },
      pageSize: 10, // 每页数量
      currentPage: 1, // 当前页数
      total: 0, // 总条数
      formData: {
        userName: '',
        phone: '',
        serviceOrderCard: '',
        orderPerson: '',
        orderCreateTimeBegin: '',
        orderCreateTimeEnd: '',
        streetCode: this.initCodeFromQuery(2),
        zoneCode: this.initCodeFromQuery(1),
        communityCode: this.initCodeFromQuery(3),
        serviceCategory: '',
        serviceOrderItem: '',
        payTimeStart: '',
        payTimeEnd: '',
        mealTimeStart: '',
        mealTimeEnd: ''
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
    },
    // 导出列表
    downloadExcel () {
      const Api = process.env.NODE_ENV === 'development' ? 'http://tianjin.aioc.dev.xjoycity.com:8204' : ''
      let data = `${Api}/yanglao-api/serviceOrderInfo/downloadExcel?`
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
      let startTime = formatTime(this.time ? this.time[0] : '')
      let endTime = formatTime(this.time ? this.time[1] : '')

      const codeParams = this.selectedLocation.length > 0
        ? Object.create(null) : this.userAuthCodeParams
      params = Object.assign({}, this.formData, {
        page: typeof page === 'number' ? page : 1,
        pageSize: this.pageSize,
        orderCreateTimeBegin: startTime ? startTime + ' 00:00:00' : '',
        orderCreateTimeEnd: endTime ? endTime + ' 23:59:59' : ''
      }, codeParams)

      return params
    },
    handleGetSearchValue (page) {
      this.isSearchLoading = true
      api.getOrderPage(this.requestParams(page)).then(res => {
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
      }).catch((err) => {
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
      this.currentPage = 1
      this.getOlderData()
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
    ListLayout
  }
}
</script>
<style >

</style>
