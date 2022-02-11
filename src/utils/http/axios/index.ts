import MyAxios from './axios'
const MyRequest = new MyAxios({
  interceptor: {
    requestInterceptor: (config) => {
      const token = ''
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`
      // }
      // console.log('请求成功拦截')
      return config
    },
    responseInterceptor: (res) => {
      // console.log('响应成功拦截')
      return res
    }
  }
})
export default MyRequest
