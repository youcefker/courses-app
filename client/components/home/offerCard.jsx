import Image from 'next/image'
import React from 'react'

const OfferCard = (props) => {
  return (
    <div className='offer__card bg-[#079C49] rounded-[10.4061px] flex flex-col  px-[16.65px] cursor-pointer pt-[20px] pb-[20px] xl:pt-[40px] sm:pb-[40px] w-[320px]   sm:mx-0  md:w-[unset]'>
        <div className='offer__circle bg-white w-[49.95px] h-[49.95px] rounded-full flex justify-center items-center'>
            <Image src={"/icons/"+ props.icon+".svg"} width={25} height={25} />
        </div>
        <div>
            <h3 className='text-white font-bold text-[24px] sm:text-[20px] md:text-[9px] lg:text-[12px] xl:text-[16px] 2xl:text-[18.73px] mt-[8.32px] '>{props.title}</h3>
            <h6 className='text-[#DDDDDD] text-[20px] sm:text-[18px] md:text-[7px] lg:text-[10px] xl:text-[12px] mt-4'>{props.desc}</h6>
        </div>
    </div>
  )
}

export default OfferCard