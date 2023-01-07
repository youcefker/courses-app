import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

function CourseCardStudent(props) {
  const router= useRouter()
  let buttonTitle
  if(props.enrolled){
    buttonTitle = "continue"
  } else if(props.requested) {
    buttonTitle = "requested"
  } else {
    buttonTitle = "enroll"
  }
  return (
    <div className='flex flex-col text-center rounded-lg overflow-hidden bg-[#fff] courseCardStudent' style={{width : "300px", height : "250px"}}>
        <div  style={{position: "relative",width : "100%",height:"120px"}} >
             <img src={`http://localhost:4000/api/v1/images/${props.image}`}
              className='object-cover h-[105%] w-[100%]'/>
         </div>
         <div className='px-1'>
           <h4 onClick={()=> router.push({
                pathname: `/student/course/${props.courseId}`,
                state: {
                    courseId: props.courseId,
                }
              })} className='text-[16px] font-[600] text-[#1F1F1F] mb-2 ml-[10px] mt-[10px] hover:underline cursor-pointer'>{props.courseName}</h4>
           <p className='text-[12px] ml-[10px] mt-[5px] h-[40px]'>{props.courseDescription}</p>
         </div>
         <div className='flex justify-center ml-[10px]'>
            <button className={`ormal-case text-[#fff] border border-[#079C49] bg-[#079C49]  ${props.requested? "bg-[#ccc]": null} font-bold  text-[16px] px-3 rounded-xl h-9 w-2/5`} disabled={props.requested} onClick={props.action}>{buttonTitle}</button>
         </div>
    </div>
  )
}

export default CourseCardStudent