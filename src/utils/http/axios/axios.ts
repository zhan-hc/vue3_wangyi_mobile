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
  private loading?: void

  constructor(config: MyRequestConfig) {
    // 创建实例
    this.axiosInstance = axios.create(config)
    // 初始化变量
    this.interceptors = config.interceptor
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
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
        // 取消频繁请求，只取最后一个
        AxiosCancel.addPending(config)
        // 判断loading
        if (this.showLoading) {
          message.loading({ content: 'Loading...', key: 'globalLoading'})
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
        console.log('全局响应拦截')
        AxiosCancel.removePending(res.config)
        // 移除loading
        // this.loading?.close()
        message.destroy()
        return res.data
      },
      (err) => {
        const code = err.response.status

        // 如果存在以上code则输出log
        if (code && Object.keys(CODE_MESSAGE).includes(code)) {
          message.error(CODE_MESSAGE[err.response.status])
        }

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
