import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import SearchIcon from '@mui/icons-material/Search';

import { Autocomplete, FormControl, Input, MenuItem, Modal, OutlinedInput, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import Sidebar from '../../../components/dashboard/sidebar';
import IndexPage from '../../../components/dashboard/indexPage';
import MeetCard from '../../../components/admin/MeetCard';
import axios from '../../../axiosInstance';


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

    
    const [cours, setCours] = useState([])


    const valideCourseInfos = courseName !== "" && meetName !== "" && meetDate !== "" && meetTime !== null 

    const fetchCoursesNames = async () => {
        try {
          const response = await axios.get("/course/names")
          console.log(response.data)
          setCours(response.data.data)
        } catch(err){
          console.log(err)
        }
      }
      useEffect(() => {
        fetchCoursesNames()
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
                       <MeetCard name="meet lorem ipsum" courseName="Web developpement" date="12/12/2022" time="9pm" />
                      {/* <Accordion key={course._id} fetchLessons={() => fetchCourseLessons(course._id)} title={`Course ${index + 1} : ${course.name}`} 
                      content={coursesLessons[course._id] ?  coursesLessons[course._id].map((lesson, lessonIndex) =><div key={lesson._id} className='text-[18px] font-[600] text-[#1F1F1F]  ml-5 mb-2 flex items-center justify-between hover:bg-[#eee] p-2 rounded-lg'>
                              <div>
                               <span className='mr-2  mb-1'><PlayCircleIcon /></span>
                               <span>{lesson.name}</span>
                              </div>
                              <button onClick={() =>{ 
                                setLessonTodelete(lesson._id)
                                handleOpenDelete()
                                }} className='normal-case hover:bg-[#EE1D5295] rounded-[10px] text-[10px] sm:text-[13px] lg:text-[10px] xl:text-[13px] text-[#EE1D52] bg-[#EE1D5278] mr-2 h-[30px] w-[80px]'>Delete</button>
                         </div>) : <HashLoader color="#079C49" loading={true} size={30} />}/> */}
                         {/* {courses.map((course, index) => <Accordion
                             open={openAcc === index+1}
                             icon={<Icon id={index+1} open={openAcc} />}
                             onClick={() => handleOpenAcc(index+1)}
                       
                           >
                             <AccordionHeader onClick={() => {
                                if(!coursesLessons[course.id]){
                                  fetchCourseLessons(course._id)
                                }
                             }}>Course {index + 1}: {course.name}</AccordionHeader>
                             <AccordionBody onClick={()=>setOpenAcc(true)}>
                             {coursesLessons[course._id] ?  coursesLessons[course._id].map((lesson, lessonIndex) =><div className='text-[18px] font-[600] text-[#1F1F1F]  ml-5 mb-2 flex items-center justify-between hover:bg-[#eee] p-2 rounded-lg'>
                              <div>
                               <span className='mr-2  mb-1'><PlayCircleIcon /></span>
                               <span>{lesson.name}</span>
                              </div>
                              <button onClick={() => handleOpenDelete()} className='normal-case hover:bg-[#EE1D5295] rounded-[10px] text-[10px] sm:text-[13px] lg:text-[10px] xl:text-[13px] text-[#EE1D52] bg-[#EE1D5278] mr-2 h-[30px] w-[80px]'>Delete</button>
                         </div>) : <HashLoader color="#079C49" loading={true} size={30} />}
                            
                             </AccordionBody>
                           </Accordion>)} */}
                           
                    
                        </div>
                            </IndexPage>




                            <Modal
      open={openAddCourse}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
       <Box sx={style}>
             <h4 className='text-[18px] font-[600] text-[#1F1F1F] text-center'>Create a Meet</h4>
             <div  className='mt-4'>
                <input type="text" value={meetName} onChange={(e)=>setMeetName(e.target.value)} className='w-full border border-2 border-[#079C49]   px-2 py-3 rounded-xl mt-2 focus:outline-none h-[40px]' placeholder='Meet Name' />
            </div>
            <FormControl className='w-full my-4'>
                     <label htmlFor="choosed" className='text-[#079C49] ml-1'>Course name</label>
                            <Select
                              name='choosed'
                              id='choosed'
                              label="Course name"
                              value={courseName}
                              onChange={(e)=>setCourseName(e.target.value)}
                              defaultValue="djid"
                              
                              className="  border-[#66666640] h-[45px] rounded-xl border border-[#079C49] px-3 text-[16px]"
                            >
                              {cours?.map(course => <MenuItem key={course._id} value={course.name}>{course.name}</MenuItem>)}
                            </Select>
                           
            </FormControl>
            <div className='w-1/2 mb-4'>
            <label className='text-[#079C49] mt-4   ml-1'>Date & time</label>
                <OutlinedInput value={meetDate} onChange={(e)=>setMeetDate(e.target.value)} type="datetime-local" className='w-full border  border-[#079C49]   px-2 py-3 rounded-xl  focus:outline-none h-[40px]' placeholder='Teacher Name' />
            </div>
            <div>
            <label className='text-[#079C49] mt-4 mb-1  ml-1'>Members</label>
                <div className='border  border-[#079C49] rounded-xl mb-4'>

             
            <Autocomplete
        multiple
        id="tags-outlined"
        options={top100Films}
        getOptionLabel={(option) => option.title}
        defaultValue={[top100Films[13]]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            variant='outlined'
            {...params}
            
            placeholder="Select ..."
          />
        )}
      />
         </div>
            </div>

    
            <div className="flex justify-end mt-6">
              <button className='ormal-case  text-[#fff] border border-[#079C49] text-[#079C49]  font-bold  text-[18px] px-3 rounded-xl h-10 w-1/5 mr-2'  onClick={()=> setOpenAddCourse(false)}>Cancel</button>
              <button disabled={!valideCourseInfos} className='ormal-case  text-[#fff] border border-[#079C49] bg-[#079C49]  font-bold  text-[18px] px-3 rounded-xl h-10 w-1/5' onClick={()=>handleCreateCourse()}>Save</button>
            </div>
        </Box>
    </Modal>
    </>
  )
}

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
      title: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    }]

export default InvitMeets