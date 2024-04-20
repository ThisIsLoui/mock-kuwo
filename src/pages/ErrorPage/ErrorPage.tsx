import { useNavigate, useRouteError } from 'react-router-dom'
import styles from './ErrorPage.module.scss'
import nodata from '../../assets/nodata.png'
import MyButton from '../../components/MyButton'

export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError()
  const nav = useNavigate()
  const is404 = error.status && error.status === 404

  return (
    <main className={styles['error']}>
      <div className={styles['inner']}>
        <img src={nodata} alt="" />
        <h3>{is404 ? '找不到页面' : '程序出现错误'}</h3>
        <p>{is404 ? '找不到您访问的页面，换个页面看看吧' : error.message ?? error ?? '未知错误'}</p>
        <MyButton
          style={{
            marginTop: '20px',
          }}
          type="yellow"
          onClick={() => {
            nav(-1)
          }}
        >
          返回上一页
        </MyButton>
      </div>
    </main>
  )
}
