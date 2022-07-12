import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useEffect } from 'react'
import IndexPage from '../components/dashboard/indexPage'
import Sidebar from '../components/dashboard/sidebar'
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'



const validationSchema = yup.object({
  name: yup
  .string("Enter your full name")
  .min(3, "Name is too short - should be 3 chars minimum")
  .required("Full name is required"),
  email: yup
    .string("Enter your email")
    .email("Email not valide")
    .required("Email is required"),

  password: yup
    .string("Enter your password")
    .min(8, "Password is too short - should be 8 chars minimum")
    .required("Password is required"),

});

function Profile() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const fetchStorageData = () => {
    const jwt = localStorage.getItem("jwt")
    const email = localStorage.getItem("email")
    const name =  localStorage.getItem("name")
    const student_id =  localStorage.getItem("student_id")
    console.log("student id ----", student_id)
    const data = jwt && email && name && student_id  ? {jwt, name, email, student_id} : null
    return data
}


useEffect(() => {
  const auth = fetchStorageData()
  if(!auth){
    router.replace('/login')
  } else {
    setName(auth.name)
    setEmail(auth.email)
  }
}, [])

  const [hide, setHide] = useState(true)

  const handleHide = ()=> setHide(!hide)

  const formik = useFormik({
    initialValues: {
      name: name,
      email: email,
      password : ""
    
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
       alert(JSON.stringify(values, null, 2));
    
   
    },
  });
  return (
    <>
      <Sidebar />
      <IndexPage>
        <div className="flex justify-center pt-4">
          <div className='bg-white border-2 border-[#079C49] rounded-[15px] w-[500px] px-16 pt-4 pb-20'>
            <div className="flex flex-col items-center">
               <h5 className='text-[#1F1F1F] text-[22px] font-[600]  text-center'>My profile</h5>
               <div className="relative">
                    <div  className='mt-8 border-2 border-[#079C49] rounded-full w-[100px] h-[100px] overflow-hidden cursor-pointer z-0' style={{position: "relative"}} >
                        <Image src="/images/main1.png" className='z-1' layout="fill"
                         objectFit="cover"/>
                       
                    </div>
                    <div className='absolute bottom-0 z-7 right-0 cursor-pointer'>
                         
                         <Image src="/icons/editImg.svg"  width={25} height={25}/>
                    </div>
               </div>
              
               <h5 className='text-[#1F1F1F] text-[16px] font-[600]  text-center mt-3'>Hamza Ahmed</h5>
            </div>
            <div className='mt-12'>
               <form onSubmit={formik.handleSubmit}>
                        <div className='flex flex-col'>
                          <label htmlFor="name" className="text-[#666666] text-[13px]  font-[400] mb-2">Full name</label>
                          <input type="text" className='input border-[1px] border-[#079C49] h-[45px]  rounded-lg outline-none px-3 w-full' placeholder='Full name' id='name' name='name' 
                           value={formik.values.name}
                           onChange={formik.handleChange}
                           />
                          {formik.touched.name && formik.errors.name ? (
                              <div className='text-[red] text-[13px] ml-2'>{formik.errors.name}</div>
                            ) : null}
                        </div>
                        <div className='flex flex-col mt-4'>
                          <label htmlFor="email" className="text-[#666666] text-[13px] font-[400] mb-2">Email address</label>
                          <input type="text" className='input border-[1px] border-[#079C49] h-[45px]  rounded-lg  outline-none px-3 ' placeholder='Mail address' id='email' name='email' 
                           value={formik.values.email}
                           onChange={formik.handleChange}
                           />
                          {formik.touched.email && formik.errors.email ? (
                              <div className='text-[red] text-[13px] ml-2'>{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className='flex flex-col mt-4'>
                          <label htmlFor="password" className="text-[#666666] text-[13px]  font-[400] mb-2 flex justify-between">
                            <span>Your password</span>
                            {!hide && (
                                 <span onClick={handleHide} className="cursor-pointer">
                                 <FontAwesomeIcon  className='mr-2' icon={faEyeSlash}/>
                                 <span>Hide</span>
                                 </span>
                            )}
                           
                            {hide && (
                                 <span onClick={handleHide} className="cursor-pointer">
                                 <FontAwesomeIcon  className='mr-2' icon={faEye}/>
                                 <span>Show</span>
                                 </span>
                            )}
                           
                          </label>
                          <input type={hide ? "password": "text"} className='input border-[1px] border-[#079C49] h-[45px]  rounded-lg  outline-none px-3 ' placeholder='password' 
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            id='password'
                            name='password' 
                          />   
                          {formik.touched.password && formik.errors.password ? (
                              <div className='text-[red] text-[13px] ml-2'>{formik.errors.password}</div>
                            ) : null}
                        </div>
                  
                      </form>
               </div>
  
             
          </div>
        </div> 
      </IndexPage> 
    </>
  )
}

export default Profile