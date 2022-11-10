import Image from 'next/image'
import React from 'react'

function CourseCardStudent() {
  return (
    <div className='flex flex-col rounded-lg overflow-hidden bg-[#fff] courseCardStudent' style={{width : "300px", height : "300px"}}>
        <div  style={{position: "relative", width : "100%",height:"150px"}} >
             <Image src="/images/main1.png"  layout="fill"
              objectFit="cover"/>
         </div>
         <div className='px-1 py-3'>
           <h4 className='text-[14px] font-[600] text-[#1F1F1F] mb-2 text-center'>Python Cours number 01</h4>
           <p className='text-center text-[10px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
         </div>
         <div className='flex justify-center mb-3'>
            <button className='ormal-case  text-[#fff] border border-[#079C49] bg-[#079C49]  font-bold  text-[16px] px-3 rounded-xl h-9 w-2/5'>Start</button>
         </div>
    </div>
  )
}

export default CourseCardStudent