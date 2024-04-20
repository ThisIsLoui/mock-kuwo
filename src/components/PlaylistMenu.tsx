import { useRef, useState } from 'react'
import styles from './PlaylistMenu.module.scss'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { LuTag } from 'react-icons/lu'
import MyLi from './MyLi'
import { useGetPlaylistCategoryQuery } from '../store/api/apiSlice'
import { useClickAway } from 'ahooks'
export default function PlaylistMenu({
  selectedTag,
  setSelectedTag,
  setCurrentPage,
}: {
  selectedTag: string | 'default_new' | 'default_hot'
  setSelectedTag: (tag: string) => void
  setCurrentPage: (page: number) => void
}) {
  const refBox = useRef<null | HTMLDivElement>(null)
  const refLeft = useRef<null | HTMLDivElement>(null)
  const [isOpened, setIsOpened] = useState(false)
  useClickAway(() => {
    if (isOpened) setIsOpened(false)
  }, [refBox, refLeft])
  const handleClick = (tag: string | 'default_new' | 'default_hot') => {
    setSelectedTag(tag)
    setIsOpened(false)
    setCurrentPage(0)
  }
  const { data: playlistTagList } = useGetPlaylistCategoryQuery()
  return (
    <div className={styles['menu']}>
      <div ref={refLeft} onClick={() => setIsOpened(!isOpened)} className={styles['left']}>
        <h3>
          {selectedTag.startsWith('default')
            ? '精选歌单'
            : playlistTagList?.data.map((item) => item.data.find((i) => i.id === selectedTag)?.name).join('')}
        </h3>
        {isOpened ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {selectedTag.startsWith('default') && (
        <div className={styles['right']}>
          <ul className={styles['order']}>
            <li
              onClick={() => {
                handleClick('default_new')
              }}
              className={selectedTag === 'default_new' ? styles['active'] : ''}
            >
              最新
            </li>
            <li
              onClick={() => {
                handleClick('default_hot')
              }}
              className={selectedTag === 'default_hot' ? styles['active'] : ''}
            >
              最热
            </li>
          </ul>
        </div>
      )}
      <div
        style={{
          display: isOpened ? 'block' : 'none',
        }}
        ref={refBox}
        className={styles['box']}
      >
        <div className={styles['tags']}>
          <div className={styles['tag']}>
            <div className={styles['title']}>
              <LuTag />
              默认
            </div>
            <ul className={styles['list']}>
              <MyLi onClick={() => handleClick('default_new')} isActive={selectedTag.startsWith('default')}>
                精选歌单
              </MyLi>
            </ul>
          </div>
          {playlistTagList?.data.map(
            (item) =>
              item.data.length !== 0 && (
                <div key={item.id} className={styles['tag']}>
                  <div className={styles['title']}>
                    <img src={item.img1} alt="" />
                  </div>
                  <ul className={styles['list']}>
                    {item.data.map((tag) => (
                      <MyLi key={tag.id} onClick={() => handleClick(tag.id)} isActive={selectedTag === tag.id}>
                        {tag.name}
                      </MyLi>
                    ))}
                  </ul>
                </div>
              ),
          )}
        </div>
      </div>
    </div>
  )
}
