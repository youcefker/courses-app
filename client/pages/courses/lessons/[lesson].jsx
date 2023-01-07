import Image from 'next/image'
import React from 'react'
import CourseCard from '../../../components/dashboard/courseCard'
import IndexPage from '../../../components/dashboard/indexPage'
import Sidebar from '../../../components/dashboard/sidebar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from '../../../axiosInstance'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Box, Skeleton } from '@mui/material'
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import HashLoader from 'react-spinners/HashLoader'
import toast, { Toaster } from 'react-hot-toast'
import { faLeaf } from '@fortawesome/free-solid-svg-icons'
import { SelectContext } from '@material-tailwind/react/components/Select/SelectContext'
import ChapterCard from '../../../components/admin/ChapterCard'
import DescriptionIcon from '@mui/icons-material/Description';


function Lesson() {
   const router = useRouter()
   const [lesson, setLesson] = useState({})
   const [storageData, setStorageData] = useState(null)
   const [isLoading, setIsLoading] = useState(true)
   const [lessonId, setLessonId] = useState(lesson.lesson_id)
   const [lessons, setLessons] = useState([])
   const [next, setNext] = useState(0)

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [courseData, setCourseData] = useState(null)
  const [courseStatus, setCourseStatus] = useState(false)
  const [progress, setProgress] = useState(null)

  const fetchCourseData = ()=>{
    axios.get("/lesson/course/"+router.query.course_id)
    .then((res)=>{
      setCourseStatus(res.data.data.enrolled)
      setCourseData(res.data.data.course)
    })
    .catch((err)=>{
      console.log(err);
    })

  }

  useEffect(() => {
    
    fetchCourseData()
  }, [router.query.lesson])


  const getLessonData = async ()=>{
    try {
      const response = await axios.get(`/lesson/${router.query.lesson}`)
      console.log(response);
      setLesson(response.data.data)
    } catch(err) {
      console.log(err)
    }
  }
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const loadVideo = () => {
    console.log("video src changed")
    const videoTag = document.getElementById("lesson_video")
    videoTag?.pause()
    videoTag?.setAttribute('src', `http://localhost:4000/api/v1/lesson/file/${lesson._id}?token=${localStorage.getItem("jwt")}&course_id=${router.query.course_id}`);
    videoTag?.load()
  }

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
  
  
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 320 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h5 className='text-center mt-3 mb-2 font-bold text-lg text-[#079C49]'>Course chapters</h5>
      <List>
      <Divider />
        {courseData?.chapters.map((chapter,index) =>  
       
        <ListItem  key={chapter._id} disablePadding className={chapter._id == lesson.lesson_id ? 'bg-[#eee] w-full' : 'w-full' }>
            <ChapterCard courseId={courseData._id} student name={chapter.title}  progress={progress && progress[courseData._id]? progress[courseData._id][chapter._id]: null} key={Math.random()} lessons={chapter.lessons} enrolled={courseStatus}/>
          </ListItem>)}
      

  

      </List>
  
    </Box>
  );
   const handleEndedVideo = async() => {
    console.log("video ended")
      try {
         const body = {
            course_id: router.query.course_id,
            chapter_id: lesson?.chapter_id,
            lesson_id: router.query.lesson
         }
         const response = await axios.post("/lesson/complete", body)
         console.log("complete response", response.data)
         fetchProgress()
         response.data.error ? toast.error(response.data?.message) : toast.success(response.data?.message)
         courseData.chapters.map((chapter, chapterIndex) => {
          console.log("chapter_founded", chapter._id === lesson.chapter_id)
          if(chapter._id === lesson.chapter_id){
            chapter.lessons.map((chapterLesson, lessonIndex) => {
              console.log("lesson founded", chapterLesson._id === lesson._id)
              if(chapterLesson._id === lesson._id){
                console.log(courseData[chapterIndex]?.lessons[lessonIndex + 1])
                if(courseData.chapters[chapterIndex]?.lessons[lessonIndex + 1]){
                  router.push({
                    pathname: "/courses/lessons/"+ courseData.chapters[chapterIndex]?.lessons[lessonIndex + 1]?._id,
                      query : {
                        course_id: router.query.course_id
                      }
                    })
                } else if (courseData.chapters[chapterIndex + 1] && courseData.chapters[chapterIndex + 1].lessons[0]){
                  router.push({
                    pathname: "/courses/lessons/"+ courseData.chapters[chapterIndex + 1]?.lessons[0]?._id,
                      query : {
                        course_id: router.query.course_id
                      }
                    })
                } else {
                  toast.success("Congratulations! you completed the course.")
                }
              }
            })
          }
         })
      } catch(err) {
         console.log(err)
         toast.error(err.response?.data.message)
      }
   }

 useEffect(() => {
  getLessonData()
}, [router.query.lesson != undefined])

