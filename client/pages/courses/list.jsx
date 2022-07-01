import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import IndexPage from '../../components/dashboard/indexPage'
import Sidebar from '../../components/dashboard/sidebar'

function Courses() {
  const router = useRouter()
  return (
    <>
    <Sidebar active="courses" />
    <IndexPage>
        <Button className='normal-case bg-[#079C49] text-[#fff] font-bold' onClick={()=> router.push("/courses/add")}>Add Course</Button>
    </IndexPage>

    </>
  )
}

export default Courses