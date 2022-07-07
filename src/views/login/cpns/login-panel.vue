<template>
  <div class="login-panel">
    <h1 class="title">
      <n-gradient-text
        class="text"
        :gradient="{
          deg: 180,
          from: 'rgb(85, 85, 85)',
          to: 'rgb(170, 170, 170)'
        }"
      >
        后台管理系统
      </n-gradient-text>
    </h1>
    <n-card>
      <n-tabs
        class="card-tabs"
        default-value="signin"
        size="large"
        animated
        style="margin: 0 4px"
        pane-style="padding-left: 40px; padding-right: 40px; box-sizing: border-box;"
      >
        <n-tab-pane name="signin" tab="登录">
          <n-form
            :rules="rules"
            :model="account"
            ref="formRef"
            :show-require-mark="false"
          >
            <n-form-item-row label="用户名" path="name">
              <n-input v-model:value="account.name" />
            </n-form-item-row>
            <n-form-item-row label="密码" path="password">
              <n-input
                v-model:value="account.password"
                type="password"
                show-password-on="click"
                ><template #password-visible-icon>
                  <n-icon :size="16" :component="GlassesOutline" />
                </template>
                <template #password-invisible-icon>
                  <n-icon :size="16" :component="Glasses" />
                </template>
              </n-input>
            </n-form-item-row>
          </n-form>
          <div class="account-control">
            <n-checkbox v-model:checked="isKeepPassword"> 记住密码 </n-checkbox>
            <n-button
              text
              tag="a"
              href="https://anyway.fm/news.php"
              target="_blank"
              type="primary"
            >
              忘记密码
            </n-button>
          </div>
          <n-button
            type="primary"
            block
            secondary
            strong
            @click="handeleLoginClick"
          >
            登录
          </n-button>
        </n-tab-pane>
        <n-tab-pane name="signup" tab="注册">
          <n-form :rules="rules" :model="account">
            <n-form-item-row label="用户名" path="name">
              <n-input v-model:value="account.name" />
            </n-form-item-row>
            <n-form-item-row label="密码" path="password">
              <n-input
                v-model:value="account.password"
                type="password"
                show-password-on="click"
                ><template #password-visible-icon>
                  <n-icon :size="16" :component="GlassesOutline" />
                </template>
                <template #password-invisible-icon>
                  <n-icon :size="16" :component="Glasses" />
                </template>
              </n-input>
            </n-form-item-row>
            <n-form-item-row label="重复密码" path="reenteredPassword">
              <n-input
                v-model:value="account.reenteredPassword"
                type="password"
                show-password-on="click"
                ><template #password-visible-icon>
                  <n-icon :size="16" :component="GlassesOutline" />
                </template>
                <template #password-invisible-icon>
                  <n-icon :size="16" :component="Glasses" />
                </template>
              </n-input>
            </n-form-item-row>
          </n-form>
          <n-button type="primary" block secondary strong> 注册 </n-button>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<script lang="ts">
import { Glasses, GlassesOutline } from '@vicons/ionicons5'
import { FormItemRule, FormRules, FormInst, useMessage } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import localCache from '@/utils/cache'

interface ModelType {
  name: string | null
  password: string | null
  reenteredPassword: string | null
}

export default defineComponent({
  setup() {
    // 定义数据结构
    const account = ref<ModelType>({
      name: localCache.getCache('name') ?? null,
      password: localCache.getCache('password') ?? null,
      reenteredPassword: null
    })

    const formRef = ref<FormInst | null>(null)

    // 定义弹窗组件
    const message = useMessage()

    // 定义登录按钮绑定函数
    const handeleLoginClick = (e: MouseEvent) => {
      console.log('立即登录')
      e.preventDefault()
      formRef.value?.validate((errors) => {
        if (!errors) {
          if (isKeepPassword.value) {
            // 本地缓存
            console.log('记住密码')
            localCache.setCache('name', account.value.name)
            localCache.setCache('password', account.value.password)
          } else {
            console.log('记不住密码')
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }

          message.success('登录成功！')
        } else {
          if (isKeepPassword.value) {
            // 本地缓存
            console.log('记住密码')
            localCache.setCache('name', account.value.name)
            localCache.setCache('password', account.value.password)
          } else {
            console.log('记不住密码')
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          console.log(errors)
          message.error('账号或密码错误,请检查后重试～')
        }
      })
    }

    // 编写规则
    const rules: FormRules = {
      name: [
        {
          required: true,
          validator(rule: FormItemRule, value: string) {
            // console.log('value', value)
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
            } else if (value !== account.value.password) {
              return new Error('两次密码输入不一致')
            }
          },
          trigger: ['input', 'blur']
        }
      ]
    }

    // 记住密码复选框
    const isKeepPassword = ref(false)

    return {
      account,
      rules,
      isKeepPassword,
      handeleLoginClick,
      formRef,
      message,
      GlassesOutline,
      Glasses
    }
  }
})
</script>

<style scoped>
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: aqua; */
  margin: 10 40;

  -webkit-user-select: none;

  -moz-user-select: none;

  -ms-user-select: none;

  user-select: none;
}

.login-panel {
  width: 340px;
  height: 500px;
}

.account-control {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
