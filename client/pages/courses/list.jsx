import { Button, CircularProgress, Input, Modal } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
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
import CourseCard from '../../components/admin/CourseCard'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';


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



const useForceUpdate = () => useState()[1];


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
  const [openAddCourse, setOpenAddCourse] = useState(false)
 
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
  }, [])

  useEffect(() => {
    const auth = fetchStorageData()
    if(auth) {
      setStorageData(auth)
    } else {
      router.replace("/adminLogin")
    }
  }, [])


  
  const fileInput = useRef(null);
  const forceUpdate = useForceUpdate();


  const deleteLesson = async (lesson_id) => {
    try {
      const response = await axios.delete(`/lesson/${lesson_id}`)
      response.data.error ? toast.error(response.data.message) : toast.success(response.data.message)
      setOpenDelete(false)
    } catch(err) {
      console.log(err)
    }

  }




  function fileNames() {
    const { current } = fileInput;

    if (current && current.files.length > 0) {
      let messages = [];
      for (let file of current.files) {
        messages = messages.concat(<p key={file.name}>{file.name}</p>);
      }
      return messages;
    }
    return null;
  }

  return (
    <>
    <Sidebar active="courses" />
    <Toaster />
    <IndexPage>


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
          
                      <div className="flex justify-between items-center mb-4">
                        <h4 className='text-[30px] font-[600] text-[#1F1F1F] mt-5 mb-2'>Courses list</h4>
                        <div className='flex items-center border-[1px] border-[#9DA6BACC] p-2 rounded-[10px] mt-3 text-[#9DA6BA] bg-white h-12'>
                          <SearchIcon />
                          <input type="search" className='w-full outline-none pl-2 text-[#000]' placeholder='Search ...' />
                        </div>
                        <button className='ormal-case bg-[#079C49] text-[#fff] font-bold  text-[20px] p-2 px-3 rounded-xl h-12' onClick={()=>setOpenAddCourse(true)}>Add Course</button>
                      </div>
                  
                      <div  className=" py-2 grid grid-cols-4 gap-6 gap-y-10">
                      {courses.map((course, index) =><CourseCard id={course._id} fetchLessons={() => fetchCourseLessons(course._id)} name={course.name} description={course.description} nbrLessons={course.lessons?.length} />)}

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
                            <Modal
      open={openAddCourse}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
       <Box sx={style}>
             <h4 className='text-[18px] font-[600] text-[#1F1F1F] text-center'>Add Course</h4>
             <div  className='mt-[20px]'>
                <input type="text" className='w-full border border-2 border-[#079C49]   px-2 py-3 rounded-xl mt-2 focus:outline-none h-[40px]' placeholder='Course Name' />
            </div>
            <div className='mt-4'>
               <textarea  type="text" className='w-full border border-2 border-[#079C49]  px-3 py-3 rounded-xl mt-2 focus:outline-none h-[10vh]' placeholder="Course description..."/>
            </div>


            <div className='mt-5'>

            <input
              id="file"
              type="file"
              ref={fileInput}
              // The onChange should trigger updates whenever
              // the value changes?
              // Try to select a file, then try selecting another one.
              onChange={forceUpdate}
              multiple
            />
                <label htmlFor="file" className='flex items-center'>
                  <span tabIndex="0" role="button" aria-controls="filename" className='bg-[#079C49] rounded-md flex items-center justify-center w-10  h-10'>
                    <AddIcon style={{color: "#fff"}}/>
                  </span>
                  <span className='text-xs nowrap border-2 border-[#079C49] rounded-lg ml-1 h-10 flex items-center p-2 w-full'>{fileNames() ? fileNames(): "No file attached"}</span>
                </label>
           
            </div>
            <div className="flex justify-end mt-6">
              <button className='ormal-case  text-[#fff] border border-[#079C49] text-[#079C49]  font-bold  text-[18px] px-3 rounded-xl h-10 w-1/5 mr-2'  onClick={()=> setOpenAddCourse(!openAddCourse)}>Cancel</button>
              <button className='ormal-case  text-[#fff] border border-[#079C49] bg-[#079C49]  font-bold  text-[18px] px-3 rounded-xl h-10 w-1/5' onClick={()=> setOpenAddCourse(!openAddCourse)}>Save</button>
            </div>
        </Box>
    </Modal>
                  
    </>
  )
}

export default Courses