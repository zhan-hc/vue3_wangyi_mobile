import { useRouter } from 'vue-router'

export default function useRouteFun(){
  const route = useRouter()
  // 返回路由url参数
  const getUrlParams = (key: string) => {
    return route.currentRoute.value.params[key]
  }

  // 路由跳转或回退
  const handleRouterJump = (path: string, type: string | 'push') => {
    if (type === 'replace') {
      route.replace(path)
    } else {
      route.push(path)
    }
  }

  // 路由回退
  const handleRouterBack = (path: string, type: string | 'push') => {
    route.go(-1)
  }
  return {getUrlParams,handleRouterJump,handleRouterBack}
  
}