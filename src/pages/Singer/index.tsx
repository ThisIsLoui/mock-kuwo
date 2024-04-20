import { useState } from 'react'
import styles from './index.module.scss'
import MusicList from '../../components/MusicList'
import MyPaginate from '../../components/MyPaginate'
import { useGetArtistMusicQuery } from '../../store/api/apiSlice'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
export default function Singer() {
  const params = useParams()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data: musicList, isFetching } = useGetArtistMusicQuery({ artistId: params.id || '', pn: currentPage })
  return (
    <>
      {!isFetching ? (
        <>
          <MusicList type="singer" currentPage={currentPage} list={musicList?.data.list ?? []} />
          <div className={styles['paginate']}>
            <MyPaginate
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageCount={musicList?.data.total ? Math.ceil(+musicList?.data.total / 20) : 0}
            />
          </div>
        </>
      ) : (
        <Loading
          style={{
            marginTop: '80px',
          }}
        />
      )}
    </>
  )
}
