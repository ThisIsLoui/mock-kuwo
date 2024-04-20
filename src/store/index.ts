import { apiSlice } from './api/apiSlice'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { configureStore } from '@reduxjs/toolkit'
import { commentApiSlice } from './api/commentApiSlice'
import { playurlApiSlice } from './api/playurlApiSlice'
import { paytypeApiSlice } from './api/paytypeApiSlice'
import modalSlice from './modal/modalSlice'
import playerSlice from './player/playerSlice'
import { searchSongApiSlice } from './api/searchSongApiSlice'

// 持久化 playerSlice
const persistedPlayerSliceReducer = persistReducer(
  {
    key: 'player',
    storage, // 默认导入的是存储到 localStorage 中的配置
    // 可以使用黑白名单来选择只持久化那些内容
    // 注意：只能选择一级的深度，如果需要嵌套选择更深的内容，可以在 combineReducers 时就使用一次 persistReducer
    blacklist: ['currentTime'],
  },
  playerSlice,
)

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [playurlApiSlice.reducerPath]: playurlApiSlice.reducer,
    [commentApiSlice.reducerPath]: commentApiSlice.reducer,
    [paytypeApiSlice.reducerPath]: paytypeApiSlice.reducer,
    [searchSongApiSlice.reducerPath]: searchSongApiSlice.reducer,
    modal: modalSlice,
    player: persistedPlayerSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware, commentApiSlice.middleware, playurlApiSlice.middleware, paytypeApiSlice.middleware, searchSongApiSlice.middleware),
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState> // 导出用于 useSelector 的类型
export type AppDispatch = typeof store.dispatch // 导出用于 dispatch 的类型
