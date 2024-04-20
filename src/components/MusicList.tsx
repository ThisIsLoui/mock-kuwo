import { Link } from 'react-router-dom'
import { Music } from '../store/api/type'
import styles from './MusicList.module.scss'
import MyImg from './MyImg'
import { IoAdd, IoPlayOutline } from 'react-icons/io5'
import { AiOutlineHeart } from 'react-icons/ai'
import { GoDownload } from 'react-icons/go'
import classNames from 'classnames'
import usePlay from '../hooks/usePlay'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import PlayingIcon from './PlayingIcon'
import useModal from '../hooks/useModal'

export default function MusicList({
  list,
  type,
  currentPage = 1,
  perPage = 20,
}: {
  list: Music[]
  type: 'rank' | 'singer' | 'album' | 'search'
  currentPage?: number
  perPage?: number
}) {
  const baseIndex = (currentPage - 1) * perPage
  const { playOne, addOneToList } = usePlay()
  const currentMusic = useSelector((state: RootState) => state.player.currentMusic)
  const { openModalWithDefaultText } = useModal()
  return (
    <>
      <ul className={styles['head']}>
        <li
          style={{
            minWidth: type === 'album' ? '0' : '180px',
            width: type === 'rank' ? '22%' : type === 'album' ? '9.18%' : type === 'search' ? '13.13%' : '16.13%',
          }}
          className={styles['num']}
        >
          序号
        </li>
        <li
          style={{
            width: type === 'rank' || type === 'search' ? '27.83%' : type === 'album' ? '43.06%' : '41.83%',
            flexShrink: type === 'singer' ? '1' : '0',
          }}
          className={styles['name']}
        >
          歌曲
        </li>
        {type !== 'singer' && (
          <li
            style={{
              flex: type === 'album' ? '1' : '',
            }}
            className={styles['singer']}
          >
            歌手
          </li>
        )}
        {type !== 'album' && <li className={styles['album']}>专辑</li>}
        <li className={styles['duration']}>时长</li>
      </ul>
      <div className={styles['box']}>
        {list.map((item, index) => (
          <ul
            key={item.musicrid}
            className={classNames(styles['row'], {
              [styles['active']]: currentMusic.rid === item.rid,
            })}
          >
            <li
              style={{
                minWidth: type === 'album' ? '0' : '180px',
                width: type === 'rank' ? '22%' : type === 'album' ? '9.18%' : type === 'search' ? '13.13%' : '16.13%',
                color: currentMusic.rid === item.rid && baseIndex + index >= 3 ? 'transparent' : '#333',
              }}
              className={styles['num']}
            >
              {type === 'rank' && baseIndex + index < 3 ? (
                <div
                  className={classNames(styles['ranknum'], {
                    [styles['top1']]: baseIndex + index === 0,
                    [styles['top2']]: baseIndex + index === 1,
                    [styles['top3']]: baseIndex + index === 2,
                  })}
                />
              ) : (
                baseIndex + index + 1
              )}
              {currentMusic.rid === item.rid && baseIndex + index >= 3 && (
                <PlayingIcon style={{ left: '15%', top: '50%', transform: 'translate(0,-50%)', background: '#f2f2f2' }} />
              )}
              {(type === 'rank' || type === 'search' || type === 'singer') && <MyImg src={item.pic || item.pic120} />}
            </li>
            <li
              style={{
                width: type === 'rank' || type === 'search' ? '27.83%' : type === 'album' ? '43.06%' : '41.83%',
                flexShrink: type === 'singer' ? '1' : '0',
              }}
              className={styles['name']}
            >
              <Link to={`/song/${item.rid}`}>
                <span dangerouslySetInnerHTML={{ __html: item.name }}></span>
                {item.originalsongtype === 1 && (
                  <svg
                    className={styles['sq']}
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="3587"
                    width="1em"
                    height="1em"
                  >
                    <path
                      d="M955.73333332 785.06666667H68.26666668V238.93333333h887.46666664v546.13333334z m68.26666668-614.4H0v682.66666666h1024V170.66666667z"
                      fill="#e6b86d"
                      p-id="3588"
                    ></path>
                    <path
                      d="M221.14986667 342.05013333v204.8h170.66666666v68.26666667h-170.66666666v68.26666667h238.93333333v-204.79999999h-170.66666667v-68.26666668h170.66666667v-68.26666667h-204.80000002zM767.2832 614.4v-273.06666667h-238.93333333v341.33333334h273.06666666v-68.26666667h-34.13333333z m-68.26666667 0h-102.4v-204.8h102.4v204.8z"
                      fill="#e6b86d"
                      p-id="3589"
                    ></path>
                  </svg>
                )}
                {item.hasmv === 1 && (
                  <svg
                    className={styles['mv']}
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="10551"
                    width="1em"
                    height="1em"
                  >
                    <path
                      d="M588.245333 414.464a27.050667 27.050667 0 0 0-15.616-25.386667 31.445333 31.445333 0 0 0-40.661333 13.098667l-53.76 95.701333-53.76-95.744a31.445333 31.445333 0 0 0-34.688-15.189333 29.141333 29.141333 0 0 0-22.912 28.501333v184.533334a29.141333 29.141333 0 0 0 58.282667 0v-77.866667l24.661333 43.904a31.445333 31.445333 0 0 0 28.16 16.042667 31.445333 31.445333 0 0 0 28.586667-16.042667l23.424-41.6v75.562667a29.141333 29.141333 0 0 0 58.282666 0V415.488v-0.981333z m181.376 108.16L713.813333 402.986667a29.013333 29.013333 0 0 0-38.656-13.952 29.013333 29.013333 0 0 0-14.165333 38.613333l81.578667 174.933333a29.141333 29.141333 0 0 0 24.064 18.005334 28.928 28.928 0 0 0 29.952-17.834667l81.621333-175.104a29.013333 29.013333 0 0 0-14.165333-38.570667 29.013333 29.013333 0 0 0-38.656 13.952l-55.765334 119.594667zM315.477333 228.266667a1113.002667 1113.002667 0 0 1 284.501334-36.224c97.621333 0 192.170667 12.032 283.776 36.053333a154.538667 154.538667 0 0 1 112.938666 126.634667 979.413333 979.413333 0 0 1 0 296.32 154.538667 154.538667 0 0 1-112.938666 126.634666 1113.173333 1113.173333 0 0 1-283.733334 36.053334c-97.877333 0-192.725333-12.074667-284.586666-36.266667a154.581333 154.581333 0 0 1-112.853334-127.189333 999.936 999.936 0 0 1-10.581333-147.370667c0-50.986667 3.541333-100.096 10.581333-147.370667A154.581333 154.581333 0 0 1 315.477333 228.266667z"
                      fill="#666"
                      p-id="10552"
                    ></path>
                  </svg>
                )}
              </Link>
            </li>
            {type !== 'singer' && (
              <li
                style={{
                  flex: type === 'album' ? '1' : '',
                }}
                className={styles['singer']}
              >
                <Link to={`/singer/${item.artistid}`}>{item.artist}</Link>
              </li>
            )}
            {type !== 'album' && (
              <li className={styles['album']}>
                <Link to={`/album/${item.albumid}`}>{item.album}</Link>
              </li>
            )}
            <li className={styles['duration']}>{item.songTimeMinutes}</li>
            <li className={styles['opts']}>
              <span>
                <IoPlayOutline onClick={() => playOne(item)} />
              </span>
              <span>
                <IoAdd onClick={() => addOneToList(item)} />
              </span>
              <span>
                <AiOutlineHeart onClick={openModalWithDefaultText} />
              </span>
              <span>
                <GoDownload onClick={openModalWithDefaultText} />
              </span>
            </li>
          </ul>
        ))}
      </div>
    </>
  )
}
