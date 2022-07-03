
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import CourseCard from '../components/dashboard/courseCard'
import IndexPage from '../components/dashboard/indexPage'
import Sidebar from '../components/dashboard/sidebar'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ProgressCard from '../components/dashboard/progressCard'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material'
import StudentRow from '../components/dashboard/studentRow'

const percentage = 65;


function Dashboard() {
    const router = useRouter()
    const [student, setStudent] = useState(false)
  return (
    <>
    <Sidebar active="dashboard"/>
    <IndexPage>
        {student &&(
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
                       
                       <CourseCard name ="Lorem ipsum" descrip="Lesson 6" icon="/icons/courseIcon.svg" />
                       <CourseCard name ="Lorem ipsum" descrip="Lesson 6" icon="/icons/courseIcon.svg" />
                       <CourseCard name ="Lorem ipsum" descrip="Lesson 6" icon="/icons/courseIcon.svg" />

               



                   </div>
                </div>


                <div className="grid grid-cols-2 gap-6 mt-3">
                    <div className='circleProgress flex-col  rounded-[15px] p-4'>
                       <h3 className='text-[#1F1F1F] font-[600] text-[22px]'>Total progress</h3>
                       <h5 className='text-[#1F1F1F] text-[16px] mt-2'>Introduction to investment</h5>
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
                  <ProgressCard progress="25" course="Lorem ipsum" descrip="Lesson 4" />
                  <ProgressCard progress="50" course="Lorem ipsum" descrip="Lesson 4" />
                  <ProgressCard progress="75" course="Lorem ipsum" descrip="Lesson 4" />
                  <ProgressCard progress="75" course="Lorem ipsum" descrip="Lesson 4" />
                  <ProgressCard progress="100" course="Lorem ipsum" descrip="Lesson 4" />
                
               </div>
            </div>
        </div>
        </>
        )}

        {!student && (
            <>
              <div className="grid grid-cols-2 gap-4">
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

                      <StudentRow name="Nagoudi Nada" cours="Introduction to investment" actions/>
                      <StudentRow name="Nagoudi Nada" cours="Introduction to investment" actions/>
                      <StudentRow name="Nagoudi Nada" cours="Introduction to investment" actions/>
                      <StudentRow name="Nagoudi Nada" cours="Introduction to investment" actions/>
                      <StudentRow name="Nagoudi Nada" cours="Introduction to investment" actions/>
                   
                       
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

                        <StudentRow name="Nagoudi Nada" cours="Introduction to investment" progress="75"/>
                        <StudentRow name="Nagoudi Nada" cours="Introduction to investment" progress="75"/>
                        <StudentRow name="Nagoudi Nada" cours="Introduction to investment" progress="75"/>
                        <StudentRow name="Nagoudi Nada" cours="Introduction to investment" progress="75"/>
                        <StudentRow name="Nagoudi Nada" cours="Introduction to investment" progress="75"/>
                        <StudentRow name="Nagoudi Nada" cours="Introduction to investment" progress="75"/>
                       
                    </div>
                </div>
              </div>
            </>
        )}
        
    </IndexPage>
    </>
  )
}

export default Dashboard