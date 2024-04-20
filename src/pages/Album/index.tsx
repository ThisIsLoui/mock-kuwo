import { Link, useParams } from 'react-router-dom'
import DetailSide from '../../components/DetailSide'
import styles from './index.module.scss'
import MyButton from '../../components/MyButton'
import { IoAdd, IoPlayOutline } from 'react-icons/io5'
import { AiOutlineHeart } from 'react-icons/ai'
import { GoComment } from 'react-icons/go'
import { RiShareCircleLine } from 'react-icons/ri'
import MusicList from '../../components/MusicList'
import { useState } from 'react'
import { useGetAlbumInfoQuery } from '../../store/api/apiSlice'
import Loading from '../../components/Loading'
import MyPaginate from '../../components/MyPaginate'
import CommentList from '../../components/CommentList'
import usePlay from '../../hooks/usePlay'
import { Music } from '../../store/api/type'

export default function Album() {
  const params = useParams<{ id: string }>()
  const [currentPage, setCurrentPage] = useState(1)
  const { data: albumInfo, isFetching: isFetchingAlbumInfo } = useGetAlbumInfoQuery({ id: params.id || '', pn: currentPage })
  const { playMany, addManyToList } = usePlay()

  return (
    <div className="container">
      <div className={styles['wrapper']}>
        <DetailSide type="album" img={albumInfo?.data.pic || ''} info={albumInfo?.data.albuminfo || '暂无简介'} />
        <div className={styles['right']}>
          {!isFetchingAlbumInfo ? (
            <>
              <h3 className={styles['title']}>{albumInfo?.data.album}</h3>
              <Link className={styles['singer']} to={`/singer/${albumInfo?.data.artistid}`}>
                {albumInfo?.data.artist}
              </Link>
              <p className={styles['info']}>
                语种：<span className={styles['value']}>{albumInfo?.data.lang}</span>
                发行时间：<span className={styles['value']}>{albumInfo?.data.releaseDate}</span>
              </p>
              <div className={styles['btns']}>
                <MyButton
                  onClick={() => playMany(albumInfo?.data.musicList as Music[])}
                  style={{ marginRight: '10px' }}
                  icon={<IoPlayOutline />}
                  type="yellow"
                >
                  播放全部
                </MyButton>
                <MyButton onClick={() => addManyToList(albumInfo?.data.musicList as Music[])} style={{ marginRight: '10px' }} icon={<IoAdd />}>
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
              <MusicList list={albumInfo?.data.musicList || []} type="album" currentPage={currentPage} />
              {albumInfo?.data.total && albumInfo.data.total > 20 && (
                <div className={styles['paginate']}>
                  <MyPaginate
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageCount={albumInfo?.data.total ? Math.ceil(+albumInfo?.data.total / 20) : 0}
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
          <CommentList type="album" id={params.id || ''} />
        </div>
      </div>
    </div>
  )
}
