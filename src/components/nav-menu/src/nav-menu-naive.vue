<template>
  <n-space vertical>
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.png" alt="logo" />
      <span class="title" v-show="!collapse"> Vue3 + TS </span>
    </div>
    <n-layout class="n-layout" has-sider>
      <n-layout-sider
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-menu
          v-model:value="activeKey"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
        />
      </n-layout-sider>
    </n-layout>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, h, ref, Component } from 'vue'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
  DesktopOutline as SystemOverviewIcon,
  BuildOutline as SystemManageMentIcon,
  Bag as GoodsCenterIcon,
  ChatbubbleOutline as ProblemsHandingIcon
} from '@vicons/ionicons5'

import { toRef, computed } from 'vue'

import { useStore } from '@/store'

import { RouterLink } from 'vue-router'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: '系统总览',
    key: 'system-overview',
    icon: renderIcon(SystemOverviewIcon),
    type: 1,
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/main/analysis'
              }
            },
            { default: () => '核心技术' }
          ),
        type: 2,
        key: 'core-technology'
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/main/analysis/dashboard'
              }
            },
            { default: () => '商品统计' }
          ),
        key: 'commodity-statistics'
      }
    ]
  },
  {
    label: '系统管理',
    key: 'system-management',
    icon: renderIcon(SystemManageMentIcon),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/main/analysis/overview'
              }
            },
            { default: () => '用户管理' }
          ),
        key: 'user-management'
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/main/analysis/overview'
              }
            },
            { default: () => '部门管理' }
          ),
        key: 'department-management'
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/main/analysis/overview'
              }
            },
            { default: () => '菜单管理' }
          ),
        key: 'menu-management'
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/main/analysis/overview'
              }
            },
            { default: () => '角色管理' }
          ),
        key: 'role-management'
      }
    ]
  },
  {
    label: '商品中心',
    key: 'goods-center',
    icon: renderIcon(GoodsCenterIcon),
    type: 1,
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/main/product/category'
              }
            },
            { default: () => '商品类别' }
          ),
        type: 2,
        key: 'goods-category'
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/main/analysis/dashboard'
              }
            },
            { default: () => '商品信息' }
          ),
        key: 'goods-information'
      }
    ]
  },
  {
    label: '随便聊聊',
    key: 'problems-handing',
    icon: renderIcon(ProblemsHandingIcon),
    type: 1,
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/main/problems/reflect'
              }
            },
            { default: () => '问题反映' }
          ),
        type: 2,
        key: 'problems-reflect'
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/main/problems/list'
              }
            },
            { default: () => '问题列表' }
          ),
        key: 'problems-list'
      }
    ]
  }
]

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)
    console.log('userMenus', userMenus)

    console.log('props.collapse', props.collapse)
    const collapsed = toRef(props, 'collapse')

    console.log('menuOptions', menuOptions)

    return {
      activeKey: ref<string | null>(null),
      collapsed,
      menuOptions
    }
  }
})
</script>

<style scoped lang="less">
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
    color: black;

    margin-left: 20px;

    // 设置标题文字不可被选中
    -moz-user-select: none;

    -khtml-user-select: none;

    user-select: none;

    // 设置标题文字不换行
    white-space: nowrap;
  }
}

.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}
</style>
