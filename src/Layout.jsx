import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import  { useState,useEffect } from 'react'
import { Outlet } from 'react-router-dom';
function Layout() {

  return (
    <>
    
    <div className='md:flex md:min-h-screen'  >
         <SideBar />
     <main className='md:w-3/4 min-h-screen bg-gray-300 dark:bg-linear-to-r from-cyan-950 to-sky-950 dark:text-white'>
      <NavBar/>
        <Outlet />
     </main>
     </div>
    </>
  )
}

export default Layout