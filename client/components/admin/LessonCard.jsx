import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';


function LessonCard(props) {
  return (
    <div className='flex justify-between my-2'>
        <div className="flex">
            <span className='font-bold'>Lesson {props.index} : </span>
            <span>{props.name}</span>
        </div>
        <div>
              <DeleteIcon  className='cursor-pointer w-5' onClick={props.deleteLesson}/>
         
        </div>
    </div>
  )
}

export default LessonCard