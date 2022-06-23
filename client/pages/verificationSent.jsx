import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import Footer from '../components/layout/footer';

function VerificationSent() {
  const router = useRouter();
  return (
    <>
    
      <div className="container mx-auto pt-[33.32px]">
        <Image onClick={() => router.push("/")} className="cursor-pointer" src="/images/footer_logo.svg" width={60} height={60} />
        <div className="flex justify-between items-center">
          <div className='w-[45%]'>
            <h3 className='text-[#1F1F1F] font-[600] text-[36px]'>Verification link sent!</h3>
            <h6 className='text-[#1F1F1F] text-[24px] mt-[36px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</h6>
            <h6 className='text-[#666666] text-[24px] mt-[120px]'>
            Didn’t get a confirmation email?<br></br>
            Check your spam folder or <span className='text-[#079C49]'> Send again </span>
            </h6>
          </div>
          <div className='w-[45%]'>
            <Image src="/images/verification.svg" width={800} height={800} />
          </div>
        </div>
      </div>
     
    </>
  )
}

export default VerificationSent