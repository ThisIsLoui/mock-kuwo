import { createBrowserRouter } from 'react-router-dom'
import { RouteObject } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { request } from '../utils/request'
import getTargetCookie from '../utils/getTargetCookie'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
// meta 里的属性类型
interface metaType {
  auth?: boolean // auth：是否需要路由守卫进行身份验证
}
declare module 'react-router-dom' {
  interface IndexRouteObject {
    meta?: metaType
  }
  interface NonIndexRouteObject {
    meta?: metaType
  }
}
// 配置路由列表并导出
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const { key: cookieKey, value: cookieValue } = getTargetCookie()
      if (cookieKey && cookieValue) return null
      // 如果本地没有 cookie，则请求官网首页，获取 cookie
      await request({
        url: '/officialWebsite',
      })
      return null
    },
    children: [
      {
        path: '',
        lazy: async () => {
          const Home = await import('../pages/Home')
          return { Component: Home.default }
        },
      },
      {
        path: 'rankList',
        lazy: async () => {
          const RankList = await import('../pages/RankList')
          return { Component: RankList.default }
        },
      },
      {
        path: 'singerList',
        lazy: async () => {
          const SingerList = await import('../pages/SingerList')
          return { Component: SingerList.default }
        },
      },
      {
        path: 'playList',
        lazy: async () => {
          const PlayList = await import('../pages/PlayList')
          return { Component: PlayList.default }
        },
      },
      {
        path: 'mvList',
        lazy: async () => {
          const MvList = await import('../pages/MvList')
          return { Component: MvList.default }
        },
      },
      {
        path: 'search',
        lazy: async () => {
          const Search = await import('../pages/Search')
          return { Component: Search.default }
        },
      },
      {
        path: 'album/:id',
        lazy: async () => {
          const Album = await import('../pages/Album')
          return { Component: Album.default }
        },
      },
      {
        path: 'play/:id',
        lazy: async () => {
          const Play = await import('../pages/Play')
          return { Component: Play.default }
        },
      },
      {
        path: 'song/:id',
        lazy: async () => {
          const Song = await import('../pages/Song')
          return { Component: Song.default }
        },
      },
      {
        path: 'mvplay/:id',
        lazy: async () => {
          const Mv = await import('../pages/Mv')
          return { Component: Mv.default }
        },
      },
      {
        path: 'singer/:id',
        lazy: async () => {
          const SingerLayout = await import('../layouts/SingerLayout')
          return { Component: SingerLayout.default }
        },
        children: [
          {
            path: '',
            lazy: async () => {
              const Singer = await import('../pages/Singer')
              return { Component: Singer.default }
            },
          },
          {
            path: 'album',
            lazy: async () => {
              const SingerAlbum = await import('../pages/Singer/Album')
              return { Component: SingerAlbum.default }
            },
          },
          {
            path: 'mv',
            lazy: async () => {
              const SingerMv = await import('../pages/Singer/Mv')
              return { Component: SingerMv.default }
            },
          },
          {
            path: 'info',
            lazy: async () => {
              const SingerInfo = await import('../pages/Singer/Info')
              return { Component: SingerInfo.default }
            },
          },
        ],
      },
    ],
  },
]
// 通过路由列表创建 router 并导出
const router = createBrowserRouter(routes)
export default router
