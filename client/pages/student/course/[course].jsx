import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import axios from '../../../axiosInstance'
import ChapterCard from '../../../components/admin/ChapterCard'
import IndexPage from '../../../components/dashboard/indexPage'
import Sidebar from '../../../components/dashboard/sidebar'

function Course() {
  const router = useRouter()

  const [courseData, setCourseData] = useState(null)

  const [progress, setProgress] = useState(null)

  const fetchProgress = ()=>{
    axios.get("/student/progress")
    .then((res)=>{
      console.log(res.data.data);
      setProgress(res.data.data)
    })
    .catch((err)=>{
      console.log(err);
    })

  }

  const fetchCourseData = ()=>{
    axios.get("/lesson/course/"+router.query.course)
    .then((res)=>{
   
      setCourseData(res.data.data)
    })
    .catch((err)=>{
      console.log(err);
    })

  }

  useEffect(() => {
    fetchCourseData()
    fetchProgress()
  }, [router.query.course])
  
  return (
    <>
        <Sidebar active="courses" />
        <Toaster/>
        <IndexPage>
        <div className="flex justify-between items-center mb-4">
            <h4 className='text-[30px] font-[600] text-[#1F1F1F] mt-5 mb-2'>Course Detail</h4>
        </div>
          
        <div className="grid grid-cols-12 gap-5">


          <div className='flex flex-col items-center col-span-7'>
            <h1 className='text-[22px] font-bold mb-5'>{courseData?.name}</h1>
            <video className='w-4/5'  id="lesson_video" muted controls autoPlay  controlsList="nodownload" type="video/mp4" src={`http://localhost:4000/api/v1/lesson/file/`}></video>
            <h6 className='text-[#1F1F1F] text-[14px] font-[500] mt-5 text-center'>
               {courseData?.description}
            </h6>

           
          </div>


          <div className='bg-white rounded-xl px-3 col-span-5'>
            <h3 className='text-center text-[18px] font-bold my-4'>Chapters List</h3>
            <div>
                {courseData?.chapters.map(chapter => <ChapterCard courseId={courseData._id} progress={progress[courseData._id][chapter._id]} student name={chapter.title}  key={Math.random()} lessons={chapter.lessons} />)}
          
           
            </div>
          </div>
        </div>
    </IndexPage>
    </>
  )
}

export default Course