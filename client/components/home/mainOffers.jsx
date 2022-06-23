import React from 'react'
import OfferCard from './offerCard'

const MainOffers = () => {
  return (
    <div className='mt-[206.7px]'>
        <h6 className='text-[#079C49]'>WHAT WE GIVE</h6>
        <div className="grid grid-cols-5 gap-[41.62px]">
            <div className="offers__desc">
                <h1 className='text-[#141E32] text-[41.62px] font-bold leading-[50.74px] mt-[16.54px]'>What do You <br></br> Get From Us</h1>
                <h6 className='text-[#969696] text-[18.73px] leading-[22.83px] mt-[39.52px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim, sem non convallis molestie.</h6>
            </div>
            <OfferCard title="Professional Teacher" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim, sem non convallis molestie." icon="person"/>
            <OfferCard title="Course Certificate" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim, sem non convallis molestie." icon="grad"/>
            <OfferCard title="interesting learning" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim, sem non convallis molestie." icon="troffy"/>
            <OfferCard title="120 Videos Course" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim, sem non convallis molestie." icon="video"/>
        </div>
    </div>
  )
}

export default MainOffers