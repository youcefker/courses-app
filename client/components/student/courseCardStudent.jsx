import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

function CourseCardStudent(props) {

  const router= useRouter()
  return (
    <div className='flex flex-col rounded-lg overflow-hidden bg-[#fff] courseCardStudent' style={{width : "300px", height : "300px"}}>
        <div  style={{position: "relative", width : "100%",height:"150px"}} >
             <Image src="/images/main1.png"  layout="fill"
              objectFit="cover"/>
         </div>
         <div className='px-1 py-3'>
           <h4 onClick={()=> router.push({
                pathname: `/student/course/${props.courseId}`,
                state: {
                    courseId: props.courseId,
                }
              })} className='text-[14px] font-[600] text-[#1F1F1F] mb-2 text-center hover:underline cursor-pointer'>{props.courseName}</h4>
           <p className='text-center text-[10px] h-[40px]'>{props.courseDescription}</p>
         </div>
         <div className='flex justify-center mb-3'>
            <button className='ormal-case  text-[#fff] border border-[#079C49] bg-[#079C49]  font-bold  text-[16px] px-3 rounded-xl h-9 w-2/5'>{props.enrolled ? "Start" :"Enroll"}</button>
         </div>
    </div>
  )
}

export default CourseCardStudent