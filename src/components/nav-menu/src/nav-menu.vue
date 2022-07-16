<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.png" alt="logo" />
      <span class="title" v-if="!collapse"> Vue3 + TS </span>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical"
      :collapse="collapse"
      :collapse-transition="true"
      :unique-opened="false"
      background-color="#041527"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单的可以展开的标题 -->
          <el-sub-menu class="el-sub-menu" :index="item.id + ''">
            <template #title>
              <n-icon>
                <DesktopOutline v-if="item.name == '系统总览'" />
                <BuildOutline v-else-if="item.name == '系统管理'" />
                <Bag v-else-if="item.name == '商品中心'" />
                <ChatbubbleOutline v-else-if="item.name == '随便聊聊'" />
              </n-icon>
              <span class="word">{{ item.name }}</span>
            </template>
            <!-- 遍历里面的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''">
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import {
  DesktopOutline,
  BuildOutline,
  Bag,
  ChatbubbleOutline
} from '@vicons/ionicons5'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  components: { DesktopOutline, BuildOutline, Bag, ChatbubbleOutline },
  setup() {
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)
    console.log('userMenus', userMenus)

    return {
      userMenus,
      DesktopOutline,
      BuildOutline,
      Bag,
      ChatbubbleOutline
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  // overflow-y: hidden;
  // background-color: #001529;
  background-color: aliceblue;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    // background-color: red;

    .img {
      height: 100%;
      margin: 0 10px;
      // background-color: bisque;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;

      -moz-user-select: none;

      -khtml-user-select: none;

      user-select: none;

      // font-style: italic;
      // background-color: aqua;
      // width: fit-content;
      // color: antiquewhite;
    }
  }

  .el-menu-vertical {
    border-right: none;
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;
    // overflow-x: none;
    white-space: nowrap;
    background-color: red;
  }

  // 滚动条宽度设为0，即隐藏滚动条，对webkit内核支持较好
  .el-menu-vertical::-webkit-scrollbar {
    width: 0;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
