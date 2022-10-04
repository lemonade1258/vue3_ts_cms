import { Module } from 'vuex'

import { IAccount } from '@/service/login/types'
import { ILoginState } from './types'
import { IRootState } from '../types'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import LocalCache from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // console.log('userMenus', userMenus)
      const routes = mapMenusToRoutes(userMenus)

      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  getters: {},
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.实现登录逻辑
      // console.log('执行accountLoginAction', payload)
      const loginResult = await accountLoginRequest(payload)
      // console.log('loginResult', loginResult)
      // console.log('loginResult.data', loginResult.data)
      const { id, token } = loginResult.data
      // console.log('id', id)
      // console.log('token', token)
      commit('changeToken', token)
      LocalCache.setCache('token', token)

      dispatch('getInitialDataAction', null, { root: true })

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      console.log('userInfoResult', userInfoResult)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      LocalCache.setCache('userinfo', userInfo)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      LocalCache.setCache('userMenus', userMenus)
      console.log('userMenus', userMenus)

      // 4.跳到首页
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = LocalCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = LocalCache.getCache('userinfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = LocalCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
