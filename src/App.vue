<template>
  <router-view></router-view>

  <!-- <loading v-show="$store.state.isShowLoading"></loading> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import loading from './components/loading.vue'

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    return {}
  }
})
</script>

<style lang="less"></style>
