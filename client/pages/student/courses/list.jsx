import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import IndexPage from '../../../components/dashboard/indexPage'
import Sidebar from '../../../components/dashboard/sidebar'
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import CourseCardStudent from '../../../components/student/courseCardStudent';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from 'next/router';
import axios from '../../../axiosInstance';


const responsive = {
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  },
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1500 },
      items: 4,
      slidesToSlide: 4 
    },
    desktop: {
      breakpoint: { max: 1500, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    }
  };
function List() {

  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [nonEnrolledCourses, setNonEnrolledCourses] = useState([])

  const fetchStudentCourses = async (name) => {
    try {
      const response = await axios.get(`/course/student${typeof name !== 'undefined' ? "?name=" + name : ""}`)
    console.log(response);
      setEnrolledCourses(response.data.data?.enrolledCourses)
      setNonEnrolledCourses(response.data.data?.notEnrolledCourses)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if(typeof window !== "undefined"){
      fetchStudentCourses()
    }
  }, [typeof window])
  
  const handleEnrollRequest = async (course_id) => {
    console.log(course_id)
    try {
      const response = await axios.post(`/student/request`, {
        course_id
      })
      console.log(response)
      toast.success(response.data.message)
      fetchStudentCourses()
    } catch(err){
      toast.err(err.response.message)
    }
  }

  const handleSearchChange = (event) => {
    fetchStudentCourses(event.target.value)
  }

  const router = useRouter()
  return (
    <div className='height-[100%]'>
        <Sidebar active="courses" />
        <Toaster />
        <IndexPage>
            <div className='flex justify-between items-center'>
                <div className='flex items-center border-[1px] border-[#9DA6BACC] p-2 rounded-[10px] mt-1 text-[#9DA6BA] bg-white h-12'>
                    <SearchIcon />
                    <input type="search" className='w-full outline-none pl-2 text-[#000]' placeholder='Search ...' onChange={handleSearchChange}/>
                </div>
                <div  className='hidden sm:block border-2 border-[#079C49] rounded-full w-[50px] h-[50px] overflow-hidden cursor-pointer' style={{position: "relative"}} onClick={() => router.push("/profile")}>
                    <Image src="/images/main1.png"  layout="fill"
                     objectFit="cover"/>
                </div>
            </div>
            <div>
               <h4 className='text-[16px] font-[600] text-[#1F1F1F] my-2 underlined'>Enrolled Courses</h4>
               {enrolledCourses?.length == 0 ? <h1 className='text-center text-xl font-bold'>No enrolled courses !!</h1>:
               <Carousel responsive={responsive} 
                  swipeable={true}
                  draggable={true}
                  ssr={true} // means to render carousel on server-side.
                  infinite={true}
                  autoPlay={true}
                  autoPlaySpeed={10000}
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  keyBoardControl={true}
                  containerClass="carousel-container py-1"
                  dotListClass="custom-dot-list-style"
                 >
       
               {enrolledCourses?.map((course)=> <CourseCardStudent key={course._id} courseId={course._id} enrolled courseName={course.name} courseDescription={course.description} image={course.filename} action={()=> router.push({
                pathname: `/student/course/${course._id}`,
                state: {
                    courseId: course._id,
                }
              })}/>)}
                </Carousel>
}
            </div>
            <div>
               <h4 className='text-[16px] text-[#1F1F1F] my-2'>Become truly accomplished by learning our financial education training and the financial art of catching the best opportunities in the stock market.</h4>
               {nonEnrolledCourses?.length == 0 ? <h1 className='text-center text-xl font-bold'>No courses For now !!</h1>:
               <div  className=" py-5 grid lg:grid-cols-3 gap-6 gap-y-10 ms:grid-cols-1 md:grid-cols-2">
                {nonEnrolledCourses?.map((course)=> <CourseCardStudent key={course._id} courseId={course._id}  courseName={course.name} courseDescription={course.description} requested={course.requested} image={course.filename} action={() => handleEnrollRequest(course._id)}/>)}
        
               </div>
                }
            </div>
        </IndexPage>
    </div>
  )
}

export default List