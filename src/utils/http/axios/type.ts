import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface MyRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  // responseInterceptor?: (config: AxiosResponse) => AxiosResponse
  responseInterceptor?: (config: any) => any
  responseInterceptorCatch?: (error: Error) => void
}

export interface MyRequestConfig extends AxiosRequestConfig {
  interceptor?: MyRequestInterceptors
  showLoading?: boolean
  hasCookie?: boolean
}
