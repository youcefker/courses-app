import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'
import ImgDisplayer from '../../components/shared/imgDisplayer'
import { faEye, faEyeSlash, faL } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@mui/material'
import Footer from '../../components/layout/footer'
import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'
import { useFormik } from "formik";
import * as yup from "yup";
import decode from 'jwt-decode'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import toast, { Toaster } from 'react-hot-toast';




const validationSchema = yup.object({
    password: yup
    .string("Enter your password")
    .min(8, "Password is too short - should be 8 chars minimum")
    .required("Password is required"),


});

function NewPass() {
  const  router = useRouter() 
  const [hide, setHide] = useState(true)

  const [sent, setSent] = useState(false)
  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')

  const [token, setToken] = useState('')



  const handleResetPassword = async () => {
    const data = {
      token: router.query.newPass,
      password: formik.values.password
    }
    try {
      const response = await axios.put("http://localhost:4000/api/v1/auth/reset", data)
      console.log(response)
      setSent(true)
    } catch(err){
      console.log(err)
      toast.error('Wrong email or password !');
    }
  }

  const handleHide = ()=> setHide(!hide)


  const handleUsername = (e)=> setUsername(e.target.value)
  const handlePassword = (e)=> setPassword(e.target.value)

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      handleResetPassword()
   
    },
  });

  return (
    <>
    <Toaster />
      <div className="container px-4 mx-auto pt-4 md:pt-[33.32px] mb-[100px] sm:mb-[230px]">
        <Image onClick={() => router.push("/")} className="cursor-pointer" src="/images/footer_logo.svg" width={60} height={60} />
        <div className="flex justify-between items-center  md:mt-[54px]">
            <div className='w-full md:w-[55%] lg:w-[50%] xl:w-[40%]'>
                <div className="login__box md:border-2 border-[#66666640] rounded-[16px] p-1 md:p-[32px]  ">
                    <div className="flex flex-col items-center">
                      <div className='bg-[#079C49] rounded-full  w-[50px] h-[50px]'></div>
                     <h5 className='text-[#333333] text-[28px] mt-5'>New password</h5>
                    </div>
                    {!sent && (
                    <div className="login_inputs mt-5 sm:mt-[35px]">
                      <form onSubmit={formik.handleSubmit}>
                  
                      <div className='flex flex-col mt-4 sm:mt-[30px]'>
                          <label htmlFor="password" className="text-[#666666] text-[13px] sm:text-[16px] font-[400] mb-2 flex justify-between">
                            <span>Please enter a new password</span>
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
                     
                       
                        <button type='submit'  disableRipple={formik.values.password === ''} className={(formik.values.password !== '') ? 'muiBt loginBtn bg-[#079C49] w-full mt-[30px] rounded-[32px] text-[#fff] h-[60px] text-[20px] hover:bg-[#078C49] normal-case' : 'muiBt loginBtn bg-[#111111] w-full mt-[30px] rounded-[32px] text-[#fff] h-[64px] text-[22px] opacity-[0.25] hover:bg-[#111111] normal-case '}>Change password</button>
                      </form>
                     
                    
                    </div>)}
                    {sent && (<div>
                         <div className='flex items-center justify-center mt-5'>
                            <h5 className='text-[#333333] text-[35px] mr-3'>Password changed</h5><CheckCircleIcon sx={{color: "#079C49", fontSize: "45px"}} />
                         </div>
                         <h6 className='text-center text-[gray] text-[20px]'>Please go to <span onClick={()=> router.push("/login")} className='font-bold text-[#079C49] cursor-pointer'> log in </span> now</h6>
                    </div>)}
                   
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

export default NewPass