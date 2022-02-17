import { Ref } from 'vue'
import { useRouter } from 'vue-router'

export default function useRouteFun(){
  const route = useRouter()

  // 获取路由的meta参数值
  const getRouteMeta = (key: string) => {
    return route.currentRoute.value.meta[key]
  }

  // 获取路由的路径
  const getRoutePath = () => {
    return route.currentRoute.value.path
  }

  // 返回路由路由的params参数
  const getUrlParams = (key: string) => {
    return route.currentRoute.value.params[key]
  }

  // 路由跳转或回退
  const handleRouterJump = (path: string, type: string = 'push') => {
    if (type === 'replace') {
      route.replace(path)
    } else {
      route.push(path)
    }
  }

  // 路由回退
  const handleRouterBack = () => {
    route.go(-1)
  }
  return {getUrlParams, getRouteMeta, getRoutePath, handleRouterJump, handleRouterBack}
  
}