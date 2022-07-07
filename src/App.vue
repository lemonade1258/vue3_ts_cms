<template>
  <n-message-provider>
    <router-view></router-view>
  </n-message-provider>

  <!-- <loading v-show="$store.state.isShowLoading"></loading> -->
  <!-- <loading :v-show="true"></loading> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import loading from './components/loading.vue'

export default defineComponent({
  name: 'App',
  // eslint-disable-next-line vue/no-unused-components
  components: { loading },
  setup() {
    return {}
  }
})
</script>

<style lang="less"></style>
