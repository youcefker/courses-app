
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import MainHeader from '../components/home/mainHeader'
import MainHero from '../components/home/mainHero'
import MainOffers from '../components/home/mainOffers'
import MainCourses from '../components/home/mainCourses'
import Footer from '../components/layout/footer'







export default function Home() {
  const [storageData, setStorageData] = useState(null)
  const [fetched, setFetched] = useState(false)
  
  const fetchStorageData = () => {
      const jwt = localStorage.getItem("jwt")
      const email = localStorage.getItem("email")
      const name =  localStorage.getItem("name")
      const data = jwt && email && name ? {jwt, name, email} : null
      return data
  } 
  useEffect(() => {
    const auth = fetchStorageData()
    console.log(auth)
    if(auth){
      setStorageData(storageData)
      setFetched(true)
    } else {
      setStorageData(true)
    }
    fetchStorageData()
  }, [])
  
  return (
    <>
    <div className="container mx-auto px-[20px] sm:px-[20px] pt-[20px] md:pt-[33.32px] mb-[230px]">
  
      <MainHeader storageData={storageData} fetched={fetched}/>
      <MainHero/>

      <MainOffers />
      <MainCourses />


     
      
    </div>
    <Footer />
    </>
  )
}
