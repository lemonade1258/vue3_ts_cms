<template>
  <div class="nav-header">
    <n-icon size="30" @click="handleFoldClick">
      <Menu v-if="!isFold" />
      <MenuOutline v-if="isFold" />
    </n-icon>
    <div class="content">
      <hy-breadcrumb :breadcrumbs="breadcrumbs" />
      <UserInfo />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import { Menu, MenuOutline } from '@vicons/ionicons5'
import HyBreadcrumb from '@/base-ui/breadcrumb'

import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
  emits: ['foldChange'],
  components: { Menu, MenuOutline, UserInfo, HyBreadcrumb },
  setup(_propes, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    // 面包屑的数据: [{name, path}]
    const store = useStore()

    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return { handleFoldClick, isFold, Menu, MenuOutline, breadcrumbs }
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
