import { useGetBannerListQuery } from '../store/api/apiSlice'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules'

import styles from './Banner.module.scss'
import { useState } from 'react'
import { BsApple, BsCarFrontFill, BsFillLaptopFill } from 'react-icons/bs'
import { DiAndroid, DiWindows } from 'react-icons/di'
import { Link } from 'react-router-dom'
export default function Banner() {
  const { data: BannerList } = useGetBannerListQuery()
  const [currentBanner, setCurrentBanner] = useState('')
  return (
    <section className={styles['banner']}>
      <div className={styles['top']}>
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          onSlideChange={(swiper) => {
            if (BannerList?.data[swiper.realIndex]) setCurrentBanner(BannerList?.data[swiper.realIndex].pic)
          }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
        >
          {BannerList?.data.map((item) => (
            <SwiperSlide key={item.id}>
              <Link
                to={item.url
                  .replace('http://www.kuwo.cn/album_detail/', './album/')
                  .replace('http://www.kuwo.cn/playlist_detail/', './play/')
                  .replace('https://www.kuwo.cn/play_detail/', './song/')
                  .replace('https://www.kuwo.cn/mvplay/', './mv/')}
              >
                <img src={item.pic} referrerPolicy="no-referrer" alt="" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles['filter']}>
          <img src={currentBanner} referrerPolicy="no-referrer" alt="" />
        </div>
      </div>
      <div className={styles['bottom']}>
        <ul>
          <li>
            <BsCarFrontFill />
            <a href="/">下载机车版</a>
          </li>
          <li className={styles['divider']}></li>
          <li>
            <DiAndroid />
            <a href="/">下载 Android 版</a>
          </li>
          <li className={styles['divider']}></li>
          <li>
            <BsApple />
            <a href="/">下载 iPhone 版</a>
          </li>
          <li className={styles['divider']}></li>
          <li>
            <DiWindows />
            <a href="/">下载 PC 版</a>
          </li>
          <li className={styles['divider']}></li>
          <li>
            <BsFillLaptopFill />
            <a href="/">下载其他版本</a>
          </li>
        </ul>
      </div>
    </section>
  )
}
