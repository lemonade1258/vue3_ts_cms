<template>
  <div class="main">
    <n-layout has-sider class="main-content">
      <n-layout-sider
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="isCollapse"
      >
        <nav-menu :collapse="isCollapse" />
      </n-layout-sider>
      <n-layout class="page">
        <n-layout-header class="page-header">
          <nav-header @foldChange="handleFoldChange" />
        </n-layout-header>
        <n-layout-content content-style="padding: 24px;" class="page-content">
          平山道
        </n-layout-content>
        <n-layout-footer>成府路</n-layout-footer>
      </n-layout>
    </n-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import navMenu from '@/components/nav-menu'
import navHeader from '@/components/nav-header'

export default defineComponent({
  components: { navMenu, navHeader },
  setup() {
    const isCollapse = ref(false)
    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return { handleFoldChange, isCollapse }
  }
})
</script>

<style scoped lang="less">
.main {
  position: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: aqua;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);
}
.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}

.n-layout-header,
.n-layout-footer {
  display: flex;
  color: rgb(176, 110, 110);
  text-align: center;
  align-items: center;
}
</style>
