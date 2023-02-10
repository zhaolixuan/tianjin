/* eslint-disable */
export default {
  state: {
    dialogVisible: false,
    orgName: -1,
    typeName: -1,
    keyword: '',
    hotWord: '',
    sortProperty: '',
    sortType: '',
    pageNo: 1,
    pageSize: 12

  },
  mutations: {
    setDialogVisible: function (state, value) {
      state.dialogVisible = value
    },
    setOrgName: function (state, value) {
      state.orgName = value
    },
    setTypeName: function (state, value) {
      state.typeName = value
    },
    setKeyword: function (state, value) {
      state.keyword = value
    },
    setHotword: function (state, value) {
      state.hotWord = value
    },
    setSortType: function (state, value) {
      state.sortType = value
    },
    setSortProperty: function (state, value) {
      state.sortProperty = value
    },
    setPageNo: function (state, value) {
      state.pageNo = value
    },

  },

}
