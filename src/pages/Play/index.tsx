import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetPlaylistInfoQuery } from '../../store/api/apiSlice'
import DetailSide from '../../components/DetailSide'
import styles from './index.module.scss'
import Loading from '../../components/Loading'
import MyImg from '../../components/MyImg'
import MyButton from '../../components/MyButton'
import { IoAdd, IoPlayOutline } from 'react-icons/io5'
import { AiOutlineHeart } from 'react-icons/ai'
import { RiShareCircleLine } from 'react-icons/ri'
import { GoComment } from 'react-icons/go'
import MusicList from '../../components/MusicList'
import MyPaginate from '../../components/MyPaginate'
import CommentList from '../../components/CommentList'
import { Music } from '../../store/api/type'
import usePlay from '../../hooks/usePlay'

export default function Play() {
  const params = useParams<{ id: string }>()
  const [currentPage, setCurrentPage] = useState(1)
  const { data: playlistInfo, isFetching: isFetchingPlaylistInfo } = useGetPlaylistInfoQuery({ id: params.id || '', pn: currentPage })
  const { playMany, addManyToList } = usePlay()

  return (
    <div className="container">
      <div className={styles['wrapper']}>
        <DetailSide type="play" info={playlistInfo?.data.info} img={playlistInfo?.data.img700 || ''} />
        <div className={styles['right']}>
          {!isFetchingPlaylistInfo ? (
            <>
              <h3 className={styles['title']}>{playlistInfo?.data.name}</h3>
              <p className={styles['user']}>
                <MyImg src={playlistInfo?.data.uPic} />
                {playlistInfo?.data.userName || playlistInfo?.data.uname}
              </p>
              <p className={styles['tag']}>{playlistInfo?.data.tag}</p>
              <div className={styles['btns']}>
                <MyButton
                  onClick={() => playMany(playlistInfo?.data.musicList as Music[])}
                  style={{ marginRight: '10px' }}
                  icon={<IoPlayOutline />}
                  type="yellow"
                >
                  播放全部
                </MyButton>
                <MyButton onClick={() => addManyToList(playlistInfo?.data.musicList as Music[])} style={{ marginRight: '10px' }} icon={<IoAdd />}>
                  添加
                </MyButton>
                <MyButton style={{ marginRight: '10px' }} icon={<AiOutlineHeart />}>
                  收藏
                </MyButton>
                <MyButton style={{ marginRight: '10px' }} icon={<RiShareCircleLine />}>
                  分享
                </MyButton>
                <MyButton icon={<GoComment />}>评论</MyButton>
              </div>
              <MusicList list={playlistInfo?.data.musicList || []} type="album" currentPage={currentPage} />
              {playlistInfo?.data.total && +playlistInfo?.data.total > 20 && (
                <div className={styles['paginate']}>
                  <MyPaginate
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageCount={playlistInfo?.data.total ? Math.ceil(+playlistInfo?.data.total / 20) : 0}
                  />
                </div>
              )}
            </>
          ) : (
            <Loading
              style={{
                marginTop: '80px',
              }}
            />
          )}
          <CommentList type="playlist" id={params.id || ''} />
        </div>
      </div>
    </div>
  )
}
