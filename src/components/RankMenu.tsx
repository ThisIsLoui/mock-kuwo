import { useState } from 'react'
import styles from './RankMenu.module.scss'
import MyImg from './MyImg'
import type { RankMenu } from '../store/api/type'
export default function RankMenu({
  rankMenuList,
  selectedRank,
  setSelectedRank,
  setCurrentPage,
}: {
  rankMenuList: { data: RankMenu[] }
  selectedRank: string
  setSelectedRank: (selectedRank: string) => void
  setCurrentPage: (currentPage: number) => void
}) {
  const [selectedTab, setSelectedTab] = useState<number>(0)
  return (
    <div className={styles['box']}>
      <div className={styles['top']}>
        {rankMenuList?.data.slice(0, 3).map((item, index) => (
          <p onClick={() => setSelectedTab(index)} key={item.name} className={selectedTab === index ? styles['active'] : ''}>
            {item.name}
          </p>
        ))}
      </div>
      <ul className={styles['bottom']}>
        {rankMenuList?.data.slice(0, 3)[selectedTab].list.map((item) => (
          <li
            onClick={() => {
              if (item.sourceid) {
                setSelectedRank(item.sourceid)
                setCurrentPage(1)
              }
            }}
            className={selectedRank === item.sourceid ? styles['active'] : ''}
            key={item.id}
          >
            <MyImg src={item.pic} />
            <div className={styles['right']}>
              <h4>{item.name}</h4>
              <p>{item.pub}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
