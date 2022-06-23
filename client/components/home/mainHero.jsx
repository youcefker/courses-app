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
    <div className="hero__section flex justify-between items-center mt-[12.6px]">
        <div>
          <h1 className='text-[72px] font-[700] text-[#079C49] leading-[88px] w-[562px]'>The best <br></br> Online courses <br></br> You will find</h1>
          <h5 className='text-[32px]   text-[#414141] leading-[39px] mt-[47px] w-[744px]'>We train the next tech generation in the latest technologies and the jobs of the future to prepare them for the professional world and strengthen their employability.</h5>
        </div>
        <ImgDisplayer  home/>
   
    </div>
  )
}

export default MainHero