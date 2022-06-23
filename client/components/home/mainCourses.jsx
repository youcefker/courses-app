import React from 'react'
import MainCourseCard from './mainCourseCard';

function MainCourses() {
  return (
    <div className='mainCourses mt-[141.9px]'>
        <h1 className='text-[72px] font-bold text-[#079C49] text-center'>Our courses</h1>
        <h6 className='text-[28px] text-[#1F1F1F] text-center'>Let’s learn something new</h6>
        <div className="flex justify-around mt-[75px]">
            <MainCourseCard />
            <MainCourseCard />
            <MainCourseCard />
        </div>
    </div>
  )
}

export default MainCourses;