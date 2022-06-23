
import styles from '../styles/Home.module.css'

import MainHeader from '../components/home/mainHeader'
import MainHero from '../components/home/mainHero'
import MainOffers from '../components/home/mainOffers'
import MainCourses from '../components/home/mainCourses'
import Footer from '../components/layout/footer'







export default function Home() {
  
    

  return (
    <>
    <div className="container mx-auto pt-[33.32px] mb-[230px]">
  
      <MainHeader />
      <MainHero/>

      <MainOffers />
      <MainCourses />


     
      
    </div>
    <Footer />
    </>
  )
}
