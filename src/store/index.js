/*
 * @Description:
 * @Author: tangjuncheng
 * @Date: 2019-12-11 09:45:01
 * @LastEditTime : 2019-12-24 10:40:27
 * @LastEditors  : tangjuncheng
 */
import Vue from 'vue'
import vuex from 'vuex'
import menuStore from './modules/menu_store'
import headerStore from './modules/header_store'
import bigproject from './modules/bigproject_store'
import quota from './modules/quota_store'
import olderStore from './modules/older_store'
import provideStore from './modules/provide_store'
import distributionStore from './modules/distribution_store'
import menuData from '../../static/json/menu.json'
Vue.use(vuex)

export default new vuex.Store({
  state: {
    menuData: menuData,
    activeKey: -1, // 顶部导航选中项
    activeName: '智慧河西综合管理平台',
    title: '智慧河西综合管理平台',
    navDialogVisible: false,
    code: ['120103011001', '120103011000'], // 河西区  天津市
    type: 1, // 类型：1：河西区 2：片区 3：街道 4：社区
    codeNew: ['', '120103000000'], // 河西区
    typeNew: 1, // 类型：1：河西区 2：片区 3：街道 4：社区
    positionList: null,
    activeIndex: -1,
    activeMenu: '',
    // codeNew: ['120103001000', '120103000000'], //  大营门街道 河西区
    // typeNew: 3, // 类型：1：河西区 2：片区 3：街道 4：社区

    // codeNew: ['120103010004', '120103010000'], //  天山里社区 陈塘庄街道 河西区
    // typeNew:4, // 类型：1：河西区 2：片区 3：街道 4：社区
    userType: 1,
    userName: '',
    clickName: '',
    regionName: '' // 旧版本
  },
  // 注入其它模块 其它模块可以有自己的 state getters actions mutations
  modules: {
    menuStore,
    headerStore,
    bigproject,
    quota,
    olderStore,
    provideStore,
    distributionStore
  },
  getters: {
    code: (state) => state.code,
    type: (state) => state.type,
    codeNew: (state) => state.codeNew,
    typeNew: (state) => state.typeNew,
    userType: (state) => state.userType,
    userName: (state) => state.userName,
    clickName: (state) => state.clickName,
    regionName: (state) => state.regionName, // 旧版本
    activeIndex: (state) => state.activeIndex,
    activeMenu: (state) => state.activeMenu,
    menuData: (state) => state.menuData,
    
  },
  // 更改state状态
  mutations: {
    setActiveMenu (state, value) {
      this.state.activeMenu = value
    },
    setActiveIndex (state, value) {
      this.state.activeIndex = value
    },
    setPositionList: function (state, value) {
      this.state.positionList = value
    },
    setMenuData: function (state, value) {
      this.state.menuData = value
    },
    setActiveKey (state, value) {
      state.activeKey = value
    },
    setActiveName (state, value) {
      state.activeName = value
    },
    setNavDialogVisible (state, value) {
      state.navDialogVisible = value
    },
    setCode (state, value) {
      state.code = value
    },
    setType (state, value) {
      state.type = value
    },
    setCodeNew (state, value) {
      state.codeNew = value
    },
    setTypeNew (state, value) {
      state.typeNew = value
    },
    setUserType (state, value) {
      state.userType = value
    },
    setUserName (state, value) {
      state.userName = value
    },
    setClickName (state, value) {
      state.clickName = value
    },
    setRegionName (state, value) { // 旧版本
      state.regionName = value
    }
  },
  // 存放异步请求函数
  actions: {},
})
