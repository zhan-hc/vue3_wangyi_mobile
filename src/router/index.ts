import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    meta: {
      keepAlive: true
    },
    component: () => import('views/Index/index.vue')
  },
  {
    path: '/first',
    name: 'First',
    meta: {
      bottomPlayer: false
    },
    component: () => import('views/First/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      bottomPlayer: false
    },
    component: () => import('views/Login/index.vue')
  },
  {
    path: '/CodeLogin/:tel',
    name: 'CodeLogin',
    meta: {
      bottomPlayer: false
    },
    component: () => import('views/Login/CodeLogin.vue')
  },
  {
    path: '/pswLogin/:tel',
    name: 'pswLogin',
    meta: {
      bottomPlayer: false
    },
    component: () => import('views/Login/pswLogin.vue')
  },
  {
    path: '/songListDetail/:id',
    name: 'songListDetail',
    component: () => import('views/find/songListDetail.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('views/Index/search/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
