import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'
import ImgDisplayer from '../components/shared/imgDisplayer'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@mui/material'
import Footer from '../components/layout/footer'
import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'
import { useFormik } from "formik";
import * as yup from "yup";
import decode from 'jwt-decode'

import toast, { Toaster } from 'react-hot-toast';




const validationSchema = yup.object({
  username: yup
    .string("Enter your email")
    .email("Email not valide")
    .required("Email is required"),

  password: yup
    .string("Enter your password")
    .min(8, "Password is too short - should be 8 chars minimum")
    .required("Password is required"),

});

function Login() {
  const  router = useRouter() 
  const [hide, setHide] = useState(true)

  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')

  const [token, setToken] = useState('')



  const handleLogin = async () => {
    console.log("login")
    const userObject = {
          email: formik.values.username,
          password : formik.values.password
      };
      try {
        const response = await axios.post('http://localhost:4000/api/v1/auth/signin', userObject)
        console.log(response.data)
        await toast.success(response.data.message);
          if (!response.data.error){
        
            await localStorage.setItem("role","student")
            await localStorage.setItem("jwt", response.data.access_token)
            await localStorage.setItem("email", response.data.data.email)
            await localStorage.setItem("name", response.data.data.student.name)
            await localStorage.setItem("student_id", response.data.data.student._id)
            router.push({
              pathname :"/profile",
            })
          }
      } catch(err) {
        console.log(err)
        toast.error(err.response.data.message);

      }
  }

  const handleHide = ()=> setHide(!hide)


  const handleUsername = (e)=> setUsername(e.target.value)
  const handlePassword = (e)=> setPassword(e.target.value)

  const formik = useFormik({
    initialValues: {
      username: "",
      password : ""
    
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      handleLogin()
   
    },
  });

  return (
    <>
    <Toaster />
      <div className="container px-4 mx-auto pt-4 md:pt-[33.32px] mb-[100px] sm:mb-[230px]">
        <Image onClick={() => router.push("/")} className="cursor-pointer" src="/images/footer_logo.svg" width={60} height={60} />
        <div className="flex justify-between items-center  md:mt-[54px]">
            <div className='w-full md:w-[55%] lg:w-[50%] xl:w-[40%]'>
                <div className="login__box md:border-2 border-[#66666640] rounded-[16px] p-1 md:p-[32px] ">
                    <div className="flex flex-col items-center">
                      <div className='bg-[#079C49] rounded-full  w-[50px] h-[50px]'></div>
                      <h5 className='text-[#333333] text-[32px]'>Log in</h5>
                    </div>
                    <div className="login_inputs mt-5 sm:mt-[35px]">
                      <form onSubmit={formik.handleSubmit}>
                        <div className='flex flex-col'>
                          <label htmlFor="username" className="text-[#666666] text-[13px] sm:text-[16px] font-[400] mb-2">Phone number, user name, or email address</label>
                          <input type="text" className='input border-2 border-[#66666640] h-[45px] sm:h-[64px] rounded-lg sm:rounded-xl outline-none px-3 sm:text-[20px]' placeholder='username' id='username' name='username' 
                           value={formik.values.username}
                           onChange={formik.handleChange}
                           />
                          {formik.touched.username && formik.errors.username ? (
                              <div className='text-[red] text-[13px] ml-2'>{formik.errors.username}</div>
                            ) : null}
                        </div>
                        <div className='flex flex-col mt-4 sm:mt-[30px]'>
                          <label htmlFor="password" className="text-[#666666] text-[13px] sm:text-[16px] font-[400] mb-2 flex justify-between">
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
                          <input type={hide ? "password": "text"} className='input border-2 border-[#66666640] h-[45px] sm:h-[64px] rounded-lg sm:rounded-xl outline-none px-3 text-[20px]' placeholder='password' 
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            id='password'
                            name='password' 
                          />   
                          {formik.touched.password && formik.errors.password ? (
                              <div className='text-[red] text-[13px] ml-2'>{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <button type='submit'  disableRipple={formik.values.username === '' || formik.values.password === ''} className={(formik.values.username !== '' && formik.values.password !== '') ? 'muiBt loginBtn bg-[#079C49] w-full mt-[30px] rounded-[32px] text-[#fff] h-[60px] text-[20px] hover:bg-[#078C49] normal-case' : 'muiBt loginBtn bg-[#111111] w-full mt-[30px] rounded-[32px] text-[#fff] h-[64px] text-[22px] opacity-[0.25] hover:bg-[#111111] normal-case '}>Log in</button>
                      </form>
                        <div className="flex justify-between mt-4 sm:mt-[35px] items-center">
                            <div className='h-[1px] sm:h-[2px] w-[40%] bg-[#66666640]'></div>
                            <span className='text-[#666666]  sm:text-[24px] font-[400]'>OR</span>
                            <div className='h-[1px] sm:h-[2px] w-[40%] bg-[#66666640]'></div>
                        </div>
                        <button className='flex justify-center items-center w-full mt-4 sm:mt-[30px] rounded-[32px]  h-[60px] text-[18px] normal-case  border-3 googleBtn'>
                            <Image src="/icons/google.svg" width={25} height={25}/>
                            <span className='text-[#333333] font-[400] ml-[16px]'>Continue with Google</span>
                        </button>
                        <h6 onClick={()=> router.push("/forget/forgetPass")} className='mt-[35px] text-center underline cursor-pointer'>Forget your password?</h6>
                    </div>
                   
                </div>
                <div className='md:border-2 border-[#66666640] rounded-[16px] mt-5 sm:mt-[32px] sm:p-[32px]'>
                    <h6 className='text-[#333333] text-[20px] font-[400] text-center'>Don’t have an account? <span className='underline cursor-pointer' onClick={() => router.push("/signup")}> Sign up </span> </h6>
                </div>
            </div>
            <div className='hidden md:block md:w-[35%] lg:w-[40%]'>
             <ImgDisplayer login/>
            </div>
         
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login