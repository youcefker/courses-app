import Image from 'next/image'
import React from 'react'

function MainCourseCard() {
  return (
    <div className='border-[#079C49] rounded-[22.42px] border-2 p-[11.66px] pb-[27px] hover:bg-[#f1f1f1] cursor-pointer'>
        <Image src="/images/course.png" width={380} height={193}/>
        <h5 className='text-[#1F1F1F] text-[22px] font-[600] mt-[27px] leading-[28px] max-w-[379px]'>Introduction to administrative guide</h5>
        <div className='mt-[30px]'>
            <div className="flex items-center">
                <Image src="/icons/time.svg" width={22} height={25}/>
                <h6 className='text-[20px] text-[#1F1F1F] ml-2'>15 hours</h6>
            </div>
            <div className="flex items-center mt-[15px]">
                <Image src="/icons/certf.svg" width={22} height={25}/>
                <h6 className='text-[20px] text-[#1F1F1F] ml-2'>Certificated</h6>
            </div>
        </div>
    </div>
  )
}

export default MainCourseCard