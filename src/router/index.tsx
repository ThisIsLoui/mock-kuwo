import { createBrowserRouter } from 'react-router-dom'
import { RouteObject } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
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
        path: 'album/:id',
        element: <div>专辑详情</div>,
      },
      {
        path: 'play/:id',
        element: <div>歌单详情</div>,
      },
      {
        path: 'song/:id',
        element: <div>歌曲详情</div>,
      },
      {
        path: 'mvplay/:id',
        element: <div>MV详情</div>,
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
  {
    path: '*',
    lazy: async () => {
      const NotFound = await import('../pages/NotFound')
      return { Component: NotFound.default }
    },
  },
]
// 通过路由列表创建 router 并导出
const router = createBrowserRouter(routes)
export default router
