import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../utils/request'
import { LyricItem } from './type'

// 创建一个 API Slice
export const paytypeApiSlice = createApi({
  // api slice 的 reducers 添加到的路径
  reducerPath: 'paytypeApi',
  // 如果某个接口数据的订阅者数量降为0之后，隔多少秒再将这个数据清空
  keepUnusedDataFor: 30,
  // 基本的请求配置
  baseQuery: axiosBaseQuery({
    baseUrl: '/payType',
  }),
  // API 接口请求列表
  endpoints: (builder) => ({
    // 获取付费类型列表
    getPayType: builder.query<{ data: { feeType: number } }, { id: string }>({
      query: ({ id }) => ({
        method: 'get',
        url: '/video/payType',
        params: {
          vid: id,
        },
      }),
    }),
    // 获取歌曲歌词
    getLyric: builder.query<{ data: { lrclist: LyricItem[] } }, { id: string }>({
      query: ({ id }) => ({
        method: 'get',
        url: '/lyric/getlyric',
        params: {
          musicId: id,
        },
      }),
    }),
    // 获取搜索关键词
    getSearchKey: builder.query<{ data: string[] }, { key: string }>({
      query: ({ key }) => ({
        method: 'get',
        url: '/search/searchKey',
        params: {
          key,
        },
      }),
    }),
  }),
})

export const { useGetPayTypeQuery, useGetLyricQuery, useGetSearchKeyQuery } = paytypeApiSlice
