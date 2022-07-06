import { Button } from '@mui/material';
import React from 'react'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';

function StudentRow(props) {
  return (
    <div className="grid grid-cols-4 mt-6 items-center">
        <h5 className='text-[#1F1F1F] text-[12px]  '>{props.name}</h5>
        <h5 className='text-[#1F1F1F] text-[12px]  col-span-2'>{props.cours}</h5>
   

        {props.progress && (
             <div className='w-[40px]  mx-auto'>
             <CircularProgressbar
               value={props.progress}
               text={`${props.progress}%`}
               
               backgroundColor="#48DA6F"
               
               styles={buildStyles({
                 // Rotation of path and trail, in number of turns (0-1)
                 rotation: 0.25,
             
                 // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                 strokeLinecap: 'butt',
             
                 // Text size
                 textSize: '22px',
                 
                 
                 
                 // How long animation takes to go from one percentage to another, in seconds
                 pathTransitionDuration: 0.5,
             
                 // Can specify path transition in more detail, or remove it entirely
                 // pathTransition: 'none',
             
                 // Colors
                 pathColor: "#079C49",
                 textColor: '#000',
                 trailColor: '#fff',
                 backgroundColor: '#3e98c7',
               })}
             />
          </div>        
        )}

        {props.actions &&(
             <div className='flex'>
                <Button onClick={props.refuse} className='normal-case hover:bg-[#EE1D5295] rounded-[10px] text-[13px] text-[#EE1D52] bg-[#EE1D5278] mr-2 h-[30px] w-[50%]'>Refuse</Button>
                <Button onClick={props.accept} className='normal-case hover:bg-[#34A8538C] rounded-[10px] text-[13px] text-[#34A853] bg-[#34A8535C] h-[30px] w-[50%]'>Accept</Button>
             </div>
        )}
        
    </div>
  )


  }
export default StudentRow;