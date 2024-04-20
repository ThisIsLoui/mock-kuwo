import { BsFillPlayCircleFill } from 'react-icons/bs'
import type { Album, Music } from '../store/api/type'
import styles from './AlbumCard.module.scss'
import { Link } from 'react-router-dom'
import MyImg from './MyImg'
import usePlay from '../hooks/usePlay'
import { useLazyGetAlbumInfoQuery } from '../store/api/apiSlice'
import Loading from './Loading'
export default function AlbumCard({ album, type = 'default' }: { album: Album; type?: 'default' | 'search' }) {
  const [fetchAlbumInfo, { isFetching }] = useLazyGetAlbumInfoQuery()
  const { playMany } = usePlay()
  const play = async () => {
    const res = await fetchAlbumInfo({
      id: album.albumid.toString() || '',
      pn: 1,
    }).unwrap()
    if (res.data) {
      playMany(res.data.musicList as Music[])
    }
  }
  return (
    <div
      style={{
        width: type === 'search' ? '14%' : '19.63%',
        marginRight: type === 'search' ? '5.2%' : '4.97%',
      }}
      className={styles['item']}
    >
      <div onClick={play} className={styles['pic']}>
        <MyImg src={album.pic} alt="" />
        <span className={styles['mask']}>{isFetching ? <Loading /> : <BsFillPlayCircleFill />}</span>
      </div>
      <Link to={`/album/${album.albumid}`} className={styles['name']} dangerouslySetInnerHTML={{ __html: album.album }}></Link>

      <p className={styles['time']}>{album.releaseDate}</p>
    </div>
  )
}
