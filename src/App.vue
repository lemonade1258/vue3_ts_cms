<template>
  <div class="app">
    <!-- <h2>{{ $store.state.name }}</h2> -->

    <router-link to="/login">登录</router-link>
    <router-link to="/main">首页</router-link>
    <div>
      <router-view></router-view>
    </div>
    <n-button type="tertiary"> Tertiary </n-button>
    <n-button type="primary"> Primary </n-button>
  </div>
  <loading v-show="$store.state.isShowLoading"></loading>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import loading from './components/loading.vue'

export default defineComponent({
  name: 'App',
  components: { loading },
  setup() {
    return {}
  }
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
