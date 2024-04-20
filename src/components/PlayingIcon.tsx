import classNames from 'classnames'
import styles from './PlayingIcon.module.scss'
import { HTMLAttributes } from 'react'
export default function PlayingIcon({
  background = '#f7f7f7',
  isPaused,
  ...rest
}: { background?: string; isPaused?: boolean } & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      style={{
        background,
      }}
      className={styles['playing']}
      {...rest}
    >
      <span
        className={classNames(styles['side1'], {
          [styles['pause']]: isPaused,
        })}
      ></span>{' '}
      <span
        className={classNames(styles['side2'], {
          [styles['pause']]: isPaused,
        })}
      ></span>{' '}
      <span
        className={classNames(styles['side3'], {
          [styles['pause']]: isPaused,
        })}
      ></span>
    </span>
  )
}
