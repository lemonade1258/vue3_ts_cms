import { createStore } from 'vuex'

import { IRootState } from './types'

import login from './login/login'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'coderwhy',
      isShowLoading: false
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
})

export default store
