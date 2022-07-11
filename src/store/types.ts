import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'

export interface IRootState {
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootwithModule {
  login: ILoginState
  system: ISystemState
}

export type IStoreType = IRootState & IRootwithModule
