import { Link } from 'react-router-dom'
import MyImg from './MyImg'
import styles from './SingerCard.module.scss'
import { Artist } from '../store/api/type'

export default function SingerCard({ singer }: { singer: Artist }) {
  return (
    <Link key={singer.id} to={`/singer/${singer.id}`} className={styles['singer']}>
      <div className={styles['cover']}>
        <MyImg src={singer.pic300} />
        {/* <span>查看更多</span> */}
      </div>
      <p className={styles['name']}>{singer.name}</p>
      <p className={styles['num']}>{singer.musicNum}首歌曲</p>
    </Link>
  )
}
