import React from 'react'
import { FaBagShopping } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <>
  
 <nav className="bg-cyan-900 shadow shadow-gray-300 w-full px-8 md:px-auto">
      <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">

        {/* Logo */}
        <div className="text-indigo-200 md:order-1 text-2xl">
          <FaBagShopping/>
        </div>

        {/* Menu */}
        <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
          <ul className="flex font-semibold justify-between">
            <li className="md:px-3 md:py-2 text-indigo-200">
              <NavLink to='/dashboard' className={({ isActive }) =>
              isActive
                ? "bg-sky-300 text-black p-2 rounded"
                : "bg-cyan-950 p-2 rounded"
            }>Dashboard</NavLink>
            </li>
            <li className="md:px-4 md:py-2 hover:text-indigo-300">
              <NavLink to='/attend' className={({ isActive }) =>
              isActive
                ? "bg-sky-300 text-black p-2 rounded"
                : "bg-cyan-950 p-2 rounded"
            }>Attendance</NavLink>
            </li>
            <li className="md:px-4 md:py-2 hover:text-indigo-100">
              <NavLink to='/emp' className={({ isActive }) =>
              isActive
                ? "bg-sky-300 text-black p-2 rounded"
                : "bg-cyan-950 p-2 rounded"
            }>Employee</NavLink>
            </li>
           
          </ul>
        </div>

        {/* Login Button */}
        <div className="order-2 md:order-3">
          <button className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
            <NavLink to='/login'>
            <span className='flex gap-1 items-center'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Logout</span>
            </span>
            </NavLink>
          </button>
        </div>

      </div>
    </nav>
    </>
  )
}

export default NavBar