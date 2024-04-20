import { GoDownload } from 'react-icons/go'
import styles from './DetailSide.module.scss'
import MyButton from './MyButton'
import download from '../assets/download.png'
import MyImg from './MyImg'
import useModal from '../hooks/useModal'
export default function DetailSide({ type, info, img }: { type: 'album' | 'song' | 'play'; info?: string; img: string }) {
  const { openModalWithDefaultText } = useModal()
  return (
    <div className={styles['box']}>
      <div className={styles['cover']}>
        <MyImg src={img} />
      </div>

      <h4>{type === 'play' ? '歌单简介' : '专辑简介'}</h4>
      <p>{info}</p>
      <MyButton
        onClick={openModalWithDefaultText}
        style={{
          margin: '30px auto 0',
          boxShadow: '0 4px 10px 0 rgb(255 223 31 / 30%)',
          fontSize: '14px',
          height: '44px',
          width: '202px',
        }}
        icon={<GoDownload />}
        type="yellow"
      >
        {type === 'album' ? '下载该专辑' : type === 'song' ? '下载这首歌' : '下载该歌单'}
      </MyButton>
      <div className={styles['code']}>
        <img src={download} alt="" />
        <p>手机扫描二维码下载客户端</p>
      </div>
    </div>
  )
}
