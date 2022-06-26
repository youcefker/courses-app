import Image from 'next/image'
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

  import { faFacebookF, faInstagram, faLinkedin, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons' 
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

function Footer() {
  const router = useRouter()
  return (
    <div className='bg-[#393E46] pt-[20px] md:pt-[66px] flex flex-col lg:flex-row justify-between lg:items-center px-12 md:px-[140px] pb-[30px]  md:pb-[70px]'>
        <div className='lg:w-[60%]'>
          <div className='w-[90px] h-[90px] cursor-pointer hidden md:block' style={{position: "relative"}}>
            <Image src="/images/footer_logo.svg" onClick={() => router.push("/")}  layout="fill"
             objectFit="cover"/>
          </div>
           
          <div className='w-[30px] h-[30px] cursor-pointer  md:hidden' style={{position: "relative"}}>
            <Image src="/images/footer_logo.svg" onClick={() => router.push("/")}  layout="fill"
             objectFit="cover"/>
          </div>
            <div className='md:hidden  mt-4 '>
               <h5 className='text-[20px] font-[700] text-[#fff]'>Contact Us</h5>
               <h6 className='text-[#fff] text-[15px] font-[400] mt-[15px]'>exemple2022@gmail.com</h6>
            </div>
            <h6 className='text-[#F4F4F4] text-[24px] mt-[40px] hidden md:block'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mollis, justo nec porttitor auctor, erat sapien faucibus lectus, vel tempor dolor augue et lectus. </h6>
            <div className="social flex justify-center md:justify-start mt-[30px]">
              <button className='w-[45px] mr-6 text-[#fff] border-2 border-[#fff]  py-1 text-[22px] hover:text-[#079C49] hover:border-[#079C49]'><FontAwesomeIcon icon={faFacebookF} /></button>
              <button className='w-[45px] mr-6 text-[#fff] border-2 border-[#fff]  py-1 text-[22px] hover:text-[#079C49] hover:border-[#079C49]'><FontAwesomeIcon icon={faTwitter} /></button>
              <button className='w-[45px] mr-6 text-[#fff] border-2 border-[#fff]  py-1 text-[22px] hover:text-[#079C49] hover:border-[#079C49]'><FontAwesomeIcon icon={faLinkedinIn} /></button>
              <button className='w-[45px] text-[#fff] border-2 border-[#fff]  py-1 text-[22px] hover:text-[#079C49] hover:border-[#079C49]'><FontAwesomeIcon icon={faInstagram} /></button>
     
            </div>
        </div>
        <div className='hidden md:block mt-12 lg:mt-0'>
            <h5 className='text-[30px] font-[700] text-[#fff]'>Contact Us</h5>
            <h6 className='text-[#fff] text-[23px] font-[400] mt-[30px]'>exemple2022@gmail.com</h6>
        </div>
    </div>
  )
}

export default Footer