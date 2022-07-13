import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import Footer from '../../components/layout/footer'
import axios from 'axios'
import { useEffect,useState } from 'react'

function VerificationPage() {

  const [err, setErr] = useState(true)


    const router = useRouter()
    const { pid } = router.query
    

    useEffect(() => {
     
     handleVerify()
    }, [pid])
    
  
    const handleVerify =() => {
  
       const tokenObj = {
          token : pid
       } 
        
        axios.put('http://localhost:4000/api/v1/auth/verify', tokenObj)
            .then((res) => {
                console.log(res.data)
                setErr(res.data.error)
               
         
            }).catch((error) => {
                console.log(error)
                
            });
    
    
    }

  return (
    <>
    {!err &&(
      <div className="lg:ml-[140px]">
     
      <div className="flex-col-reverse flex md:flex-row justify-between">
        <div className='mx-5 my-5 md:w-[40%] md:mt-[33.32px]'>
          <div className='hidden md:block'>
          <Image  onClick={() => router.push("/")} className="cursor-pointer" src="/images/footer_logo.svg" width={60} height={60} />
          </div>
      
          <h3 className='text-[#1F1F1F] font-[600] text-[25px] md:text-[36px] mt-5 md:mt-[152px]'>Verification account!</h3>
          <h6 className='text-[#1F1F1F] text-[16px] md:text-[24px] mt-2 md:mt-[36px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
            <span className='text-[#079C49] cursor-pointer font-bold text-[17px] md:text-[24px]' onClick={()=> router.push("/login")}> Go to Sign in </span>
          </h6>
          
          <h6 className='text-[#1F1F1F] font-bold md:text-[30px] mt-12 md:mt-[230px]'>Contact Us</h6>
          <h6 className='text-[#1F1F1F] md:text-[23px] font-[400]'>exemple2022@gmail.com</h6>
        </div>
        <div className='w-[100%] md:w-[50%] md:ml-auto md:h-[100vh]'>
          <Image src="/images/verif.png" width="100%" height="106vh" layout="responsive"  />
        </div>
      </div>
    </div>
    )}

    {(err && pid) &&( <h1>Error 404 not found</h1> )}
    
   

  </>
  )
}

export default VerificationPage