import { apiSlice } from './api/apiSlice'
import { configureStore } from '@reduxjs/toolkit'
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})
export type RootState = ReturnType<typeof store.getState> // 导出用于 useSelector 的类型
export type AppDispatch = typeof store.dispatch // 导出用于 dispatch 的类型
