<template>
  <div class="login">
    <div class="panel">
      <login-panel />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './cpns/login-panel.vue'

export default defineComponent({
  components: {
    LoginPanel
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/loginBackGround.webp');
  background-repeat: no-repeat;
  background-size: cover;
}
.panel {
  /* background-color: black; */
  display: flex;
}
</style>
