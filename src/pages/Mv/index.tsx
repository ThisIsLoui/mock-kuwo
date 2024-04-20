import { IoPlayOutline } from 'react-icons/io5'
import styles from './index.module.scss'
import MyButton from '../../components/MyButton'
import { MdOutlinePhoneAndroid } from 'react-icons/md'
import { GoDownload } from 'react-icons/go'
import { RiShareCircleLine } from 'react-icons/ri'
import { MyVideo } from '../../components/MyVideo'
import { useParams } from 'react-router-dom'
import { useGetPlayurlQuery } from '../../store/api/playurlApiSlice'
import CommentList from '../../components/CommentList'
import { useGetMusicInfoQuery } from '../../store/api/apiSlice'
import countTransform from '../../utils/countTransform'
import { useGetPayTypeQuery } from '../../store/api/paytypeApiSlice'
import useModal from '../../hooks/useModal'
export default function Mv() {
  const params = useParams<{ id: string }>()
  const { data: musicInfo, isFetching: isFetchingMusicInfo } = useGetMusicInfoQuery({ id: params.id || '' })
  const { data: payType, isFetching: isFetchingPayType } = useGetPayTypeQuery({ id: params.id || '' })
  const { data: playurl, isFetching: isFetchingPlayurl, isUninitialized: isUninitializedPlayurl } = useGetPlayurlQuery({ id: params.id || '' })
  const { openModalWithDefaultText } = useModal()
  return (
    <>
      <div className={styles['show']}>
        <div className="container">
          {!isFetchingMusicInfo && !isFetchingPayType && !isFetchingPlayurl && !isUninitializedPlayurl && (
            <>
              <MyVideo
                payType={
                  musicInfo?.data.disable === 1
                    ? 'disable'
                    : musicInfo?.data.mvpayinfo.play !== 0
                      ? 'noFree'
                      : payType?.data.feeType === 2
                        ? 'vipFree'
                        : 'free'
                }
                src={playurl?.data ? playurl?.data.url : ''}
              />
              <div className={styles['top']}>
                <div className={styles['left']}>
                  <span className={styles['title']}>{musicInfo?.data.name}</span>
                  <span className={styles['divider']}>-</span>
                  {musicInfo?.data.artist}
                </div>
                <div className={styles['right']}>
                  <MyButton
                    onClick={openModalWithDefaultText}
                    style={{ background: 'hsla(0, 0%, 100%, .05)', color: 'hsla(0, 0%, 100%, .8)' }}
                    icon={<MdOutlinePhoneAndroid />}
                  >
                    手机看
                  </MyButton>
                  <MyButton
                    onClick={openModalWithDefaultText}
                    style={{ background: 'hsla(0, 0%, 100%, .05)', color: 'hsla(0, 0%, 100%, .8)' }}
                    icon={<GoDownload />}
                  >
                    下载
                  </MyButton>
                  <MyButton
                    onClick={openModalWithDefaultText}
                    style={{ background: 'hsla(0, 0%, 100%, .05)', color: 'hsla(0, 0%, 100%, .8)' }}
                    icon={<RiShareCircleLine />}
                  >
                    分享
                  </MyButton>
                </div>
              </div>
              <p className={styles['bottom']}>
                <IoPlayOutline />
                播放量：{countTransform(musicInfo?.data.mvPlayCnt || 0)}次
              </p>
            </>
          )}
        </div>
      </div>
      <div className={styles['comment']}>
        <div className="container">
          <CommentList type="mv" id={params.id || ''} />
        </div>
      </div>
    </>
  )
}
