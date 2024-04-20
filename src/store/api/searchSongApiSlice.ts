import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../utils/request'
import { Music } from './type'

// 创建一个 API Slice
export const searchSongApiSlice = createApi({
  // api slice 的 reducers 添加到的路径
  reducerPath: 'searchSongApi',
  // 如果某个接口数据的订阅者数量降为0之后，隔多少秒再将这个数据清空
  keepUnusedDataFor: 30,
  // 基本的请求配置
  baseQuery: axiosBaseQuery({
    baseUrl: '/officialWebsite',
  }),
  // API 接口请求列表
  endpoints: (builder) => ({
    // 搜索单曲
    searchSong: builder.query<{ total: string; data: Music[] }, { key: string; pn?: number; rn?: number }>({
      query: ({ key, pn = 0, rn = 20 }) => ({
        method: 'get',
        url: '/search/searchMusicBykeyWord',
        params: {
          encoding: 'utf8',
          rformat: 'json',
          ft: 'music',
          pn,
          rn,
          vipver: 1,
          client: 'kt',
          cluster: 0,
          mobi: 1,
          issubtitle: 1,
          show_copyright_off: 1,
          all: key,
        },
      }),
      transformResponse(baseQueryReturnValue) {
        // const json = JSON.parse((baseQueryReturnValue as string).replace(/'/g, '"'))

        const json = baseQueryReturnValue as unknown

        return {
          // @ts-expect-error item是酷我旧版的数据结构，需要重新调整适配当前的 Music 结构
          total: json.TOTAL,
          // @ts-expect-error item是酷我旧版的数据结构，需要重新调整适配当前的 Music 结构
          data: json.abslist.map((item) => {
            return {
              musicrid: item.MUSICRID,
              barrage: item.barrage,
              ad_type: item.ad_type,
              artist: item.ARTIST,
              mvpayinfo: item.mvpayinfo || {},
              pic120: item.web_albumpic_short
                ? 'https://img2.kuwo.cn/star/albumcover/'.concat(item.web_albumpic_short)
                : item.web_artistpic_short
                  ? 'https://img1.kuwo.cn/star/starheads/'.concat(item.web_artistpic_short)
                  : '',
              isstar: item.isstar || 0,
              rid: item.MUSICRID.split('_')[1],
              duration: item.DURATION || 0,
              ad_subtype: item.ad_subtype || '',
              content_type: item.content_type || '0',
              hasmv: +item.MVFLAG || 0,
              album: item.ALBUM,
              albumid: item.ALBUMID || 0,
              pay: item.pay || '',
              artistid: item.ARTISTID || 0,
              albumpic: item.web_albumpic_short
                ? 'https://img2.kuwo.cn/star/albumcover/'.concat(item.web_albumpic_short)
                : item.web_artistpic_short
                  ? 'https://img1.kuwo.cn/star/starheads/'.concat(item.web_artistpic_short)
                  : '',
              originalsongtype: item.originalsongtype || 0,
              name: item.SONGNAME || item.NAME || '未知歌曲',
              online: Number(item.ONLINE || '0'),
              payInfo: item.payInfo || {},
              tme_musician_adtype: item.tme_musician_adtype || '0',
            }
          }),
        }
      },
    }),
  }),
})

export const { useLazySearchSongQuery } = searchSongApiSlice
