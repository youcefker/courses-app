import React from 'react'
import Image from 'next/image'

function CourseCard(props) {
  return (
    <div className='flex items-center hover:bg-[#f5f5f5] p-2 rounded-[15px] cursor-pointer' onClick={props.goToLesson}>
        <div className='courseIcon mr-3 w-[60px] rounded-[10px] h-[60px] flex items-center justify-center'>
            <Image src={props.icon} width={33} height={35} />
        </div>
        <div>
            <h5 className='text-[#1F1F1F] text-[16px]'>{props.name}</h5>
            <h6 className='text-[#9DA6BA] text-[14px] font-[400]'>{props.descrip}</h6>
        </div>
    </div>
  )
}

export default CourseCard