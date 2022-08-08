import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    meta: {
      keepAlive: true
    },
    component: () => import('views/index/index.vue')
  },
  {
    path: '/first',
    name: 'first',
    meta: {
      bottomPlayer: false
    },
    component: () => import('views/first/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      bottomPlayer: false
    },
    component: () => import('views/login/index.vue')
  },
  {
    path: '/codeLogin/:tel',
    name: 'codeLogin',
    meta: {
      bottomPlayer: false
    },
    component: () => import('views/login/CodeLogin.vue')
  },
  {
    path: '/pswLogin/:tel',
    name: 'pswLogin',
    meta: {
      bottomPlayer: false
    },
    component: () => import('views/login/pswLogin.vue')
  },
  {
    path: '/songListDetail/:id?',
    name: 'songListDetail',
    component: () => import('views/find/songListDetail.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('views/index/search/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // history: createWebHashHistory(),
  routes
})

export default router
