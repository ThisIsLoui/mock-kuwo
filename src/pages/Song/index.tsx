import { useParams } from 'react-router-dom'
import DetailSide from '../../components/DetailSide'
import styles from './index.module.scss'
import { useGetMusicInfoQuery } from '../../store/api/apiSlice'
import Loading from '../../components/Loading'
import { Link } from 'react-router-dom'
import MyButton from '../../components/MyButton'
import { IoAdd, IoPlayOutline } from 'react-icons/io5'
import { AiOutlineHeart } from 'react-icons/ai'
import { GoComment } from 'react-icons/go'
import { RiShareCircleLine } from 'react-icons/ri'
import CommentList from '../../components/CommentList'
import usePlay from '../../hooks/usePlay'
import { Music } from '../../store/api/type'
import useModal from '../../hooks/useModal'
import Lyric from '../../components/Lyric'

export default function Song() {
  const params = useParams<{ id: string }>()
  const { data: musicInfo, isFetching: isFetchingMusicInfo } = useGetMusicInfoQuery({ id: params.id || '' })
  const { addOneToList, playOne } = usePlay()
  const { openModalWithDefaultText } = useModal()
  return (
    <>
      <div className="container">
        <div className={styles['wrapper']}>
          <DetailSide type="song" img={musicInfo?.data.pic || ''} info={musicInfo?.data.albuminfo || '暂无简介'} />
          <div className={styles['right']}>
            {!isFetchingMusicInfo ? (
              <>
                <h3 className={styles['title']}>
                  {musicInfo?.data.name}
                  {musicInfo?.data.hasmv === 1 && (
                    <Link to={`/mvplay/${musicInfo.data.rid}`} className={styles['mv']}>
                      <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10551" width="1em" height="1em">
                        <path
                          d="M588.245333 414.464a27.050667 27.050667 0 0 0-15.616-25.386667 31.445333 31.445333 0 0 0-40.661333 13.098667l-53.76 95.701333-53.76-95.744a31.445333 31.445333 0 0 0-34.688-15.189333 29.141333 29.141333 0 0 0-22.912 28.501333v184.533334a29.141333 29.141333 0 0 0 58.282667 0v-77.866667l24.661333 43.904a31.445333 31.445333 0 0 0 28.16 16.042667 31.445333 31.445333 0 0 0 28.586667-16.042667l23.424-41.6v75.562667a29.141333 29.141333 0 0 0 58.282666 0V415.488v-0.981333z m181.376 108.16L713.813333 402.986667a29.013333 29.013333 0 0 0-38.656-13.952 29.013333 29.013333 0 0 0-14.165333 38.613333l81.578667 174.933333a29.141333 29.141333 0 0 0 24.064 18.005334 28.928 28.928 0 0 0 29.952-17.834667l81.621333-175.104a29.013333 29.013333 0 0 0-14.165333-38.570667 29.013333 29.013333 0 0 0-38.656 13.952l-55.765334 119.594667zM315.477333 228.266667a1113.002667 1113.002667 0 0 1 284.501334-36.224c97.621333 0 192.170667 12.032 283.776 36.053333a154.538667 154.538667 0 0 1 112.938666 126.634667 979.413333 979.413333 0 0 1 0 296.32 154.538667 154.538667 0 0 1-112.938666 126.634666 1113.173333 1113.173333 0 0 1-283.733334 36.053334c-97.877333 0-192.725333-12.074667-284.586666-36.266667a154.581333 154.581333 0 0 1-112.853334-127.189333 999.936 999.936 0 0 1-10.581333-147.370667c0-50.986667 3.541333-100.096 10.581333-147.370667A154.581333 154.581333 0 0 1 315.477333 228.266667z"
                          fill="#666"
                          p-id="10552"
                        ></path>
                      </svg>
                    </Link>
                  )}
                </h3>
                <Link className={styles['singer']} to={`/singer/${musicInfo?.data.artistid}`}>
                  {musicInfo?.data.artist}
                </Link>
                <p className={styles['info']}>
                  专辑：
                  <Link to={`/album/${musicInfo?.data.albumid}`} className={styles['value']}>
                    {musicInfo?.data.album}
                  </Link>
                  发行时间：<span className={styles['value']}>{musicInfo?.data.releaseDate}</span>
                </p>
                <div className={styles['btns']}>
                  <MyButton onClick={() => playOne(musicInfo?.data as Music)} style={{ marginRight: '10px' }} icon={<IoPlayOutline />} type="yellow">
                    立即播放
                  </MyButton>
                  <MyButton onClick={() => addOneToList(musicInfo?.data as Music)} style={{ marginRight: '10px' }} icon={<IoAdd />}>
                    添加
                  </MyButton>
                  <MyButton onClick={openModalWithDefaultText} style={{ marginRight: '10px' }} icon={<AiOutlineHeart />}>
                    收藏
                  </MyButton>
                  <MyButton onClick={openModalWithDefaultText} style={{ marginRight: '10px' }} icon={<RiShareCircleLine />}>
                    分享
                  </MyButton>
                  <MyButton onClick={openModalWithDefaultText} icon={<GoComment />}>
                    评论
                  </MyButton>
                </div>
              </>
            ) : (
              <Loading
                style={{
                  marginTop: '80px',
                }}
              />
            )}
            <Lyric />
            <CommentList type="music" id={params.id || ''} />
          </div>
        </div>
      </div>
    </>
  )
}
