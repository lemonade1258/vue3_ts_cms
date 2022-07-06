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
        style="margin: 0 -4px"
        pane-style="padding-left: 40px; padding-right: 40px; box-sizing: border-box;"
      >
        <n-tab-pane name="signin" tab="登录">
          <n-form>
            <n-form-item-row label="用户名">
              <n-input v-model:value="account.name" />
            </n-form-item-row>
            <n-form-item-row label="密码">
              <n-input v-model:value="account.password" />
            </n-form-item-row>
          </n-form>
          <n-button type="primary" block secondary strong> 登录 </n-button>
        </n-tab-pane>
        <n-tab-pane name="signup" tab="注册">
          <n-form>
            <n-form-item-row label="用户名">
              <n-input />
            </n-form-item-row>
            <n-form-item-row label="密码">
              <n-input />
            </n-form-item-row>
            <n-form-item-row label="重复密码">
              <n-input />
            </n-form-item-row>
          </n-form>
          <n-button type="primary" block secondary strong> 注册 </n-button>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const account = reactive({
      name: '',
      password: ''
    })

    return {
      account
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
</style>
