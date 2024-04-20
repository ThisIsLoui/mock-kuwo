import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpened: false,
    title: '温馨提示',
    content: '',
    closable: true,
  },
  reducers: {
    openModal: (state, action: PayloadAction<{ title?: string; content: string; closable?: boolean }>) => {
      state.isOpened = true
      state.title = action.payload.title || '温馨提示'
      state.content = action.payload.content
      state.closable = action.payload.closable ?? true
    },
    closeModal: (state) => {
      state.isOpened = false
    },
  },
})
// 导出创建 action 对象的 actionCreator，每个 reducer 函数对应会自动生成一个 actionCreator
export const { openModal, closeModal } = modalSlice.actions
// 导出 reducer 函数
export default modalSlice.reducer
