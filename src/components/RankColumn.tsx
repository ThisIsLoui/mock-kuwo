import { BsFillPlayCircleFill } from 'react-icons/bs'
import { Music, Rank } from '../store/api/type'
import styles from './RankColumn.module.scss'
import { Link } from 'react-router-dom'
import MyImg from './MyImg'
import usePlay from '../hooks/usePlay'

const titlePics = {
  酷我热歌榜: 'https://h5static.kuwo.cn/upload/image/d8faf807ce667092ef29f8d62237bfbf3a1f127a6370664705722a67c8f9e23b.png',
  酷我新歌榜: 'https://h5static.kuwo.cn/upload/image/fb29b783091117318dbb5dac53f8a7deee25b34054f7d00fb91640f6106773c6.png',
  酷我飙升榜: 'https://h5static.kuwo.cn/upload/image/fcd292e95c97704678ae6a77191df0b915dd9b9657296ca20b9f19047f672055.png',
  酷我欧美榜: 'https://h5static.kuwo.cn/upload/image/8eef6e95406eb46f8ed544384bb457e20c8d66a33c3077c586e58537b620ecf5.png',
  酷我日韩榜: 'https://h5static.kuwo.cn/upload/image/838f7519b40479695a6f5a22923704600d2dfceb4e8d6ad0099b5a169ae0df03.png',
}

export default function RankColumn({ ranklist }: { ranklist: Rank }) {
  const { playMany } = usePlay()
  return (
    <div className={styles['column']}>
      <div className={styles['top']}>
        <div className={styles['inner']}>
          {/* @ts-expect-error 规避ts报错 */}
          <img src={titlePics[ranklist.name]} referrerPolicy="no-referrer" alt="" />
        </div>
        <MyImg src={ranklist.pic.replace('120', '500')} className={styles['back']} alt="" />
        <BsFillPlayCircleFill onClick={() => playMany(ranklist.musicList as Music[])} className={styles['play']} />
      </div>
      <ul>
        {ranklist.musicList.slice(0, 5).map((item, index) => (
          <li key={item.musicrid}>
            <div className={styles['num']}>{index > 2 && index + 1}</div>
            <div className={styles['info']}>
              <Link className={styles['name']} to={`/song/${item.rid}`}>
                {item.name}
              </Link>
              <Link className={styles['singer']} to={`/singer/${item.artistid}`}>
                {item.artist}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
