import { Link, useNavigate } from 'react-router-dom'
import styles from './MvCard.module.scss'
import MyImg from './MyImg'
import { Mv } from '../store/api/type'
import { BsFillPlayCircleFill } from 'react-icons/bs'
import { IoPlayOutline } from 'react-icons/io5'
import { HTMLAttributes } from 'react'
import countTransform from '../utils/countTransform'
export default function MvCard({ mv, ...props }: { mv: Mv } & HTMLAttributes<HTMLDivElement>) {
  const nav = useNavigate()
  return (
    <div className={styles['mv']} {...props}>
      <div onClick={() => nav(`/mvplay/${mv.id}`)} className={styles['top']}>
        <MyImg src={mv.pic} />
        <span className={styles['left']}>
          <IoPlayOutline />
          {countTransform(mv.mvPlayCnt)}
        </span>
        <span className={styles['right']}>{mv.songTimeMinutes}</span>
        <div className={styles['mask']}>
          <BsFillPlayCircleFill />
        </div>
        <div className={styles['shadow']}></div>
      </div>
      <Link to={`/mvplay/${mv.id}`} className={styles['title']} dangerouslySetInnerHTML={{ __html: mv.name }}></Link>
      <Link to={`/singer/${mv.artistid}`} className={styles['singer']}>
        {mv.artist}
      </Link>
    </div>
  )
}
