import {
  getOldBasePersonInfo,
  getBaseServiceOrderPersonInfo,
  getBaseMedicalInfo,
  getUrgentneedInfo,
  getBaseMealInfo,
  getUserInfo,
  getCommunityByUserId,
  getBaseCommunityInfo,
  getOperatingDay
} from '@/views/ProvideAged/apis/index.js'
import { setLocalItem } from '@/utils/utils.js'

const formatBaseInfo = (baseInfo) => ({
  oldBodyDstributionMap: baseInfo.oldBodyDstributionMap || {},
  oldMonthlyDstributionMap: baseInfo.oldMonthlyDstributionMap || {},
  oldSexDstributionList: baseInfo.oldSexDstributionList || [],
  returnEducationmap: baseInfo.returnEducationmap || {},
  returnBaseTotalmap: baseInfo.returnBaseTotalmap || {},
  returnSourcemap: baseInfo.returnSourcemap || {}
})

const formatMedicalInfo = (medicalInfo) => ({
  baseMedicalMap: medicalInfo.baseMedicalMap || {},
  medicalInsuranceMap: medicalInfo.medicalInsuranceMap || {},
  medicalServiceMap: medicalInfo.medicalServiceMap || {
    medicalSitesTotal: 0,
    accompanyDoctorTotal: 0,
    medicalubstituteTotal: 0,
    medicalOtherTotal: 0,
    medicalServiceDoorTotal: 0
  },
  medicalImportInfoMap: medicalInfo.medicalImportInfoMap || {},
  overYearMedicalExpendMap: medicalInfo.overYearMedicalExpendMap || {}
})

// 养老服务指标信息
const formatUrgentneedInfo = (UrgentneedInfo) => ({
  urgentneedServiceMap: UrgentneedInfo.urgentneedServiceMap || {},
  mealTimeMap: UrgentneedInfo.mealTimeMap || {},
  medicalServiceMap: UrgentneedInfo.medicalServiceMap || {},
  paidProvisionMap: UrgentneedInfo.paidProvisionMap || {},
  purchasedMap: UrgentneedInfo.purchasedMap || {},
  feeServiceMap: UrgentneedInfo.feeServiceMap || {}
})

// 助餐指标信息
const formMealInfo = (MealInfo) => ({
  isPayMap: MealInfo.isPayMap || {},
  mealStyleMap: MealInfo.mealStyleMap || {},
  mealTimeMap: MealInfo.mealTimeMap || {},
  mealDayMap: MealInfo.mealDayMap || {},
  mealMeachantMap: MealInfo.mealMeachantMap || {},
  mealPriceMap: MealInfo.mealPriceMap || {},
  mealsEveryCountMap: MealInfo.mealsEveryCountMap || {}
})

