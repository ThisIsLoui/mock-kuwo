import { useState } from 'react'
import MyLi from '../../components/MyLi'
import styles from './index.module.scss'
import MvCard from '../../components/MvCard'
import { useGetMvListQuery } from '../../store/api/apiSlice'
import Loading from '../../components/Loading'
import MyPaginate from '../../components/MyPaginate'
const mvTagList = [
  { name: '首播', id: 236682871 },
  { name: '华语', id: 236682731 },
  { name: '日韩', id: 236742444 },
  { name: '网络', id: 236682773 },
  { name: '欧美', id: 236682735 },
  { name: '现场', id: 236742576 },
  { name: '热舞', id: 236682777 },
  { name: '伤感', id: 236742508 },
  { name: '剧情', id: 236742578 },
]
export default function MvList() {
  const [selectedTag, setSelectedTag] = useState(236682871)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data: mvList, isFetching } = useGetMvListQuery({ pid: selectedTag, pn: currentPage })
  return (
    <>
      <main className="container">
        <div className={styles['wrapper']}>
          <ul>
            {mvTagList.map((item) => (
              <MyLi
                key={item.id}
                onClick={() => {
                  setSelectedTag(item.id)
                  setCurrentPage(1)
                }}
                isActive={selectedTag === item.id}
              >
                {item.name}
              </MyLi>
            ))}
          </ul>
          {!isFetching ? (
            <>
              <div className={styles['list']}>{mvList?.data.mvlist.map((item) => <MvCard key={item.id} mv={item} />)}</div>
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
      </main>
    </>
  )
}
