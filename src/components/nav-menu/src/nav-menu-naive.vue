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
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
  DesktopOutline as SystemOverviewIcon,
  BuildOutline as SystemManageMentIcon
} from '@vicons/ionicons5'

import { toRef, computed } from 'vue'

import { useStore } from '@/store'

import { RouterLink } from 'vue-router'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon)
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
    disabled: true,
    children: [
      {
        label: '鼠',
        key: 'rat'
      }
    ]
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    disabled: true,
    icon: renderIcon(BookIcon)
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon(BookIcon),
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
            icon: renderIcon(PersonIcon)
          },
          {
            label: '羊男',
            key: 'sheep-man',
            icon: renderIcon(PersonIcon)
          }
        ]
      },
      {
        label: '饮品',
        key: 'beverage',
        icon: renderIcon(WineIcon),
        children: [
          {
            label: '威士忌',
            key: 'whisky'
          }
        ]
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich'
          }
        ]
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes'
      }
    ]
  },
  {
    label: '系统总览',
    key: 'system-overview',
    icon: renderIcon(SystemOverviewIcon),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: 'main/analysis/overview'
              }
            },
            { default: () => '核心技术' }
          ),
        key: 'core-technology'
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: 'main/analysis/dashboard'
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
                path: 'main/analysis/overview'
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
                path: 'main/analysis/overview'
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
                path: 'main/analysis/overview'
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
                path: 'main/analysis/overview'
              }
            },
            { default: () => '角色管理' }
          ),
        key: 'role-management'
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
