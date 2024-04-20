import { useDispatch, useSelector } from 'react-redux'
import MyImg from './MyImg'
import nomusic from '../assets/nomusic.png'
import defaultimg from '../assets/default.png'
import styles from './Player.module.scss'
import { AppDispatch, RootState } from '../store'
import { Link } from 'react-router-dom'
import { Slider } from 'antd'
import { BiPauseCircle, BiPlayCircle, BiSkipNext, BiSkipPrevious } from 'react-icons/bi'
import { GoArrowSwitch, GoComment, GoDownload, GoIssueReopened, GoListUnordered, GoMute, GoSync, GoTrash, GoUnmute, GoX } from 'react-icons/go'
import { changePlayMode, updateCurrentTime } from '../store/player/playerSlice'
import { useGlobalAudioPlayer } from 'react-use-audio-player'
import durationTransform from '../utils/durationTransform'
import PlayingIcon from './PlayingIcon'
import classNames from 'classnames'
import usePlay from '../hooks/usePlay'
import { useLazyGetPlayurlQuery } from '../store/api/playurlApiSlice'
import Loading from './Loading'
import { useRef, useState } from 'react'
import { useClickAway } from 'ahooks'
import useModal from '../hooks/useModal'

export default function Player() {
  const dispatch = useDispatch<AppDispatch>()
  const { playNext, playPrev, playOne, removeOne, removeAll } = usePlay()
  const [, { isFetching }] = useLazyGetPlayurlQuery()

  const refPanel = useRef<null | HTMLDivElement>(null)
  const refIcon = useRef<null | HTMLDivElement>(null)
  const [isPanelOpened, setIsPanelOpened] = useState(false)
  useClickAway(() => {
    if (isPanelOpened) setIsPanelOpened(false)
  }, [refPanel, refIcon])

  const musicList = useSelector((state: RootState) => state.player.musicList)
  const currentMusic = useSelector((state: RootState) => state.player.currentMusic)
  const currentTime = useSelector((state: RootState) => state.player.currentTime)
  const playMode = useSelector((state: RootState) => state.player.playMode)

  const { pause, play, seek, setVolume, volume, playing, duration, src } = useGlobalAudioPlayer()

  const { openModalWithDefaultText } = useModal()
  return (
    <>
      <div className={styles['player']}>
        <div className={styles['inner']}>
          {/* 左边 图片+标题+时间+进度条 */}
          <div className={styles['left']}>
            <Link to={currentMusic.rid ? `/song/${currentMusic.rid}` : ''} className={styles['cover']}>
              <MyImg src={currentMusic.pic || currentMusic.pic120 || defaultimg} />
            </Link>
            <div className={styles['info']}>
              <div className={styles['top']}>
                <p className={styles['title']}>
                  {currentMusic.name || '酷我音乐'} -
                  <Link to={currentMusic.artistid ? `/singer/${currentMusic.artistid}` : ''} className={styles['singer']}>
                    {currentMusic.artist || '陪着我·不要停'}
                  </Link>
                </p>
                <p className={styles['time']}>
                  {durationTransform(currentTime)}/
                  {currentMusic.rid ? currentMusic.songTimeMinutes || durationTransform(duration) || '00:00' : '00:00'}
                </p>
              </div>
              <Slider
                className={styles['bar']}
                min={0}
                max={currentMusic.duration || 0}
                defaultValue={0}
                value={currentTime || 0}
                tooltip={{ formatter: (value) => durationTransform(value!) || 0 }}
                disabled={currentMusic.duration === undefined}
                onChange={(value) => {
                  seek(value)
                  dispatch(updateCurrentTime(value))
                }}
              />
            </div>
          </div>
          {/* 中间 三个按钮 */}
          <div className={styles['centre']}>
            {isFetching ? (
              <Loading style={{ marginBottom: '6px' }} />
            ) : (
              <>
                <div onClick={playPrev} title="上一首" className={styles['prev']}>
                  <BiSkipPrevious />
                </div>
                <div title="播放" className={styles['play']}>
                  {playing ? (
                    <BiPauseCircle onClick={() => pause()} />
                  ) : (
                    <BiPlayCircle
                      onClick={() => {
                        musicList.find((item) => item.rid === currentMusic.rid) && (src ? play() : playOne(currentMusic))
                      }}
                    />
                  )}{' '}
                </div>
                <div onClick={playNext} title="下一首" className={styles['next']}>
                  <BiSkipNext />
                </div>
              </>
            )}
          </div>
          {/* 右边 下载 + 评论 + 播放模式 + 打开列表 + 音量调节*/}
          <div className={styles['right']}>
            <div onClick={openModalWithDefaultText} title="下载" className={styles['download']}>
              <GoDownload />
            </div>
            <Link to={`/song/${currentMusic.rid}`} title="评论" className={styles['comment']}>
              <GoComment />
            </Link>
            <div onClick={() => dispatch(changePlayMode())} className={styles['playmode']}>
              {playMode === 'onebyone' && <GoArrowSwitch title="顺序播放" />}
              {playMode === 'loop' && <GoSync title="循环播放" />}
              {playMode === 'singleloop' && <GoIssueReopened title="单曲循环" />}
            </div>
            <div ref={refIcon} onClick={() => setIsPanelOpened(!isPanelOpened)} title="歌曲列表" className={styles['list']}>
              <GoListUnordered />
            </div>
            <div title="音量" className={styles['volume']}>
              {volume === 0 ? <GoMute onClick={() => setVolume(1)} /> : <GoUnmute onClick={() => setVolume(0)} />}
              <Slider
                className={styles['bar']}
                min={0}
                max={1}
                defaultValue={0.5}
                step={0.01}
                value={volume}
                onChange={(value) => setVolume(value)}
                tooltip={{ formatter: (value) => Math.ceil(value! * 100) || 0 }}
              />
            </div>
          </div>
          {/* 列表 */}
          <div
            style={{
              display: isPanelOpened ? 'block' : 'none',
            }}
            className={styles['panel']}
            ref={refPanel}
          >
            <div className={styles['panel-top']}>
              <div className={styles['panel-left']}>
                播放列表
                <span>(共{musicList.length || 0}首)</span>
              </div>
              <div className={styles['panel-right']}>
                <div onClick={removeAll} className={styles['delete']}>
                  <GoTrash />
                  清空列表
                </div>
                <div onClick={() => setIsPanelOpened(!isPanelOpened)} className={styles['close']}>
                  <GoX />
                </div>
              </div>
            </div>
            <div className={styles['panel-list']}>
              {musicList.length !== 0 ? (
                musicList.map((item, index) => (
                  <div
                    key={item.rid}
                    className={classNames(styles['panel-item'], {
                      [styles['active']]: currentMusic.rid === item.rid,
                    })}
                  >
                    <div className={styles['index']}>
                      {index + 1}
                      {currentMusic.rid === item.rid && <PlayingIcon isPaused={!playing} />}
                    </div>
                    <div onClick={() => playOne(item)} className={styles['name']}>
                      {item.name}
                    </div>
                    <Link className={styles['artist']} to={`/singer/${item.artistid}`}>
                      {item.artist}
                    </Link>
                    <div className={styles['time']}>{item.songTimeMinutes}</div>
                    <div className={styles['opts']}>
                      <GoDownload onClick={openModalWithDefaultText} />
                      <GoTrash onClick={() => removeOne(item)} />
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles['empty']}>
                  <img src={nomusic} alt="" />
                  <p>您还没有添加任何歌曲</p>
                  <p>
                    去首页 <Link to="/">发现音乐</Link>，添加自己喜欢的歌曲吧~
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
