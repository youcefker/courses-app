import Image from 'next/image'
import React from 'react'

const OfferCard = (props) => {
  return (
    <div className='offer__card bg-[#079C49] rounded-[10.4061px] flex flex-col justify-center px-[16.65px] cursor-pointer '>
        <div className='offer__circle bg-white w-[49.95px] h-[49.95px] rounded-full flex justify-center items-center'>
            <Image src={"/icons/"+ props.icon+".svg"} width={25} height={25} />
        </div>
        <div>
            <h3 className='text-white font-bold text-[18.73px] mt-[8.32px]'>{props.title}</h3>
            <h6 className='text-[#DDDDDD] text-[14.57px] '>{props.desc}</h6>
        </div>
    </div>
  )
}

export default OfferCard