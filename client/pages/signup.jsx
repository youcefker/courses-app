import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'
import ImgDisplayer from '../components/shared/imgDisplayer'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, MenuItem, Select } from '@mui/material'
import Footer from '../components/layout/footer'
import { useRouter } from 'next/router'
import { useState } from 'react'
import  axios  from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';





const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Email not valide")
    .required("Email is required"),
  name: yup
    .string("Enter your name")
    .min(3)
    .required("Name is required"),

  password: yup
    .string("Enter your password")
    .min(8, "Password is too short - should be 8 chars minimum")
    .required("Password is required"),

    choosed: yup
    .string("choose a course")
    .required("Course is required"),

});

function Signup() {
  const  router = useRouter() 
  const [hide, setHide] = useState(true)

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')
  const [cours, setCours] = React.useState([])

  const [choosed, setChoosed] = useState('')
  // const handleSignup = () => {
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email: email, password: password })
  //   };
  //   axios.post("http://localhost:4000/api/v1/auth/signup", requestOptions)
  //     .then(response => response.json()).catch((err) => {console.log(err);})
  // };
  
  const handleSignup =() => {
 
    const userObject = {
          email: formik.values.email,
          password : formik.values.password,
          name : formik.values.name,
          course_name : formik.values.choosed
      };
      
      axios.post('http://localhost:4000/api/v1/auth/signup', userObject)
          .then((res) => {
              console.log(res.data)
               toast.success(res.data.message);
       
                router.push({
                  pathname :"/verificationSent",
                  query : {email : formik.values.email}
  
               })
              
             
          }).catch((error) => {
              console.log(error)
              toast.error('Name or email already exist !');
          });
  
  
  }

  const handleChange = (event) => {
    setChoosed(event.target.value);
  };

  const handleHide = ()=> setHide(!hide)


  const handleEmail = (e)=> setEmail(e.target.value)
  const handlePassword = (e)=> setPassword(e.target.value)

  const privacy = <h6 className='text-[#333333] text-[16px]'>Agree to our <span className='underline'> Terms of use</span> and <span className='underline'> Privacy Policy </span></h6>

  const subscribe = <h6 className='text-[#333333] text-[16px]'>Subscribe to our monthly newsletter</h6>




  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password : "",
      choosed: ""
    
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      handleSignup()
   
    },
  });
  const fetchCoursesNames = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/course/names")
      console.log(response.data)
      setCours(response.data.data)
    } catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    fetchCoursesNames()
  }, [])
  console.log("cours----", cours)
  return (
    <>
    <Toaster />
      <div className="container mx-auto pt-[33.32px] mb-[230px]">
        <Image onClick={() => router.push("/")} className="cursor-pointer" src="/images/footer_logo.svg" width={60} height={60} />
        <div className="flex justify-between items-center mt-[54px]">
            <div className='w-full md:w-[55%] lg:w-[50%] xl:w-[40%] px-4 sm:px-0'>
                <h5 className='text-[#333333] text-[32px]'>Sign up</h5>
                <h6 className='text-[#666666CC] text-[16px] font-[400]'>Sign up for free to access to in any of our products </h6>
                <div className="sign_inputs mt-[53px]">
                  <form onSubmit={formik.handleSubmit}>
                       <div className='flex flex-col'>
                          <label htmlFor="email" className="text-[#666666] text-[16px] font-[400] mb-2">Email address</label>
                          <input type="email" className='input border-2 border-[#66666640] h-[55px] rounded-xl outline-none px-3 text-[20px]' placeholder='Email' id='email' name='email' 
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          />
                         {formik.touched.email && formik.errors.email ? (
                             <div className='text-[red] text-[14px] ml-2'>{formik.errors.email}</div>
                           ) : null}
                        </div>

                        <div className='flex flex-col mt-[30px]'>
                          <label htmlFor="name" className="text-[#666666] text-[16px] font-[400] mb-2">Name</label>
                          <input type="text" className='input border-2 border-[#66666640] h-[55px] rounded-xl outline-none px-3 text-[20px]' placeholder='Name' id='name' name='name' 
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          />
                         {formik.touched.name && formik.errors.name ? (
                             <div className='text-[red] text-[14px] ml-2'>{formik.errors.name}</div>
                           ) : null}
                        </div>
                
                        <div className='flex flex-col mt-[30px]'>
                                  <label htmlFor="password" className="text-[#666666] text-[16px] font-[400] mb-2 flex justify-between">
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
                                  <input type={hide ? "password": "text"} className='input border-2 border-[#66666640] h-[55px] rounded-xl outline-none px-3 text-[20px]' placeholder='password'  value={formik.values.password}
                                     onChange={formik.handleChange}
                                     id='password'
                                     name='password' 
                                   />   
                                   {formik.touched.password && formik.errors.password ? (
                                       <div className='text-[red] text-[14px] ml-2'>{formik.errors.password}</div>
                                     ) : null}  
                        </div>
                        <div className='flex flex-col mt-[30px]'>
                          <FormControl>
                            <label className="text-[#666666] text-[16px] font-[400] mb-2">Choose the cours</label>
                            <Select
                              name='choosed'
                              id='choosed'
                              value={formik.values.choosed}
                              onChange={formik.handleChange}
                              displayEmpty
                              
                              className="input  border-[#66666640] h-[55px] rounded-xl outline-none px-3 text-[20px]"
                            >
                              {cours?.map(course => <MenuItem value={course.name}>{course.name}</MenuItem>)}
                            </Select>
                            {formik.touched.choosed && formik.errors.choosed ? (
                                       <div className='text-[red] text-[14px] ml-2'>{formik.errors.choosed}</div>
                                     ) : null}  
                          </FormControl>
                        </div>
                        <div className='flex flex-col mt-[30px]'>
                         <FormGroup>
                             <FormControlLabel control={<Checkbox  style={{color:'#000'}} />} label={privacy} color='#000' />
                             <FormControlLabel control={<Checkbox  style={{color:'#000'}} />} label={subscribe} color='#000' />
                          </FormGroup>
                        </div>
                        <div className="mt-[30px]">
                        <ReCAPTCHA
                           sitekey="Your client site key"
                         />
                        </div>
                        <button type='submit' disableRipple={formik.values.email === '' || formik.values.password === ''} className={(formik.values.email !== '' && formik.values.password !== '') ? 'muiBt loginBtn bg-[#079C49] w-[50%] mt-[30px] rounded-[32px] text-[#fff] h-[64px] text-[22px] hover:bg-[#078C49] normal-case' : 'muiBt loginBtn bg-[#111111] w-[50%] mt-[30px] rounded-[32px] text-[#fff] h-[64px] text-[22px] opacity-[0.25] hover:bg-[#111111] normal-case '}>Sign up</button>
                        <h6 className='text-[#333333] text-[20px] font-[400] mt-[10px]' >Already have an account?   <span className='underline cursor-pointer' onClick={() => router.push("/login")}> Log in </span> </h6>
                    </form> 
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

export default Signup