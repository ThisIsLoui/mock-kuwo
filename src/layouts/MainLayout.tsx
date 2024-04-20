import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Player from '../components/Player'

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <Player />
    </>
  )
}
