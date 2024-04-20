import { BsChevronRight } from 'react-icons/bs'
import Banner from '../../components/Banner'
import styles from './index.module.scss'
import className from 'classnames'
import { useGetRecommendPlaylistByTagQuery, useGetRecommendPlaylistTagsQuery, useGetRecommendRankListQuery } from '../../store/api/apiSlice'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PlaylistCard from '../../components/PlaylistCard'
import RankColumn from '../../components/RankColumn'
export default function Home() {
  const [selectedTag, setSelectedTag] = useState<string>('rcm')
  const { data: recommendPlaylistTags } = useGetRecommendPlaylistTagsQuery()
  const { data: recommendPlaylist } = useGetRecommendPlaylistByTagQuery({ tag: selectedTag })
  const { data: recommendRankList } = useGetRecommendRankListQuery()
  return (
    <>
      <main className="container">
        <Banner />
        <section className={styles['recommend']}>
          <div className={styles['top']}>
            <h2>推荐歌单</h2>
            <ul>
              <li onClick={() => setSelectedTag('rcm')} className={className({ [styles['active']]: selectedTag === 'rcm' })}>
                每日推荐
              </li>
              {recommendPlaylistTags?.data.map((item) => (
                <li onClick={() => setSelectedTag(item.id)} className={className({ [styles['active']]: selectedTag === item.id })} key={item.id}>
                  {item.name}
                </li>
              ))}
              <li className={styles['more']}>
                <Link to="/playList">
                  更多 <BsChevronRight />
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles['bottom']}>
            {recommendPlaylist?.data.list
              ? recommendPlaylist?.data.list?.slice(0, 5).map((item) => <PlaylistCard key={item.id} playlist={item} />)
              : recommendPlaylist?.data.data?.map((item) => <PlaylistCard key={item.id} playlist={item} />)}
          </div>
        </section>
        <section className={styles['rank']}>
          <div className={styles['top']}>
            <h2>排行榜</h2>
            <Link className={styles['more']} to="/rankList">
              更多 <BsChevronRight />
            </Link>
          </div>
          <div className={styles['bottom']}>{recommendRankList?.data.map((item) => <RankColumn ranklist={item} key={item.id} />)}</div>
        </section>
      </main>
    </>
  )
}
