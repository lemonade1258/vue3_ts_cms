type IFormtype = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  type: IFormtype
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊属性
  otherOptions?: any
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  itemStyle: any
  colLayout: any
}
