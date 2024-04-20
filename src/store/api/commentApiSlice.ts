import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../utils/request'
import { CommentList } from './type'

// 创建一个 API Slice
export const commentApiSlice = createApi({
  // api slice 的 reducers 添加到的路径
  reducerPath: 'commentApi',
  // 如果某个接口数据的订阅者数量降为0之后，隔多少秒再将这个数据清空
  keepUnusedDataFor: 30,
  // 基本的请求配置
  baseQuery: axiosBaseQuery({
    baseUrl: '/comment',
  }),
  // API 接口请求列表
  endpoints: (builder) => ({
    // 获取指定音乐、榜单、专辑的评论列表
    getCommentById: builder.query<CommentList, { type?: 'rank' | 'mv' | 'music' | 'album' | 'playlist'; sid: string; page?: number; rows?: number }>({
      query: ({ type = 'rank', sid, page = 1, rows = 5 }) => ({
        method: 'get',
        url: '',
        params: {
          type: 'get_comment',
          f: 'web',
          page,
          rows,
          digest: type === 'rank' ? '2' : type === 'music' ? '15' : type === 'album' ? '13' : type === 'mv' ? '7' : '8',
          sid,
          uid: '0',
        },
      }),
    }),
  }),
})

export const { useGetCommentByIdQuery } = commentApiSlice