export default {
  state: {
    baseInfo: formatBaseInfo({}),
    medicalInfo: formatMedicalInfo({}),
    perInfo: {
      dayCenterMap: {},
      mealsNumMap: [],
      serviceItemMap: [],
      serviceTypeMap: {},
      serviceOrderNumMap: {}
    },
    UrgentneedInfo: formatUrgentneedInfo({}),
    MealInfo: formatUrgentneedInfo({}),
    communities: [],
    breadCrumbCodes: [],
    operatingData: [],
    useName: null
  },
  getters: {
    baseInfo: (state) => state.baseInfo,
    medicalInfo: (state) => state.medicalInfo,
    communities: (state) => state.communities,
    MealInfo: (state) => state.MealInfo,
    UrgentneedInfo: (state) => state.UrgentneedInfo,
    breadCrumbCodes: (state) => state.breadCrumbCodes,
    operatingData: (state) => state.operatingData,
    perInfo: (state) => state.perInfo,
    useName: (state) => state.useName
  },

  actions: {
    async getUserAuthInfo({
      commit,
      dispatch
    }) {
      const userInfo = await getUserInfo() // 120103010000 陈塘庄街道登录之后是 id 是40
      console.log('2');

      // 10月27日受下面这个接口影响造成了
      // 1 不用街道用户登录展示的还是全区的地图
      // 2 点击其它页面返回到 olderDistribution 路由时候地图不展现
      // 3 目录中点击 呼叫中心(由居家养老服务\r运营管理变为 呼叫中心)跳转链接地址不对

      // 黎姐指出之后 我又看了下 是这个接口 返回的 data 为空串 也就是说拿到 40 作为形参请求 结果是 data 为空串
      // 所以 community 为空串 自然而然就没有 下面的带有 community 的操作 正常的话 community 应该是一个包含下
      // 面 commit(提交修改数据的函数)属性的对象
      // 这个接口在正式环境是能够返回一个对象的

      const community = await getCommunityByUserId(userInfo.data.id)
      // 12月20日新增
      setLocalItem('setCode', community.data.parentCode);
      commit('setName', userInfo.data.name)
      commit('setType', community.data.type)
      commit('setUserType', community.data.type)
      commit('setUserName', community.data.name)
      commit('setCode', [community.data.code, community.data.parentCode])
      commit('setTypeNew', community.data.type)
      commit('setCodeNew', [community.data.code, community.data.parentCode])
      // dispatch('getBaseCommunityInfo')
    },
    async getBaseCommunityInfo({
      commit
    }) {
      const res = await getBaseCommunityInfo()
      commit('SET_COMMUNITIES', res.data)
    },
    async getOperatingDay({
      commit
    }, params) {
      const res = await getOperatingDay(params)
      commit('SET_OPERATING', res.data)
    },
    // store中actions中定义的异步函数 函数中调用 getOldBasePersonInfo(接口在ProvideAged/apis/index.js中)
    // getOldBasePersonInfo 作用是获取老人年基础信息; 使用这个 getOldBaseInfo 如下描述
    // 比如在 OlderDistribution/index.vue 中 this.$store.dispatch("getOldBaseInfo", this.params);
    async getOldBaseInfo({
      commit
    }, params) {
      const res = await getOldBasePersonInfo(params)
      commit('SET_BASE_INFO', res.data)
    },
    async getBaseMedicalInfo({
      commit
    }, params) {
      const res = await getBaseMedicalInfo(params)
      commit('SET_MEDICAL_INFO', res.data)
    },
    async getOrderPersonInfo({
      commit
    }, params) {
      const res = await getBaseServiceOrderPersonInfo(params)
      commit('SET_PER_INFO', res.data)
    },
    async getUrgentneedInfo({
      commit
    }, params) {
      const res = await getUrgentneedInfo(params)
      commit('SET_URGENTNEED_INFO', res.data)
    },
    async getBaseMealInfo({
      commit
    }, params) {
      const res = await getBaseMealInfo(params)
      commit('SET_MEAL_INFO', res.data)
    }
  },

  mutations: {
    SET_OPERATING(state, operating) {
      state.operatingData = operating
    },
    SET_BASE_INFO(state, baseInfo) {
      state.baseInfo = formatBaseInfo(baseInfo)
    },
    SET_MEDICAL_INFO(state, medicalInfo) {
      state.medicalInfo = formatMedicalInfo(medicalInfo)
    },
    SET_PER_INFO(state, perInfo) {
      state.perInfo = {
        dayCenterMap: perInfo.dayCenterMap || {},
        serviceItemMap: perInfo.serviceItemMap || [],
        serviceTypeMap: perInfo.serviceTypeMap || {},
        serviceOrderNumMap: perInfo.serviceOrderNumMap || {},
        mealsNumMap: perInfo.mealsNumMap || []
      }
    },
    SET_COMMUNITIES(state, communities) {
      state.communities = communities
    },
    SET_URGENTNEED_INFO(state, Urgentneed) {
      state.UrgentneedInfo = formatUrgentneedInfo(Urgentneed)
    },
    SET_MEAL_INFO(state, MealInfo) {
      state.MealInfo = formMealInfo(MealInfo)
    },
    SET_BREAD_CRUMB_CODES(state, codes) {
      state.breadCrumbCodes = codes
    },
    setName(state, userName) {
      state.useName = userName
    }
  }
}
