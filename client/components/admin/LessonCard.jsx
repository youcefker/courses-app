import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import { useRouter } from 'next/router';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function LessonCard(props) {
  const router = useRouter()

  const [lessonCompleted, setLessonCompleted] = React.useState(false);
  return (
    <div className='flex justify-between my-2'>
        <div className="flex hover:underline cursor-pointer items-center" onClick={()=>router.push({
          pathname: `/courses/lessons/${props.lessonId}`,
          query: {
            course_id: props.courseId
          },
           shallow: false 
        })}>
                 <span> {!lessonCompleted ?  <CheckCircleIcon />:  <RadioButtonUncheckedIcon />}</span>
            <span className='font-bold ml-1'>Lesson {props.index} : </span>
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