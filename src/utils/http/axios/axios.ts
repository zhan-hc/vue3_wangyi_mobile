import axios from 'axios'
import { AxiosCanceler } from './cancel'
import {message} from 'ant-design-vue';
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { MyRequestInterceptors, MyRequestConfig } from './type'

const DEFAULT_LOADING = true
const CODE_MESSAGE: any = {
  200: '服务器成功返回请求数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队(异步任务)',
  204: '删除数据成功',
  400: '发出信息有误',
  401: '用户没有权限(令牌失效、用户名、密码错误、登录过期)',
  402: '前端无痛刷新token',
  403: '用户得到授权，但是访问是被禁止的',
  404: '访问资源不存在',
  406: '请求格式不可得',
  410: '请求资源被永久删除，且不会被看到',
  500: '服务器发生错误',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}


export class MyAxios {
  private axiosInstance: AxiosInstance
  private interceptors?: MyRequestInterceptors
  private showLoading?: boolean
  private loadingCount: number
  private hasCookie?: boolean

  constructor(config: MyRequestConfig) {
    // 创建实例
    this.axiosInstance = axios.create(config)
    // 初始化变量
    this.interceptors = config.interceptor
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.hasCookie =  config.hasCookie ?? false
    this.loadingCount = 0 // 保存loading请求个数
    // 初始化信息提示
    message.config({
      top: `200px`,
      duration: 0
    })
    const AxiosCancel = new AxiosCanceler()
    // config实例对应的拦截器
    this.axiosInstance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.axiosInstance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    /**
     * @description: 全局请求之前的拦截器
     */
    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log('全局请求拦截',config)
        config.baseURL = 'https://netease-cloud-music-api-gamma-eight.vercel.app'
        
        console.log(this.loadingCount, 'this.loadingCountthis.loadingCountthis.loadingCountthis.loadingCount')
        // 添加token
        // const token = sessionStorage.getItem('wangyi_token')
        // if (token) {
        //   config.headers['Authorization'] = token
        // }
        if (this.hasCookie) {
          config.data = {
            ...config.data,
            cookie: sessionStorage.getItem('wangyi_cookie')
          }
        }
        // 取消频繁请求，只取最后一个
        AxiosCancel.addPending(config)
        // 当第一次请求的时候并且需要loading效果
        if (this.loadingCount===0 && this.showLoading) {
          message.loading('Loading...')
        }
        this.loadingCount++
        if (!this.showLoading) {
          message.destroy()
        }

        return config
      },
      (err) => {
        return err
      }
    )
    /**
     * @description: 全局请求之后的拦截器
     */
    this.axiosInstance.interceptors.response.use(
      (res) => {
        this.loadingCount--
        console.log('全局响应拦截',res)
        AxiosCancel.removePending(res.config)
        // 移除loading
        if (this.loadingCount<=0) {
          message.destroy()
        }

        if (res.data.code !== 200) {
          message.error({content: res.data.message, key: 'globalLoading'})
          setTimeout(() => {
            message.destroy()
          },2000)
        }
        return res.data
      },
      (err) => {
        console.log(err.response,'err.response')
        const code = err.response.status
        const errMsg = err.response.data.msg || err.response.data.message
        message.destroy()
        if (errMsg) {
          message.error({content: errMsg, key: 'globalLoading'})
        }
        else if (Object.keys(CODE_MESSAGE).includes(code.toString())) {
          message.error({content: CODE_MESSAGE[code], key: 'globalLoading'})
        }
        setTimeout(() => {
          message.destroy()
        },2000)

        return err
      }
    )
  }

  request<T>(config: MyRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求中对config的处理，使用私有化的拦截器
      if (config.interceptor?.requestInterceptor) {
        config = config.interceptor.requestInterceptor(config)
      }
      // 如果设置中取消showloading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      // 如果需要cookie
      if (config?.hasCookie) {
        this.hasCookie = config.hasCookie
      }

      this.axiosInstance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求中对config的处理，使用私有化的拦截器
          if (config.interceptor?.responseInterceptor) {
            res = config.interceptor.responseInterceptor(res)
          }
          // 请求完重置loading
          this.showLoading = DEFAULT_LOADING

          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: MyRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: MyRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: MyRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: MyRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default MyAxios
