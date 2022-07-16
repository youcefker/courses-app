import React from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';

function ProgressCard(props) {
  return (
    <div onClick={props.goToLesson} className='flex items-center justify-between bg-[#FAFAFA] rounded-[15px] py-4 px-6 cursor-pointer hover:bg-[#e1e1e1] courseCard mb-3'>
                    <div className="flex items-center">
                          <div className='w-[40px] mr-3'>
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
                                 textColor: '#079C49',
                                 trailColor: '#48DA6F',
                                 backgroundColor: '#3e98c7',
                               })}
                             />
                          </div>
                           
                        <div>
                            <h5 className='text-[#1F1F1F] text-[16px] cardHover'>{props.course}</h5>
                            <h6 className='text-[#9DA6BA] text-[14px] font-[400] cardHover'>{props.descrip}</h6>
                        </div>
                    </div>
                    <ChevronRightIcon className='text-[#9DA6BA] cardHover'/>
                    
     </div>
  )
}

export default ProgressCard