import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import Footer from '../components/layout/footer'

function VerificationPage() {
    const router = useRouter()
  return (
    <>
    
    <div className="ml-[140px]">
     
      <div className="flex justify-between">
        <div className='w-[40%] mt-[33.32px]'>
          <Image onClick={() => router.push("/")} className="cursor-pointer" src="/images/footer_logo.svg" width={60} height={60} />
          <h3 className='text-[#1F1F1F] font-[600] text-[36px] mt-[152px]'>Verification account!</h3>
          <h6 className='text-[#1F1F1F] text-[24px] mt-[36px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</h6>
          <h6 className='text-[#1F1F1F] font-bold text-[30px] mt-[230px]'>Contact Us</h6>
          <h6 className='text-[#1F1F1F] text-[23px] font-[400]'>exemple2022@gmail.com</h6>
        </div>
        <div className='w-[50%]'  style={{ height: '100vh' ,marginLeft : "auto"}}>
          <Image src="/images/verif.png" width="100%" height="106vh" layout="responsive"  />
        </div>
      </div>
    </div>
   

  </>
  )
}

export default VerificationPage