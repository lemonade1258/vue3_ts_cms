import { FormItemRule, FormRules } from 'naive-ui'

// 编写规则
export const rules: FormRules = {
  name: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        console.log('value', value)
        if (!value) {
          return new Error('需要用户名')
        } else if (!/^[a-z0-9]{5,10}$/.test(value)) {
          return new Error('用户名必须是5-10个字母或数字')
        }
        return true
      },
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        console.log('value', value)
        if (!value) {
          return new Error('请输入密码')
        } else if (!/^[a-z0-9]{5,}$/.test(value)) {
          return new Error('密码必须是5位以上字母或数字')
        }
        return true
      },
      trigger: 'blur'
    }
  ],
  reenteredPassword: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('请再次输入密码')
        }
        // else if (value !== account.value.password) {
        //   return new Error('两次密码输入不一致')
        // }
      },
      trigger: ['input', 'blur']
    }
  ]
}
