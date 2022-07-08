import { Button, Input, Modal } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import React from 'react'
import IndexPage from '../../components/dashboard/indexPage'
import Sidebar from '../../components/dashboard/sidebar'
import { useEffect } from 'react'
import axios from 'axios'

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
  const [course, setCourse] = React.useState(null);
  const [lessonTitle, setLessonTitle] = React.useState("");
  const [lessonDescription, setLessonDescription] = React.useState("");
  const [lessonVideo, setLessonVideo] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

useEffect(  ()  => {
  setCourse(getCourse())

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
    axios.get(`http://localhost:4000/api/v1/lesson/${id}`)
    .then((res) => {
        console.log(res.data)
       
    return res.data
        
       
    }).catch((error) => {
        console.log(error)
    });
    
  }



  const getCourse = async () =>{
    await axios.get('http://localhost:4000/api/v1/course/62c386bf96ee0605999f194f')
    .then((res)  =>{
        console.log(res.data)
       
        setCourse(res.data)
        return res.data
  
     
       
    }).catch((error) => {
        console.log(error)
    });
  }
  const handleAddLesson =() =>{
    console.log(lessonDescription);
    var bodyFormData = new FormData();
    bodyFormData.append('file', lessonVideo);
    bodyFormData.append('name', lessonTitle);
    bodyFormData.append('description', lessonDescription);
   
  
    axios({
      method: "post",
      url: "http://localhost:4000/api/v1/course/62c386bf96ee0605999f194f/lesson",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(function (response) {
        //handle success
        console.log(response);
      }).catch(function (response) {
        //handle error
        console.log(response);
      });
    handleClose()

  }

  console.log(lessonVideo);
  console.log(lessons);

  const createdCourse = router.query.course
  return (
    <>
    <Sidebar active="courses" />
    <IndexPage>

      <div className="flex">
         <Button className='normal-case bg-[#079C49] text-[#fff] font-bold mr-4 text-[20px]' onClick={()=> router.push("/courses/add")}>Add Course</Button>

        


        {/* <div className="grid grid-cols-2 mt-8">
                  {lessons.map((lesson) => <h4 className='text-[16px] mb-2 text-[#079C49] font-bold'>{lesson.id+1} - {lesson.title}</h4>)}
                </div> */}

             
       <Button onClick={handleOpen} className='normal-case bg-[#079C49] text-[#fff] font-bold  text-[20px]'>Add lesson</Button>
  
       
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
                <form action="get" className='mt-[20px]'>


                    <label className='text-[16px] font-[600] text-[#1F1F1F]'>Lesson title</label>
                    <input type="text" className='w-full border border-2 border-[#1F1F1F]  px-2 py-3 rounded-xl mt-2 focus:outline-none h-[40px]' placeholder='Dom manipulation' value={lessonTitle} onChange={(e)=> setLessonTitle(e.target.value)}/>
                    <div className='mt-6'>
                       <label className='text-[16px] font-[600] text-[#1F1F1F] mt-4'>About this lesson</label>
                       <textarea value={lessonDescription} onChange={(e)=> setLessonDescription(e.target.value)} type="text" className='w-full border border-2 border-[#1F1F1F]  px-3 py-3 rounded-xl mt-2 focus:outline-none h-[30vh]' placeholder="Lorem Ipsum is simply dummy..."/>
                    </div>
                    <div className='mt-4'>
                      <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={(e) => setLessonVideo(e.target.value)} />
                       <Button variant="contained" component="span">
                       Click to upload
                       </Button>
                    </div>

                     <div className="flex justify-end mt-8">
                      <Button onClick={handleClose} className="muiBtn  sign text-[#079C49] border-2 border-[#079C49] w-[120px] 2xl:w-[120px] h-[40px] 2xl:h-[40px] text-[16px] 2xl:text-[18px] rounded-[10px] font-[600] mr-3" >Cancel</Button>
                      <Button onClick={()=>handleAddLesson()} className='muiBtn register text-[#079C49] border-2 border-[#079C49] w-[120px] 2xl:w-[120px] h-[40px] 2xl:h-[40px] text-[16px] 2xl:text-[18px] rounded-[10px] font-[600] '>Save</Button>
                    </div>
                   
                   
                </form>
                        </Box>
                      </Modal>
          
    </IndexPage>

    </>
  )
}

export default Courses