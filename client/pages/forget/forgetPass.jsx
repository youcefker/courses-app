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




const validationSchema = yup.object({
  username: yup
    .string("Enter your email")
    .email("Email not valide")
    .required("Email is required"),


});

function Forget() {
  const  router = useRouter() 
  const [hide, setHide] = useState(true)

  const [sent, setSent] = useState(false)
  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')

  const [token, setToken] = useState('')



  const handleSend = async () => {
    console.log("email forget")
    setSent(true)
  }

  const handleHide = ()=> setHide(!hide)


  const handleUsername = (e)=> setUsername(e.target.value)
  const handlePassword = (e)=> setPassword(e.target.value)

  const formik = useFormik({
    initialValues: {
      username: "",

    
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      handleSend()
   
    },
  });

  return (
    <>
      <div className="container px-4 mx-auto pt-4 md:pt-[33.32px] mb-[100px] sm:mb-[230px]">
        <Image onClick={() => router.push("/")} className="cursor-pointer" src="/images/footer_logo.svg" width={60} height={60} />
        <div className="flex justify-between items-center  md:mt-[54px]">
            <div className='w-full md:w-[55%] lg:w-[50%] xl:w-[40%]'>
                <div className="login__box md:border-2 border-[#66666640] rounded-[16px] p-1 md:p-[32px]  ">
                    <div className="flex flex-col items-center">
                      <div className='bg-[#079C49] rounded-full  w-[50px] h-[50px]'></div>
                     <h5 className='text-[#333333] text-[28px] mt-5'>Forgot your password ?</h5>
                    </div>
                    {!sent && (<div className="login_inputs mt-5 sm:mt-[35px]">
                      <form onSubmit={formik.handleSubmit}>
                        <div className='flex flex-col'>
                          <label htmlFor="username" className="text-[#666666] text-[13px] sm:text-[16px] font-[400] mb-2">Enter your email address</label>
                          <input type="text" className='input border-2 border-[#66666640] h-[45px] sm:h-[64px] rounded-lg sm:rounded-xl outline-none px-3 sm:text-[20px]' placeholder='Email' id='username' name='username' 
                           value={formik.values.username}
                           onChange={formik.handleChange}
                           />
                          {formik.touched.username && formik.errors.username ? (
                              <div className='text-[red] text-[13px] ml-2'>{formik.errors.username}</div>
                            ) : null}
                        </div>
                     
                       
                        <button type='submit'  disableRipple={formik.values.username === ''} className={(formik.values.username !== '') ? 'muiBt loginBtn bg-[#079C49] w-full mt-[30px] rounded-[32px] text-[#fff] h-[60px] text-[20px] hover:bg-[#078C49] normal-case' : 'muiBt loginBtn bg-[#111111] w-full mt-[30px] rounded-[32px] text-[#fff] h-[64px] text-[22px] opacity-[0.25] hover:bg-[#111111] normal-case '}>Send</button>
                      </form>
                     
                    
                    </div>)}
                    {sent && (<div>
                         <div className='flex items-center justify-center mt-5'>
                            <h5 className='text-[#333333] text-[35px] mr-3'>Email sent</h5><CheckCircleIcon sx={{color: "#079C49", fontSize: "45px"}} />
                         </div>
                         <h6 className='text-center text-[gray]'>Please verify your email inbox</h6>
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

export default Forget