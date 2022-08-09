import { Button, Collapse, Divider } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Transition } from "@headlessui/react";
import MenuIcon from '@mui/icons-material/Menu';

export default function MainHeader(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [storageData, setStorageData] = useState(null)
  const [fetched, setFetched] = useState(false)
  
  const fetchStorageData = () => {
      const jwt = localStorage.getItem("jwt")
      const email = localStorage.getItem("email")
      const name =  localStorage.getItem("name")
      const data = jwt && email && name ? {jwt, name, email} : null
      return data
  } 
  useEffect(() => {
    const auth = fetchStorageData()
    console.log(auth)
    if(auth){
      setStorageData(auth)
      setFetched(true)
    } else {
      setFetched(true)
    }
  }, [])
  const router = useRouter()
  return (
    <>
    <div className="home__header hidden md:flex justify-between items-start">
      <div className='w-[120px] h-[100px] 2xl:w-[150px] 2xl:h-[130px]' style={{position: "relative"}}>
      <Image src="/images/home__logo.svg" layout="fill"
       objectFit="cover"/>
      </div>
            {fetched ? 
              !storageData ? 
                <div className="flex">
                  <button className="muiBtn  sign text-[#079C49] border-2 border-[#079C49] w-[170px] 2xl:w-[209px] h-[45px] 2xl:h-[52px] text-[20px] 2xl:text-[24px] rounded-[20px] font-[600] mr-6" onClick={()=> router.push("/login")}>Sign in</button>
                  <button className='muiBtn register text-[#079C49] border-2 border-[#079C49] w-[170px] 2xl:w-[209px] h-[45px] 2xl:h-[52px] text-[20px] 2xl:text-[24px] rounded-[20px] font-[600] ' onClick={() => router.push("/signup")}>Register</button>
                </div>
                :
                <div className="flex">
                  <button className="muiBtn  sign text-[#079C49] border-2 border-[#079C49] w-[170px] 2xl:w-[209px] h-[45px] 2xl:h-[52px] text-[20px] 2xl:text-[24px] rounded-[20px] font-[600] mr-6" onClick={()=> router.push({pathname: "/dashboard"})}>Account</button>
                </div>
              : null
          }
        
    </div>
{/* 
    <div className="md:hidden mb-8 flex justify-between">
          <div className='w-[62px] h-[62px] cursor-pointer ' style={{position: "relative"}}>
            <Image src="/images/footer_logo.svg" onClick={() => router.push("/")}  layout="fill"
             objectFit="cover"/>
          </div>
    </div> */}


<div className="md:hidden mb-8 flex justify-between">
<div className='w-[62px] h-[62px] cursor-pointer ' style={{position: "relative"}}>
            <Image src="/images/footer_logo.svg" onClick={() => router.push("/")}  layout="fill"
             objectFit="cover"/>
          </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className=" inline-flex items-center justify-center p-2 rounded-md    focus:outline-none  focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
           
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
            
            <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div className="flex flex-col items-center mb-12">
              <button className="muiBtn  sign  text-[#079C49] border-2 border-[#079C49] w-[170px] 2xl:w-[209px] h-[45px] 2xl:h-[52px] text-[20px] 2xl:text-[24px] rounded-[20px] font-[600] mb-3" onClick={()=> router.push("/login")}>Sign in</button>
              <button className='muiBtn register text-[#079C49] border-2 border-[#079C49] w-[170px] 2xl:w-[209px] h-[45px] 2xl:h-[52px] text-[20px] 2xl:text-[24px] rounded-[20px] font-[600] ' onClick={() => router.push("/signup")}>Register</button>
            </div>
            </div>
          )}
        </Transition>
        
        
  </>
  )
}
