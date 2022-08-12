import { Button } from '@mui/material';
import React from 'react'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';

function StudentRow(props) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 mt-6 items-center">
        <h5 className='text-[#1F1F1F] text-[12px]  '>{props.name}</h5>
        <h5 className={props.actions ?  'text-[#1F1F1F] text-[12px] sm:col-span-2': "text-[#1F1F1F] text-[12px]"}>{props.cours}</h5>
   

        {(props.progress != -1 && props.progress != undefined) && (
             <div className='w-[60px]   mx-auto'>
             <CircularProgressbar
               value={props.progress}
               text={`${props.progress}%`}
               
               backgroundColor="#48DA6F"
               
               styles={buildStyles({
                 // Rotation of path and trail, in number of turns (0-1)
                 rotation: 0,
            
                 // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                 strokeLinecap: 'butt',
             
                 // Text size
                 textSize: '20px',
                 
                 
                 
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
         {props.progress == -1 && (
          <div className='mx-auto text-[14px]'>
            0%
          </div>
          )}

        {props.actions &&(
             <div className='flex'>
                <button onClick={props.refuse} className='normal-case hover:bg-[#EE1D5295] rounded-[10px] text-[10px] sm:text-[13px] lg:text-[10px] xl:text-[13px] text-[#EE1D52] bg-[#EE1D5278] mr-2 h-[30px] w-[50%]'>Refuse</button>
                <button onClick={props.accept} className='normal-case hover:bg-[#34A8538C] rounded-[10px] text-[10px] sm:text-[13px] lg:text-[10px] xl:text-[13px] text-[#34A853] bg-[#34A8535C] h-[30px] w-[50%]'>Accept</button>
             </div>
        )}
          {props.delete &&(
             <div className='flex justify-center'>
                <button onClick={props.deleteStudent} className='normal-case hover:bg-[#EE1D5295] rounded-[10px] text-[10px] sm:text-[13px] lg:text-[10px] xl:text-[13px] text-[#EE1D52] bg-[#EE1D5278]  h-[30px] w-[100px]'>Delete</button>
             </div>
        )}
        
    </div>
  )


  }
export default StudentRow;