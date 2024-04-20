import { BsXLg } from 'react-icons/bs'
import styles from './MyModal.module.scss'
import MyButton from './MyButton'
import { GoDownload } from 'react-icons/go'
import useModal from '../hooks/useModal'
export default function MyModal() {
  const { isOpened, closable, content, title, close } = useModal()
  return (
    <div
      style={{
        display: isOpened ? 'block' : 'none',
      }}
      className={styles['mask']}
    >
      <div className={styles['modal']}>
        <div className={styles['title']}>
          <div className={styles['left']}>{title}</div>
          {closable && <BsXLg onClick={() => close()} />}
        </div>
        <div className={styles['content']}>{content}</div>
        <div className={styles['btn']}>
          <MyButton icon={<GoDownload />} type="yellow">
            下载客户端
          </MyButton>
        </div>
      </div>
    </div>
  )
}
