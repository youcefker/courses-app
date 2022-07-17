import React from 'react'
import MainCourseCard from './mainCourseCard';
import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';

function MainCourses() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  return (
    
    <div className='mainCourses mt-[100px] md:mt-[141.9px] '>
        <h1 className='text-[30px]  sm:text-[50px] md:text-[72px] font-bold text-[#079C49] text-center'>Our courses</h1>
        <h6 className='text-[18px] sm:text-[20px] md:text-[28px] text-[#1F1F1F] text-center'>Let’s learn something new</h6>
        <div className="hidden md:flex flex-col md:flex-row justify-around mt-[30px] md:mt-[75px]">
            <MainCourseCard title = "Investissement en bourse"/>
            <MainCourseCard  title = "الاستثمار في البورصة"/>
            <MainCourseCard title="Pack assisté Investissement en bourse Coaching one-to-one" />
        </div>
        <div className='mt-6  md:hidden'>
        
        <ReactSimplyCarousel
       activeSlideIndex={activeSlideIndex}
       onRequestChange={setActiveSlideIndex}
       itemsToShow={1}
       itemsToScroll={1}
     
       responsiveProps={[
         {
           itemsToShow: 1,
           itemsToScroll: 1,
         
          
         },
       ]}
       infinite
       speed={500}
       autoplay
       delay={1000}
       easing="linear"
       dotsNav={{
         show: true,
         itemBtnProps: {
           style: {
             height: 6,
             width: 6,
             borderRadius: "50%",
             border: "1px solid #079C49",
             marginTop: "20px",
             marginRight: "3px"
           }
         },
         activeItemBtnProps: {
           style: {
             height: 8,
             width: 8,
             borderRadius: "50%",
             marginTop: "19px",
             border: 0,
             background: "#079C49",
             marginRight: "3px"
           }
         }
       }}
     >
       {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}

       <MainCourseCard title = "Investissement en bourse"/>
            <MainCourseCard  title = "الاستثمار في البورصة"/>
            <MainCourseCard title="Pack assisté Investissement en bourse Coaching one-to-one" />

     </ReactSimplyCarousel>
      </div>
    </div>
  )
}

export default MainCourses;