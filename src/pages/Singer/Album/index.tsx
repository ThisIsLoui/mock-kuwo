import { useState } from 'react'
import { useParams } from 'react-router-dom'
import AlbumCard from '../../../components/AlbumCard'
import { useGetArtistAlbumQuery } from '../../../store/api/apiSlice'
import Loading from '../../../components/Loading'
import MyPaginate from '../../../components/MyPaginate'
import styles from './index.module.scss'

export default function SingerAlbum() {
  const params = useParams()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data: albumList, isFetching } = useGetArtistAlbumQuery({ artistId: params.id || '', pn: currentPage })
  return (
    <div>
      {!isFetching ? (
        <>
          <div className={styles['list']}>{albumList?.data.albumList.map((item) => <AlbumCard key={item.albumid} album={item} />)}</div>
          <div className={styles['paginate']}>
            <MyPaginate
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageCount={albumList?.data.total ? Math.ceil(+albumList?.data.total / 20) : 0}
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
    </div>
  )
}
