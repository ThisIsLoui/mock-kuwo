import { useState } from 'react'
import PlaylistMenu from '../../components/PlaylistMenu'
import styles from './index.module.scss'
import { useGetPlaylistByCategoryQuery } from '../../store/api/apiSlice'
import Loading from '../../components/Loading'
import PlaylistCard from '../../components/PlaylistCard'
import MyPaginate from '../../components/MyPaginate'
export default function PlayList() {
  const [selectedTag, setSelectedTag] = useState<'default_new' | 'default_hot' | string>('default_new')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data: playlistList, isFetching } = useGetPlaylistByCategoryQuery({ id: selectedTag, pn: currentPage })
  return (
    <>
      <main className="container">
        <div className={styles['wrapper']}>
          <PlaylistMenu selectedTag={selectedTag} setCurrentPage={setCurrentPage} setSelectedTag={setSelectedTag} />

          {!isFetching ? (
            <>
              <div className={styles['list']}>{playlistList?.data.data.map((item) => <PlaylistCard key={item.id} playlist={item} />)}</div>
              <div className={styles['paginate']}>
                <MyPaginate
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pageCount={playlistList?.data.total ? Math.ceil(+playlistList?.data.total / 20) : 0}
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
      </main>
    </>
  )
}
