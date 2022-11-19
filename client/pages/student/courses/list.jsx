import React from 'react'
import { Toaster } from 'react-hot-toast'
import IndexPage from '../../../components/dashboard/indexPage'
import Sidebar from '../../../components/dashboard/sidebar'
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import CourseCardStudent from '../../../components/student/courseCardStudent';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from 'next/router';


const responsive = {
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
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
function List() {

  const router = useRouter()
  return (
    <div>
        <Sidebar active="courses" />
        <Toaster />
        <IndexPage>
            <div className='flex justify-between items-center'>
                <div className='flex items-center border-[1px] border-[#9DA6BACC] p-2 rounded-[10px] mt-3 text-[#9DA6BA] bg-white h-12 w-1/4'>
                    <SearchIcon />
                    <input type="search" className='w-full outline-none pl-2 text-[#000]' placeholder='Search ...' />
                </div>
                <div  className='hidden sm:block border-2 border-[#079C49] rounded-full w-[50px] h-[50px] overflow-hidden cursor-pointer' style={{position: "relative"}} onClick={() => router.push("/profile")}>
                    <Image src="/images/main1.png"  layout="fill"
                     objectFit="cover"/>
                </div>
            </div>
            <div>
               <h4 className='text-[25px] font-[600] text-[#1F1F1F] my-5'>Enrolled Courses</h4>
               <Carousel responsive={responsive} 
                  swipeable={false}
                  draggable={false}
                  ssr={true} // means to render carousel on server-side.
                  infinite={true}
                  autoPlaySpeed={1000}
                  keyBoardControl={true}
                  transitionDuration={500}
                  containerClass="carousel-container py-1"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  dotListClass="custom-dot-list-style"
                 >
                <CourseCardStudent />
                <CourseCardStudent />
                <CourseCardStudent />
                <CourseCardStudent />
                <CourseCardStudent />
                <CourseCardStudent />
                </Carousel>
            </div>
            <div>
               <h4 className='text-[23px] font-[600] text-[#1F1F1F] mt-5'>The world largest selection of courses</h4>
               <h4 className='text-[16px] text-[#1F1F1F] my-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been</h4>
               <div  className=" py-5 grid grid-cols-4 gap-6 gap-y-10">
               <CourseCardStudent />
                <CourseCardStudent />
                <CourseCardStudent />
                <CourseCardStudent />
                <CourseCardStudent />
                <CourseCardStudent />
               </div>
            </div>
        </IndexPage>
    </div>
  )
}

export default List