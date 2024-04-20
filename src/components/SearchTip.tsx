import { useNavigate } from 'react-router-dom'
import styles from './SearchTip.module.scss'
import { useGetSearchKeyQuery } from '../store/api/paytypeApiSlice'
import { useRef } from 'react'
import { useClickAway, useDebounce } from 'ahooks'
export default function SearchTip({
  searchKey,
  canShow,
  setCanShow,
  refInput,
}: {
  searchKey: string
  canShow: boolean
  setCanShow: (canShow: boolean) => void
  refInput: React.RefObject<HTMLInputElement>
}) {
  const debouncedValue = useDebounce(searchKey, { wait: 500 })
  const { data, isFetching } = useGetSearchKeyQuery({ key: debouncedValue })
  const nav = useNavigate()
  const ref = useRef<HTMLDivElement>(null)
  useClickAway(() => {
    setCanShow(false)
  }, [ref, refInput])

  const handleOnClick = (key: string) => {
    nav({
      pathname: '/search',
      search: `?key=${key}`,
    })
    setCanShow(false)
  }
  return (
    <>
      <div
        style={{
          display: canShow && !isFetching && data?.data && data.data.length !== 0 ? 'block' : 'none',
        }}
        ref={ref}
        className={styles['tip']}
      >
        {debouncedValue === '' ? (
          <>
            <p className={styles['title']}>大家都在搜</p>
            {data?.data.map((item, index) => (
              <div key={item} onClick={() => handleOnClick(item)} className={styles['item']}>
                <span
                  style={{
                    background: index === 0 ? '#EA4343' : index === 1 ? '#FF6B21' : index === 2 ? 'FFB700' : '#b3b3b3',
                  }}
                  className={styles['rank']}
                >
                  {index + 1}
                </span>
                {item}
              </div>
            ))}
          </>
        ) : (
          <>
            {data?.data.map((item) => (
              <div key={item} onClick={() => handleOnClick(item.match(/RELWORD=(.*?)\r\n/)?.[1] || '')} className={styles['item']}>
                {item.match(/RELWORD=(.*?)\r\n/)?.[1]
                  ? highlightText(item.match(/RELWORD=(.*?)\r\n/)?.[1] as string, debouncedValue)
                  : '获取搜索提示时出错'}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  )
}

const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm.trim()) return text // 如果搜索关键词为空，则返回原始文本
  const regex = new RegExp(`(${searchTerm})`, 'gi')
  return text.split(regex).map((part, index) =>
    regex.test(part) ? (
      <span className={styles['highlight']} key={index}>
        {part}
      </span>
    ) : (
      part
    ),
  )
}
