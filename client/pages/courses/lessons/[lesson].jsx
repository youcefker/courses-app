import Image from 'next/image'
import React from 'react'
import CourseCard from '../../../components/dashboard/courseCard'
import IndexPage from '../../../components/dashboard/indexPage'
import Sidebar from '../../../components/dashboard/sidebar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'



function Lesson() {
   const router = useRouter()
   const [lesson, setLesson] = useState({ name: router.query.name, desription: router.query.desription, filename: router.query.filename })
   const [storageData, setStorageData] = useState(null)
   const handleEndedVideo = async() => {
      try {
         const body = {
            course_id: router.query.course_id,
            student_id: localStorage.getItem("student_id"),
            lesson_id: router.query.lesson_id
         }
         const response = await axios.post("http://localhost:4000/api/v1/lesson/complete", body)
         console.log(response.data)
      } catch(err) {
         console.log(err)
      }
   }
   const fetchStorageData = () => {
      const jwt = localStorage.getItem("jwt")
      const role =  localStorage.getItem("role")
      if(role === "student") {
        const email = localStorage.getItem("email")
        const name =  localStorage.getItem("name")
        const student_id =  localStorage.getItem("student_id")
        const data = jwt && email && name && student_id && role ? {jwt, name, email, role, student_id} : null
        return data
      } 
  }
  useEffect(() => {
   const auth = fetchStorageData()
   if(auth) {
     setStorageData(auth)
   } else {
     router.replace("/adminLogin")
   }
 }, [])
  return (
    <>
    <Sidebar active="courses" />
    <IndexPage>
       <h3 className='text-[#1F1F1F] text-[20px] font-[600]  '>Course : Javascript for web</h3>
       <h3 className='text-[#1F1F1F] text-[20px] font-[600] mt-3'>Lesson 1 : {lesson.name}</h3>
       <div className="grid grid-cols-1 lg:grid-cols-6 lg:gap-x-6 mt-6 w-full">


        <div className='col-span-4'>
          <video  controls autoPlay onEnded={handleEndedVideo}>
             <source src={`http://localhost:4000/api/v1/lesson/files/${lesson.filename}`} type="video/mp4"/>
          </video>
          <div className='mt-5'>
             <h3 className='text-[#1F1F1F] text-[20px] font-[600] mt-1'>About this course</h3>
             <h6 className='text-[#1F1F1F] text-[14px] font-[500] mt-3'>
               {lesson.desription}
             </h6>
          </div>
        </div>

       <div className="mt-5 lg:mt-0 col-span-2">
                      
       <div className=' px-5 py-5 bg-[#fff] rounded-[15px]'>
           <h3 className='text-[#1F1F1F] text-[20px] font-[600] '>Necessery docs</h3> 
           <div className="doc my-6">
               <div className='flex p-3 items-center doc__card rounded-xl mb-5 cursor-pointer'>
                  <div className='border-b-2 border-[#1f1f1f] pb-1 px-2 mr-6'>
                      <Image src="/icons/doc.svg" width={35} height={40} />
                  </div>
                  <div>
                     <h3 className='text-[#1F1F1F] text-[16px] font-[600] '>firstDoc.xlsx</h3> 
                     <h3 className='text-[#079C49] text-[12px] font-[500] mt-1'>Download now.</h3> 
                  </div>
                  
               </div>
               <h6 className='text-[#1F1F1F] text-[12px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h6>
           </div>

           <div className="doc my-6">
               <div className='flex p-3 items-center doc__card rounded-xl mb-5 cursor-pointer'>
                  <div className='border-b-2 border-[#1f1f1f] pb-1 px-2 mr-6'>
                      <Image src="/icons/doc.svg" width={35} height={40} />
                  </div>
                  <div>
                     <h3 className='text-[#1F1F1F] text-[16px] font-[600] '>secondDoc.xlsx</h3> 
                     <h3 className='text-[#079C49] text-[12px] font-[500] mt-1'>Download now.</h3> 
                  </div>
                  
               </div>
               <h6 className='text-[#1F1F1F] text-[12px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h6>
           </div>
         
        </div>
          
          
          
          <div className="bg-[#fff] p-4 rounded-[15px] mt-4">
                   <h3 className='text-[#1F1F1F] font-[600] text-[20px]'>Upcoming courses</h3>
                   <div className=" my-4">
                       
                       <CourseCard name ="Lorem ipsum" descrip="Lesson 6" icon="/icons/courseIcon.svg" />
                       <CourseCard name ="Lorem ipsum" descrip="Lesson 6" icon="/icons/courseIcon.svg" />
                       <CourseCard name ="Lorem ipsum" descrip="Lesson 6" icon="/icons/courseIcon.svg" />

          </div>
       </div>
      

       </div>


      
      </div>
       
    </IndexPage>
    </>
  )
}

export default Lesson