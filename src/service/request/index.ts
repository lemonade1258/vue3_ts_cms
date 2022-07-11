import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './type'
import store from '@/store'

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 从config中取出的拦截器是对应实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有的实例都有的拦截器：请求拦截成功')
        // console.log('加载中...')
        return config
      },
      (err) => {
        // console.log('所有的实例都有的拦截器：请求失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有的实例都有的拦截器：响应拦截成功')
        const data = res.data

        return data
      },
      (err) => {
        console.log('所有的实例都有的拦截器：响应失败')

        // 例子：判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404的错误')
        }
        return err
      }
    )
  }

  request<T>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 判断有没有单实例的请求拦截
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          resolve(res)
          // 响应拦截
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
        })
        .catch((err) => {
          reject(err)
          return err
        })
    })
  }
  get<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request({
      ...config,
      method: 'GET'
    })
  }
  post<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
