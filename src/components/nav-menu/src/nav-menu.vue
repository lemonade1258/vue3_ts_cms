<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.png" alt="logo" />
      <transition name="lemon">
        <span class="title" v-if="!collapse"> Vue3 + TS </span>
      </transition>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical"
      :collapse="collapse"
      :collapse-transition="true"
      :unique-opened="false"
      background-color="c0c0c0"
      text-color="black"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单的可以展开的标题 -->
          <el-sub-menu class="el-sub-menu" :index="item.id + ''">
            <template #title>
              <n-icon class="icon">
                <DesktopOutline v-if="item.name == '系统总览'" />
                <BuildOutline v-else-if="item.name == '系统管理'" />
                <Bag v-else-if="item.name == '商品中心'" />
                <ChatbubbleOutline v-else-if="item.name == '随便聊聊'" />
              </n-icon>
              <span class="word">{{ item.name }}</span>
            </template>
            <!-- 遍历里面的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handelMenuItemClick(subitem)"
              >
                <span class="innerWord">{{ subitem.name }}</span>
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
import { useRouter } from 'vue-router'

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

    const router = useRouter()

    const handelMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }

    return {
      userMenus,
      DesktopOutline,
      BuildOutline,
      Bag,
      ChatbubbleOutline,
      handelMenuItemClick
    }
  }
})
</script>

<style scoped lang="less">
// 动画效果
.lemon-enter-active {
  animation: bounce 1s ease;
}

@keyframes bounce {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

.word {
  margin-left: 35px;
  letter-spacing: 6px;
  font-size: 15px;
}

.innerWord {
  margin-left: 40px;
}

.nav-menu {
  height: 100%;
  background-color: c0c0c0;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: black;
      margin-left: 20px;

      -moz-user-select: none;

      -khtml-user-select: none;

      user-select: none;
    }
  }

  .el-menu-vertical {
    border-right: none;
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;
    white-space: nowrap;
    background-color: c0c0c0;
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

.icon {
  margin-left: 5px;
}
</style>
