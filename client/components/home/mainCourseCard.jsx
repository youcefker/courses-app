import Image from 'next/image'
import React from 'react'

function MainCourseCard(props) {
  return (
    
    <div className='border-[#079C49] rounded-[22.42px] border-2 p-[11.66px] md:pb-[27px] hover:bg-[#f1f1f1] cursor-pointer w-[320px] md:w-[30%]  md:mb-0'>
       <div className='w-[100%] h-[170px] sm:h-[200px] flex justify-center rounded-[17px] border-2 border-[#079C49] overflow-hidden' style={{position: "relative"}}>
        <Image src="/images/main2.png"  layout="fill"
       objectFit="cover"/>
       </div>
        <h5 className='text-[#1F1F1F] text-[17px] leading-[22px] sm:text-[22px] font-[600] mt-[27px] sm:leading-[28px] md:max-w-[379px]'>{props.title}</h5>
        <div className='mt-[20px] sm:mt-[30px]'>
        {props.duration && (
            <div className="flex items-center">
                <Image src="/icons/time.svg" width={22} height={25}/>
                <h6 className='text-[16px] sm:text-[20px] text-[#1F1F1F] ml-2'>{props.duration}</h6>
            </div>)}
            {props.certif && (
            <div className="flex items-center mt-[15px]">
                <Image src="/icons/certf.svg" width={22} height={25}/>
                <h6 className='text-[16px] sm:text-[20px] text-[#1F1F1F] ml-2'>{props.certif}</h6>
            </div>)}
        </div>
    </div>
  )
}

export default MainCourseCard