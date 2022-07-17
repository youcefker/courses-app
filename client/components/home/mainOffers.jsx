import React from 'react'
import OfferCard from './offerCard'
import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';



const MainOffers = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);


  return (
    <div className='mt-[90px] xl:mt-[206.7px]'>
        <h6 className='text-[#079C49] lg:px-10'>WHAT WE GIVE</h6>
        <div className="offers__desc  lg:hidden mb-10">
                <h1 className='text-[#141E32] text-[35px] 2xl:text-[41.62px] font-bold leading-[50.74px] mt-[16.54px]'>What do You Get From Us</h1>

            </div>
        <div className="hidden lg:px-10 md:grid  sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-x-12 gap-y-4  md:gap-[1.25%]">
            <div className="offers__desc hidden lg:block">
                <h1 className='text-[#141E32] text-[25px] leading-[40px] xl:text-[35px] 2xl:text-[41.62px] font-bold 2xl:leading-[50.74px] mt-[16.54px]'>What do You <br></br> Get From Us</h1>
            </div>
            <OfferCard title="Professional Teaching" desc="Be mentored by skilled masters" icon="person"/>
            <OfferCard title="Explore our suite of financial education offering" desc="Gain the skills for wealthier investments.." icon="troffy"/>
            <OfferCard title="Video Courses" desc="Learn at your own space any time and any where." icon="video"/>
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
        <OfferCard title="Professional Teaching" desc="Be mentored by skilled masters" icon="person"/>
            <OfferCard title="Explore our suite of financial education offering" desc="Gain the skills for wealthier investments." icon="troffy"/>
            <OfferCard title="Video Courses" desc="Learn at your own space any time and any where." icon="video"/>
        
 
      </ReactSimplyCarousel>
       </div>
        
    </div>
  )
}

export default MainOffers