<template>
  <div>
    <div class="user-info">
      <el-dropdown class="dropdown">
        <span class="el-dropdown-link">
          <el-avatar
            size="small"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          />
          <span id="dropdownName">{{ name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
            <el-dropdown-item divided>用户信息</el-dropdown-item>
            <el-dropdown-item>系统管理</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)

    return { name }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-black);
  display: flex;
  align-items: center;

  #dropdownName {
    margin-left: 5px;
  }
}
</style>
