import Image from 'next/image';
import React from 'react'

import {useEffect, useState} from "react"


const images = [1, 2, 3, 4];

function ImgDisplayer(props) {

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


    <div className='relative'>
       <div className='w-[270px] h-[380px] sm:w-[400px] sm:h-[550px] md:w-[300px] md:h-[500px] lg:w-[450px] lg:h-[660px] xl:w-[520px] xl:h-[720px] 2xl:w-[616px] 2xl:h-[790px] ' style={{position: "relative"}}>
       <Image src={"/images/main"+currentIndex+".png"} className='relative rounded-[30px]' layout="fill"
       objectFit="cover"/>
       </div>
       <div className="blur__circle w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] lg:w-[120px] lg:h-[120px]"></div>
       <div className="w-[120px] h-[30px] sm:w-[150px] sm:h-[50px] lg:w-[254px] lg:h-[100px] blur__best flex items-center justify-center left-[-13%] sm:left-[-30%] bottom-[-3%] sm:bottom-[5%]">
         
       </div>
       <div className='absolute flex left-[-13%] sm:left-[-29%] bottom-[-2%] sm:bottom-9 lg:bottom-[9%] lg:left[-26%]'>
        
        {props.home && (
        <div className='flex items-center'>
          <div className='w-[22px] h-[22px] sm:w-[28px] sm:h-[28px] lg:w-[30px] lg:h-[30px] xl:w-[35px] xl:h-[35px] 2xl:w-[35px] 2xl:h-[35px] ' style={{position: "relative"}}>
         <Image src="/images/best.png"  layout="fill"
       objectFit="cover" />
       </div>
       
         <h6 className='text-[#1F1F1F] text-[10px] sm:text-[14px] lg:text-[26px] ml-2 lg:ml-[13px]'>Best courses</h6>
        </div>)}
        {props.login && (
             <h6 className='text-[#1F1F1F] text-[26px] ml-[13px]'>Let’s learn!</h6>
        )}
       </div>

    </div>
  )
}

export default ImgDisplayer