import { HTMLAttributes } from 'react'
import styles from './Loading.module.scss'
export default function Loading(props?: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={styles['load']} {...props}>
      <span className={styles['side1']}></span>
      <span className={styles['side2']}></span>
      <span className={styles['mid']}></span>
      <span className={styles['side2']}></span>
      <span className={styles['side1']}></span>
    </div>
  )
}
