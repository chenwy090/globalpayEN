import * as types from '../types'
const state = {
  loginStatus: !!localStorage.getItem('loginStatus') || false
}

const actions = {
  setUserInfo ({ commit }, res) {
    localStorage.setItem('loginStatus', true)
    commit(types.SET_LOGIN_STATUS, true)
  },
  setSignOut ({ commit }) {
    localStorage.removeItem('loginStatus')
    commit(types.SET_LOGIN_STATUS, false)
  }
}

const getters = {
  loginStatus: state => state.loginStatus
}

const mutations = {
  [types.SET_LOGIN_STATUS] (state, status) {
    state.loginStatus = status
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
