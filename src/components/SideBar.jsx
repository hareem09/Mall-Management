
import { FaHome } from "react-icons/fa";
import { FaBagShopping, FaClipboardList, FaClipboardUser, FaUserGroup } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <aside className="md:w-80 min-h-48 border-r-2  md:min-h-screen flex flex-col items-stretch gap-10 bg-cyan-950 border-r-cyan-900 text-gray-50">
      
      <span className="italic md:text-2xl  ">
        <h2 className="text-center shadow-2xl shadow-cyan-600 flex md:gap-5 md:mt-6"><FaBagShopping/>Mall Management System</h2>
        <hr className="text-cyan-900 border-b-2 border-b-cyan-900 md:mt-4 md:m-2"/>
      </span>
       
      <ul className="flex gap-3 flex-wrap md:flex-nowrap  md:flex-col">
       <span className="flex  items-center md:ml-2">
        <FaHome/>
        <li className="md:m-5 ">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "bg-sky-300 text-black p-2 rounded"
                : "bg-cyan-950 p-2 rounded"
            }
          >
            Dashboard
          </NavLink>
        </li>
        
        </span>
        <hr className="text-cyan-900  m-1"/>
        <span className="flex items-center md:ml-2">
        <FaBagShopping/>
        <li className="md:m-5">
          <NavLink
            to="/brand"
            className={({ isActive }) =>
              isActive
                ? "bg-sky-300 text-black p-2 rounded"
                : "bg-cyan-950 p-2 rounded"
            }
          >
            Brand Management
          </NavLink>
        </li>
        </span>
        <hr className="text-cyan-900  md:m-1"/>
        <span className="flex  items-center md:ml-2">
        <FaBagShopping/>
        <li className="md:m-5">
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive
                ? "bg-sky-300 text-black p-2 rounded"
                : "bg-cyan-950 p-2 rounded"
            }
          >
            Shop and Outlets
          </NavLink>
        </li>
        </span>
        <hr className="text-cyan-900  md:m-1"/>
        <span className="flex  items-center md:ml-2">
        <FaUserGroup/>
        <li className="md:m-5">
          <NavLink
            to="/emp"
            className={({ isActive }) =>
              isActive
                ? "bg-sky-300 text-black p-2 rounded"
                : "bg-cyan-950 p-2 rounded"
            }
          >
            Employees
          </NavLink>
        </li>
        </span>
        <hr className="text-cyan-900  md:m-1"/>
        <span className="flex items-center md:ml-2">
        <FaClipboardUser/>
            <li className="md:m-5">
          <NavLink
            to="/attend"
            className={({ isActive }) =>
              isActive
                ? "bg-sky-300 text-black p-2 rounded"
                : "bg-cyan-950 p-2 rounded"
            }
          >
            Attendance
          </NavLink>
        </li>
        </span>
        <hr className="text-cyan-900 md:m-1"/>
        <span className="flex  items-center md:ml-2">
        <FaClipboardList/>
         <li className="md:m-5">
          <NavLink
            to="/task"
            className={({ isActive }) =>
              isActive
                ? "bg-sky-300 text-black p-2 rounded"
                : "bg-cyan-950 p-2 rounded"
            }
          >
            Tasks
          </NavLink>
        </li>
        </span>
        <hr className="text-cyan-900 m-1"/>
      </ul>
    </aside>
  );
}

export default SideBar