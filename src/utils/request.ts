/**
 * axios 请求封装
 */
// @ts-expect-error generateSecret 没有类型定义
import generateSecret from './generateSecret'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import axios from 'axios'
import { message } from 'antd'
import getTargetCookie from './getTargetCookie'

// 创建新的 axios 实例
export const request = axios.create({
  timeout: 30 * 1000,
  withCredentials: true,
})
// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const { key: cookieKey, value: cookieValue } = getTargetCookie()
    if (cookieKey && cookieValue) config.headers['Secret'] = generateSecret(cookieValue, cookieKey)
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)
// 响应拦截器
request.interceptors.response.use(
  // 响应代码在 2xx 范围内
  function (response) {
    if (response.data.success && response.data.success !== true) {
      message.error(response.data.message || '请求错误')
    }
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
