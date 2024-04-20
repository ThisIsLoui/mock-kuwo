import { useParams } from 'react-router-dom'
import Loading from '../../../components/Loading'
import { useGetArtistInfoQuery } from '../../../store/api/apiSlice'
import styles from './index.module.scss'
export default function SingerInfo() {
  const params = useParams()
  const { data: singerInfo, isFetching } = useGetArtistInfoQuery({ artistId: params.id || '' })

  return (
    <>
      {!isFetching ? (
        <>
          <div className={styles['title']}>基本信息</div>
          <ul className={styles['list']}>
            <li>
              <p>
                姓名：
                <span className={styles['value']}>{singerInfo?.data.name || '-'}</span>
              </p>
              <p>
                英文名：
                <span className={styles['value']}>-</span>
              </p>
            </li>
            <li>
              <p>
                性别：
                <span className={styles['value']}>{singerInfo?.data.gener || '-'}</span>
              </p>
              <p>
                国籍：
                <span className={styles['value']}>{singerInfo?.data.country || '-'}</span>
              </p>
            </li>
            <li>
              <p>
                出生地：
                <span className={styles['value']}>{singerInfo?.data.birthplace || '-'}</span>
              </p>
              <p>
                语言：
                <span className={styles['value']}>{singerInfo?.data.language || '-'}</span>
              </p>
            </li>
            <li>
              <p>
                生日：
                <span className={styles['value']}>{singerInfo?.data.birthday || '-'}</span>
              </p>
              <p>
                星座：
                <span className={styles['value']}>{singerInfo?.data.constellation || '-'}</span>
              </p>
            </li>
            <li>
              <p>
                身高：
                <span className={styles['value']}>{singerInfo?.data.tall || '-'}</span>
              </p>
              <p>
                体重：
                <span className={styles['value']}>{singerInfo?.data.weight || '-'}</span>
              </p>
            </li>
          </ul>
          <div className={styles['title']}>个人简介</div>
          <p className={styles['profile']} dangerouslySetInnerHTML={{ __html: singerInfo?.data.info || '暂无简介' }}></p>
        </>
      ) : (
        <Loading
          style={{
            marginTop: '80px',
          }}
        />
      )}
    </>
  )
}
