import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import localCache from '@/utils/cache'
// import { mapMenusToRoutes } from '@/utils/map-menus'
// import store from '@/store'

import { firstMenu } from '@/utils/map-menus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    children: [
      {
        path: '/main/analysis',
        name: 'dashboard',
        component: () => import('@/views/main/analysis/dashboard/dashboard.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 导航守卫
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }

    // console.log('router.getRoutes()', router.getRoutes())
    // console.log('to', to) // router对象
    // const userMenus = (store.state as any).login.userMenus
    // const routes = mapMenusToRoutes(userMenus)

    // routes.forEach((route) => {
    //   router.addRoute('main', route)
    // })
  }

  if (to.path === '/main') {
    // console.log('firstMenu', firstMenu)
    return firstMenu.url
  }
})

export default router
