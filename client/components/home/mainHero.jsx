import Image from 'next/image';
import React from 'react'

import {useEffect, useState} from "react"
import ImgDisplayer from '../shared/imgDisplayer';


const images = [1, 2, 3, 4];



function MainHero() {


    const [currentIndex, setCurrentIndex] = useState(1);




  useEffect(() => {
    const intervalId = setInterval(() => {
        if(currentIndex === images.length ) {
            setCurrentIndex(1);
        } 
        else {
             setCurrentIndex(currentIndex + 1);
        }
    },3500)
    
    return () => clearInterval(intervalId);
}, [currentIndex])


  return (
    <div className="hero__section flex flex-col-reverse md:flex-row  justify-between items-center mt-[12.6px]">
        <div className='mt-10 md:mt-0'>
          <h1 className='text-[30px] sm:text-[50px] lg:text-[60px] 2xl:text-[72px] font-[700] text-[#079C49] leading-[35px] sm:leading-[60px] lg:leading-[75px] 2xl:leading-[88px] '>The best <br></br> Online courses <br></br> You will find</h1>
          <h5 className='sm:text-[20px] lg:text-[25px] 2xl:text-[32px]   text-[#414141] sm:leading-[30px] leading-[28px] 2xl:leading-[39px] mt-[20px] md:mt-[47px] md:w-[80%] '>We train the next tech generation in the latest technologies and the jobs of the future to prepare them for the professional world and strengthen their employability.</h5>
        </div>
        <ImgDisplayer  home/>
   
    </div>
  )
}

export default MainHero