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


function Signup() {
  const  router = useRouter() 
  const [hide, setHide] = useState(true)

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')
  const [cours, setCours] = React.useState('');


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
          email: email,
          password : password
      };
      
      axios.post('http://localhost:4000/api/v1/auth/signup', userObject)
          .then((res) => {
              console.log(res.data)
              router.push("/verificationSent")
          }).catch((error) => {
              console.log(error)
          });
  
  
  }

  const handleChange = (event) => {
    setCours(event.target.value);
  };

  const handleHide = ()=> setHide(!hide)


  const handleEmail = (e)=> setEmail(e.target.value)
  const handlePassword = (e)=> setPassword(e.target.value)

  const privacy = <h6 className='text-[#333333] text-[16px]'>Agree to our <span className='underline'> Terms of use</span> and <span className='underline'> Privacy Policy </span></h6>

  const subscribe = <h6 className='text-[#333333] text-[16px]'>Subscribe to our monthly newsletter</h6>

  return (
    <>
      <div className="container mx-auto pt-[33.32px] mb-[230px]">
        <Image onClick={() => router.push("/")} className="cursor-pointer" src="/images/footer_logo.svg" width={60} height={60} />
        <div className="flex justify-between items-center mt-[54px]">
            <div className='w-[35%]'>
                <h5 className='text-[#333333] text-[32px]'>Sign up</h5>
                <h6 className='text-[#666666CC] text-[16px] font-[400]'>Sign up for free to access to in any of our products </h6>
                <div className="sign_inputs mt-[53px]">
                       <div className='flex flex-col'>
                          <label htmlFor="email" className="text-[#666666] text-[16px] font-[400] mb-2">Email address</label>
                          <input type="email" className='input border-2 border-[#66666640] h-[64px] rounded-xl outline-none px-3 text-[20px]' placeholder='Email' id='email' name='email' value={email} onChange={handleEmail} />   
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
                                  <input type={hide ? "password": "text"} className='input border-2 border-[#66666640] h-[64px] rounded-xl outline-none px-3 text-[20px]' placeholder='password' value={password} onChange={handlePassword} id='username' name='username' />   
                        </div>
                        <div className='flex flex-col mt-[30px]'>
                          <FormControl>
                            <label className="text-[#666666] text-[16px] font-[400] mb-2">Choose the cours</label>
                            <Select
                              value={cours}
                              onChange={handleChange}
                              displayEmpty
                              
                              className="input  border-[#66666640] h-[64px] rounded-xl outline-none px-3 text-[20px]"
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={10}>Ten</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        
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
                        <Button onClick={handleSignup} disableRipple={email === '' || password === ''} className={(email !== '' && password !== '') ? 'muiBt loginBtn bg-[#079C49] w-[50%] mt-[30px] rounded-[32px] text-[#fff] h-[64px] text-[22px] hover:bg-[#078C49] normal-case' : 'muiBt loginBtn bg-[#111111] w-[50%] mt-[30px] rounded-[32px] text-[#fff] h-[64px] text-[22px] opacity-[0.25] hover:bg-[#111111] normal-case '}>Sign up</Button>
                        <h6 className='text-[#333333] text-[20px] font-[400] mt-[10px]' >Already have an ccount?   <span className='underline cursor-pointer' onClick={() => router.push("/login")}> Log in </span> </h6>
                        
                </div>
                
            </div>
            <div className='w-[40%]'>
             <ImgDisplayer login/>
            </div>
         
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Signup