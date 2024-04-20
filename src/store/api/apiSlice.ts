import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../utils/request'
import { Album, Artist, BannerItem, Music, Mv, Playlist, PlaylistTag, PlaylistTagList, Rank, RankMenu } from './type'

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
  endpoints: (builder) => ({
    // 获取首页轮播图
    getBannerList: builder.query<{ data: BannerItem[] }, void>({
      query: () => ({
        method: 'get',
        url: '/banner/index/bannerList',
      }),
    }),
    // 获取首页推荐歌单标签
    getRecommendPlaylistTags: builder.query<{ data: PlaylistTag[] }, void>({
      query: () => ({
        method: 'get',
        url: '/playlist/index/tags',
      }),
    }),
    // 通过标签获取首页推荐歌单
    getRecommendPlaylistByTag: builder.query<
      { data: { data?: Playlist[]; list?: Playlist[]; pn: number; rn: number; total: number } },
      { tag: string; pn?: number; rn?: number }
    >({
      query: ({ tag, pn = 1, rn = 5 }) => ({
        method: 'get',
        url: tag === 'rcm' ? '/rcm/index/playlist' : '/classify/playlist/getTagPlayList',
        params: {
          id: tag,
          pn,
          rn,
        },
      }),
    }),
    // 获取首页排行榜列表
    getRecommendRankList: builder.query<{ data: Rank[] }, void>({
      query: () => ({
        method: 'get',
        url: '/bang/index/bangList',
      }),
    }),
    // 获取排行榜菜单
    getRankMenu: builder.query<{ data: RankMenu[] }, void>({
      query: () => ({
        method: 'get',
        url: '/bang/bang/bangMenu',
      }),
    }),
    // 获取指定排行榜的音乐列表
    getRankListById: builder.query<{ data: Rank }, { bangId: string; pn?: number; rn?: number }>({
      query: ({ bangId, pn = 1, rn = 20 }) => ({
        method: 'get',
        url: '/bang/bang/musicList',
        params: {
          bangId,
          pn,
          rn,
        },
      }),
    }),
    // 根据首字母、分类获取歌手列表
    getSingerList: builder.query<{ data: { total: number; artistList: Artist[] } }, { category: number; prefix: string; pn?: number; rn?: number }>({
      query: ({ category, prefix, pn = 1, rn = 60 }) => ({
        method: 'get',
        url: '/artist/artistInfo',
        params: {
          category,
          prefix,
          pn,
          rn,
        },
      }),
    }),
    // 根据分类获取MV列表
    getMvList: builder.query<{ data: { total: number; mvlist: Mv[] } }, { pid: number; pn?: number; rn?: number }>({
      query: ({ pid, pn = 1, rn = 20 }) => ({
        method: 'get',
        url: '/music/mvList',
        params: {
          pid,
          pn,
          rn,
        },
      }),
    }),
    // 获取歌单分类
    getPlaylistCategory: builder.query<{ data: PlaylistTagList[] }, void>({
      query: () => ({
        method: 'get',
        url: '/playlist/getTagList',
      }),
    }),
    // 根据分类获取歌单
    getPlaylistByCategory: builder.query<{ data: { total: number; data: Playlist[] } }, { id?: string; pn?: number; rn?: number }>({
      query: ({ id, pn = 1, rn = 20 }) => ({
        method: 'get',
        url: id?.startsWith('default') ? '/classify/playlist/getRcmPlayList' : '/classify/playlist/getTagPlayList',
        params: {
          order: id?.startsWith('default') ? (id === 'default_new' ? 'new' : 'hot') : '',
          id: !id?.startsWith('default') ? id : '',
          pn,
          rn,
        },
      }),
    }),
    // 获取歌手信息
    getArtistInfo: builder.query<{ data: Artist }, { artistId: string }>({
      query: ({ artistId }) => ({
        method: 'get',
        url: '/artist/artist',
        params: {
          artistid: artistId,
        },
      }),
    }),
    // 获取歌手歌曲
    getArtistMusic: builder.query<{ data: { total: number; list: Music[] } }, { artistId: string; pn?: number; rn?: number }>({
      query: ({ artistId, pn = 1, rn = 20 }) => ({
        method: 'get',
        url: '/artist/artistMusic',
        params: {
          artistid: artistId,
          pn,
          rn,
        },
      }),
    }),
    // 获取歌手专辑
    getArtistAlbum: builder.query<{ data: { total: number; albumList: Album[] } }, { artistId: string; pn?: number; rn?: number }>({
      query: ({ artistId, pn = 1, rn = 20 }) => ({
        method: 'get',
        url: '/artist/artistAlbum',
        params: {
          artistid: artistId,
          pn,
          rn,
        },
      }),
    }),
    // 获取歌手MV
    getArtistMv: builder.query<{ data: { total: number; mvlist: Mv[] } }, { artistId: string; pn?: number; rn?: number }>({
      query: ({ artistId, pn = 1, rn = 20 }) => ({
        method: 'get',
        url: '/artist/artistMv',
        params: {
          artistid: artistId,
          pn,
          rn,
        },
      }),
    }),
    // 获取MV/歌曲信息
    getMusicInfo: builder.query<{ data: Music }, { id: string }>({
      query: ({ id }) => ({
        method: 'get',
        url: '/music/musicInfo',
        params: {
          mid: id,
        },
      }),
    }),
    // 获取专辑信息
    getAlbumInfo: builder.query<{ data: Album }, { id: string; pn?: number; rn?: number }>({
      query: ({ id, pn = 1, rn = 20 }) => ({
        method: 'get',
        url: '/album/albumInfo',
        params: {
          albumId: id,
          pn,
          rn,
        },
      }),
    }),
    // 获取歌单信息
    getPlaylistInfo: builder.query<{ data: Playlist }, { id: string; pn?: number; rn?: number }>({
      query: ({ id, pn = 1, rn = 20 }) => ({
        method: 'get',
        url: '/playlist/playListInfo',
        params: {
          pid: id,
          pn,
          rn,
        },
      }),
    }),
    // 搜索专辑
    searchAlbum: builder.query<{ data: { total: number; albumList: Album[] } }, { key: string; pn?: number; rn?: number }>({
      query: ({ key, pn = 1, rn = 20 }) => ({
        method: 'get',
        url: '/search/searchAlbumBykeyWord',
        params: {
          key,
          pn,
          rn,
        },
      }),
    }),
    // 搜索MV
    searchMv: builder.query<{ data: { total: number; mvlist: Mv[] } }, { key: string; pn?: number; rn?: number }>({
      query: ({ key, pn = 1, rn = 20 }) => ({
        method: 'get',
        url: '/search/searchMvBykeyWord',
        params: {
          key,
          pn,
          rn,
        },
      }),
    }),
    // 搜索歌单
    searchPlaylist: builder.query<{ data: { total: number; list: Playlist[] } }, { key: string; pn?: number; rn?: number }>({
      query: ({ key, pn = 1, rn = 30 }) => ({
        method: 'get',
        url: '/search/searchPlayListBykeyWord',
        params: {
          key,
          pn,
          rn,
        },
      }),
    }),
    // 搜索歌手
    searchSinger: builder.query<{ data: { total: number; list: Artist[] } }, { key: string; pn?: number; rn?: number }>({
      query: ({ key, pn = 1, rn = 30 }) => ({
        method: 'get',
        url: '/search/searchArtistBykeyWord',
        params: {
          key,
          pn,
          rn,
        },
      }),
    }),
  }),
})

export const {
  useGetBannerListQuery,
  useGetRecommendPlaylistTagsQuery,
  useGetRecommendPlaylistByTagQuery,
  useGetRecommendRankListQuery,
  useGetRankMenuQuery,
  useGetRankListByIdQuery,
  useGetSingerListQuery,
  useGetMvListQuery,
  useGetPlaylistCategoryQuery,
  useGetPlaylistByCategoryQuery,
  useGetArtistInfoQuery,
  useGetArtistMusicQuery,
  useGetArtistAlbumQuery,
  useGetArtistMvQuery,
  useGetMusicInfoQuery,
  useLazyGetMusicInfoQuery,
  useGetAlbumInfoQuery,
  useLazyGetAlbumInfoQuery,
  useGetPlaylistInfoQuery,
  useLazyGetPlaylistInfoQuery,
  useLazySearchAlbumQuery,
  useLazySearchMvQuery,
  useLazySearchPlaylistQuery,
  useLazySearchSingerQuery,
} = apiSlice
