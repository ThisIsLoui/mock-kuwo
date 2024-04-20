import classNames from 'classnames'
import styles from './MyButton.module.scss'
import React from 'react'
interface MyButtonProps {
  icon?: JSX.Element
  children: React.ReactNode
  type?: 'primary' | 'yellow'
}

export default function MyButton({ icon, children, type = 'primary', ...rest }: MyButtonProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={classNames(styles['btn'], {
        [styles['yellow']]: type === 'yellow',
      })}
      {...rest}
    >
      {icon}
      {children}
    </div>
  )
}
