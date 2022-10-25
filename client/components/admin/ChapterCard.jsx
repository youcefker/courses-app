import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import { Collapse, FormControlLabel, Paper, Switch } from '@mui/material';
import { Box } from '@mui/system';
import LessonCard from './LessonCard';


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

    const handleChange = () => {
      setChecked((prev) => !prev);
    };
  
  return (
    <div className='bg-[#F5F5F5] py-4 px-5 rounded-xl my-3'>
        <div className="flex justify-between items-center ">
           <h3 className='text-lg text-[#079C49] font-bold'>trading chapter {props.id}</h3>
           <div className='flex items-center'>
              <div className='bg-white rounded-full mr-6 hover:bg-[#079C49] cursor-pointer' style={{width : "fit-content"}} onClick={props.addLesson}>
                <AddIcon className='text-[#079C49] hover:text-[#fff]'/>
              </div>
              <div className='mr-6'>
              <DeleteIcon className=' cursor-pointer' onClick={props.deleteChapter}/>
            
              </div>
             
              <div className='bg-white hover:bg-[#079C49] rounded-full cursor-pointer' style={{width : "fit-content",height : "fit-content"}}>
              {!checked ?<ExpandMoreIcon className='text-[#079C49] hover:text-[#fff]'  onClick={handleChange}/> : <ExpandLessIcon className='text-[#079C49] hover:text-[#fff]'  onClick={handleChange} />}
        
          
               
              </div>
            
           </div>
           
        </div>

        <div>
          <Collapse in={checked}>
            <div className="my-5">
              <LessonCard  key={1}  deleteLesson={props.deleteLesson}/>
              <LessonCard key={2}  deleteLesson={props.deleteLesson}/>
              <LessonCard key={3} deleteLesson={props.deleteLesson}/>
            </div>
            
          </Collapse>
     
        </div>
       

    </div>
  )
}

export default ChapterCard