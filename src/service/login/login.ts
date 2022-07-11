import hyRequest from '../index'

import { IAccount, ILoginResult } from './types'

import { IDataType } from '../types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法users/id
  UserMenus = 'role/' // 用法/role/id/menu
}

// 登录获取
export function accountLoginRequest(account: IAccount) {
  // console.log('LoginAPI.AccountLogin', LoginAPI.AccountLogin)
  // console.log('data', account)
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

// 获取用户信息
export function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id
  })
}

// 获取用户菜单
export function requestUserMenusByRoleId(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
