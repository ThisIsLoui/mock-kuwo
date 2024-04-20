import { useSelector } from 'react-redux'
import styles from './Lyric.module.scss'
import { RootState } from '../store'
import { useGetLyricQuery } from '../store/api/paytypeApiSlice'
import { useParams } from 'react-router-dom'
import Loading from './Loading'
import MyImg from './MyImg'
import nodata from '../assets/nodata.png'
import classNames from 'classnames'
import { WheelEvent, useEffect, useMemo, useRef, useState } from 'react'

export default function Lyric() {
  const params = useParams<{ id: string }>()

  const lyricDiv = useRef<HTMLDivElement>(null)
  const scrollDiv = useRef<HTMLDivElement>(null)
  const currentP = useRef<HTMLParagraphElement>(null)

  const currentTime = useSelector((state: RootState) => state.player.currentTime)
  const currentMusic = useSelector((state: RootState) => state.player.currentMusic)
  const { data: lyricData, isFetching } = useGetLyricQuery({ id: params.id || '' })

  // 自动滚动歌词、高亮
  const currentLine = useMemo(() => {
    return (
      currentMusic.rid &&
      currentMusic.rid.toString() === params.id &&
      lyricData?.data.lrclist &&
      lyricData?.data.lrclist.find((item, index) => {
        return currentTime >= +item.time && currentTime < +(lyricData.data.lrclist[index + 1]?.time || 999999)
      })
    )
  }, [lyricData, currentTime, currentMusic.rid, params.id])
  const [offsetY, setOffsetY] = useState(-50)
  useEffect(() => {
    if (currentMusic.rid && currentMusic.rid.toString() === params.id && scrollDiv.current && currentP.current) {
      const boxRect = lyricDiv.current!.getBoundingClientRect()
      const divRect = scrollDiv.current!.getBoundingClientRect()
      const pRect = currentP.current!.getBoundingClientRect()
      setOffsetY(pRect.top - divRect.top - boxRect.height / 2 + pRect.height / 2)
    } else {
      setOffsetY(-50)
    }
  }, [currentLine, currentMusic.rid, params.id])

  // 处理鼠标手动滚动歌词
  const handleScroll = (e: WheelEvent<HTMLDivElement>) => {
    if (!scrollDiv.current || !lyricDiv.current) return
    e.preventDefault()
    const currentOffset = scrollDiv.current.getBoundingClientRect().top - lyricDiv.current.getBoundingClientRect().top
    console.log(currentOffset)

    const bottomScrollOffset = -(scrollDiv.current.getBoundingClientRect().height - lyricDiv.current.getBoundingClientRect().height / 2)
    console.log('bottom', bottomScrollOffset)

    const topScrollOffset = -(-lyricDiv.current.getBoundingClientRect().height / 2)
    console.log('top', topScrollOffset)

    let newOffset = currentOffset
    // 鼠标滚轮往下走
    if (e.deltaY > 0 && currentOffset > bottomScrollOffset) {
      newOffset -= e.deltaY * 2.3
    }
    // 鼠标滚轮往上走
    else if (e.deltaY < 0 && currentOffset < topScrollOffset) {
      newOffset -= e.deltaY * 2.3
    }

    if (newOffset < bottomScrollOffset) {
      newOffset = bottomScrollOffset // Ensure not to scroll above the top
    } else if (newOffset > topScrollOffset) {
      newOffset = topScrollOffset // Ensure not to scroll below the bottom
    }

    scrollDiv.current.style.transform = `translateY(${newOffset}px)`
  }
  useEffect(() => {
    const lyric = lyricDiv.current
    if (lyric) {
      lyric.addEventListener(
        'wheel',
        (e) => {
          handleScroll(e as unknown as WheelEvent<HTMLDivElement>)
        },
        { passive: false },
      )
    }
    return () => {
      if (lyric) {
        lyric.removeEventListener('wheel', (e) => {
          handleScroll(e as unknown as WheelEvent<HTMLDivElement>)
        })
      }
    }
  }, [isFetching])

  return (
    <>
      <div className={styles['title']}>
        <h2>歌词</h2>
      </div>
      {isFetching ? (
        <Loading
          style={{
            marginTop: '100px',
          }}
        />
      ) : lyricData?.data.lrclist ? (
        <div ref={lyricDiv} className={styles['lyric']}>
          <div
            ref={scrollDiv}
            style={{
              transform: `translateY(${-offsetY}px)`,
            }}
            className={styles['scroll']}
          >
            {lyricData.data.lrclist.map((item) =>
              item.lineLyric.trim() !== '' ? (
                <p
                  ref={currentLine === item ? currentP : null}
                  key={`${item.time}-${item.lineLyric}`}
                  className={classNames(styles['line'], {
                    [styles['active']]: currentLine === item,
                  })}
                >
                  {item.lineLyric}
                </p>
              ) : null,
            )}
          </div>
        </div>
      ) : (
        <div className={styles['empty']}>
          <MyImg src={nodata} />
          <p>暂无歌词</p>
        </div>
      )}
    </>
  )
}
