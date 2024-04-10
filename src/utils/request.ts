/**
 * axios 请求封装
 */
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import axios from 'axios'
import { message } from 'antd'

// 创建新的 axios 实例
export const request = axios.create({
  timeout: 10 * 1000,
})
// 响应拦截器
request.interceptors.response.use(
  // 响应代码在 2xx 范围内
  function (response) {
    return response
  },
  // 响应代码不在 2xx 范围内
  function (error) {
    message.error(error.message || '请求错误')
    return error
  },
)
// 创建 RTK Query 适配器
export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' },
  ): BaseQueryFn<
    {
      url: string
      method?: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      // 使用自己封装的 axios 进行请求
      const result = await request({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }
