import { Box, MenuItem, Modal } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import ChapterCard from '../../../components/admin/ChapterCard'
import IndexPage from '../../../components/dashboard/indexPage'
import Sidebar from '../../../components/dashboard/sidebar'
import { CircularProgress, InputLabel, Select } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useRouter } from 'next/router'
import axios from '../../../axiosInstance'





const useForceUpdate = () => useState()[1];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  borderRadius : "10px",
  boxShadow: 24,
  p: 3
};

const less = [
  {id : 0, title: "Dom manipulation", description: "lorem ipsum"},
  {id : 1, title: "Objects", description: "lorem ipsum"},
]




const grid = 8;
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};




// const chapters = [
//   <ChapterCard key={1} addLesson={()=>setOpenAddLesson(true)} deleteChapter={()=> setOpenDeleteChapter(true)}  deleteLesson={()=> setOpenDeleteLesson(true)}/>,
//               <ChapterCard  key={2} />,
//               <ChapterCard key={3}  />
// ]

const chapters = [
  <div key={"1"} id="1" className="box bg-[#000] text-[#fff] mb-3">
  1
</div>,
<div key={"2"} id="2" className="box bg-[#000] text-[#fff] mb-3">
  2
</div>,
<div key={"3"} id="3" className="box bg-[#000] text-[#fff] mb-3">
  3
</div>,
<div key={"4"} id="4" className="box bg-[#000] text-[#fff] mb-3">
  4
</div>
]



function CourseDetail(props) {
  
  const router = useRouter()

  const [courseId, setCourseId] = useState(null)
  const [courseData, setCourseData] = useState(null)
  const [chapterId, setChapterId] = useState(null)
  const [lessonId, setLessonId] = useState(null)
  const [courseStatus, setCourseStatus] = useState(false)

  
  const fetchCourseData = ()=>{
    console.log("query content", router.query)
    axios.get("/lesson/course/"+router.query.course)
    .then((res)=>{
      setCourseStatus(res.data.data.enrolled)
      setCourseData(res.data.data.course)
    })
    .catch((err)=>{
      console.log(err);
    })

  }

  useEffect(() => {
   

       
   fetchCourseData()


  }, [router.query.course != undefined])
  

  const handleAddLesson = ()=>{

    var bodyFormData = new FormData();
    bodyFormData.append('lesson_file', file);
    bodyFormData.append('name', lessonName);
    bodyFormData.append('description', lessonDescription);
    
    axios.post("/lesson/chapter/"+chapterId, bodyFormData, {headers: { "Content-Type": "multipart/form-data" }})
    .then((res)=>{
      console.log(res.data);
      toast.success(res.data.message)
      setOpenAddLesson(false)
      fetchCourseData()

  
    })
    .catch((err)=>{
      console.log(err);
      toast.error(err.data.message)
      setOpenAddLesson(false)
    })
  }

  const handleDeleteChapter =()=>{
   axios.delete("/chapter/"+chapterId)
   .then((res)=>{
    console.log(res.data);
    toast.success(res.data.message)
    setOpenDeleteChapter(false)
    fetchCourseData()


  })
  .catch((err)=>{
    console.log(err);
    toast.error(err.data.message)
    setOpenDeleteChapter(false)
  })
  }


  // const initial = Array.from( (v, k) => k).map(k => {
  //   const custom = {
  //     id: `id-${k}`,
  //     content: <ChapterCard  key={k} id={k}  addLesson={()=>setOpenAddLesson(true)} deleteChapter={()=>setOpenDeleteChapter(true)}  deleteLesson={()=> setOpenDeleteLesson(true)}/>
  //   };
  
  //   return custom;
  // });

  function Quote({ quote, index }) {
    return (
      <Draggable draggableId={quote._id} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="my-4"
            key={Math.random()}
          >
           <ChapterCard name={quote.title} courseId={courseData._id} lessons={quote.lessons}  key={Math.random()} id={quote._id}  addLesson={()=> {setOpenAddLesson(true),setChapterId(quote._id)}} deleteChapter={()=>{setOpenDeleteChapter(true),setChapterId(quote._id)}}  deleteLesson={(lessonId)=>{ setOpenDeleteLesson(true),setLessonId(lessonId)}} enrolled={courseStatus}/>
          </div>
        )}
      </Draggable>
    );
  }
  
  const QuoteList = React.memo(function QuoteList({ quotes }) {
    return quotes?.map((quote, index) => (
      <Quote quote={quote} index={index} key={quote.id} />
    ));
  });
  const [state, setState] = useState({ quotes: [] });

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(
      state.quotes,
      result.source.index,
      result.destination.index
    );

    setState({ quotes });
  }


  const [items, setItems] = useState(chapters)


  const [lessnType, setLessonType] = React.useState(1);


  const [open, setOpen] = React.useState(false);

  const [openAddLesson, setOpenAddLesson] = React.useState(false);
  const [openDeleteChapter, setOpenDeleteChapter] = React.useState(false);
  const [openDeleteCourse, setOpenDeleteCourse] = React.useState(false);

  const [openDeleteLesson, setOpenDeleteLesson] = React.useState(false);
  const [openUpdateCourse, setOpenUpdateCourse] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false)

  const [chapterName, setChapterName] = useState("")
  const [lessonName, setLessonName] = useState("")
  const [lessonDescription, setLessonDescription] = useState("")
  const [file, setFile] = useState(null)





  const handleClose = () =>{
     setOpen(false)
     setOpenAddLesson(false)
     setOpenDeleteChapter(false)
     setOpenDeleteLesson(false)
     setOpenUpdateCourse(false)
     setOpenDeleteCourse(false)
  
  }



  const fileInput = useRef(null);


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



  const handleChange = (event) => {
    setLessonType(event.target.value);
  };


  const handleAddChapter = () =>{
    axios.post("/chapter/course/"+router.query.course, {title : chapterName})
    .then((res)=>{
      console.log(res.data.message);
      toast.success(res.data.message)
       
      setOpen(false)

      fetchCourseData()
    })
    .catch((err)=>{
      console.log(err)
      console.log(err);
    })

  }

  const handleFileUpload = (e) =>{
    setFile(e.target.files[0])
    useForceUpdate = () => useState()[1];
  }




  const handleDeleteLesson = ()=>{
    console.log(lessonId);
    axios.delete("/lesson/"+lessonId)
    .then((res)=>{
     console.log(res.data);
     toast.success(res.data.message)
     setOpenDeleteLesson(false)
     fetchCourseData()
 
 
   })
   .catch((err)=>{
     console.log(err);
     toast.error(err.data.message)
     setOpenDeleteLesson(false)
  })
  }


  const handleDeleteCourse = ()=>{

    axios.delete("/course/"+courseData._id)
    .then((res) => {
      console.log(res.data)
     toast.success(res.data.message)
     setOpenDeleteCourse(false)
     router.back()
     
  }).catch((error) => {
      console.log(error)
      
  });

  }


  return (
    <>
    <Sidebar active="courses" />
    <Toaster />
    <IndexPage>
        <div className="flex justify-between items-center mb-4">
            <h4 className='text-[30px] font-[600] text-[#1F1F1F] mt-5 mb-2'>Course Detail</h4>
            <button className='ormal-case  text-[#079C49] border border-[#079C49] hover:text-[#fff] hover:bg-[#079C49] font-bold  text-[20px] p-2 px-3 rounded-xl h-12' onClick={()=> setOpen(true)}>Add Chapter</button>
        </div>
          
        <div className="grid grid-cols-12 gap-5">


          <div className='flex flex-col items-center col-span-7'>
            <h1 className='text-[22px] font-bold mb-5'>{courseData?.name}</h1>
              <img className='w-4.5/5'  id="image_video" src={`http://localhost:4000/api/v1/images/${courseData?.filename}`}></img>
            <h6 className='text-[#1F1F1F] text-[14px] font-[500] mt-5 text-center'>
               {courseData?.description}
             </h6>

             <div className='flex justify-center mt-5'>
             <button className='ormal-case  text-[#fff] border border-[#079C49] text-[#079C49]  font-bold  text-[18px] px-3 rounded-xl h-10 w-4/5 mr-2'  onClick={()=> setOpenUpdateCourse(true)}>Update</button>
              <button className='ormal-case   border border-[red] text-[red]  font-bold  text-[18px] px-3 rounded-xl h-10 w-4/5' onClick={()=> setOpenDeleteCourse(true)}>Delete</button>
             </div>
          </div>


          <div className='bg-white rounded-xl px-3 col-span-5'>
            <h3 className='text-center text-[18px] font-bold my-4'>Chapters List</h3>
            <div>
            <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <QuoteList quotes={courseData?.chapters}/>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
           
            </div>
          </div>
        </div>
    </IndexPage>

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
       <Box sx={style}>
             <h4 className='text-[18px] font-[600] text-[#1F1F1F] text-center'>Add a chapter to this course</h4>
             <div  className='mt-[20px]'>
                <input type="text" value={chapterName} onChange={(e)=>setChapterName(e.target.value)} className='w-full border border-2 border-[#079C49]   px-2 py-3 rounded-xl mt-2 focus:outline-none h-[40px]' placeholder='Chapter Name' />
            </div>
            <div className="flex justify-end mt-5">
            <button disabled={chapterName === ""} className='ormal-case  text-[#fff] border border-[#079C49] bg-[#079C49]  font-bold  text-[18px] px-3 rounded-xl h-10' onClick={()=> handleAddChapter()}>Save</button>
            </div>
        </Box>
    </Modal>

    <Modal
      open={openAddLesson}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
       <Box sx={style}>
             <h4 className='text-[18px] font-[600] text-[#1F1F1F] text-center'>Add a lesson to this Chapter</h4>
             <div  className='mt-[20px]'>
                <input type="text" value={lessonName} onChange={(e)=>setLessonName(e.target.value)} className='w-full border border-2 border-[#079C49]   px-2 py-3 rounded-xl mt-2 focus:outline-none h-[40px]' placeholder='Lesson Name' />
            </div>
            <div className='mt-4'>
               <textarea value={lessonDescription} onChange={(e)=>setLessonDescription(e.target.value)}  type="text" className='w-full border border-2 border-[#079C49]  px-3 py-3 rounded-xl mt-2 focus:outline-none h-[10vh]' placeholder="Lesson description..."/>
            </div>


            <div className='my-3'>
         
              <Select value={lessnType}
                className='selectInput w-full h-[40px] border border-2 border-[#079C49] rounded-lg'
                onChange={handleChange} >
                  <MenuItem value={1}>Document</MenuItem>
                  <MenuItem value={2}>Video</MenuItem>
                </Select>
            </div>

            <div className='mt-5'>

            <input
              id="file"
              type="file"
              ref={fileInput}
              onChange={(e)=>handleFileUpload(e)}
              // The onChange should trigger updates whenever
              // the value changes?
              // Try to select a file, then try selecting another one.
             
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
              <button className='ormal-case  text-[#fff] border border-[#079C49] text-[#079C49]  font-bold  text-[18px] px-3 rounded-xl h-10 w-1/3 mr-2'  onClick={()=> setOpenAddLesson(!openAddLesson)}>Cancel</button>
              <button className='ormal-case  text-[#fff] border border-[#079C49] bg-[#079C49]  font-bold  text-[18px] px-3 rounded-xl h-10 w-1/3' onClick={()=> handleAddLesson()}>Save</button>
            </div>
        </Box>
    </Modal>



    <Modal
      open={openDeleteChapter}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
       <Box sx={style}>
             <h4 className='text-[18px] font-[600] text-[#1F1F1F] text-center'>Do you want to delete this chapter !</h4>
        
            <div className="flex justify-center mt-5">
              <button className='ormal-case  text-[#fff] border border-[#079C49] text-[#079C49]  font-bold  text-[18px] px-3 rounded-xl h-10 w-1/3 mr-3' onClick={()=> setOpenDeleteChapter(false)}>Cancel</button>
              <button className='ormal-case  text-[#fff] border border-[#079C49] bg-[#079C49]  font-bold  text-[18px] px-3 rounded-xl h-10 w-1/3' onClick={()=> handleDeleteChapter()}>Confirm</button>
            </div>
        </Box>
    </Modal>


    <Modal
      open={openDeleteLesson}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
       <Box sx={style}>
             <h4 className='text-[18px] font-[600] text-[#1F1F1F] text-center'>Do you want to delete this lesson!</h4>
             
            <div className="flex justify-center mt-5">
              <button className='ormal-case  text-[#fff] border border-[#079C49] text-[#079C49]  font-bold  text-[18px] px-3 rounded-xl h-10 w-30 mr-3' onClick={()=> setOpenDeleteLesson(false)}>Cancel</button>
              <button className='ormal-case  text-[#fff] border border-[#079C49] bg-[#079C49]  font-bold  text-[18px] px-3 rounded-xl h-10 w-30' onClick={()=> handleDeleteLesson()}>Confirm</button>
            </div>
        </Box>
    </Modal>



    <Modal
      open={openDeleteCourse}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
       <Box sx={style}>
             <h4 className='text-[18px] font-[600] text-[#1F1F1F] text-center'>Do you want to delete this Course !</h4>
        
            <div className="flex justify-center mt-5">
              <button className='ormal-case  text-[#fff] border border-[#079C49] text-[#079C49]  font-bold  text-[18px] px-3 rounded-xl h-10 w-1/3 mr-3' onClick={()=> setOpenDeleteCourse(!openDeleteCourse)}>Cancel</button>
              <button className='ormal-case  text-[#fff] border border-[#079C49] bg-[#079C49]  font-bold  text-[18px] px-3 rounded-xl h-10 w-1/3' onClick={()=> handleDeleteCourse()}>Confirm</button>
            </div>
        </Box>
    </Modal>




    <Modal
      open={openUpdateCourse}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
       <Box sx={style}>
             <h4 className='text-[18px] font-[600] text-[#1F1F1F] text-center'>Update course</h4>
             <div  className='mt-4'>
                <input type="text" className='w-full border border-2 border-[#079C49]   px-2 py-3 rounded-xl mt-2 focus:outline-none h-[40px]' placeholder='Course Name' />
            </div>
            <div className='mt-3 mb-2'>
               <textarea  type="text" className='w-full border border-2 border-[#079C49]  px-3 py-3 rounded-xl mt-2 focus:outline-none h-[10vh]' placeholder="Course description..."/>
            </div>
            <div>
                <input type="text" className='w-full border border-2 border-[#079C49]   px-2 py-3 rounded-xl mt-2 focus:outline-none h-[40px]' placeholder='Teacher Name' />
            </div>

            <div className='mt-[40px]'>

            <input
              id="file"
              type="file"
              ref={fileInput}
              // The onChange should trigger updates whenever
              // the value changes?
              // Try to select a file, then try selecting another one.
              onChange={(e)=>handleFileUpload(e)}
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
              <button className='ormal-case  text-[#fff] border border-[#079C49] text-[#079C49]  font-bold  text-[18px] px-3 rounded-xl h-10 w-1/3 mr-2'  onClick={()=> setOpenUpdateCourse(false)}>Cancel</button>
              <button className='ormal-case  text-[#fff] border border-[#079C49] bg-[#079C49]  font-bold  text-[18px] px-3 rounded-xl h-10 w-1/3' onClick={()=> setOpenUpdateCourse(false)}>Save</button>
            </div>
        </Box>
    </Modal>
    </>
  )
}

export default CourseDetail