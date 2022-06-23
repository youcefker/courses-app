import { Button } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router';

export default function MainHeader() {
  const router = useRouter()
  return (
    <div className="home__header flex justify-between items-start">
      <div className='2xl:w-[150px] 2xl:h-[130px]' style={{position: "relative"}}>
      <Image src="/images/home__logo.svg" layout="fill"
       objectFit="cover"/>
      </div>
            
            <div className="flex">
              <Button className="muiBtn  sign text-[#079C49] border-2 border-[#079C49] w-[170px] 2xl:w-[209px] h-[45px] 2xl:h-[52px] text-[20px] 2xl:text-[24px] rounded-[20px] font-[600] mr-6" onClick={()=> router.push("/login")}>Sign in</Button>
              <Button className='muiBtn register text-[#079C49] border-2 border-[#079C49] w-[170px] 2xl:w-[209px] h-[45px] 2xl:h-[52px] text-[20px] 2xl:text-[24px] rounded-[20px] font-[600] ' onClick={() => router.push("/signup")}>Register</Button>
            </div>
        
    </div>
  )
}
