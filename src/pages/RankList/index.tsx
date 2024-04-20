import { useState } from 'react'
import RankMenu from '../../components/RankMenu'
import styles from './index.module.scss'
import { useGetRankListByIdQuery, useGetRankMenuQuery } from '../../store/api/apiSlice'
import MyButton from '../../components/MyButton'
import { CiPlay1 } from 'react-icons/ci'
import { IoAdd } from 'react-icons/io5'
import { GoComment } from 'react-icons/go'
import { AiOutlineHeart } from 'react-icons/ai'
import MusicList from '../../components/MusicList'
import Loading from '../../components/Loading'
import MyPaginate from '../../components/MyPaginate'
import CommentList from '../../components/CommentList'
import usePlay from '../../hooks/usePlay'
import { Music } from '../../store/api/type'
import useModal from '../../hooks/useModal'
export default function RankList() {
  const { data: rankMenuList } = useGetRankMenuQuery()
  const [selectedRank, setSelectedRank] = useState<string>('93')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data: musicList, isFetching } = useGetRankListByIdQuery({ bangId: selectedRank, pn: currentPage })
  const { playMany, addManyToList } = usePlay()
  const { openModalWithDefaultText } = useModal()

  return (
    <>
      <main className="container">
        <div className={styles['wrapper']}>
          <RankMenu rankMenuList={rankMenuList!} selectedRank={selectedRank} setCurrentPage={setCurrentPage} setSelectedRank={setSelectedRank} />
          <div className={styles['right']}>
            {!isFetching ? (
              <div className={styles['list']}>
                <div className={styles['info']}>
                  <h2>{rankMenuList?.data.map((item) => item.list.find((i) => i.sourceid === selectedRank)?.name).join('')}</h2>
                  <p>更新时间：{musicList?.data.pub}</p>
                </div>
                <div className={styles['btns']}>
                  <MyButton onClick={() => playMany(musicList?.data.musicList as Music[])} icon={<CiPlay1 />} type="yellow">
                    播放全部
                  </MyButton>
                  <MyButton onClick={() => addManyToList(musicList?.data.musicList as Music[])} icon={<IoAdd />}>
                    添加
                  </MyButton>
                  <MyButton onClick={openModalWithDefaultText} icon={<AiOutlineHeart />}>
                    收藏
                  </MyButton>
                  <MyButton onClick={openModalWithDefaultText} icon={<GoComment />}>
                    评论
                  </MyButton>
                </div>
                <MusicList type="rank" currentPage={currentPage} list={musicList?.data.musicList ?? []} />
                <div className={styles['paginate']}>
                  <MyPaginate
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageCount={musicList?.data.num ? +musicList?.data.num / 20 : 0}
                  />
                </div>
              </div>
            ) : (
              <Loading
                style={{
                  marginTop: '100px',
                }}
              />
            )}
            <CommentList type="rank" id={selectedRank} />
          </div>
        </div>
      </main>
    </>
  )
}
