import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../utils/request'

// 创建一个 API Slice
export const apiSlice = createApi({
  // api slice 的 reducers 添加到的路径
  reducerPath: 'api',
  // 如果某个接口数据的订阅者数量降为0之后，隔多少秒再将这个数据清空
  keepUnusedDataFor: 30,
  // 基本的请求配置
  baseQuery: axiosBaseQuery({
    baseUrl: '/api',
  }),
  // API 接口请求列表
  endpoints: (builder) => ({}),
})

export const {} = apiSlice
