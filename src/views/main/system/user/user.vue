<template>
  <div class="user">
    <div class="seach">
      <hy-form v-bind="searchFormConfig" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HyForm from '@/base-ui/form'

import { searchFormConfig } from './config/seach.config'

export default defineComponent({
  name: 'user',
  components: {
    HyForm
  },
  setup() {
    return { searchFormConfig }
  }
})
</script>

<style scoped></style>
