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
  const [lessons, setLessons] = React.useState([]);
  const [lessonTitle, setLessonTitle] = React.useState("");
  const [lessonDescription, setLessonDescription] = React.useState("");
  const [lessonVideo, setLessonVideo] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(false);
  const [firstCourse, setFirstCourse] = React.useState(null)
  const [storageData, setStorageData] = useState(null)
  const [save, setSave] = React.useState(false);


const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

useEffect(  ()  => {

}, [])




  const getAllLessons = (ids) =>{
    let i = 0;
    for (let i = 0; i < ids?.length; i++) {
      const  lesson = getLesson(ids[i])
      console.log(lesson);
      setLessons([...lessons,lesson])
    }
    console.log(lessons);
  }
  const getLesson = (id) =>{
    axios.get(`/lesson/${id}`)
    .then((res) => {
        console.log(res.data)
       
    return res.data
        
       
    }).catch((error) => {
        console.log(error)
    });
    
  }

  const fetchFirstCourse = async () => {
    try {
      const response = await axios.get("/course")
      console.log(response.data)
      if(response.data.data.length != 0){
        setFirstCourse(response.data.data[0])
      }
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
    bodyFormData.append('file', lessonVideo);
    bodyFormData.append('name', lessonTitle);
    bodyFormData.append('description', lessonDescription);
    
  
    axios.post(`/course/${firstCourse._id}/lesson`, bodyFormData, {headers: { "Content-Type": "multipart/form-data" },
    }).then( (response)=> {
        //handle success
        console.log(response.data.error);
        if (!response.data.error){
          setOpen(false)
          console.log("lesson added");
           toast.success("Lesson added successfully")
        }

       
      }).catch( (response)=> {
        //handle error
        console.log(response);
        if (response.response.data.error) {
          toast.error("Fill all the fields please !")
          setSave(false)
        }
       
      });

  }

  const createdCourse = router.query.course
  const test = () => {
    console.log("helloooooooo -----")
  }
  useEffect(() => {
    fetchFirstCourse()
  }, [])

  useEffect(() => {
    const auth = fetchStorageData()
    if(auth) {
      setStorageData(auth)
    } else {
      router.replace("/adminLogin")
    }
  }, [])
  
  return (
    <>
    <Sidebar active="courses" />
    <Toaster />
    <IndexPage>

      <div className="flex">
      {!firstCourse ?<Button className='normal-case bg-[#079C49] text-[#fff] font-bold mr-4 text-[20px]' onClick={()=> router.push("/courses/add")}>Add Course</Button>: null}

        


             
      {firstCourse? <button onClick={handleOpen} className='normal-case bg-[#079C49] text-[#fff] font-bold  text-[20px] p-2 px-3 rounded-xl'>Add lesson</button>: null}
  
       
       </div>
       {createdCourse != undefined && (<h1 className='mt-10 text-[20px]'>the course {createdCourse} is created</h1> )}
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
          
    </IndexPage>

    </>
  )
}

export default Courses