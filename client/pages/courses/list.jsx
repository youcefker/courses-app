import { Button, CircularProgress, Input, Modal } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import IndexPage from '../../components/dashboard/indexPage'
import Sidebar from '../../components/dashboard/sidebar'
import { useEffect } from 'react'
import axios from '../../axiosInstance'
import toast, { Toaster } from 'react-hot-toast';
import { faL } from '@fortawesome/free-solid-svg-icons'
import {
 
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import HashLoader from "react-spinners/HashLoader";
import Accordion from '../../components/shared/Accordion'


function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}


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

const less = [
  {id : 0, title: "Dom manipulation", description: "lorem ipsum"},
  {id : 1, title: "Objects", description: "lorem ipsum"},
]






function Courses() {
  const router = useRouter()
  const [courses, setCourses] = useState([])
  const [coursesLessons, setCoursesLessons] = React.useState({});
  const [lessonTitle, setLessonTitle] = React.useState("");
  const [lessonDescription, setLessonDescription] = React.useState("");
  const [lessonVideo, setLessonVideo] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(false);
  const [firstCourse, setFirstCourse] = React.useState(null)
  const [storageData, setStorageData] = useState(null)
  const [save, setSave] = React.useState(false);
  const [openAcc, setOpenAcc] = useState(0);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [lessonTodelete, setLessonTodelete] = useState(null)
 
  const handleOpenAcc = (value) => {
    setOpenAcc(openAcc === value ? 0 : value);
  };

const handleOpen = () => setOpen(true);
const handleOpenDelete = () => setOpenDelete(true);
const handleCloseDelete = () => setOpenDelete(false);
const handleClose = () => setOpen(false);

useEffect(  ()  => {
  
}, [])





  const fetchCourses = async () => {
    try {
      const response = await axios.get("/course")
      console.log(response.data)
      if(response.data.data.length != 0){
        setFirstCourse(response.data.data[0])
      }
      setCourses(response.data.data)
    } catch(err) {
      console.log(err)
    }
  }

  const fetchCourseLessons = async (course_id) => {
    try {
      const response = await axios.get(`/lesson/course/${course_id}`)
      const updatedCoursesLessons = { ...coursesLessons }
      updatedCoursesLessons[course_id] = response.data.data
      setCoursesLessons(updatedCoursesLessons)
    } catch(err) {
      console.log(err)
    }
  }
  const fetchStorageData = () => {
    const jwt = localStorage.getItem("jwt")
    const role =  localStorage.getItem("role")
    const data = jwt && role ? {jwt, role}: null
    return data
}
  const handleAddLesson = () =>{
    setSave(true)
    console.log(lessonDescription);
    var bodyFormData = new FormData();
    bodyFormData.append('lesson_file', lessonVideo);
    bodyFormData.append('name', lessonTitle);
    bodyFormData.append('description', lessonDescription);
    
  
    axios.post(`/lesson/course/${firstCourse._id}`, bodyFormData, {headers: { "Content-Type": "multipart/form-data" },
    }).then( (response)=> {
        //handle success
        console.log(response.data.error);
        if (!response.data.error){
          setOpen(false)
          setSave(false)
          console.log("lesson added");
          toast.success("Lesson added successfully")
        }

       
      }).catch( (error)=> {
        //handle error
        console.log(error);
          toast.error("Fill all the fields please !")
          setSave(false)
      });

  }

  const createdCourse = router.query.course
  const test = () => {
    console.log("helloooooooo -----")
  }
  useEffect(() => {
    fetchCourses()
  }, [firstCourse])

  useEffect(() => {
    const auth = fetchStorageData()
    if(auth) {
      setStorageData(auth)
    } else {
      router.replace("/adminLogin")
    }
  }, [])

  useEffect(() => {
    
  }, [firstCourse])
  
  
  const deleteLesson = async (lesson_id) => {
    try {
      const response = await axios.delete(`/lesson/${lesson_id}`)
      response.data.error ? toast.error(response.data.message) : toast.success(response.data.message)
      setOpenDelete(false)
    } catch(err) {
      console.log(err)
    }

  }

  return (
    <>
    <Sidebar active="courses" />
    <Toaster />
    <IndexPage>

      <div className="flex">
      {!firstCourse ?<button className='ormal-case bg-[#079C49] text-[#fff] font-bold  text-[20px] p-2 px-3 rounded-xl' onClick={()=> router.push("/courses/add")}>Add Course</button>: null}

        


             
      {firstCourse ? <button onClick={handleOpen} className='normal-case bg-[#079C49] text-[#fff] font-bold  text-[20px] p-2 px-3 rounded-xl'>Add lesson</button>: null}
  
       
       </div>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                        <h4 className='text-[20px] font-[600] text-[#1F1F1F] text-center'>Add a lesson to this course</h4>
                <div  className='mt-[20px]'>


                    <label className='text-[16px] font-[600] text-[#1F1F1F]'>Lesson title</label>
                    <input type="text" className='w-full border border-2 border-[#1F1F1F]  px-2 py-3 rounded-xl mt-2 focus:outline-none h-[40px]' placeholder='Dom manipulation' value={lessonTitle} onChange={(e)=> setLessonTitle(e.target.value)}/>
                    <div className='mt-6'>
                       <label className='text-[16px] font-[600] text-[#1F1F1F] mt-4'>About this lesson</label>
                       <textarea value={lessonDescription} onChange={(e)=> setLessonDescription(e.target.value)} type="text" className='w-full border border-2 border-[#1F1F1F]  px-3 py-3 rounded-xl mt-2 focus:outline-none h-[30vh]' placeholder="Lorem Ipsum is simply dummy..."/>
                    </div>
                    <div className='mt-4'>
                      <Input accept=".mp4" id="contained-button-file" single type="file" onChange={(e) => setLessonVideo(e.target.files[0])} />
                   
                    </div>

                     <div className="flex justify-end mt-8">
                      <button onClick={()=>handleClose()} className="muiBtn  sign text-[#079C49] border-2 border-[#079C49] w-[120px] 2xl:w-[120px] h-[40px] 2xl:h-[40px] text-[16px] 2xl:text-[18px] rounded-[10px] font-[600] mr-3" >Cancel</button>
                      <button onClick={()=>handleAddLesson()} className='muiBtn register text-[#079C49] border-2 border-[#079C49] w-[120px] 2xl:w-[120px] h-[40px] 2xl:h-[40px] text-[16px] 2xl:text-[18px] rounded-[10px] font-[600] '>{save ?<CircularProgress style={{height: "30px",width: "30px",marginTop : "3px"}} color="inherit" />: <span>Save</span>}</button>
                    </div>
                   
                   
                </div>
                        </Box>
                      </Modal>
          

                      <h4 className='text-[20px] font-[600] text-[#1F1F1F] mt-5 mb-2'>Courses list</h4>
                      <div  className=" py-2 px-3 rounded-xl">
                      {courses.map((course, index) =><Accordion key={course._id} fetchLessons={() => fetchCourseLessons(course._id)} title={`Course ${index + 1} : ${course.name}`} 
                      content={coursesLessons[course._id] ?  coursesLessons[course._id].map((lesson, lessonIndex) =><div key={lesson._id} className='text-[18px] font-[600] text-[#1F1F1F]  ml-5 mb-2 flex items-center justify-between hover:bg-[#eee] p-2 rounded-lg'>
                              <div>
                               <span className='mr-2  mb-1'><PlayCircleIcon /></span>
                               <span>{lesson.name}</span>
                              </div>
                              <button onClick={() =>{ 
                                setLessonTodelete(lesson._id)
                                handleOpenDelete()
                                }} className='normal-case hover:bg-[#EE1D5295] rounded-[10px] text-[10px] sm:text-[13px] lg:text-[10px] xl:text-[13px] text-[#EE1D52] bg-[#EE1D5278] mr-2 h-[30px] w-[80px]'>Delete</button>
                         </div>) : <HashLoader color="#079C49" loading={true} size={30} />}/>)}
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
                           
                           <Modal
                        open={openDelete}
                        onClose={handleCloseDelete}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                        <h4 className='text-[20px] font-[600] text-[#1F1F1F] text-center'>Wanna delete this lesson ?</h4>
         



                     <div className="flex justify-end mt-8">
                      <button onClick={()=>handleCloseDelete()} className="muiBtn  sign text-[#079C49] border-2 border-[#079C49] w-[120px] 2xl:w-[120px] h-[40px] 2xl:h-[40px] text-[16px] 2xl:text-[18px] rounded-[10px] font-[600] mr-3" >Cancel</button>
                      <button  onClick={() => deleteLesson(lessonTodelete)} className='muiBtn register text-[#079C49] border-2 border-[#079C49] w-[120px] 2xl:w-[120px] h-[40px] 2xl:h-[40px] text-[16px] 2xl:text-[18px] rounded-[10px] font-[600] '>{save ?<CircularProgress style={{height: "30px",width: "30px",marginTop : "3px"}} color="inherit" />: <span>yes</span>}</button>
                    </div>
                   
       
                        </Box>
                      </Modal>
                        </div>
                            </IndexPage>
                  
    </>
  )
}

export default Courses