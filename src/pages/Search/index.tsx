import { useSearchParams } from 'react-router-dom'
import styles from './index.module.scss'
import { useEffect, useRef, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import SearchTip from '../../components/SearchTip'
import classNames from 'classnames'
import Loading from '../../components/Loading'
import MusicList from '../../components/MusicList'
import MyImg from '../../components/MyImg'
import nodata from '../../assets/nodata.png'
import MyPaginate from '../../components/MyPaginate'
import AlbumCard from '../../components/AlbumCard'
import { useLazySearchSongQuery } from '../../store/api/searchSongApiSlice'
import { useLazySearchAlbumQuery, useLazySearchMvQuery, useLazySearchPlaylistQuery, useLazySearchSingerQuery } from '../../store/api/apiSlice'
import MvCard from '../../components/MvCard'
import PlaylistCard from '../../components/PlaylistCard'
import SingerCard from '../../components/SingerCard'
export default function Search() {
  const refInput = useRef<HTMLInputElement>(null)

  const [query, setQuery] = useSearchParams()
  const [searchKey, setSearchKey] = useState(query.get('key') || '')
  const [searchType, setSearchType] = useState<'song' | 'album' | 'mv' | 'playlist' | 'singer'>(
    query.get('type') !== 'song' &&
      query.get('type') !== 'album' &&
      query.get('type') !== 'mv' &&
      query.get('type') !== 'playlist' &&
      query.get('type') !== 'singer'
      ? 'song'
      : (query.get('type') as 'song' | 'album' | 'mv' | 'playlist' | 'singer'),
  )
  const [canShowTip, setCanShowTip] = useState(false)
  const handleChangeSearchType = (type: 'song' | 'album' | 'mv' | 'playlist' | 'singer') => {
    setQuery({
      key: query.get('key') || '',
      type,
    })
  }

  const [currentPageSong, setCurrentPageSong] = useState(1)
  const [searchSong, { data: songData, isFetching: isSongFetching }] = useLazySearchSongQuery()

  const [currentPageAlbum, setCurrentPageAlbum] = useState(1)
  const [searchAlbum, { data: albumData, isFetching: isAlbumFetching }] = useLazySearchAlbumQuery()

  const [currentPageMv, setCurrentPageMv] = useState(1)
  const [searchMv, { data: mvData, isFetching: isMvFetching }] = useLazySearchMvQuery()

  const [currentPagePlaylist, setCurrentPagePlaylist] = useState(1)
  const [searchPlaylist, { data: playlistData, isFetching: isPlaylistFetching }] = useLazySearchPlaylistQuery()

  const [currentPageSinger, setCurrentPageSinger] = useState(1)
  const [searchSinger, { data: singerData, isFetching: isSingerFetching }] = useLazySearchSingerQuery()

  useEffect(() => {
    const searchKey = query.get('key')
    const searchType =
      query.get('type') !== 'song' &&
      query.get('type') !== 'album' &&
      query.get('type') !== 'mv' &&
      query.get('type') !== 'playlist' &&
      query.get('type') !== 'singer'
        ? 'song'
        : (query.get('type') as 'song' | 'album' | 'mv' | 'playlist' | 'singer')
    if (searchKey) {
      switch (searchType) {
        case 'album':
          searchAlbum({ key: searchKey, pn: currentPageAlbum })
          break
        case 'mv':
          searchMv({ key: searchKey, pn: currentPageMv })
          break
        case 'playlist':
          searchPlaylist({ key: searchKey, pn: currentPagePlaylist })
          break
        case 'singer':
          searchSinger({ key: searchKey, pn: currentPageSinger })
          break
        default:
          searchSong({ key: searchKey, pn: currentPageSong - 1 })
          break
      }
    }
  }, [
    query,
    currentPageSong,
    searchSong,
    currentPageAlbum,
    searchAlbum,
    currentPageMv,
    searchMv,
    currentPagePlaylist,
    searchPlaylist,
    currentPageSinger,
    searchSinger,
  ])

  useEffect(() => {
    setSearchType(
      query.get('type') !== 'song' &&
        query.get('type') !== 'album' &&
        query.get('type') !== 'mv' &&
        query.get('type') !== 'playlist' &&
        query.get('type') !== 'singer'
        ? 'song'
        : (query.get('type') as 'song' | 'album' | 'mv' | 'playlist' | 'singer'),
    )
    setSearchKey(query.get('key') || '')
  }, [query])

  return (
    <>
      <main>
        <div className={styles['banner']}>
          <div className={styles['search']}>
            <input
              ref={refInput}
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value)
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  setQuery({
                    key: searchKey,
                    type: searchType,
                  })
                }
              }}
              onFocus={() => {
                setCanShowTip(true)
              }}
              placeholder="搜索音乐/MV/歌单/歌手"
              type="text"
            />
            <FiSearch
              onClick={() =>
                setQuery({
                  key: searchKey,
                  type: searchType,
                })
              }
            />
            <SearchTip searchKey={searchKey} canShow={canShowTip} refInput={refInput} setCanShow={setCanShowTip} />
          </div>
        </div>
        <div className={classNames(styles['content'], 'container')}>
          <div className={styles['top']}>
            <h2>搜索结果</h2>
            <ul>
              <li onClick={() => handleChangeSearchType('song')} className={classNames({ [styles['active']]: searchType === 'song' })}>
                单曲
              </li>
              <li onClick={() => handleChangeSearchType('album')} className={classNames({ [styles['active']]: searchType === 'album' })}>
                专辑
              </li>
              <li onClick={() => handleChangeSearchType('mv')} className={classNames({ [styles['active']]: searchType === 'mv' })}>
                MV
              </li>
              <li onClick={() => handleChangeSearchType('playlist')} className={classNames({ [styles['active']]: searchType === 'playlist' })}>
                歌单
              </li>
              <li onClick={() => handleChangeSearchType('singer')} className={classNames({ [styles['active']]: searchType === 'singer' })}>
                歌手
              </li>
            </ul>
          </div>
          <div className={styles['bottom']}>
            {isSongFetching || isAlbumFetching || isMvFetching || isPlaylistFetching || isSingerFetching ? (
              <Loading
                style={{
                  marginTop: '80px',
                }}
              />
            ) : searchType === 'song' ? (
              <>
                {songData?.data && songData.data.length !== 0 ? (
                  <>
                    <MusicList list={songData?.data} type="search" />
                    <div className={styles['paginate']}>
                      <MyPaginate currentPage={currentPageSong} pageCount={Math.ceil(+songData.total / 20)} setCurrentPage={setCurrentPageSong} />
                    </div>
                  </>
                ) : (
                  <div className={styles['empty']}>
                    <MyImg src={nodata} />
                    <p>找不到相关单曲</p>
                  </div>
                )}
              </>
            ) : searchType === 'album' ? (
              <>
                {albumData?.data && albumData.data.albumList ? (
                  <>
                    <div className={styles['list']}>
                      {albumData.data.albumList.map((item) => (
                        <AlbumCard key={item.albumid} type="search" album={item} />
                      ))}
                    </div>
                    <div className={styles['paginate']}>
                      <MyPaginate
                        currentPage={currentPageAlbum}
                        pageCount={Math.ceil(+albumData.data.total / 20)}
                        setCurrentPage={setCurrentPageAlbum}
                      />
                    </div>
                  </>
                ) : (
                  <div className={styles['empty']}>
                    <MyImg src={nodata} />
                    <p>找不到相关专辑</p>
                  </div>
                )}
              </>
            ) : searchType === 'mv' ? (
              <>
                {mvData?.data && mvData.data.mvlist ? (
                  <>
                    <div className={styles['list']}>
                      {mvData.data.mvlist.map((item) => (
                        <MvCard key={item.id} mv={item} />
                      ))}
                    </div>
                    <div className={styles['paginate']}>
                      <MyPaginate currentPage={currentPageMv} pageCount={Math.ceil(+mvData.data.total / 20)} setCurrentPage={setCurrentPageMv} />
                    </div>
                  </>
                ) : (
                  <div className={styles['empty']}>
                    <MyImg src={nodata} />
                    <p>找不到相关MV</p>
                  </div>
                )}
              </>
            ) : searchType === 'playlist' ? (
              <>
                {playlistData?.data && playlistData.data.list ? (
                  <>
                    <div className={styles['list']}>
                      {playlistData.data.list.map((item) => (
                        <PlaylistCard type="search" key={item.id} playlist={item} />
                      ))}
                    </div>
                    <div className={styles['paginate']}>
                      <MyPaginate
                        currentPage={currentPagePlaylist}
                        pageCount={Math.ceil(+playlistData.data.total / 30)}
                        setCurrentPage={setCurrentPagePlaylist}
                      />
                    </div>
                  </>
                ) : (
                  <div className={styles['empty']}>
                    <MyImg src={nodata} />
                    <p>找不到相关歌单</p>
                  </div>
                )}
              </>
            ) : (
              <>
                {singerData?.data && singerData.data.list ? (
                  <>
                    <div className={styles['list']}>
                      {singerData.data.list.map((item) => (
                        <SingerCard key={item.id} singer={item} />
                      ))}
                    </div>
                    <div className={styles['paginate']}>
                      <MyPaginate
                        currentPage={currentPageSinger}
                        pageCount={Math.ceil(+singerData.data.total / 30)}
                        setCurrentPage={setCurrentPageSinger}
                      />
                    </div>
                  </>
                ) : (
                  <div className={styles['empty']}>
                    <MyImg src={nodata} />
                    <p>找不到相关歌手</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
