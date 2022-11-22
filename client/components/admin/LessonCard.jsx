import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import { useRouter } from 'next/router';


function LessonCard(props) {
  const router = useRouter()
  return (
    <div className='flex justify-between my-2'>
        <div className="flex hover:underline cursor-pointer" onClick={()=>router.push({
          pathname: `/courses/lessons/${props.lessonId}`,
          query: {
            course_id: props.courseId
          },
           shallow: false 
        })}>
            <span className='font-bold'>Lesson {props.index} : </span>
            <span>{props.name}</span>
        </div>
        {props.student ? null :
        <div>
              <DeleteIcon  className='cursor-pointer w-5' onClick={props.deleteLesson}/>
         
        </div>
}
    </div>
  )
}

export default LessonCard