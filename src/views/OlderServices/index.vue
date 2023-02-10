<template>
  <list-layout
    :crumbData="[{ title: '服务老人', url: '' }]"
    :columns="columns"
    :tableData="tableData"
    :total="total"
    :pageSize="pageSize"
    :currentPage="currentPage"
    v-on:getSearchValue="handleGetSearchValue"
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
          v-model.trim="formData.idCard"
          clearable
          @keyup.enter.native="getSearchValue"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="民族" class="search_select">
        <el-select v-model="formData.nation" clearable placeholder="请选择民族">
          <template v-for="(i,index) in nationalData">
            <el-option :label="i" :value="i" :key="index"></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期" class="search_select">
        <el-select
          v-model="birthdayMonth"
          clearable
          placeholder="月份"
          class="input_num"
          @change="handleChangeMonth"
        >
          <template v-for="i in 12">
            <el-option :label="i" :value="i" :key="'month_'+i"></el-option>
          </template>
        </el-select>
        <span>-</span>
        <el-select
          v-model="birthdayDay"
          clearable
          placeholder="日期"
          class="input_num"
          @change="handleChangeDay"
        >
          <template v-for="i in monthLength">
            <el-option :label="i" :value="i" :key="'day_'+i"></el-option>
          </template>
        </el-select>
      </el-form-item>
        <el-form-item label="年龄段" class="search_select">
          <el-input
            class="input_num"
            placeholder="起始年龄"
            v-model="formData.ageFrom"
            @change="handleChangeStartAge"
          />
          <span>-</span>
          <el-input
            class="input_num"
            placeholder="截止年龄"
            v-model="formData.ageTo"
            @change="handleChangeEndAge"
          />
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
      <el-form-item label="所属服务点" class="search_select">
        <el-input
          class="head_left"
          placeholder="请输入所属服务点"
          v-model.trim="formData.service"
          clearable
          @keyup.enter.native="getSearchValue"
        >
        </el-input>
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
import Header from '@/components/Header/index'
import PageHeader from '../ProvideAged/components/PageHeader/index.vue'
import BreadCrumb from '@/components/BreadCrumb/index'
import Navigation from '@/components/Navigation/index'
import ListLayout from '../ServiceBusiness/components/layout.vue'
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
        { label: '姓名', prop: 'name' },
        { label: '性别', prop: 'sex' },
        { label: '身份证号码', prop: 'idcardNumber' },
        { label: '民族', prop: 'localNation' },
        { label: '本人联系方式', prop: 'emergencyPhone' },
        { label: '出生日期', prop: 'birthday' },
        { label: '年龄', prop: 'age' },
        { label: '所属服务点', prop: 'servicePoint' },
        { label: '详细地址', prop: 'address' }
      ],
      tableData: [],
      nationalData: ['汉族', '蒙古族', '满族', '朝鲜族', '赫哲族', '达斡尔族', '鄂温克族', '鄂伦春族',
        '回族', '东乡族', '土族', '撒拉族', '保安族', '裕固族', '维吾尔族', '哈萨克族', '柯尔克孜族',
        '锡伯族', '塔吉克族', '乌孜别克族', '俄罗斯族', '塔塔尔族', '藏族', '门巴族', '珞巴族', '羌族',
        '彝族', '白族', '哈尼族', '傣族', '僳僳族', '佤族', '拉祜族', '纳西族', '景颇族', '布朗族',
        '阿昌族', '普米族', '怒族', '德昂族', '独龙族', '基诺族', '苗族', '布依族', '侗族', '水族',
        '仡佬族', '壮族', '瑶族', '仫佬族', '毛南族', '京族', '土家族', '黎族', '畲族', '高山族'
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
      birthdayMonth: '', // 出生月份
      birthdayDay: '', // 出生日期
      formData: {
        name: '',
        idCard: '',
        service: '',
        sex: '',
        ageFrom: '',
        ageTo: '',
        birthday: '',
        districtCode: this.initCodeFromQuery(1),
        streetCode: this.initCodeFromQuery(2),
        communityCode: this.initCodeFromQuery(3),
        nation: ''
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
        districtCode: '',
        communityCode: ''
      }
      let urlCodeParams = {}
      if (this.userType === 2) {
        urlCodeParams = { districtCode: this.initCodeFromQuery(1) }
      }
      if (this.userType === 3) {
        urlCodeParams = { streetCode: this.initCodeFromQuery(2) }
      }
      if (this.userType === 4) {
        urlCodeParams = { communityCode: this.initCodeFromQuery(3) }
      }

      return Object.assign({}, params, urlCodeParams)
    },
    monthLength () {
      if (this.birthdayMonth === 2) {
        return 28
      } else {
        return 31
      }
    },
    downloadExcel () {
      const Api = process.env.NODE_ENV === 'development' ? 'http://tianjin.aioc.dev.xjoycity.com:8204' : ''
      let data = `${Api}/yanglao-api/basePersonSecond/downloadExcel?`
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
    this.$store.commit('setActiveName', '服务老人')
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

      return params
    },
    handleChangeMonth (value) {
      this.birthdayMonth = value ? (value > 9 ? value : '0' + value) : ''
      this.formData.birthday = this.birthdayDay && this.birthdayMonth ? `${this.birthdayMonth}${this.birthdayDay}` : ''
    },
    handleChangeDay (value) {
      let day = value ? (value > 9 ? value : '0' + value) : ''
      this.birthdayDay = day
      let month = this.birthdayMonth
        ? this.birthdayMonth : ''
      this.formData.birthday = day && month ? `${month}${day}` : ''
    },
    handleChangeStartAge (value) {
      this.formData.ageFrom = isNaN(parseInt(value)) ? '' : parseInt(value)
    },
    handleChangeEndAge (value) {
      this.formData.ageTo = isNaN(parseInt(value)) ? '' : parseInt(value)
    },
    // 分页器切换
    handleGetSearchValue (page) {
      this.isSearchLoading = true
      api.getOlderServies(this.requestParams(page)).then(res => {
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
      if (this.$store.state.userType === '3') {
        this.formData.streetCode = value[0] || ''
        this.formData.communityCode = value[1] || ''
      } else if (this.$store.state.userType === '4') {
        this.formData.communityCode = value[0] || ''
      } else {
        this.formData.districtCode = value[0] || ''
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
        ageFrom: '',
        ageTo: '',
        birthday: '',
        districtCode: '',
        streetCode: '',
        communityCode: '',
        nation: '',
        name: '',
        idCard: '',
        service: ''
      }
      this.birthdayMonth = ''
      this.birthdayDay = ''
      this.selectedLocation = []
    }
  },
  components: {
    Header,
    PageHeader,
    BreadCrumb,
    Navigation,
    ListLayout
  }
}
</script>
