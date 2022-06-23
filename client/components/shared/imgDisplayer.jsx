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
       <Image src={"/images/main"+currentIndex+".png"} className='relative' width={616.09} height={791}/>
       <div className="blur__circle"></div>
       <div className="blur__best flex items-center justify-center">
         
       </div>
       <div className='absolute flex best'>
        
        {props.home && (
        <>
         <Image src="/images/best.png"  width={35} height={35} />
       
         <h6 className='text-[#1F1F1F] text-[26px] ml-[13px]'>Best courses</h6>
        </>)}
        {props.login && (
             <h6 className='text-[#1F1F1F] text-[26px] ml-[13px]'>Let’s learn!</h6>
        )}
       </div>

    </div>
  )
}

export default ImgDisplayer