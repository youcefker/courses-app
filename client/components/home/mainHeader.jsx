import { Button } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router';

export default function MainHeader() {
  const router = useRouter()
  return (
    <div className="home__header flex justify-between items-start">
            <Image src="/images/home__logo.svg" width={153} height={131.4}/>
            <div className="flex">
              <Button className='muiBtn sign mr-2' onClick={()=> router.push("/login")}>Sign in</Button>
              <Button className='muiBtn register' onClick={() => router.push("/signup")}>Register</Button>
            </div>
        
    </div>
  )
}
