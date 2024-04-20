import { Music } from './../api/type'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    musicList: [] as Music[], // 播放列表
    currentMusic: {} as Music, // 当前播放的音乐信息
    currentTime: 0, // 当前播放的时间
    playMode: 'loop' as 'singleloop' | 'loop' | 'onebyone', // 播放模式
  },
  reducers: {
    changePlayMode(state) {
      if (state.playMode === 'singleloop') {
        state.playMode = 'loop'
      } else if (state.playMode === 'loop') {
        state.playMode = 'onebyone'
      } else if (state.playMode === 'onebyone') {
        state.playMode = 'singleloop'
      }
    },
    addOne(state, action: PayloadAction<Music>) {
      state.musicList.push(action.payload)
    },
    clearOne(state, action: PayloadAction<Music>) {
      state.musicList = state.musicList.filter((item) => item.rid !== action.payload.rid)
    },
    clearList(state) {
      state.musicList = []
      state.currentMusic = {} as Music
      state.currentTime = 0
    },
    playMusic(state, action: PayloadAction<Music>) {
      state.currentMusic = action.payload
      state.currentTime = 0
    },
    updateCurrentTime(state, action: PayloadAction<number>) {
      state.currentTime = action.payload
    },
  },
})
// 导出创建 action 对象的 actionCreator，每个 reducer 函数对应会自动生成一个 actionCreator
export const { changePlayMode, addOne, clearOne, clearList, playMusic, updateCurrentTime } = playerSlice.actions
// 导出 reducer 函数
export default playerSlice.reducer
