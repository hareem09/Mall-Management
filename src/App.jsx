
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout'
import Login from './pages/auth/Login'
import './App.css'
import Signup from './pages/auth/Signup';
import Dashboard from './pages/dashboard/Dasboard';
import Brand from './pages/brands/Brand';
import Shop from './pages/shops/Shop';
import Employees from './pages/employees/Employees';
import Attendance from './pages/attendance/Attendance';
import Task from './pages/tasks/Task';
function App() {


  return (
      <>
    
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />  
            <Route path="/signup" element={<Signup />} />  
            <Route path="/" element={<Layout />} >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/emp" element={<Employees />} />
            <Route path="/attend" element={<Attendance />} />
            <Route path="/task" element={<Task />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
