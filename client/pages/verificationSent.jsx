import Image from 'next/image'
import { useRouter, withRouter } from 'next/router'
import React from 'react'
import Footer from '../components/layout/footer';
import axios from 'axios';
import { Alert } from '@mui/material';

function VerificationSent() {
  const router = useRouter();

  const email = router.query.email



  const handleResend =() => {
 
    const userObject = {
          email: email,
     
      };
      
      axios.post('http://localhost:4000/api/v1/auth/resend', userObject)
          .then((res) => {
              console.log(res.data)
              alert("Email resent")
           
             
          }).catch((error) => {
              console.log(error)
          });
  
  
  }
  return (
    <>

    
      <div className="container mx-auto px-2 md:px-0 pt-[33.32px]">
        <Image onClick={() => router.push("/")} className="cursor-pointer" src="/images/footer_logo.svg" width={60} height={60} />
        <div className="flex flex-col-reverse md:flex-row justify-between items-center">
          <div className='w-[90%] md:w-[45%]'>
            <h3 className='text-[#1F1F1F] font-[600] text-[25px] md:text-[36px]'>Verification link sent!</h3>
            <h6 className='text-[#1F1F1F] text-[20px] md:text-[24px] mt-5 md:mt-[36px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</h6>
            <h6 className='text-[#666666] text-[18px] md:text-[24px] mt-10 md:mt-[120px]'>
            Didn’t get a confirmation email?<br></br>
            Check your spam folder or <span className='text-[#079C49] cursor-pointer' onClick={handleResend}> Send again </span>
            </h6>
          </div>
          <div className='w-[60%] md:w-[45%] mt-5 mb-10 md:mb-0 md:mt-0'>
            <Image src="/images/verification.svg" width={800} height={800} />
          </div>
        </div>
      </div>
     
    </>
  )
}

export default withRouter( VerificationSent)