import React from 'react'
import IndexPage from '../components/dashboard/indexPage'
import Sidebar from '../components/dashboard/sidebar'

function Courses() {
  return (
    <>
    <Sidebar active="courses" />
    <IndexPage>
        Courses
    </IndexPage>

    </>
  )
}

export default Courses