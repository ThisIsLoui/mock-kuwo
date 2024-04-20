import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { openModal, closeModal } from '../store/modal/modalSlice'
export default function useModal() {
  const dispatch = useDispatch<AppDispatch>()
  const closable = useSelector((state: RootState) => state.modal.closable)
  const isOpened = useSelector((state: RootState) => state.modal.isOpened)
  const title = useSelector((state: RootState) => state.modal.title)
  const content = useSelector((state: RootState) => state.modal.content)
  const open = ({ title, content, closable }: { title?: string; content: string; closable?: boolean }) => {
    dispatch(openModal({ title, content, closable }))
  }

  const close = () => {
    if (closable) dispatch(closeModal())
  }

  const openModalWithDefaultText = () => {
    dispatch(openModal({ content: '开源网站，该按钮仅供模拟演示，无实际功能，如需使用完整功能，请下载酷我音乐官方客户端' }))
  }

  return { open, close, isOpened, title, content, closable, openModalWithDefaultText }
}
