import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import SearchIcon from '@mui/icons-material/Search';

import { Autocomplete, FormControl, Input, MenuItem, Modal, OutlinedInput, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import Sidebar from '../../../components/dashboard/sidebar';
import IndexPage from '../../../components/dashboard/indexPage';
import MeetCard from '../../../components/admin/MeetCard';
import axios from '../../../axiosInstance';
import moment from 'moment';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: '#fff',
    borderRadius : "15px",
    boxShadow: 24,
    p: 4,
  };



function InvitMeets() {

    const [openAddCourse, setOpenAddCourse] = useState(false)

    const [meetName, setMeetName] = useState("")

    const [courseName, setCourseName] = useState("Course name")

    const [meetDate, setMeetDate] = useState(null)

    const [meetTime, setMeetTime] = useState(null)

    const [meetMembers, setMeetMembers] = useState([])
    const handleClose = () => setOpenAddCourse(false);

    
    const [meets, setMeets] = useState([])


    const valideCourseInfos = courseName !== "" && meetName !== "" && meetDate !== "" && meetTime !== null 

    const fetchCoursesNames = async () => {
        try {
          const response = await axios.get("/course/names")
   
          setCours(response.data.data)
        } catch(err){
          console.log(err)
        }
      }


    const fetchMeets = async () => {
      try {
        const response = await axios.get("/meet/student")
        console.log(response);
        setMeets(response.data.meetings)
    
      } catch(err){
        console.log(err)
      }
    }
  

    
    useEffect(() => {
      
        fetchMeets()
    }, [])
  
    
  return (
    <> 
    <Sidebar active="meets" />
    <Toaster />
    <IndexPage>
   
          
                      <div className="flex justify-between items-center mb-4">
                        <h4 className='text-[30px] font-[600] text-[#1F1F1F] mt-5 mb-2'>Meets invitations list</h4>
                        <div className='flex items-center border-[1px] border-[#9DA6BACC] p-2 rounded-[10px] mt-3 text-[#9DA6BA] bg-white h-12'>
                          <SearchIcon />
                          <input type="search" className='w-full outline-none pl-2 text-[#000]' placeholder='Search ...' />
                        </div>

                      </div>
                  
                      <div  className=" py-2 grid grid-cols-4 gap-6 gap-y-10">
                      {meets?.map((meet)=><MeetCard timeRemains={moment(meet.date).startOf('hour').fromNow()} name={meet.title} courseName={meet.course.name} date={moment(meet.date).format('MMMM Do YYYY, h:mm:ss a')} />)}
                      </div>
                            </IndexPage>




                         
    </>
  )
}



export default InvitMeets