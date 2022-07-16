<template>
  <div class="nav-header">
    <n-icon size="30" @click="handleFoldClick">
      <Menu v-if="!isFold" />
      <MenuOutline v-if="isFold" />
    </n-icon>
    <div>{{ isFold }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { Menu, MenuOutline } from '@vicons/ionicons5'

export default defineComponent({
  emits: ['foldChange'],
  components: { Menu, MenuOutline },
  setup(propes, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    return { handleFoldClick, isFold, Menu, MenuOutline }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  .n-icon {
    cursor: pointer;
    background-color: red;
  }
}
</style>
