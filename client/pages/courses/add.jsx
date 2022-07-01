import { Select } from '@mui/material'
import React from 'react'
import IndexPage from '../../components/dashboard/indexPage'
import Sidebar from '../../components/dashboard/sidebar'
import {  Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, MenuItem ,Input} from '@mui/material'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const less = [
  {id : 0, title: "Dom manipulation", description: "lorem ipsum"},
  {id : 1, title: "Objects", description: "lorem ipsum"},
]

function AddCourse() {
    const [cours, setCours] = React.useState(10);

    const [lessons, setLessons] = React.useState([...less]);
    const [lessonTitle, setLessonTitle] = React.useState("");
    const [lessonDescription, setLessonDescription] = React.useState("");
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



    const handleChange = (event) => {
        setCours(event.target.value);
      };
    
    const handleAddLesson =() =>{
    
      setLessons(current => [...current,{id: 6,title: lessonTitle,description: ""}])
      setLessonTitle("")
      handleClose()

    }
    
  return (
    <>
    <Sidebar active="courses" />
    <IndexPage>
      <div className="flex justify-between items-center">
         <h3 className='text-[#1F1F1F] text-[20px] font-[600]'>Add New Course</h3>
         <Button className='muiBtn register text-[#079C49] border-2 border-[#079C49] w-[170px] 2xl:w-[200px] h-[35px] 2xl:h-[45px] text-[16px] 2xl:text-[20px] rounded-[10px] font-[600] mt-8'>Save course</Button>
      </div>
      
       <div className="grid grid-cols-2 gap-4 mt-4">
            <div className='px-4 py-4 bg-[#fff] rounded-[15px]'>
                <h4 className='text-[20px] font-[600] text-[#1F1F1F]'>Please fill the informations bellow</h4>
                <form action="get" className='mt-[20px]'>


                    <label className='text-[16px] font-[600] text-[#1F1F1F]'>Course’s name</label>
                    <input type="text" className='w-full border border-2 border-[#1F1F1F]  px-2 py-3 rounded-xl mt-2 focus:outline-none h-[45px]' placeholder='Javascript for web' />


            
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
                       <textarea type="text" className='w-full border border-2 border-[#1F1F1F]  px-3 py-3 rounded-xl mt-3 focus:outline-none h-[30vh]' placeholder="Lorem Ipsum is simply dummy..."/>
                    </div>
                   
                </form>
            </div>



            <div className='px-4 py-6 bg-[#fff] rounded-[15px] '>
                <h4 className='text-[20px] font-[600] text-[#1F1F1F] mb-[30px]'>Please upload</h4>

                <h5 className='text-[16px] font-[600] text-[#1F1F1F] mt-[30px] mb-3'>Course’s necessery docs</h5>

             
                  <Input accept="image/*" id="contained-button-file" multiple type="file" />
                  <Button variant="contained" component="span">
                  Click to upload
                  </Button>
                

                <div className="grid grid-cols-2 mt-8">
                  {lessons.map((lesson) => <h4 className='text-[16px] mb-2 text-[#079C49] font-bold'>{lesson.id+1} - {lesson.title}</h4>)}
                </div>

                  <div>
                  <Button onClick={handleOpen} className='muiBtn register text-[#079C49] border-2 border-[#079C49] w-[170px] 2xl:w-[200px] h-[35px] 2xl:h-[45px] text-[16px] 2xl:text-[20px] rounded-[10px] font-[600] mt-8'>Add lesson</Button>
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
                       <textarea type="text" className='w-full border border-2 border-[#1F1F1F]  px-3 py-3 rounded-xl mt-2 focus:outline-none h-[30vh]' placeholder="Lorem Ipsum is simply dummy..."/>
                    </div>
                    <div className='mt-4'>
                      <Input accept="image/*" id="contained-button-file" multiple type="file" />
                       <Button variant="contained" component="span">
                       Click to upload
                       </Button>
                    </div>

                     <div className="flex justify-end mt-8">
                      <Button onClick={handleClose} className="muiBtn  sign text-[#079C49] border-2 border-[#079C49] w-[120px] 2xl:w-[120px] h-[40px] 2xl:h-[40px] text-[16px] 2xl:text-[18px] rounded-[10px] font-[600] mr-3" >Cancel</Button>
                      <Button onClick={handleAddLesson} className='muiBtn register text-[#079C49] border-2 border-[#079C49] w-[120px] 2xl:w-[120px] h-[40px] 2xl:h-[40px] text-[16px] 2xl:text-[18px] rounded-[10px] font-[600] '>Save</Button>
                    </div>
                   
                   
                </form>
                        </Box>
                      </Modal>
                  </div>
            </div>

       </div>

    </IndexPage>
    </>
  )
}

export default AddCourse