useEffect(() => {
  getLessonData()
}, [router.asPath])
useEffect(() => {

  loadVideo()
}, [lesson])

useEffect(() => {
  console.log(localStorage.getItem("role"))
  if(localStorage.getItem("role") === "student"){
    fetchProgress()
  }
}, [])


  return (
    <>
    <Toaster />
    <Sidebar active="courses" />
    <IndexPage>
      <div className="flex justify-between items-center">
         <div>
            {/* <h3 className='text-[#1F1F1F] text-[20px] font-[600]  '>Course : {lesson.courseName} </h3> */}
          <h3 className='text-[#1F1F1F] text-[20px] font-[600] mt-3'>Lesson {lesson.classement} : {lesson.name}</h3>
         </div>
         <div className='lg:invisible'>
                      {['right'].map((anchor) => (
                        <React.Fragment key={anchor}>
                          <button className='bg-[#079C49] text-white py-2 px-2  rounded-xl sm:mr-5 font-bold text-[14px]' onClick={toggleDrawer(anchor, true)}>
                            <PlayLessonIcon />
                            <span className='ml-2 hidden sm:inline-block'>Lessons</span>
                            </button>
                          <SwipeableDrawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                            onOpen={toggleDrawer(anchor, true)}
                          >
                            {list(anchor)}
                          </SwipeableDrawer>
                        </React.Fragment>
                      ))}
                    </div> 
      </div>
      <div className="lg:grid lg:grid-cols-12 lg:gap-5">


<div className='flex flex-col items-center lg:col-span-7'>
   
        {lesson? lesson.file_type === "VIDEO" ?<video  onError={(err) => {
          console.log(err)
        }} id="lesson_video" muted controls autoPlay onEnded={handleEndedVideo} controlsList="nodownload" type="video/mp4" src={`http://localhost:4000/api/v1/lesson/file/${lesson._id}?token=${localStorage.getItem("jwt")}&course_id=${router.query.course_id}`}>
               
            </video>: 
            <>
              <a href={`http://localhost:4000/api/v1/lesson/file/${lesson._id}?token=${localStorage.getItem("jwt")}&course_id=${router.query.course_id}`} download>
                <DescriptionIcon sx={{ fontSize: 120 }} color={"#079C49"} className="mt-[20px]"/>
              </a>
              <a className='underline hover:text-[#079C49] ' href={`http://localhost:4000/api/v1/lesson/file/${lesson._id}?token=${localStorage.getItem("jwt")}&course_id=${router.query.course_id}`} download>View file from here</a>
                <button className='ormal-case  text-[white] bg-[#079C49] border border-[#079C49] font-bold  text-[16px] p-2 px-3 rounded-xl mt-[30px]' onClick={handleEndedVideo}>mark as completed</button>
            </>
            :null}
            
           
           {/*isLoading && (<Skeleton variant="rectangular" width="100%" height="70vh" />)*/}
       
          
      
          <div className='mt-5'>
             <h3 className='text-[#1F1F1F] text-[20px] font-[600] mt-1'>About this lesson</h3>
             <h6 className='text-[#1F1F1F] text-[14px] font-[500] mt-2'>
               {lesson.description}
             </h6>
          </div>
        </div>

       {/* <div className="mt-5 lg:mt-0 col-span-2">
                      
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
      

       </div>*/}


<div className='bg-white rounded-xl px-3 lg:col-span-5 invisible lg:visible'>
            <h3 className='text-center text-[18px] font-bold my-4'>Chapters List</h3>
            <div>
                {courseData?.chapters?.map(chapter => <ChapterCard courseId={courseData._id} student name={chapter.title}  progress={progress && progress[courseData._id]? progress[courseData._id][chapter._id]: null} key={Math.random()} lessons={chapter.lessons} enrolled={courseStatus}/>)}
          
           
            </div>
          </div>
      
      </div>
       
    </IndexPage>
    </>
  )
}

export default Lesson