
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import MainHeader from '../components/home/mainHeader'
import MainHero from '../components/home/mainHero'
import MainOffers from '../components/home/mainOffers'
import MainCourses from '../components/home/mainCourses'
import Footer from '../components/layout/footer'


import Head from 'next/head'





export default function Home() {
  
  return  (
    
    <>
    <div className="container mx-auto px-[20px] sm:px-[20px] pt-[20px] md:pt-[33.32px] mb-[230px]">
    <Head>
        <title>Invest in smart</title>
        <link rel="icon" href="/footer_logo.svg" />
      </Head>
      <MainHeader />
      <MainHero/>

      <MainOffers />
      <MainCourses />


     
      
    </div>
    <Footer />
    </> 
  )
}
