<template>
  <div>Main</div>
  <el-button>I am ElButton</el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

export default defineComponent({
  components: { ElButton },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
