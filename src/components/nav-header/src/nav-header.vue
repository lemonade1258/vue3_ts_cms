<template>
  <div class="nav-header">
    <n-icon size="30" @click="handleFoldClick">
      <Menu v-if="!isFold" />
      <MenuOutline v-if="isFold" />
    </n-icon>
    <div class="content">
      <div class="contentBreadcrumb">面包屑</div>
      <UserInfo />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserInfo from './user-info.vue'
import { Menu, MenuOutline } from '@vicons/ionicons5'

export default defineComponent({
  emits: ['foldChange'],
  components: { Menu, MenuOutline, UserInfo },
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
  display: flex;
  width: 100%;

  .n-icon {
    cursor: pointer;
    margin-left: 2px;
    margin-top: 0px;
  }

  .content {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    flex: 1;
    padding: 0 20px;
    margin-top: 2px;

    .contentBreadcrumb {
      margin-top: 2px;
    }
  }
}
</style>
