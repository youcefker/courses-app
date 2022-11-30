import React, { useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import { Collapse, FormControlLabel, Paper, Switch } from '@mui/material';
import { Box } from '@mui/system';
import LessonCard from './LessonCard';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const icon = (
    <Paper sx={{ m: 1 }} elevation={4}>
      <Box component="svg" sx={{ width: 100, height: 100 }}>
        <Box
          component="polygon"
          sx={{
            fill: 'white',
            stroke: (theme) => theme.palette.divider,
            strokeWidth: 1,
          }}
          points="0,100 50,00, 100,100"
        />
      </Box>
    </Paper>
  );


function ChapterCard(props) {
    const [checked, setChecked] = React.useState(false);
    const [chapterCompleted, setChapterCompleted] = React.useState(props.progress.completed);
    const [lessons, setLessons] = React.useState([{chapter_id: "635c4c64ece772b6422f4f09",
    description: "hellooooo",
    file_type: "FILE",
    name: "algorithms 1",
    filename: "1666994009592lesson_file.mp4"
    }]);
    const handleChange = () => {
      setChecked((prev) => !prev);
    };

    useEffect(() => {
    
      setLessons(props.lessons)
    }, [])
    
  
  return (
    <div className='bg-[#F5F5F5] py-4 px-5 rounded-xl my-3'>
   
        <div className="flex justify-between items-center ">
        {props.student ? 
           <h3 className='text-lg text-[#079C49] font-bold flex items-center'>
            {chapterCompleted ?  <CheckCircleIcon />:  <RadioButtonUncheckedIcon/>}
          
            <span className='ml-2'>{props.name}</span>
            </h3>
          :
          <h3 className='text-lg text-[#079C49] font-bold'>
           {props.name}
           </h3>
          }
           <div className='flex items-center'>
            {props.student ? null :
            <>
              <div className='bg-white rounded-full mr-6 hover:bg-[#079C49] cursor-pointer' style={{width : "fit-content"}} onClick={props.addLesson}>
                <AddIcon className='text-[#079C49] hover:text-[#fff]'/>
              </div>
              <div className='mr-6'>
              <DeleteIcon className=' cursor-pointer' onClick={props.deleteChapter}/>
            
              </div>
              </>
}
             
              <div className='bg-white hover:bg-[#079C49] rounded-full cursor-pointer' style={{width : "fit-content",height : "fit-content"}}>
              {!checked ?<ExpandMoreIcon className='text-[#079C49] hover:text-[#fff]'  onClick={handleChange}/> : <ExpandLessIcon className='text-[#079C49] hover:text-[#fff]'  onClick={handleChange} />}
        
          
               
              </div>
            
           </div>
           
        </div>

        <div>
          <Collapse in={checked}>
            <div className="my-5">
              {props.lessons?.length !== 0?
              props.lessons?.map((lesson,index) =>
                <LessonCard lessonTpe={lesson.file_type} lessonId={lesson._id} progress={props.progress[lesson._id]} courseId={props.courseId} student={props.student} name={lesson.name}  key={index} index={index+1}  deleteLesson={()=>props.deleteLesson(lesson._id)}/>
        
              ): <h2 className='text-center'>No lessons</h2>}
   
            
            </div>
            
          </Collapse>
     
        </div>
       

    </div>
  )
}

export default ChapterCard