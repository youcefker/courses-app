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
import { Box } from '@mui/material'
import PlayLessonIcon from '@mui/icons-material/PlayLesson';

function Lesson() {
   const router = useRouter()
   const [lesson, setLesson] = useState({ name: router.query.name, desription: router.query.desription, filename: router.query.filename })
   const [storageData, setStorageData] = useState(null)


   const [lessons, setLessons] = useState([])

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const fetchLessons = async () => {
    try {
      const response = await axios.get(`/lesson/course/${router.query.course_id}`)
      setLessons(response.data.data)
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

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 320 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h5 className='text-center mt-3 mb-2 font-bold text-lg text-[#079C49]'>Your lessons</h5>
      <List>
      <Divider />
        {lessons.map((lesson,index) =>  
       
        <ListItem  onClick={() => {
          router.push({
            pathname: "/courses/lessons/"+lesson._id,
              query : {course_id: router.query.course_id, lesson_id: lesson._id, filename: lesson.filename, name: lesson.name, description: lesson.description}
            })
        }} key={lesson._id} disablePadding className='my-2'>
            <ListItemButton>
              <span className='mr-2 font-bold'>{index +1}-</span>
          
              {lesson.name}
            </ListItemButton>
          </ListItem>)}
      

  

      </List>
  
    </Box>
  );
   const handleEndedVideo = async() => {
      try {
         const body = {
            course_id: router.query.course_id,
            student_id: localStorage.getItem("student_id"),
            lesson_id: router.query.lesson_id
         }
         const response = await axios.post("/lesson/complete", body)
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
     fetchLessons()
   } else {
     router.replace("/adminLogin")
   }
 }, [])
  return (
    <>
    <Sidebar active="courses" />
    <IndexPage>
      <div className="flex justify-between items-center">
         <div>
            <h3 className='text-[#1F1F1F] text-[20px] font-[600]  '>Course : Javascript for web</h3>
          <h3 className='text-[#1F1F1F] text-[20px] font-[600] mt-3'>Lesson 1 : {lesson.name}</h3>
         </div>
         <div>
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
       <div className="grid grid-cols-1 lg:grid-cols-6 lg:gap-x-6 mt-6 w-full">


        <div className='col-span-4'>
          <video  on controls autoPlay onEnded={handleEndedVideo} controlsList="nodownload">
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