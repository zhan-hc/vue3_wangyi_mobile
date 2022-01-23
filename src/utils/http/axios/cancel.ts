import axios, { AxiosRequestConfig, Canceler } from 'axios'

const pendingMap = new Map<string, Canceler>()
export const getPendingUrl = (config: AxiosRequestConfig) =>
  [config.url, config.method].join('&')

export class AxiosCanceler {
  addPending(config: AxiosRequestConfig) {
    const pendingUrl = getPendingUrl(config)
    this.removePending(config)
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(pendingUrl)) {
          pendingMap.set(pendingUrl, cancel)
        }
      })
      console.log(pendingMap,'pendingMap')
  }

  removePending(config: AxiosRequestConfig) {
    const pendingUrl = getPendingUrl(config)
    if (pendingMap.has(pendingUrl)) {
      const cancel = pendingMap.get(pendingUrl)
      cancel && cancel()
      pendingMap.delete(pendingUrl)
    }
  }
}
