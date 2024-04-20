import { LiHTMLAttributes } from 'react'
import styles from './MyLi.module.scss'
import classNames from 'classnames'

export default function MyLi({ children, isActive, ...props }: { children: React.ReactNode; isActive: boolean } & LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li
      {...props}
      className={classNames(styles['myli'], {
        [styles['active']]: isActive,
      })}
    >
      {children}
    </li>
  )
}
