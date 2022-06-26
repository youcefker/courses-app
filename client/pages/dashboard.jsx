
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import CourseCard from '../components/dashboard/courseCard'
import IndexPage from '../components/dashboard/indexPage'
import Sidebar from '../components/dashboard/sidebar'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ProgressCard from '../components/dashboard/progressCard'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const percentage = 65;


function Dashboard() {
    const router = useRouter()
  return (
    <>
    <Sidebar active="dashboard"/>
    <IndexPage>
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
    </IndexPage>
    </>
  )
}

export default Dashboard