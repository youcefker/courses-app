
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
import { MenuItem, Select } from '@mui/material';

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
    const [student, setStudent] = useState(null)
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [courses, setCourses] = useState(null)
    const [selectedCourseProgress, setFirstCourseProgress] = useState(null)
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
              query : {course_id: firstCourse._id, courseName : firstCourse.name, lesson_id: lesson._id, filename: lesson.filename, name: lesson.name, description: lesson.description, course_name : firstCourse.name, classement: lesson.classement}
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
    /*const fetchDataForStudent = async (student_id) => {
      try {
        console.log("storage data", storageData)
        const { data } = await axios.get(`/student/courses/${student_id}`)
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
          }
        }
      } catch(err){
        console.log(err)
      }
    }*/
    const fetchCourseStudents = async (course_id) => {
      try {
        const courseStudentsRes = await axios.get(`course/students/${course_id}`)
          console.log("##### course students", courseStudentsRes.data.data)
          setCourseStudents(courseStudentsRes.data.data)
      } catch(err){
        console.log(err)
      }
    }
    const fetchDataForAdmin = async () => {
      try {
        const requestsRes = await axios.get("/auth/requests")
        setEnrollRequests(requestsRes.data.data)
        const coursesRes = await axios.get("/course")
        let availableCourses = []
        coursesRes.data.data.map(course => {
          availableCourses.push({
            id: course._id,
            name: course.name
          })
        })
        setCourses(availableCourses)
        if(coursesRes.data.data.length > 0) {
          setSelectedCourse({id: coursesRes.data.data[0]._id, name: coursesRes.data.data[0].name})
        }
      } catch(err) {
        console.log(err)
      }
    }

    useEffect(() => {
      if(selectedCourse){
        fetchCourseStudents(selectedCourse.id)
      }
    }, [selectedCourse])
    

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

    const handleSelectChange = (event) => {
      setSelectedCourse(event.target.value)
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
      console.log(selectedCourse)
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
    /*const calculateProgress = (student, course_id) => {
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
    }*/
    useEffect(() => {
      if(typeof window != "undefined"){
        const auth = fetchStorageData()
      if(auth){
        if(auth.role === "admin") {
          setStudent(false)
          fetchDataForAdmin()
          setFetched(true)
        } else if(auth.role === "student") {
          setStudent(true)
          fetchDataForStudent(auth.student_id)
          setFetched(true)
        } else {
          router.replace('login')
        }
        setStorageData(auth)
        setFetched(true)
      } else {
        router.replace('login')
      }
      }
    }, [typeof window, student])
    
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
                        deleteStudentFromCourse(selectedCourse.id, deleted)
                      }} className='muiBtn register text-[#079C49] border-2 border-[#079C49] w-[120px] 2xl:w-[120px] h-[40px] 2xl:h-[40px] text-[16px] 2xl:text-[18px] rounded-[10px] font-[600] '> <span>yes</span></button>
                    </div>
                   
       
                        </Box>
      </Modal>
      <Toaster />
        <IndexPage>
          {!fetched ?
              <HashLoader color="#079C49" loading={true} size={60} />
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
                         <h5 className='text-[#1F1F1F] text-[12px] font-[600] '>email</h5>
                         <h5 className='text-[#1F1F1F] text-[12px] font-[600] sm:col-span-2'>Cours</h5>
                         <h5 className='text-[#1F1F1F] text-[12px] font-[600]'>Admission</h5>
                      </div>
                      {searchInput.length > 1 ? (
                    filteredResults.map(request => <StudentRow key={request._id} name={request.student_name} email={request.email} actions cours={request.course_name} accept={() => handleAcceptModal(request)} refuse={() => handleRefuseModal(request._id)}/>)) :
                      enrollRequests.map(request => <StudentRow  key={request._id} name={request.student_name} email={request.email} actions cours={request.course_name} accept={() => handleAcceptModal(request)} refuse={() => handleRefuseModal(request._id)}/>)}
                    </div>
                </div>
  
  
  
  
  
                <div className='sm:px-4 py-6 bg-[#fff] rounded-[15px]'>
                        <div className='flex-row'>
                          <h4 className='text-[22px] text-[#1F1F1F]'>My students <span className='text-[14px]'>({courseStudents?.length})</span></h4>
                          <div className='my-3'>
                            <Select value={selectedCourse?.name}
                              className='selectInput w-full h-[40px] border border-2 border-[#079C49] rounded-lg'
                              onChange={handleSelectChange} >
                                {courses?.map(course => <MenuItem value={course}>{course.name}</MenuItem>)}
                              </Select>
                          </div>
                        </div>
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
                          filteredStudents?.map(student => <StudentRow key={student._id} name={student.name} cours={selectedCourse.name} delete deleteStudent={()=> {
                            setDeleted(student._id)
                            setDeleteModal(true)
                          }} progress={student?.progress * 100}/>)):
                        courseStudents?.map(student => <StudentRow key={student._id} name={student.name} cours={selectedCourse.name} delete deleteStudent={()=> {
                          setDeleted(student._id)
                          setDeleteModal(true)
                        }} progress={student?.progress ? student?.progress * 100 : 0}/>)}
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