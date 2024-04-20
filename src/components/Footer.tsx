import styles from './Footer.module.scss'
export default function Footer() {
  return (
    <footer className={styles['footer']}>
      <div className="container">
        <p>
          开发者：
          <a className={styles['link']} href="https://github.com/ThisIsLoui">
            Loui
          </a>
        </p>
        <p>
          本项目完全仿照
          <a className={styles['link']} href="https://www.kuwo.cn/">
            酷我音乐
          </a>
          制作，已开源在 Github 上，采用{' '}
          <a className={styles['link']} href="https://www.gnu.org/licenses/gpl-3.0.en.html#license-text">
            GPL v3
          </a>{' '}
          开源协议
        </p>
        <p>
          本项目所有用到的图片、接口均由网络公开内容收集整理而来，仅用于学习和研究目的，不得用于商业用途。任何个人或组织不得将其用于违法用途，否则后果自负
        </p>
      </div>
    </footer>
  )
}
