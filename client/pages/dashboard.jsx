
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

const percentage = 65;


function Dashboard() {
    const router = useRouter()
    const [student, setStudent] = useState(false)
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
    
    const fetchStorageData = () => {
        const jwt = localStorage.getItem("jwt")
        const email = localStorage.getItem("email")
        const name =  localStorage.getItem("name")
        const role =  localStorage.getItem("role")
        const student_id =  localStorage.getItem("student_id")
        console.log("student id ----", student_id)
        const data = jwt && email && name && student_id && role ? {jwt, name, email, role, student_id} : null
        return data
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
        const { data } = await axios.get(`http://localhost:4000/api/v1/student/courses/${storageData.student_id}`)
        console.log("courses response ---", data)
        if(data.data.courses.length > 0) {
          const firstCourse_id = data.data.courses[0]._id
          const courseData = await axios.get(`http://localhost:4000/api/v1/course/${firstCourse_id}`)
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
        const requestsRes = await axios.get("http://localhost:4000/api/v1/auth/requests")
        console.log("requests", requestsRes.data.data)
        setEnrollRequests(requestsRes.data.data)
        const studentRes = await axios.get("http://localhost:4000/api/v1/student/courses/62c339d058c9e5ffe95a43cb")
        if(studentRes.data.data.courses.length > 0) {
          setFirstCourse(studentRes.data.data.courses[0])
          const firstCourse_name = studentRes.data.data.courses[0].name
          const courseStudentsRes = await axios.get(`http://localhost:4000/api/v1/course/students/${firstCourse_name}`)
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
        const response = await axios.post("http://localhost:4000/api/v1/student/addcourse", body)
        console.log("response", response)
        fetchDataForAdmin()
      } catch(err) {
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
                <div className="flex justify-between">
                <div>
                   <h3 className='text-[#1F1F1F] text-[20px] font-[600]'>Home</h3>
                   <h5 className='text-[#1F1F1F] text-[16px]'>Hello and welcome back! Let’s keep learning</h5>
                </div>
                <div  className='border-2 border-[#079C49] rounded-full w-[50px] h-[50px] overflow-hidden cursor-pointer' style={{position: "relative"}} onClick={() => router.push("/profile")}>
                    <Image src="/images/main1.png"  layout="fill"
                 objectFit="cover"/>
                </div>
            </div>
    
            <div className="grid grid-cols-3 gap-x-12 mt-12">
                <div className="col-span-2">
    
    
                    <div className="bg-[#fff] p-4 rounded-[15px] ">
                       <h3 className='text-[#1F1F1F] font-[600] text-[22px]'>Upcoming courses</h3>
                       <div className="grid grid-cols-3 gap-4 my-4">
                           
                           {upcoming[0]? <CourseCard goToLesson={() => {
                             router.replace("/courses/lessons", {
                               query: {
                                lesson: upcoming[0]._id,
                                 lessonData: upcoming[0]
                               }
                             })
                           }} name ={upcoming[0].name} descrip="Lesson 6" icon="/icons/courseIcon.svg" />: null}
                           {upcoming[1]? <CourseCard goToLesson={() => {
                             router.replace("/courses/lessons", {
                              query: {
                                lesson: upcoming[1]._id,
                                lessonData: upcoming[1]
                              }
                            })
                           }} name ={upcoming[1].name} descrip="Lesson 6" icon="/icons/courseIcon.svg" />: null}
                           {upcoming[2]? <CourseCard goToLesson={() => {
                             router.replace("/courses/lessons", {
                              query: {
                                lesson: upcoming[2]._id,
                                lessonData: upcoming[2]
                              }
                            })
                           }} name ={upcoming[2].name} descrip="Lesson 6" icon="/icons/courseIcon.svg" />: null}
    
                   
    
    
    
                       </div>
                    </div>
    
    
                    <div className="grid grid-cols-2 gap-6 mt-3">
                        <div className='circleProgress flex-col  rounded-[15px] p-4'>
                           <h3 className='text-[#1F1F1F] font-[600] text-[22px]'>Total progress</h3>
                           <h5 className='text-[#1F1F1F] text-[16px] mt-2'>{firstCourse.name}</h5>
                           <div className="flex justify-center mt-5">
                                <div className='bg-[#48DA6F] w-[200px] h-[200px] rounded-full p-8'>
                                 <CircularProgressbar
                                   value={percentage}
                                   text={`${percentage}%`}
                                   
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
                <div className='bg-[white] p-4 rounded-[15px]'>
                   <h3 className='text-[#1F1F1F] font-[600] text-[22px]'>Latest lessons</h3>
                   <div className='mt-3'>
                     {latest.map(lesson => <ProgressCard progress="25" course={lesson.name} descrip="Lesson 4" />)}
                   </div>
                </div>
            </div>
            </>
            ) : 
            <HashLoader color="#079C49" loading={true} size={60} />
            
          : 
          enrollRequests ? 
          (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className='px-4 py-6 bg-[#fff] rounded-[15px]'>
                    <h4 className='text-[22px] text-[#1F1F1F]'>New students <span className='text-[14px]'>(10)</span> </h4>
                    <div className='flex items-center border-[1px] border-[#9DA6BACC] p-2 rounded-[10px] mt-3 text-[#9DA6BA]'>
                        <SearchIcon />
                        <input type="search" className='w-full outline-none pl-2 text-[#000]' placeholder='Search a student’s name ...'/>
                    </div>
                    <div className='mt-5'>
                      <div className="grid grid-cols-4">
                         <h5 className='text-[#1F1F1F] text-[12px] font-[600] '>Name</h5>
                         <h5 className='text-[#1F1F1F] text-[12px] font-[600] col-span-2'>Cours</h5>
                         <h5 className='text-[#1F1F1F] text-[12px] font-[600]'>Admission</h5>
                      </div>
                      {enrollRequests.map(request => <StudentRow name={request.student_name} actions cours={request.course_name} accept={() => acceptEnrollRequest(request)}/>)}
                    </div>
                </div>
  
  
  
  
  
                <div className='px-4 py-6 bg-[#fff] rounded-[15px]'>
                    <h4 className='text-[22px] text-[#1F1F1F]'>My students <span className='text-[14px]'>(100)</span> </h4>
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
                        {courseStudents?.map(student => <StudentRow name={student.name} cours={firstCourse.name} progress={parseInt(calculateProgress(student, firstCourse._id) * 100)}/>)}
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