
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
import { Button, Modal } from '@mui/material'
import StudentRow from '../components/dashboard/studentRow'
import axios from '../axiosInstance'
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

import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import axiosInstance from '../axiosInstance'
import toast, { Toaster } from 'react-hot-toast'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: '#fff',
  borderRadius : "15px",
  boxShadow: 24,
  p: 4,
};

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
  const [searchInput, setSearchInput] = useState('');
  const [searchStudent, setSearchStudent] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [acceptModal, setAcceptModal] = useState(false)
  const [refuseModal, setRefuseModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [accepted, setAccepted] = useState(null)
  const [refused, setRefused] = useState(null)
  const [deleted, setDeleted] = useState(null)
const [lessons, setLessons] = useState([])

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });



  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = enrollRequests.filter((item) => {
          return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
  }
  else{
      setFilteredResults(enrollRequests)
  }
}

const searchStudents = (searchValue) => {
  setSearchStudent(searchValue)
  if (searchStudent !== '') {
    const filteredData = courseStudents.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchStudent.toLowerCase())
    })
    setFilteredStudents(filteredData)
}
else{
    setFilteredStudents(courseStudents)
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
              query : {course_id: firstCourse._id, lesson_id: lesson._id, filename: lesson.filename, name: lesson.name, description: lesson.description, course_name : firstCourse.name}
            })
        }} key={lesson._id} disablePadding className='my-2'>
            <ListItemButton>
              <span className='mr-2 font-bold'><PlayCircleIcon /></span>
          
              {lesson.name}
            </ListItemButton>
          </ListItem>)}
      

  

      </List>
  
    </Box>
  );






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
        const { data } = await axios.get(`/student/courses/${storageData.student_id}`)
        console.log("student", data);
        if(data.data.courses.length > 0) {
          const firstCourse_id = data.data.courses[0]._id
          const courseData = await axios.get(`/course/${firstCourse_id}`)
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
          let latestLessons = []
          let upcomingLessons = []
          firstCourse_progress[0].lessons_progress.map((lesson_progress, index) => {
            console.log("lesson----", courseData.data.data.lessons[index])
            if(lesson_progress.completed){
            
              latestLessons.push({...courseData.data.data.lessons[index], classement: index + 1})
            } else {
              upcomingLessons.push({...courseData.data.data.lessons[index], classement: index + 1})
            }
          })

          setLatest(latestLessons)
          setUpcoming(upcomingLessons)
          console.log("lessons ------", courseData.data.data.lessons)
          setLessons(courseData.data.data.lessons)
          /*for (var i = 0; i < firstCourse_progress[0].lessons_progress.length; i++) {
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
          }*/
        }
      } catch(err){
        console.log(err)
      }
    }

    const fetchDataForAdmin = async () => {
      try {
        const requestsRes = await axios.get("/auth/requests")
        console.log("requests", requestsRes.data.data)
        setEnrollRequests(requestsRes.data.data)
        const studentRes = await axios.get("/course")
        console.log(studentRes.data.data)
        if(studentRes.data.data.length > 0) {
          setFirstCourse(studentRes.data.data[0])
          const firstCourse_name = studentRes.data.data[0].name
          const courseStudentsRes = await axios.get(`course/students/${firstCourse_name}`)
          console.log(courseStudentsRes.data.data)
          setCourseStudents(courseStudentsRes.data.data)
        }
      } catch(err) {
        console.log(err)
      }
    }

    const handleAcceptModal = (accepted)=>{
      setAcceptModal(true)
      setAccepted(accepted)
    }

    const handleCloseAccept = ()=>{
      setAcceptModal(false)
    }

    const handleRefuseModal = (refused)=>{
      setRefuseModal(true)
      setRefused(refused)
    }

    const handleCloseRefuse = ()=>{
      setRefuseModal(false)
    }

    const acceptEnrollRequest = async (request) => { 
      
      try {
        const body = {
          request_id: request._id,
          student_id: request.student_id,
          course_id: request.course_id
        }
        const response = await axios.post("/student/addcourse", body)
        console.log("response", response)
        response.data.error ? toast.error(response.data.message) : toast.success(response.data.message)
        fetchDataForAdmin()
        setAcceptModal(false)
      } catch(err) {
        console.log(err)
      }
    }

    const refuseEnrollRequest = async (request_id) => {
      try {
        const response = await axios.delete(`/student/request/${request_id}`)
        console.log("response", response)
        response.data.error ? toast.error(response.data.message) : toast.success(response.data.message)
        fetchDataForAdmin()
        setRefuseModal(false)
      } catch(err){
        console.log(err)
      }
    }

    const deleteStudentFromCourse = async (course_id, student_id) => {
      try {
        const response = await axios.delete(`/course/${course_id}/student/${student_id}`)
        console.log(response)
        response.data.error ? toast.error(response.data.message) : toast.success(response.data.message)
        fetchDataForAdmin()
        setDeleteModal(false)
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
        setFetched(true)
      } else {
        fetchDataForAdmin()
        setFetched(true)
      }
    }, [lastWatched, storageData])
    const content =  storageData ? ( 
      <>
      <Sidebar active="dashboard"/>
      <Modal
                        open={acceptModal}
                        onClose={handleCloseAccept}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                        <h4 className='text-[20px] font-[600] text-[#1F1F1F] text-center'>Wanna accept this student ?</h4>
         



                     <div className="flex justify-center mt-8">
                      <button onClick={()=>handleCloseAccept()} className="muiBtn  sign text-[#079C49] border-2 border-[#079C49] w-[120px] 2xl:w-[120px] h-[40px] 2xl:h-[40px] text-[16px] 2xl:text-[18px] rounded-[10px] font-[600] mr-3" >Cancel</button>
                      <button onClick={()=> acceptEnrollRequest(accepted)} className='muiBtn register text-[#079C49] border-2 border-[#079C49] w-[120px] 2xl:w-[120px] h-[40px] 2xl:h-[40px] text-[16px] 2xl:text-[18px] rounded-[10px] font-[600] '> <span>yes</span></button>
                    </div>
                   
       
                        </Box>
      </Modal>


      <Modal
                        open={refuseModal}
                        onClose={handleRefuseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                        <h4 className='text-[20px] font-[600] text-[#1F1F1F] text-center'>Wanna refuse this student ?</h4>
         



                     <div className="flex justify-center mt-8">
                      <button onClick={()=>handleCloseRefuse()} className="muiBtn  sign text-[#079C49] border-2 border-[#079C49] w-[120px] 2xl:w-[120px] h-[40px] 2xl:h-[40px] text-[16px] 2xl:text-[18px] rounded-[10px] font-[600] mr-3" >Cancel</button>
                      <button onClick={()=> refuseEnrollRequest(refused)} className='muiBtn register text-[#079C49] border-2 border-[#079C49] w-[120px] 2xl:w-[120px] h-[40px] 2xl:h-[40px] text-[16px] 2xl:text-[18px] rounded-[10px] font-[600] '> <span>yes</span></button>
                    </div>
                   
       
                        </Box>
      </Modal>

      <Modal
                        open={deleteModal}
                        onClose={()=> setDeleteModal(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                        <h4 className='text-[20px] font-[600] text-[#1F1F1F] text-center'>Wanna delete this student ?</h4>
         



                     <div className="flex justify-center mt-8">
                      <button onClick={()=> setDeleteModal(false)} className="muiBtn  sign text-[#079C49] border-2 border-[#079C49] w-[120px] 2xl:w-[120px] h-[40px] 2xl:h-[40px] text-[16px] 2xl:text-[18px] rounded-[10px] font-[600] mr-3" >Cancel</button>
                      <button  onClick={() => {
                        deleteStudentFromCourse(firstCourse._id, deleted)
                      }} className='muiBtn register text-[#079C49] border-2 border-[#079C49] w-[120px] 2xl:w-[120px] h-[40px] 2xl:h-[40px] text-[16px] 2xl:text-[18px] rounded-[10px] font-[600] '> <span>yes</span></button>
                    </div>
                   
       
                        </Box>
      </Modal>
      <Toaster />
        <IndexPage>
          {!fetched ?
              <HashLoader color="#079C49" loading={true} size={60} />
            :
          student ? 
              !firstCourse ? 
                <h3 className='text-[#1F1F1F] text-[18px] font-[600]'>No course enrolled right now .</h3>
              :
              latest && upcoming? (
                <>
             
                <div>
                <div className="flex justify-between">
                <div>
                   <h3 className='text-[#1F1F1F] text-[18px] font-[600]'>Home</h3>
                   <h5 className='text-[#1F1F1F] text-[14px]'>Hello and welcome back! Let’s keep learning</h5>
                </div>
                <div className='flex items-center'>
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
                    <div  className='hidden sm:block border-2 border-[#079C49] rounded-full w-[50px] h-[50px] overflow-hidden cursor-pointer' style={{position: "relative"}} onClick={() => router.push("/profile")}>
                        <Image src="/images/main1.png"  layout="fill"
                     objectFit="cover"/>
                    </div>
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
                     {upcoming[0]? <CourseCard lessonIndex={"lesson " + upcoming[0].classement} goToLesson={() => {
                              console.log(upcoming[0].description)
                             router.push({
                             pathname: "/courses/lessons/"+upcoming[0]._id,
                               query : {course_id: firstCourse._id, lesson_id: upcoming[0]._id, filename: upcoming[0].filename, name: upcoming[0].name, description: upcoming[0].description, courseName : firstCourse.name, classement: upcoming[0].classement}
                             })
                           }} name ={upcoming[0].name} descrip="Lesson 6" icon="/icons/courseIcon.svg" />: null}
                           {upcoming[1]? <CourseCard lessonIndex={"lesson " + upcoming[1].classement} goToLesson={() => {
                             console.log("upcoming", upcoming[1])
                             router.push({
                              pathname: "/courses/lessons/"+upcoming[1]._id,
                                query : {course_id: firstCourse._id, lesson_id: upcoming[1]._id, filename: upcoming[1].filename, name: upcoming[1].name, description: upcoming[1].description,courseName : firstCourse.name, classement: upcoming[1].classement}
                              })
                           }} name ={upcoming[1].name} descrip="Lesson 6" icon="/icons/courseIcon.svg" />: null}
                           {upcoming[2]? <CourseCard lessonIndex={"lesson " + upcoming[2].classement} goToLesson={() => {
                             console.log("upcoming",upcoming[2])
                            router.push({
                              pathname: "/courses/lessons/"+upcoming[2]._id,
                              query : {course_id: firstCourse._id, lesson_id: upcoming[2]._id, filename: upcoming[2].filename, name: upcoming[2].name, description: upcoming[2].description,courseName : firstCourse.name, classement: upcoming[2].classement}
                              })
                           }} name ={upcoming[2].name} descrip="Lesson 6" icon="/icons/courseIcon.svg" />: null}
    
                   
    
    
    
    
                       </div>
                     </TabPanel>
                     <TabPanel value={value} index={1} dir={theme.direction}>
                         {/* <div className='mt-2'>
                             <CourseCard name="Lorem ipsum dolor sit" descrip="Lorem ipsum" icon="/icons/newCourse.svg"/>
                             <CourseCard name="Lorem ipsum dolor sit" descrip="Lorem ipsum" icon="/icons/newCourse.svg"/>
                             <CourseCard name="Lorem ipsum dolor sit" descrip="Lorem ipsum" icon="/icons/newCourse.svg"/>
                           </div> */}
                     </TabPanel>
                     <TabPanel value={value} index={2} dir={theme.direction}>
                     <div className='mt-3'>
                     {latest.length == 0 && ( <h3 className='text-center'>No latest lessons found</h3>)}   
                     {latest.map(lesson => <ProgressCard key={lesson._id} progress="25" goToLesson={() => {
                             router.push({
                             pathname: "/courses/lessons/"+lesson._id,
                               query : {course_id: firstCourse._id, lesson_id: lesson._id, filename: lesson.filename, name: lesson.name, description: lesson.description, courseName : firstCourse.name, classement: lesson.classement}
                             })
                           }} course={lesson.name} descrip={"Lesson " + lesson.classement} />)}
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
                      
                           {upcoming[0]? <CourseCard lessonIndex={"lesson " + upcoming[0].classement} goToLesson={() => {
                             router.push({
                             pathname: "/courses/lessons/"+upcoming[0]._id,
                             query : {course_id: firstCourse._id, lesson_id: upcoming[0]._id, filename: upcoming[0].filename, name: upcoming[0].name, description: upcoming[0].description, courseName : firstCourse.name, classement: upcoming[0].classement}
                             })
                           }} name ={upcoming[0].name} descrip="Lesson 6" icon="/icons/courseIcon.svg" />: null}
                           {upcoming[1]? <CourseCard lessonIndex={"lesson " + upcoming[1].classement} goToLesson={() => {
                             router.push({
                              pathname: "/courses/lessons/"+upcoming[1]._id,
                              query : {course_id: firstCourse._id, lesson_id: upcoming[1]._id, filename: upcoming[1].filename, name: upcoming[1].name, description: upcoming[1].description, courseName : firstCourse.name, classement: upcoming[1].classement}
                              })
                           }} name ={upcoming[1].name} descrip="Lesson 6" icon="/icons/courseIcon.svg" />: null}
                           {upcoming[2]? <CourseCard lessonIndex={"lesson " + upcoming[2].classement} goToLesson={() => {
                            router.push({
                              pathname: "/courses/lessons/"+upcoming[2]._id,
                              query : {course_id: firstCourse._id, lesson_id: upcoming[2]._id, filename: upcoming[2].filename, name: upcoming[2].name, description: upcoming[2].description, courseName : firstCourse.name, classement: upcoming[2].classement}
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
                           {/* <div className='mt-2'>
                             <CourseCard name="Lorem ipsum dolor sit" descrip="Lorem ipsum" icon="/icons/newCourse.svg"/>
                             <CourseCard name="Lorem ipsum dolor sit" descrip="Lorem ipsum" icon="/icons/newCourse.svg"/>
                             <CourseCard name="Lorem ipsum dolor sit" descrip="Lorem ipsum" icon="/icons/newCourse.svg"/>
                           </div> */}
                        </div>
                    </div>
                </div>
                <div className='bg-[white] p-4 rounded-[15px] col-span-3 xl:col-span-1'>
                   <h3 className='text-[#1F1F1F] font-[600] text-[22px]'>Latest lessons</h3>
                   {latest.length == 0 && ( <h3 className='text-center mt-5'>No latest courses found</h3>)}   
                   <div className='mt-3'>
                     {latest.map(lesson => <ProgressCard key={lesson._id} progress="25" goToLesson={() => {
                             router.push({
                             pathname: "/courses/lessons/"+lesson._id,
                               query : {course_id: firstCourse._id, lesson_id: lesson._id, filename: lesson.filename, name: lesson.name, description: lesson.description, courseName : firstCourse.name, classement: lesson.classement}
                             })
                           }} course={lesson.name} descrip={"Lesson " + lesson.classement} />)}
                   </div>
                </div>
            </div>
            </div>
            </>
            ) : (firstCourse !== undefined ?
              <div className='flex justify-center items-center'>
                <HashLoader color="#079C49" loading={true} size={60} />
              </div> : <h1 className='text-center text-xl'>You're not accepted yet !</h1>)
            
           
            
          : 
          enrollRequests ? 
          (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className='sm:px-4 py-6 bg-[#fff] rounded-[15px]'>
                    <h4 className='text-[22px] text-[#1F1F1F]'>New students <span className='text-[14px]'>({enrollRequests.length})</span> </h4>
                    <div className='flex items-center border-[1px] border-[#9DA6BACC] p-2 rounded-[10px] mt-3 text-[#9DA6BA]'>
                        <SearchIcon />
                        <input type="search" className='w-full outline-none pl-2 text-[#000]' placeholder='Search a student’s name ...' onChange={(e) => searchItems(e.target.value)}/>
                    </div>
                    <div className='mt-5'>
                      <div className="grid grid-cols-3 sm:grid-cols-4">
                         <h5 className='text-[#1F1F1F] text-[12px] font-[600] '>Name</h5>
                         <h5 className='text-[#1F1F1F] text-[12px] font-[600] sm:col-span-2'>Cours</h5>
                         <h5 className='text-[#1F1F1F] text-[12px] font-[600]'>Admission</h5>
                      </div>
                      {searchInput.length > 1 ? (
                    filteredResults.map(request => <StudentRow key={request._id} name={request.student_name} actions cours={request.course_name} accept={() => handleAcceptModal(request)} refuse={() => handleRefuseModal(request._id)}/>)) :
                      enrollRequests.map(request => <StudentRow  key={request._id}name={request.student_name} actions cours={request.course_name} accept={() => handleAcceptModal(request)} refuse={() => handleRefuseModal(request._id)}/>)}
                    </div>
                </div>
  
  
  
  
  
                <div className='sm:px-4 py-6 bg-[#fff] rounded-[15px]'>
                    <h4 className='text-[22px] text-[#1F1F1F]'>My students <span className='text-[14px]'>({courseStudents?.length})</span> </h4>
                    <div className='flex items-center border-[1px] border-[#9DA6BACC] p-2 rounded-[10px] mt-3 text-[#9DA6BA]'>
                        <SearchIcon />
                        <input type="search" className='w-full outline-none pl-2 text-[#000]' placeholder='Search a student’s name ...' onChange={(e) => searchStudents(e.target.value)}/>
                    </div>
                    <div className='mt-5'>
                        <div className="grid grid-cols-4">
                            <h5 className='text-[#1F1F1F] text-[12px] font-[600] '>Name</h5>
                            <h5 className='text-[#1F1F1F] text-[12px] font-[600] '>Cours</h5>
                            <h5 className='text-[#1F1F1F] text-[12px] font-[600] text-center'>Progress</h5>
                            <h5 className='text-[#1F1F1F] text-[12px] font-[600] text-center'>Action</h5>
                        </div>
                        {searchStudent.length > 1 ? (
                          filteredStudents?.map(student => <StudentRow key={student._id} name={student.name} cours={firstCourse.name} progress={parseInt(calculateProgress(student, firstCourse._id) * 100) == 0 ? -1 :parseInt(calculateProgress(student, firstCourse._id) * 100) } delete deleteStudent={()=> {
                            setDeleted(student._id)
                            setDeleteModal(true)
                          }}/>)):
                        courseStudents?.map(student => <StudentRow key={student._id} name={student.name} cours={firstCourse.name} progress={parseInt(calculateProgress(student, firstCourse._id) * 100) == 0 ? -1 :parseInt(calculateProgress(student, firstCourse._id) * 100) } delete deleteStudent={()=> {
                          setDeleted(student._id)
                          setDeleteModal(true)
                        }}/>)}
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