
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import CourseCard from '../components/dashboard/courseCard'
import IndexPage from '../components/dashboard/indexPage'
import Sidebar from '../components/dashboard/sidebar'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ProgressCard from '../components/dashboard/progressCard'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material'
import StudentRow from '../components/dashboard/studentRow'
import axios from 'axios'
import HashLoader from "react-spinners/HashLoader";

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { withStyles } from '@mui/styles'
import { config } from '@fortawesome/fontawesome-svg-core'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
const CustomTab = withStyles({
  root: {
    textTransform: "unset" 
  }
})(Tab);


function Dashboard() {
    const router = useRouter()
    const [student, setStudent] = useState(true)
    const [firstCourse, setFirstCourse] = useState(null)
    const [firstCourseProgress, setFirstCourseProgress] = useState(null)
    const [lastWatched, setLastWatched] = useState(null)
    const [latest, setLatest] = useState(null)
    const [upcoming, setUpcoming] = useState(null)
    const [percentage, setPercentage]= useState(0)
    const [enrollRequests, setEnrollRequests] = useState(null)
    const [courseStudents, setCourseStudents] = useState(null)
    const [storageData, setStorageData] = useState(null)
    const [fetched, setFetched] = useState(false)
    const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

    const fetchStorageData = () => {
        const jwt = localStorage.getItem("jwt")
        const role =  localStorage.getItem("role")
        if(role === "student") {
          const email = localStorage.getItem("email")
          const name =  localStorage.getItem("name")
          const student_id =  localStorage.getItem("student_id")
          const data = jwt && email && name && student_id && role ? {jwt, name, email, role, student_id} : null
          return data
        } else if( role === "admin") {
          const data = jwt && role ? {jwt, role}: null
          return data
        } 
    } 
    useEffect(() => {
      const auth = fetchStorageData()
      console.log(auth)
      if(auth){
        if(auth.role === "admin") {
          setStudent(false)
        } else if(auth.role === "student") {
          setStudent(true)
        } else {
          router.replace('login')
        }
        setStorageData(auth)
        setFetched(true)
      } else {
        router.replace('login')
      }
    }, [])
    const fetchDataForStudent = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/v1/student/courses/${storageData.student_id}`, {
          headers: {authorization: "Bearer " + storageData.jwt}
        })
        console.log("student", data);
        if(data.data.courses.length > 0) {
          const firstCourse_id = data.data.courses[0]._id
          const courseData = await axios.get(`http://localhost:4000/api/v1/course/${firstCourse_id}`, {
            headers: {authorization: "Bearer " + storageData.jwt}
          })
          console.log("course response ---", courseData.data)
          setFirstCourse(courseData.data.data)
          const firstCourse_progress = data.data.progress.filter(courseProgress => courseProgress.course_id === data.data.courses[0]._id)
          setFirstCourseProgress(firstCourse_progress[0])
          const numLessonCompleted = 0
          firstCourse_progress[0].lessons_progress.map(lesson_progress => {
            if(lesson_progress.completed){
              numLessonCompleted++
            }
          })
          console.log("completed -----", numLessonCompleted)
          setPercentage(numLessonCompleted / firstCourse_progress[0].lessons_progress.length * 100)
          for (var i = 0; i < firstCourse_progress[0].lessons_progress.length; i++) {
            console.log(!firstCourse_progress[0].lessons_progress[i].completed)
            if(!firstCourse_progress[0].lessons_progress[i].completed){
              if(i === 0){
                setLastWatched(0)
                break
              } else {
                setLastWatched(i - 1)
                break
              }
            } else if(i === firstCourse_progress[0].lessons_progress.length - 1) {
              setLastWatched(firstCourse_progress[0].lessons_progress.length)
            } else {
              i++
            }
          }
          console.log("lastWatched", lastWatched)
          if(lastWatched === 0) {
            setLatest([])
            setUpcoming(courseData.data.data.lessons)
          } else if(lastWatched === firstCourse_progress[0].lessons_progress.length){
            setLatest(courseData.data.data.lessons)
            setUpcoming([])
          } else {
            setLatest(courseData.data.data.lessons.slice(0, lastWatched + 1))
            setUpcoming(courseData.data.data.lessons.slice(lastWatched + 1))
          }
        }
      } catch(err){
        console.log(err)
      }
    }

    const fetchDataForAdmin = async () => {
      try {
        const requestsRes = await axios.get("http://localhost:4000/api/v1/auth/requests", {
          headers: {authorization: "Bearer " + storageData.jwt}
        })
        console.log("requests", requestsRes.data.data)
        setEnrollRequests(requestsRes.data.data)
        const studentRes = await axios.get("http://localhost:4000/api/v1/course", {
          headers: {authorization: "Bearer " + storageData.jwt}
        })
        if(studentRes.data.data.length > 0) {
          setFirstCourse(studentRes.data.data[0])
          const firstCourse_name = studentRes.data.data[0].name
          const courseStudentsRes = await axios.get(`http://localhost:4000/api/v1/course/students/${firstCourse_name}`, {
            headers: {authorization: "Bearer " + storageData.jwt}
          })
          console.log(courseStudentsRes.data.data)
          setCourseStudents(courseStudentsRes.data.data)
        }
      } catch(err) {
        console.log(err)
      }
    }

    const acceptEnrollRequest = async (request) => { 
      
      try {
        const body = {
          request_id: request._id,
          student_id: request.student_id,
          course_id: request.course_id
        }
        const response = await axios.post("http://localhost:4000/api/v1/student/addcourse", body, {
          headers: {authorization: "Bearer " + storageData.jwt}
        })
        console.log("response", response)
        fetchDataForAdmin()
      } catch(err) {
        console.log(err)
      }
    }

    const refuseEnrollRequest = async (request_id) => {
      try {
        const response = await axios.delete(`http://localhost:4000/api/v1/student/request/${request_id}`, {
          headers: {authorization: "Bearer " + storageData.jwt}
        })
        console.log("response", response)
        fetchDataForAdmin()
      } catch(err){
        console.log(err)
      }
    }

    const calculateProgress = (student, course_id) => {
      console.log("studnet to calculate", student)
      const course_progress = student.progress.filter(course => course.course_id === course_id)[0]
      let num_lessons_completed = 0
      course_progress.lessons_progress.map(lesson => {
        if(lesson.completed){
          num_lessons_completed++
        }
      })
      console.log(num_lessons_completed / course_progress.lessons_progress.length)
      return num_lessons_completed / course_progress.lessons_progress.length
    }
    useEffect(() => {
      
      if(student){

        fetchDataForStudent()
        console.log("storage data" ,storageData)
        console.log("upcoming ", latest, upcoming);
        console.log("first", firstCourse);
      } else {
        fetchDataForAdmin()
      }
    }, [lastWatched, storageData])
    const content =  storageData ? ( 
      <>
      <Sidebar active="dashboard"/>
        <IndexPage>
          {student ? 
              firstCourse && latest && upcoming? (
                <>
             
                <div>
                <div className="flex justify-between">
                <div>
                   <h3 className='text-[#1F1F1F] text-[18px] font-[600]'>Home</h3>
                   <h5 className='text-[#1F1F1F] text-[14px]'>Hello and welcome back! Let’s keep learning</h5>
                </div>
                <div  className='hidden sm:block border-2 border-[#079C49] rounded-full w-[50px] h-[50px] overflow-hidden cursor-pointer' style={{position: "relative"}} onClick={() => router.push("/profile")}>
                    <Image src="/images/main1.png"  layout="fill"
                 objectFit="cover"/>
                </div>

                
            </div>
            <div className='sm:hidden mt-5'>
                          <h3 className='text-[#1F1F1F] font-[600] text-[18px]'>Total progress</h3>
                           <h5 className='text-[#1F1F1F] text-[14px]'>{firstCourse.name}</h5>

                           <div className="flex justify-center mt-3">
                                <div className='bg-[#48DA6F] w-[200px] h-[200px] rounded-full p-8 relative'>
                                 <CircularProgressbar
                                   value={percentage}
                              
                                   
                                   backgroundColor="#48DA6F"
                                   
                                   styles={buildStyles({
                                     // Rotation of path and trail, in number of turns (0-1)
                                     rotation: 0.25,
                                 
                                     // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                     strokeLinecap: 'butt',
                                 
                                     // Text size
                                     textSize: '18px',
                                     
                                     
                                     // How long animation takes to go from one percentage to another, in seconds
                                     pathTransitionDuration: 0.5,
                                 
                                     // Can specify path transition in more detail, or remove it entirely
                                     // pathTransition: 'none',
                                 
                                     // Colors
                                     pathColor: "#079C49",
                                     textColor: '#fff',
                                     trailColor: '#fff',
                                     backgroundColor: '#3e98c7',
                                   })}
                                 />
                                 {percentage == 100 && (<div className="absolute top-[45%] left-[35%] text-white font-bold text-[22px]">{percentage}%</div>)}
                                 {percentage != 100  && (<div className="absolute top-[45%] left-[40%] text-white font-bold text-[22px]">{percentage}%</div>)}
                                 </div>
                            </div>
                          
            </div>
         
            

              <div className="mobile_dash sm:hidden w-full flex flex-col items-center mt-10">
              <Box sx={{  width: "100%" }}>
              
                     <Tabs
                       value={value}
                       onChange={handleChange}
                       indicatorColor="secondary"
                       textColor="inherit"
                       sx={{p: 0}}
                       variant="fullWidth"
                       aria-label="full width tabs example"
                     >
                       <Tab label="Upcoming courses" sx={{textTransform : "unset",p:1, whiteSpace : "nowrap", fontSize: "13px", fontWeight : 600, color: "#000"}} {...a11yProps(0)} />
                       <Tab label="New courses" sx={{textTransform : "unset", p:1,whiteSpace : "nowrap", fontSize: "13px", fontWeight : 600, color: "#000"}}  {...a11yProps(1)} />
                       <Tab label="Latest lessons" sx={{textTransform : "unset", p:1,whiteSpace : "nowrap", fontSize: "13px", fontWeight : 600, color: "#000"}}  {...a11yProps(2)} />
                     </Tabs>
                  
                   <SwipeableViews
                     axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                     index={value}
                     onChangeIndex={handleChangeIndex}
                   >
                     <TabPanel value={value} index={0} dir={theme.direction}>
                     <div className="grid grid-cols-1 gap-y-2 my-4">
                           
                      {upcoming.length == 0 && ( <h3 className='text-center'>No upcoming courses found</h3>)}        
                     {upcoming[0]? <CourseCard goToLesson={() => {
                             router.push({
                             pathname: "/courses/lessons/"+upcoming[0]._id,
                               query : {course_id: firstCourse._id, lesson_id: upcoming[0]._id, filename: upcoming[0].filename, name: upcoming[0].name, description: upcoming[0].description}
                             })
                           }} name ={upcoming[0].name} descrip="Lesson 6" icon="/icons/courseIcon.svg" />: null}
                           {upcoming[1]? <CourseCard goToLesson={() => {
                             console.log("upcoming", upcoming[1])
                             router.push({
                              pathname: "/courses/lessons/"+upcoming[1]._id,
                                query : {course_id: firstCourse._id, lesson_id: upcoming[1]._id, filename: upcoming[1].filename, name: upcoming[1].name, description: upcoming[1].description}
                              })
                           }} name ={upcoming[1].name} descrip="Lesson 6" icon="/icons/courseIcon.svg" />: null}
                           {upcoming[2]? <CourseCard goToLesson={() => {
                             console.log("upcoming",upcoming[2])
                            router.push({
                              pathname: "/courses/lessons/"+upcoming[2]._id,
                              query : {course_id: firstCourse._id, lesson_id: upcoming[2]._id, filename: upcoming[2].filename, name: upcoming[2].name, description: upcoming[2].description}
                              })
                           }} name ={upcoming[2].name} descrip="Lesson 6" icon="/icons/courseIcon.svg" />: null}
    
                   
    
    
    
    
                       </div>
                     </TabPanel>
                     <TabPanel value={value} index={1} dir={theme.direction}>
                         <div className='mt-2'>
                             <CourseCard name="Lorem ipsum dolor sit" descrip="Lorem ipsum" icon="/icons/newCourse.svg"/>
                             <CourseCard name="Lorem ipsum dolor sit" descrip="Lorem ipsum" icon="/icons/newCourse.svg"/>
                             <CourseCard name="Lorem ipsum dolor sit" descrip="Lorem ipsum" icon="/icons/newCourse.svg"/>
                           </div>
                     </TabPanel>
                     <TabPanel value={value} index={2} dir={theme.direction}>
                     <div className='mt-3'>
                     {latest.length == 0 && ( <h3 className='text-center'>No latest courses found</h3>)}   
                     {latest.map(lesson => <ProgressCard progress="25" goToLesson={() => {
                             router.push({
                             pathname: "/courses/lessons/"+upcoming[0]._id,
                               query : {course_id: firstCourse._id, lesson_id: lesson._id, filename: lesson.filename, name: lesson.name, description: lesson.description}
                             })
                           }} course={lesson.name} descrip="Lesson 4" />)}
                   </div>
                     </TabPanel>
                   </SwipeableViews>
              </Box>
              
              </div>
    
            <div className="hidden sm:grid grid-cols-3 gap-4 xl:gap-x-8 mt-12">
                <div className="col-span-3 xl:col-span-2">
    
    
                    <div className="bg-[#fff] p-4 rounded-[15px] ">
                       <h3 className='text-[#1F1F1F] font-[600] text-[22px]'>Upcoming courses</h3>
                       {upcoming.length == 0 && ( <h3 className='text-center'>No upcoming courses found</h3>)}   
                       <div className="grid grid-cols-3 gap-4 my-4">
                      
                           {upcoming[0]? <CourseCard goToLesson={() => {
                             router.push({
                             pathname: "/courses/lessons/"+upcoming[0]._id,
                             query : {course_id: firstCourse._id, lesson_id: upcoming[0]._id, filename: upcoming[0].filename, name: upcoming[0].name, description: upcoming[0].description}
                             })
                           }} name ={upcoming[0].name} descrip="Lesson 6" icon="/icons/courseIcon.svg" />: null}
                           {upcoming[1]? <CourseCard goToLesson={() => {
                             router.push({
                              pathname: "/courses/lessons/"+upcoming[1]._id,
                              query : {course_id: firstCourse._id, lesson_id: upcoming[1]._id, filename: upcoming[1].filename, name: upcoming[1].name, description: upcoming[1].description}
                              })
                           }} name ={upcoming[1].name} descrip="Lesson 6" icon="/icons/courseIcon.svg" />: null}
                           {upcoming[2]? <CourseCard goToLesson={() => {
                            router.push({
                              pathname: "/courses/lessons/"+upcoming[2]._id,
                              query : {course_id: firstCourse._id, lesson_id: upcoming[2]._id, filename: upcoming[2].filename, name: upcoming[2].name, description: upcoming[2].description}
                              })
                           }} name ={upcoming[2].name} descrip="Lesson 6" icon="/icons/courseIcon.svg" />: null}
    
                   
    
    
    
                       </div>
                    </div>
    
    
                    <div className="grid grid-cols-2 gap-6 mt-3">
                        <div className='circleProgress flex-col  rounded-[15px] p-4'>
                           <h3 className='text-[#1F1F1F] font-[600] text-[22px]'>Total progress</h3>
                           <h5 className='text-[#1F1F1F] text-[16px] mt-2'>{firstCourse.name}</h5>
                           <div className="flex justify-center mt-5">
                                <div className='bg-[#48DA6F] w-[200px] h-[200px] rounded-full p-8 relative'>
                                 <CircularProgressbar
                                   value={percentage}
                         
                                   
                                   backgroundColor="#48DA6F"
                                   
                                   styles={buildStyles({
                                     // Rotation of path and trail, in number of turns (0-1)
                                     rotation: 0.25,
                                 
                                     // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                     strokeLinecap: 'butt',
                                 
                                     // Text size
                                     textSize: '18px',
                                     
                                     
                                     // How long animation takes to go from one percentage to another, in seconds
                                     pathTransitionDuration: 0.5,
                                 
                                     // Can specify path transition in more detail, or remove it entirely
                                     // pathTransition: 'none',
                                 
                                     // Colors
                                     pathColor: "#079C49",
                                     textColor: '#fff',
                                     trailColor: '#fff',
                                     backgroundColor: '#3e98c7',
                                   })}
                                 />
                                                    {percentage == 100 && (<div className="absolute top-[45%] left-[35%] text-white font-bold text-[22px]">{percentage}%</div>)}
                                 {percentage != 100  && (<div className="absolute top-[45%] left-[40%] text-white font-bold text-[22px]">{percentage}%</div>)}
                                 </div>
                            </div>
                          
                          
                        </div>
                        <div className='bg-[#fff] p-4 rounded-[15px]'>
                           <h3 className='text-[#1F1F1F] font-[600] text-[22px]'>New courses</h3>
                           <h5 className='text-[#1F1F1F] text-[16px] mt-2'>Discover new courses</h5>
                           <div className='mt-2'>
                             <CourseCard name="Lorem ipsum dolor sit" descrip="Lorem ipsum" icon="/icons/newCourse.svg"/>
                             <CourseCard name="Lorem ipsum dolor sit" descrip="Lorem ipsum" icon="/icons/newCourse.svg"/>
                             <CourseCard name="Lorem ipsum dolor sit" descrip="Lorem ipsum" icon="/icons/newCourse.svg"/>
                           </div>
                        </div>
                    </div>
                </div>
                <div className='bg-[white] p-4 rounded-[15px] col-span-3 xl:col-span-1'>
                   <h3 className='text-[#1F1F1F] font-[600] text-[22px]'>Latest lessons</h3>
                   {latest.length == 0 && ( <h3 className='text-center mt-5'>No latest courses found</h3>)}   
                   <div className='mt-3'>
                     {latest.map(lesson => <ProgressCard progress="25" goToLesson={() => {
                             router.push({
                             pathname: "/courses/lessons/"+upcoming[0]._id,
                               query : {course_id: firstCourse._id, lesson_id: lesson._id, filename: lesson.filename, name: lesson.name, description: lesson.description}
                             })
                           }} course={lesson.name} descrip="Lesson 4" />)}
                   </div>
                </div>
            </div>
            </div>
            </>
            ) : 
            <div className='flex justify-center items-center'>
               <HashLoader color="#079C49" loading={true} size={60} />
            </div>
           
            
          : 
          enrollRequests ? 
          (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className='sm:px-4 py-6 bg-[#fff] rounded-[15px]'>
                    <h4 className='text-[22px] text-[#1F1F1F]'>New students <span className='text-[14px]'>({enrollRequests.length})</span> </h4>
                    <div className='flex items-center border-[1px] border-[#9DA6BACC] p-2 rounded-[10px] mt-3 text-[#9DA6BA]'>
                        <SearchIcon />
                        <input type="search" className='w-full outline-none pl-2 text-[#000]' placeholder='Search a student’s name ...'/>
                    </div>
                    <div className='mt-5'>
                      <div className="grid grid-cols-3 sm:grid-cols-4">
                         <h5 className='text-[#1F1F1F] text-[12px] font-[600] '>Name</h5>
                         <h5 className='text-[#1F1F1F] text-[12px] font-[600] sm:col-span-2'>Cours</h5>
                         <h5 className='text-[#1F1F1F] text-[12px] font-[600]'>Admission</h5>
                      </div>
                      {enrollRequests.map(request => <StudentRow name={request.student_name} actions cours={request.course_name} accept={() => acceptEnrollRequest(request)} refuse={() => refuseEnrollRequest(request._id)}/>)}
                    </div>
                </div>
  
  
  
  
  
                <div className='sm:px-4 py-6 bg-[#fff] rounded-[15px]'>
                    <h4 className='text-[22px] text-[#1F1F1F]'>My students <span className='text-[14px]'>({courseStudents?.length})</span> </h4>
                    <div className='flex items-center border-[1px] border-[#9DA6BACC] p-2 rounded-[10px] mt-3 text-[#9DA6BA]'>
                        <SearchIcon />
                        <input type="search" className='w-full outline-none pl-2 text-[#000]' placeholder='Search a student’s name ...'/>
                    </div>
                    <div className='mt-5'>
                        <div className="grid grid-cols-4">
                            <h5 className='text-[#1F1F1F] text-[12px] font-[600] '>Name</h5>
                            <h5 className='text-[#1F1F1F] text-[12px] font-[600] col-span-2'>Cours</h5>
                            <h5 className='text-[#1F1F1F] text-[12px] font-[600] text-center'>Progress</h5>
                        </div>
                        {courseStudents?.map(student => <StudentRow name={student.name} cours={firstCourse.name} progress={parseInt(calculateProgress(student, firstCourse._id) * 100) == 0 ? -1 :parseInt(calculateProgress(student, firstCourse._id) * 100) }/>)}
                    </div>
              
                </div>
              </div>
            </>
          ) : 
            <HashLoader color="#079C49" loading={true} size={60} />
          }
            
        </IndexPage>
        
      </>
  ) : <HashLoader color="#079C49" loading={true} size={60} />
  return content
}

export default Dashboard