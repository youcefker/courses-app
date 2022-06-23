import Image from 'next/image'
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

  import { faFacebookF, faInstagram, faLinkedin, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons' 
import { Button } from '@mui/material';

function Footer() {
  return (
    <div className='bg-[#393E46] pt-[66px] flex justify-between items-center px-[140px]  pb-[70px]'>
        <div className='w-[50%]'>
            <Image src="/images/footer_logo.svg" onClick={() => router.push("/")} className="cursor-pointer" width={90} height={90}/>
            <h6 className='text-[#F4F4F4] text-[24px] mt-[40px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mollis, justo nec porttitor auctor, erat sapien faucibus lectus, vel tempor dolor augue et lectus. </h6>
            <div className="social flex mt-[30px]">
              <button className='w-[45px] mr-6 text-[#fff] border-2 border-[#fff]  py-1 text-[22px] hover:text-[#079C49] hover:border-[#079C49]'><FontAwesomeIcon icon={faFacebookF} /></button>
              <button className='w-[45px] mr-6 text-[#fff] border-2 border-[#fff]  py-1 text-[22px] hover:text-[#079C49] hover:border-[#079C49]'><FontAwesomeIcon icon={faTwitter} /></button>
              <button className='w-[45px] mr-6 text-[#fff] border-2 border-[#fff]  py-1 text-[22px] hover:text-[#079C49] hover:border-[#079C49]'><FontAwesomeIcon icon={faLinkedinIn} /></button>
              <button className='w-[45px] text-[#fff] border-2 border-[#fff]  py-1 text-[22px] hover:text-[#079C49] hover:border-[#079C49]'><FontAwesomeIcon icon={faInstagram} /></button>
     
            </div>
        </div>
        <div>
            <h5 className='text-[30px] font-[700] text-[#fff]'>Contact Us</h5>
            <h6 className='text-[#fff] text-[23px] font-[400] mt-[30px]'>exemple2022@gmail.com</h6>
        </div>
    </div>
  )
}

export default Footer