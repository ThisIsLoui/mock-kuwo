import { useParams } from 'react-router-dom'
import { useGetArtistMvQuery } from '../../../store/api/apiSlice'
import { useState } from 'react'
import Loading from '../../../components/Loading'
import MyPaginate from '../../../components/MyPaginate'
import styles from './index.module.scss'
import MvCard from '../../../components/MvCard'
export default function SingerMv() {
  const params = useParams()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data: mvList, isFetching } = useGetArtistMvQuery({ artistId: params.id || '', pn: currentPage })
  return (
    <div>
      {!isFetching ? (
        <>
          <div className={styles['list']}>
            {mvList?.data.mvlist.map((item) => <MvCard style={{ width: '22.63%', marginRight: '1.78%' }} key={item.id} mv={item} />)}
          </div>
          <div className={styles['paginate']}>
            <MyPaginate
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageCount={mvList?.data.total ? Math.ceil(+mvList?.data.total / 20) : 0}
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
