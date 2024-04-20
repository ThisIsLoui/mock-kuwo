import { RiVipFill } from 'react-icons/ri'
import styles from './CommentList.module.scss'
import MyImg from './MyImg'
import nodata from '../assets/nodata.png'
import { useState } from 'react'
import { useGetCommentByIdQuery } from '../store/api/commentApiSlice'
import Loading from './Loading'
import MyPaginate from './MyPaginate'
export default function CommentList({ type, id }: { type: 'rank' | 'mv' | 'music' | 'album' | 'playlist'; id: string }) {
  const [currentPage, setCurrentPage] = useState(1)
  const { data: commentList, isLoading } = useGetCommentByIdQuery({ type: type, page: currentPage, sid: id })
  return (
    <>
      <div className={styles['title']}>
        <h2>最新评论</h2>
        <p>{commentList?.total || '0'}条</p>
      </div>
      {isLoading ? (
        <Loading
          style={{
            marginTop: '100px',
          }}
        />
      ) : commentList?.total !== 0 && commentList?.total !== '0' && commentList?.rows ? (
        <>
          <div className={styles['list']}>
            {commentList?.rows.map((item) => {
              return (
                <div key={item.id} className={styles['item']}>
                  <div className={styles['left']}>
                    <MyImg src={item.u_pic} />
                  </div>
                  <div className={styles['right']}>
                    <p className={styles['name']}>
                      {item.u_name} {item.svip !== '-1' && <RiVipFill />}
                    </p>
                    <p className={styles['content']}>{item.msg}</p>
                    {item.reply && (
                      <div className={styles['reply']}>
                        <span className={styles['at']}>@{item.reply.u_name}</span>
                        {item.reply.msg}
                      </div>
                    )}
                    <p className={styles['time']}>{item.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={styles['paginate']}>
            <MyPaginate currentPage={currentPage} setCurrentPage={setCurrentPage} pageCount={commentList?.totalPage || 0} />
          </div>
        </>
      ) : (
        <div className={styles['empty']}>
          <MyImg src={nodata} />
          <p>暂无评论</p>
        </div>
      )}
    </>
  )
}
