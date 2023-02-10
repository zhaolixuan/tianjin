import { getPersonInfo } from '@/views/Distribution/apis/index.js'

export default {
  state: {
    distribution: {
      subsidiesOldMap: [],
      allowanceDistributioMap: [],
      medicalDistributioMap: [],
      serverOldPersonDistributioMap: [],
      serverOrderDistributioMap: [],
      dayCareDistributioMap: [],
      pensionaddressDistributioMap: []
    }
  },
  getters: {
    subsidiesOldMap: (state) => state.distribution.subsidiesOldMap,
    allowanceMap: (state) => state.distribution.allowanceDistributioMap,
    medicalMap: (state) => state.distribution.medicalDistributioMap,
    serverOldPersonMap: (state) => state.distribution.serverOldPersonDistributioMap,
    serverOrderMap: (state) => state.distribution.serverOrderDistributioMap,
    dayCareMap: (state) => state.distribution.dayCareDistributioMap,
    pensionaddressMap: (state) => state.distribution.pensionaddressDistributioMap
  },
  actions: {
    async getPersonInfo ({ commit }, params) {
      const res = await getPersonInfo(params)

      commit('SET_DISTRIBUTION', res.data)
    }
  },
  mutations: {
    SET_DISTRIBUTION (state, distribution) {
      state.distribution = distribution
    }
  }
}
