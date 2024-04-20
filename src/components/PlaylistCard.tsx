import { BsFillPlayCircleFill } from 'react-icons/bs'
import type { Music, Playlist } from '../store/api/type'
import styles from './PlaylistCard.module.scss'
import { IoPlayOutline } from 'react-icons/io5'
import countTransform from '../utils/countTransform'
import { Link } from 'react-router-dom'
import MyImg from './MyImg'
import { useLazyGetPlaylistInfoQuery } from '../store/api/apiSlice'
import usePlay from '../hooks/usePlay'
import Loading from './Loading'
export default function PlaylistCard({ playlist, type = 'default' }: { playlist: Playlist; type?: 'default' | 'search' }) {
  const [fetchPlaylistInfo, { isFetching }] = useLazyGetPlaylistInfoQuery()
  const { playMany } = usePlay()
  const play = async () => {
    const res = await fetchPlaylistInfo({
      id: playlist.id.toString() || '',
      pn: 1,
    }).unwrap()
    if (res.data) {
      playMany(res.data.musicList as Music[])
    }
  }
  return (
    <div
      style={{
        width: type === 'search' ? '17.85%' : '18.85%',
        marginRight: type === 'search' ? '1.42%' : '0',
        marginBottom: type === 'search' ? '26px' : '0',
      }}
      className={styles['item']}
    >
      <div onClick={play} className={styles['pic']}>
        <MyImg src={playlist.img} alt="" />
        <span className={styles['mask']}>{isFetching ? <Loading /> : <BsFillPlayCircleFill />}</span>
      </div>
      <Link to={`/play/${playlist.id}`} className={styles['name']} dangerouslySetInnerHTML={{ __html: playlist.name }}></Link>
      {playlist.listencnt !== '0' && (
        <p className={styles['count']}>
          <IoPlayOutline />
          {countTransform(+playlist.listencnt)}
        </p>
      )}
    </div>
  )
}
