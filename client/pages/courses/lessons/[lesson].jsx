import Image from 'next/image'
import React from 'react'
import CourseCard from '../../../components/dashboard/courseCard'
import IndexPage from '../../../components/dashboard/indexPage'
import Sidebar from '../../../components/dashboard/sidebar'
import { useRouter, withRouter } from 'next/router'

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { withStyles } from '@mui/styles'

function TabPanel(props) {
   const { children, value, index, ...other } = props;
 
   return (
     <div
       role="tabpanel"
       hidden={value !== index}
       id={`full-width-tabpanel-${index}`}
       aria-labelledby={`full-width-tab-${index}`}
       {...other}
     >
       {value === index && (
         <Box sx={{ p: 1 }}>
           <Typography>{children}</Typography>
         </Box>
       )}
     </div>
   );
 }
 
 TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.number.isRequired,
   value: PropTypes.number.isRequired,
 };
 
 function a11yProps(index) {
   return {
     id: `full-width-tab-${index}`,
     'aria-controls': `full-width-tabpanel-${index}`,
   };
 }
 const CustomTab = withStyles({
   root: {
     textTransform: "unset" 
   }
 })(Tab);

function Lesson(props) {
   const theme = useTheme();
   const [value, setValue] = React.useState(0);
 
   const handleChange = (event, newValue) => {
     setValue(newValue);
   };
 
   const handleChangeIndex = (index) => {
     setValue(index);
   };
   console.log(props.router.query)
  return (
    <>
    <Sidebar active="courses" />
    <IndexPage>
       <h3 className='text-[#1F1F1F] text-[20px] font-[600]  '>Course : Javascript for web</h3>
       <h3 className='text-[#1F1F1F] text-[20px] font-[600] mt-3'>Lesson 1 : Algorithms</h3>
       <div className="grid grid-cols-1 lg:grid-cols-6 lg:gap-x-6 mt-6 w-full">


        <div className=' col-span-4'>
          <video  controls autoPlay>
             <source src="http://localhost:4000/api/v1/lesson/files/1657302261280lesson.mp4" type="video/mp4"/>
          </video>
          <div className='hidden sm:block mt-5'>
             <h3 className='text-[#1F1F1F] text-[20px] font-[600] mt-1'>About this course</h3>
             <h6 className='text-[#1F1F1F] text-[14px] font-[500] mt-3'>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem.

             </h6>
          </div>
        </div>

       <div className="mt-5 lg:mt-0 col-span-2 hidden sm:block">
                      
       <div className=' px-5 py-5 bg-[#fff] rounded-[15px]'>
           <h3 className='text-[#1F1F1F] text-[20px] font-[600] '>Necessery docs</h3> 
           <div className="doc my-6">
               <div className='flex p-3 items-center doc__card rounded-xl mb-5 cursor-pointer'>
                  <div className='border-b-2 border-[#1f1f1f] pb-1 px-2 mr-6'>
                      <Image src="/icons/doc.svg" width={35} height={40} />
                  </div>
                  <div>
                     <h3 className='text-[#1F1F1F] text-[16px] font-[600] '>firstDoc.xlsx</h3> 
                     <h3 className='text-[#079C49] text-[12px] font-[500] mt-1'>Download now.</h3> 
                  </div>
                  
               </div>
               <h6 className='text-[#1F1F1F] text-[12px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h6>
           </div>

           <div className="doc my-6">
               <div className='flex p-3 items-center doc__card rounded-xl mb-5 cursor-pointer'>
                  <div className='border-b-2 border-[#1f1f1f] pb-1 px-2 mr-6'>
                      <Image src="/icons/doc.svg" width={35} height={40} />
                  </div>
                  <div>
                     <h3 className='text-[#1F1F1F] text-[16px] font-[600] '>secondDoc.xlsx</h3> 
                     <h3 className='text-[#079C49] text-[12px] font-[500] mt-1'>Download now.</h3> 
                  </div>
                  
               </div>
               <h6 className='text-[#1F1F1F] text-[12px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h6>
           </div>
         
        </div>
          
          
          
          <div className="bg-[#fff] p-4 rounded-[15px] mt-4">
                   <h3 className='text-[#1F1F1F] font-[600] text-[20px]'>Upcoming courses</h3>
                   <div className=" my-4">
                       
                       <CourseCard name ="Lorem ipsum" descrip="Lesson 6" icon="/icons/courseIcon.svg" />
                       <CourseCard name ="Lorem ipsum" descrip="Lesson 6" icon="/icons/courseIcon.svg" />
                       <CourseCard name ="Lorem ipsum" descrip="Lesson 6" icon="/icons/courseIcon.svg" />

          </div>
       </div>
       

       </div>
       <div className="mobile_dash sm:hidden w-full flex flex-col items-center mt-10">
              <Box sx={{  width: "100%" }}>
              
                     <Tabs
                       value={value}
                       onChange={handleChange}
                       indicatorColor="secondary"
                       textColor="inherit"
                       sx={{p: 0}}
                       variant="fullWidth"
                       aria-label="full width tabs example"
                     >
                       <Tab label="About this course" sx={{textTransform : "unset",p:1, whiteSpace : "nowrap", fontSize: "12px", fontWeight : 600, color: "#000"}} {...a11yProps(0)} />
                       <Tab label="Necessery docs" sx={{textTransform : "unset", p:1,whiteSpace : "nowrap", fontSize: "12px", fontWeight : 600, color: "#000"}}  {...a11yProps(1)} />
                       <Tab label="Upcoming course" sx={{textTransform : "unset", p:1,whiteSpace : "nowrap", fontSize: "12px", fontWeight : 600, color: "#000"}}  {...a11yProps(2)} />
                     </Tabs>
                  
                   <SwipeableViews
                     axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                     index={value}
                     onChangeIndex={handleChangeIndex}
                   >
                     <TabPanel value={value} index={0} dir={theme.direction}>
                      <div className=' mt-5'>
                          <h3 className='text-[#1F1F1F] text-[18px] font-[600] mt-1'>About this course</h3>
                          <h6 className='text-[#1F1F1F] text-[12px] font-[500] mt-3'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem.
             
                          </h6>
                       </div>
                     </TabPanel>
                     <TabPanel value={value} index={1} dir={theme.direction}>
                     <div className=' py-5 bg-[#fff] rounded-[15px]'>
                        <h3 className='text-[#1F1F1F] text-[18px] font-[600] '>Necessery docs</h3> 
                        <div className="doc my-6">
                            <div className='flex p-3 items-center doc__card rounded-xl mb-5 cursor-pointer'>
                               <div className='border-b-2 border-[#1f1f1f] pb-1 px-2 mr-6'>
                                   <Image src="/icons/doc.svg" width={35} height={40} />
                               </div>
                               <div>
                                  <h3 className='text-[#1F1F1F] text-[16px] font-[600] '>firstDoc.xlsx</h3> 
                                  <h3 className='text-[#079C49] text-[12px] font-[500] mt-1'>Download now.</h3> 
                               </div>
                               
                            </div>
                            <h6 className='text-[#1F1F1F] text-[12px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h6>
                        </div>
             
                        <div className="doc my-6">
                            <div className='flex p-3 items-center doc__card rounded-xl mb-5 cursor-pointer'>
                               <div className='border-b-2 border-[#1f1f1f] pb-1 px-2 mr-6'>
                                   <Image src="/icons/doc.svg" width={35} height={40} />
                               </div>
                               <div>
                                  <h3 className='text-[#1F1F1F] text-[16px] font-[600] '>secondDoc.xlsx</h3> 
                                  <h3 className='text-[#079C49] text-[12px] font-[500] mt-1'>Download now.</h3> 
                               </div>
                               
                            </div>
                            <h6 className='text-[#1F1F1F] text-[12px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h6>
                        </div>
         
                      </div>
          
                     </TabPanel>
                     <TabPanel value={value} index={2} dir={theme.direction}>
                 
                      <div className="bg-[#fff] py-2 rounded-[15px] mt-4">
                               <h3 className='text-[#1F1F1F] font-[600] text-[18px]'>Upcoming courses</h3>
                               <div className=" my-2">
                                   
                                   <CourseCard name ="Lorem ipsum" descrip="Lesson 6" icon="/icons/courseIcon.svg" />
                                   <CourseCard name ="Lorem ipsum" descrip="Lesson 6" icon="/icons/courseIcon.svg" />
                                   <CourseCard name ="Lorem ipsum" descrip="Lesson 6" icon="/icons/courseIcon.svg" />
            
                               </div>
                      </div>
                     </TabPanel>
                   </SwipeableViews>
              </Box>
              
              </div>

      
      </div>
       
    </IndexPage>
    </>
  )
}

export default withRouter(Lesson)