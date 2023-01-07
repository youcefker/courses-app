import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import axios from '../../../axiosInstance'
import ChapterCard from '../../../components/admin/ChapterCard'
import IndexPage from '../../../components/dashboard/indexPage'
import Sidebar from '../../../components/dashboard/sidebar'
import { Box, Skeleton } from '@mui/material'
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

function Course() {
  const router = useRouter()

  const [courseData, setCourseData] = useState(null)

  const [progress, setProgress] = useState(null)
  const [courseStatus, setCourseStatus] = useState(false)


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
      console.log(res.data.data.enrolled)
      setCourseStatus(res.data.data.enrolled)
      setCourseData(res.data.data.course)
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
        <div className="flex justify-between items-center mb-2">
            <h4 className='text-[24px] font-[600] text-[#1F1F1F] mb-2'>Course Details</h4>
        </div>
          
        <div className="flex flex-col lg:flex-row lg:grid lg:grid-cols-12 lg:gap-5">


          <div className='flex flex-col lg:col-span-7'>
            <h1 className='text-[22px] font-bold mb-5'>{courseData?.name}</h1>
              <img className='w-full' id="course_image" src={`http://localhost:4000/api/v1/images/${courseData?.filename}`} />
            <h6 className='text-[#1F1F1F] text-[14px] font-[500] mt-5'>
               {courseData?.description}
            </h6>

           
          </div>


          <div className='bg-white rounded-xl px-3 lg:col-span-5'> 
            <h3 className='text-center text-[18px] font-bold my-4'>Chapters List</h3>
            <div className='w-[100%]'>
                {courseData?.chapters?.map(chapter => <ChapterCard courseId={courseData._id} progress={progress && progress[courseData._id]? progress[courseData._id][chapter._id]: null} student name={chapter.title}  key={courseData?._id} lessons={chapter.lessons} enrolled={courseStatus}/>)}
          
           
            </div>
          </div>
        </div>
    </IndexPage>
    </>
  )
}

export default Course