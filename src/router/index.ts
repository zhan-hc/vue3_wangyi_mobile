import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import('views/Index/index.vue')
  },
  {
    path: '/first',
    name: 'First',
    component: () => import('views/First/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('views/Login/index.vue')
  },
  {
    path: '/CodeLogin/:tel',
    name: 'CodeLogin',
    component: () => import('views/Login/CodeLogin.vue')
  },
  {
    path: '/pswLogin/:tel',
    name: 'pswLogin',
    component: () => import('views/Login/pswLogin.vue')
  },
  {
    path: '/songListDetail/:id',
    name: 'songListDetail',
    component: () => import('views/find/songListDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
