import { Outlet, useParams } from 'react-router-dom'
import styles from './SingerLayout.module.scss'
import classNames from 'classnames'
import MyImg from '../components/MyImg'
import { Link } from 'react-router-dom'
import MyButton from '../components/MyButton'
import { CiPlay1 } from 'react-icons/ci'
import { AiOutlineHeart } from 'react-icons/ai'
import { GoDeviceDesktop } from 'react-icons/go'
import { NavLink } from 'react-router-dom'
import { DiAndroid, DiWindows } from 'react-icons/di'
import { BsApple } from 'react-icons/bs'
import { useGetArtistInfoQuery, useGetArtistMusicQuery } from '../store/api/apiSlice'
import Loading from '../components/Loading'
import usePlay from '../hooks/usePlay'
import { Music } from '../store/api/type'

export default function SingerLayout() {
  const params = useParams()
  const { data: singerInfo, isFetching } = useGetArtistInfoQuery({ artistId: params.id || '' })
  const { data: musicList, isLoading: isFetchingArtistMusic } = useGetArtistMusicQuery({ artistId: params.id || '', pn: 1 })
  const { playMany } = usePlay()
  return (
    <>
      {!isFetching ? (
        <>
          <div className={styles['top']}>
            <div className={classNames('container', styles['inner'])}>
              <div className={styles['left']}>
                <MyImg src={singerInfo?.data.pic300 || singerInfo?.data.pic120 || singerInfo?.data.pic} />
              </div>
              <div className={styles['right']}>
                <p className={styles['name']}>{singerInfo?.data.name}</p>
                <p className={styles['list']}>
                  <span>单曲：</span>
                  <span className={styles['value']}>{singerInfo?.data.musicNum}</span>
                  <span>专辑：</span>
                  <span className={styles['value']}>{singerInfo?.data.albumNum}</span>
                  <span>MV：</span>
                  <span className={styles['value']}>{singerInfo?.data.mvNum}</span>
                  <span>粉丝：</span>
                  <span className={styles['value']}>{singerInfo?.data.artistFans}</span>
                </p>
                <p className={styles['info']}>
                  <span>英文名：-</span>
                  <span>国籍：{singerInfo?.data.country || '-'}</span>
                  <span>语言：{singerInfo?.data.language || '-'}</span>
                  <span>出生地：{singerInfo?.data.birthplace || '-'}</span>
                  <span>星座：{singerInfo?.data.constellation || '-'}</span>
                  <Link to="./info">全部{'>'}</Link>
                </p>
                <div className={styles['btns']}>
                  {!isFetchingArtistMusic && (
                    <MyButton onClick={() => playMany(musicList?.data.list as Music[])} icon={<CiPlay1 />} type="yellow">
                      播放全部歌曲
                    </MyButton>
                  )}
                  <MyButton style={{ background: '#ebebeb', color: '#666' }} icon={<AiOutlineHeart />}>
                    收藏
                  </MyButton>
                  <MyButton style={{ background: '#ebebeb', color: '#666' }} icon={<GoDeviceDesktop />}>
                    使用客户端查看歌手
                  </MyButton>
                </div>
              </div>
            </div>
          </div>
          <div className={classNames('container', styles['bottom'])}>
            <div className={styles['left']}>
              <div className={styles['tab']}>
                <NavLink className={({ isActive }) => (isActive ? styles['active'] : '')} end to=".">
                  单曲
                </NavLink>
                <NavLink className={({ isActive }) => (isActive ? styles['active'] : '')} to="./album">
                  专辑
                </NavLink>
                <NavLink className={({ isActive }) => (isActive ? styles['active'] : '')} to="./mv">
                  MV
                </NavLink>
                <NavLink className={({ isActive }) => (isActive ? styles['active'] : '')} to="./info">
                  简介
                </NavLink>
              </div>
              <Outlet />
            </div>
            <div className={styles['right']}>
              <h3>下载酷我音乐</h3>
              <p>无损音质，还原爱豆动听原声</p>
              <div className={styles['icons']}>
                <a href="/">
                  <DiWindows />
                </a>
                <a href="/">
                  <DiAndroid />
                </a>
                <a href="/">
                  <BsApple />
                </a>
              </div>
              <div className={styles['text']}>
                <span>PC 版</span>
                <span>安卓版</span>
                <span>IOS 版</span>
              </div>
            </div>
          </div>
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
