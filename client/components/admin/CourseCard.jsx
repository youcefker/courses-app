import React, { useEffect } from 'react'
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import TimerIcon from '@mui/icons-material/Timer';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/router';

const options = [
  'Activate',
  'Desactivate',
  'Delete',

];

const ITEM_HEIGHT = 48;

function CourseCard(props) {

  const router = useRouter()
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    props.fetchLessons()
  }, [])
  
  return (
    <div className='bg-white rounded-lg overflow-hidden'>
      <div className='bg-[green] h-2 w-full'></div>
      <div className='px-4 py-5'>
        <div className="flex justify-between items-center">
          <h3 className='text-xl mb-3' onClick={()=> router.push(`/courses/detail/${props.id}`)} style={{cursor : "pointer"}}>{props.name}</h3>
          <div>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                style={{ transform : "rotate(90deg)",marginBottom : "10px"}}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                   
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
          </div>
        </div>

        <div onClick={()=> router.push(`/courses/detail/${props.id}`)} style={{cursor : "pointer"}}>

   
           <p className='text-[gray] my-2'>{props.description}</p>
  
  
           <div className='text-[#9DA6BA] flex items-center text-sm mb-3 mt-5'>
             <PersonIcon style={{fontSize : "18px"}}/>
             <span className='ml-2'>Teacher name </span>
           </div>
  
  
           <div className="flex justify-between text-[#9DA6BA] text-sm mb-5">
             <div className='flex items-center'>
               <PlayLessonIcon style={{fontSize : "18px"}} />
               <span className='ml-2'><span>{props.nbrLessons}</span> Lessons </span>
             </div>
             <div className='flex items-center'>
               <TimerIcon style={{fontSize : "18px"}}/>
               <span className='ml-2'><span>20</span> hours </span>
             </div>
           </div>
  
  
           <div className='flex justify-center'>
             <AvatarGroup max={4}>
               <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
               <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
               <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
               <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
               <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
             </AvatarGroup>
           </div>
          </div>
      </div>
    </div>
  )
}

export default CourseCard