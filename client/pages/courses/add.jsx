import { Select } from '@mui/material'
import React from 'react'
import IndexPage from '../../components/dashboard/indexPage'
import Sidebar from '../../components/dashboard/sidebar'
import {  Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, MenuItem ,Input} from '@mui/material'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react'

import axios from 'axios'
import { useRouter } from 'next/router'


function AddCourse() {

  const router = useRouter()
    const [cours, setCours] = React.useState(10);

   const [courseName, setCourseName] = useState('')
   const [courseDescrip, setCourseDescrip] = useState('')

   const handleName = (e) => setCourseName(e.target.value)
   const handleDescription = (e) => setCourseDescrip(e.target.value)

   console.log(courseName);

    const handleChange = (event) => {
        setCours(event.target.value);
      };
    
      const createCourse = () =>{
        const courseObject = {
          name: courseName,
          description : courseDescrip
      };
      
      axios.post('http://localhost:4000/api/v1/course', courseObject)
          .then((res) => {
              console.log(res.data)
             
           
              router.push({
                pathname :"/courses/list",
                query : {course : courseObject.name}

             })
              
             
          }).catch((error) => {
              console.log(error)
          });
     
      }
    
  return (
    <>
    <Sidebar active="courses" />
    <IndexPage>
      <form>

        <div className="flex justify-between items-center">
           <h3 className='text-[#1F1F1F] text-[20px] font-[600]'>Add New Course</h3>
           <Button onClick={()=>createCourse()} className='muiBtn register text-[#079C49] border-2 border-[#079C49] w-[170px] 2xl:w-[200px] h-[35px] 2xl:h-[45px] text-[16px] 2xl:text-[20px] rounded-[10px] font-[600] mt-8'>Save course</Button>
        </div>
      
       <div className="grid grid-cols-2 gap-4 mt-4">
            <div className='px-4 py-4 bg-[#fff] rounded-[15px]'>
                <h4 className='text-[20px] font-[600] text-[#1F1F1F]'>Please fill the informations bellow</h4>
           


                    <label className='text-[16px] font-[600] text-[#1F1F1F]'>Course’s name</label>
                    <input value={courseName} onChange={(e)=>handleName(e)} type="text" className='w-full border border-2 border-[#1F1F1F]  px-2 py-3 rounded-xl mt-2 focus:outline-none h-[45px]' placeholder='Javascript for web' />


            
                    <FormControl className='mt-4'>
                            <label className='text-[16px] font-[600] text-[#1F1F1F] mb-3'>Course’s number</label>
                            <Select
                              value={cours}
                              onChange={handleChange}
                              displayEmpty
                              
                              className="inpu px-2 rounded-xl outline-none  text-[16px] h-[40px] "
                            >
                        
                              <MenuItem value={10}>10</MenuItem>
                              <MenuItem value={20}>11</MenuItem>
                              <MenuItem value={30}>12</MenuItem>
                            </Select>
                        
                    </FormControl>
                    <div className='mt-6'>
                       <label className='text-[16px] font-[600] text-[#1F1F1F] mt-4'>About this course</label>
                       <textarea value={courseDescrip} onChange={(e)=>handleDescription(e)}  type="text" className='w-full border border-2 border-[#1F1F1F]  px-3 py-3 rounded-xl mt-3 focus:outline-none h-[30vh]' placeholder="Lorem Ipsum is simply dummy..."/>
                    </div>
                   
            
            </div>







            <div className='px-4 py-6 bg-[#fff] rounded-[15px] '>
                <h4 className='text-[20px] font-[600] text-[#1F1F1F] mb-[30px]'>Please upload</h4>

                <h5 className='text-[16px] font-[600] text-[#1F1F1F] mt-[30px] mb-3'>Course’s necessery docs</h5>

             
                  <Input accept="image/*" id="contained-button-file" multiple type="file" />
                  <Button variant="contained" component="span">
                  Click to upload
                  </Button>
                

             
            </div>

         </div>
      </form>
     

    </IndexPage>
    </>
  )
}

export default AddCourse