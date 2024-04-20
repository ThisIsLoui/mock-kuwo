import { useState } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useGetSingerListQuery } from '../../store/api/apiSlice'
import Loading from '../../components/Loading'
import MyPaginate from '../../components/MyPaginate'
import SingerCard from '../../components/SingerCard'
import MyLi from '../../components/MyLi'
const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '#',
]
const category = ['华语男', '华语女', '华语组合', '日韩男', '日韩女', '日韩组合', '欧美男', '欧美女', '欧美组合', '其他']
export default function SingerList() {
  const [selectedAlphabet, setSelectedAlphabet] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { data: singerList, isFetching } = useGetSingerListQuery({ category: selectedCategory, prefix: selectedAlphabet, pn: currentPage })
  return (
    <>
      <main className="container">
        <div className={styles['wrapper']}>
          <ul className={styles['alphabet']}>
            <li
              onClick={() => {
                setSelectedAlphabet('')
                setCurrentPage(1)
              }}
              className={classNames(styles['item'], { [styles['active']]: selectedAlphabet === '' })}
            >
              热门
            </li>
            {alphabet.map((item) => (
              <li
                key={item}
                onClick={() => {
                  setSelectedAlphabet(item)
                  setCurrentPage(1)
                }}
                className={classNames(styles['item'], { [styles['active']]: selectedAlphabet === item })}
              >
                {item}
              </li>
            ))}
          </ul>
          <ul className={styles['category']}>
            <MyLi
              onClick={() => {
                setSelectedCategory(0)
                setCurrentPage(1)
              }}
              isActive={selectedCategory === 0}
            >
              全部
            </MyLi>
            {category.map((item, index) => (
              <MyLi
                key={item}
                onClick={() => {
                  setSelectedCategory(index + 1)
                  setCurrentPage(1)
                }}
                isActive={selectedCategory === index + 1}
              >
                {item}
              </MyLi>
            ))}
          </ul>
          {!isFetching ? (
            <>
              <div className={styles['list']}>{singerList?.data.artistList.map((item) => <SingerCard key={item.id} singer={item} />)}</div>
              <div className={styles['paginate']}>
                <MyPaginate
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pageCount={singerList?.data.total ? Math.ceil(+singerList?.data.total / 60) : 0}
                />
              </div>
            </>
          ) : (
            <Loading
              style={{
                marginTop: '100px',
              }}
            />
          )}
        </div>
      </main>
    </>
  )
}
