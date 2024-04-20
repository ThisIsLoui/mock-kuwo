import { FiSearch } from 'react-icons/fi'
import styles from './SearchBar.module.scss'
import SearchTip from './SearchTip'
import { useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function SearchBar() {
  const [query] = useSearchParams()
  const nav = useNavigate()
  const refInput = useRef<HTMLInputElement>(null)
  const [searchKey, setSearchKey] = useState(query.get('key') || '')
  const [canShowTip, setCanShowTip] = useState(false)
  return (
    <div className={styles['search']}>
      <FiSearch
        onClick={() =>
          nav({
            pathname: '/search',
            search: `?key=${searchKey}`,
          })
        }
      />
      <input
        ref={refInput}
        value={searchKey}
        onChange={(e) => {
          setSearchKey(e.target.value)
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            nav({
              pathname: '/search',
              search: `?key=${searchKey}`,
            })
          }
        }}
        onFocus={() => {
          setCanShowTip(true)
        }}
        placeholder="搜索音乐/MV/歌单/歌手"
        type="text"
      />
      <SearchTip searchKey={searchKey} canShow={canShowTip} setCanShow={setCanShowTip} refInput={refInput} />
    </div>
  )
}
