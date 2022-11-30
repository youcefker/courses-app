import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import { useRouter } from 'next/router';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DescriptionIcon from '@mui/icons-material/Description';

function LessonCard(props) {
  const router = useRouter()

  const [lessonCompleted, setLessonCompleted] = React.useState(props.progress.completed);
  return (
    <div className='flex justify-between my-2'>
        <div className="flex hover:underline cursor-pointer items-center" onClick={()=>router.push({
          pathname: `/courses/lessons/${props.lessonId}`,
          query: {
            course_id: props.courseId
          },
           shallow: false 
        })}>
                 <span> {lessonCompleted ?  <CheckCircleIcon />:  <RadioButtonUncheckedIcon />}</span>
            <span className='font-bold ml-1'>Lesson {props.index} : </span>
            <span>{props.name}</span>
        </div>
        {props.student ? 

<div>
{props.lessonType == "FILE" ? <DescriptionIcon />: <VideoLibraryIcon />} 

</div>  
         :
        <div>
              <DeleteIcon  className='cursor-pointer w-5' onClick={props.deleteLesson}/>
         
        </div>
}
      


    </div>
  )
}

export default LessonCard