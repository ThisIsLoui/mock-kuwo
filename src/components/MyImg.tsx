import placeholder from '../assets/placeholder.png'
import { useInViewport } from 'ahooks'
import { ImgHTMLAttributes, useEffect, useRef } from 'react'
export default function MyImg(props: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null)
  const [inViewport] = useInViewport(ref)
  useEffect(() => {
    if (!ref.current) return
    if (inViewport && props.src !== '') {
      ref.current.src = props.src as string
    }
  }, [inViewport, props.src])
  return <img {...props} src={placeholder} ref={ref} referrerPolicy="no-referrer" />
}
