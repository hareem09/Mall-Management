import { useState, useEffect } from "react";
import { FaPlus, FaUser, FaWarehouse, FaClock,FaPhone,FaCalendarAlt,FaCalendarCheck} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import {
  addAttendance,
  updateAttendance,
  deleteAttendance
} from '../../redux/slices/attendance/attendanceSlice'
function Attendance() {
  
  const[presentData,setPresentData]=useState('')
  const[absentData,setAbsentData]=useState('')
  const [formData, setFormData] = useState({
    id: "",
    empName: "",
    date: "",
    time: "",
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [filtered,setFiltered]=useState([])
  const dispatch = useDispatch();

  const employees = useSelector(
  (state) => state.employees.empDetails
);
  const attendDetails = useSelector(
  (state) => state.attendance.attendanceDetails
);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateAttendance(formData));
       setFormData({
        id: "",
        empName: "",
        date: "",
        time: "",
        status: "",
      });
      setIsEditing(false);
    } else {
      if (
        !formData.id ||
        !formData.empName ||
        !formData.date ||
        !formData.time ||
        !formData.status
      ) {
        alert("Please fill all the fields");
      }
       
      dispatch(addAttendance(formData))
      setFormData({
        id: "",
        empName: "",
        date: "",
        time: "",
        status: "",
      });
    }
  };
const handleEdit = (id) => {
  const attendToEdit = attendDetails.find((attend) => attend.id === id);

  if (attendToEdit) {
    setFormData(attendToEdit);
    setIsEditing(true);
    setToggle(true);
  }
} 

  const handleDelete = (id) => {
   dispatch(deleteAttendance(id))
  };

  useEffect(() => {
  const present = attendDetails.filter(
    (attend) => attend.status === "Present"
  );

  const absent = attendDetails.filter(
    (attend) => attend.status === "Absent"
  );

  setPresentData(present.length);
  setAbsentData(absent.length);
}, [attendDetails]);

const handleSearch = (e) => {
  const value = e.target.value.toLowerCase();

  if (!value) {
    setFiltered([]);
    return;
  }

  setFiltered(
    attendDetails.filter(
      (attend) =>
        attend.empName.toLowerCase().includes(value) ||
        attend.status.toLowerCase().includes(value)
    )
  );
};
  return (
    <>
      <main className="w-full">

        {toggle && (
          <section className="fixed inset-0 w-full  flex  justify-center items-center z-50">
            <form
              onSubmit={handleSubmit}
              className=" flex flex-col md:flex-row md:flex-wrap
      justify-center items-center
      gap-6
      border-2 border-sky-700
      bg-sky-900
      rounded-xl
      w-[90%] md:w-200
      max-h-[90vh]
      p-6
      relative"
            >
              <button
                onClick={() => setToggle(false)}
                className="absolute top-3 right-3 text-xl font-bold"
              >
                ✕
              </button>
              <div className="w-full md:w-[45%] flex flex-col items-center gap-4 ">
                <label htmlFor="id">ID:</label>
                <input
                  type="number"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  className=" p-2 border-2 border-gray-400 bg-gray-100  dark:bg-sky-800 text-black dark:text-white outline-0"
                />

                <label htmlFor="empName">Employee Name:</label>
                <select
  name="empName"
  value={formData.empName}
  onChange={handleChange}
  className="p-2 border-2 border-gray-400 bg-gray-100 dark:bg-sky-800"
>
  <option value="">Select Employee</option>

  {employees.map((emp) => (
    <option key={emp.id} value={emp.empName}>
      {emp.empName}
    </option>
  ))}
</select>
              </div>
              <div className="md:w-80 flex items-center flex-col gap-4 mt-4 ">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className=" p-2 border-2 border-gray-400 bg-gray-100 dark:bg-sky-800 text-black dark:text-white outline-0"
                />
                <label htmlFor="time">Check-In Time:</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className=" p-2 border-2 border-gray-400 bg-gray-100 dark:bg-sky-800 text-black dark:text-white outline-0"
                />{" "}
                <label htmlFor="status">Status:</label>
                <input
                  type="text"
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className=" p-2 border-2 border-gray-400 bg-gray-100 dark:bg-sky-800 text-black dark:text-white outline-0"
                />
              </div>
              <div className="w-full flex justify-center mt-4 ">
                <button
                  type="submit"
                  className="border-2 border-blue-500 bg-blue-300 p-3 hover:bg-blue-200  "
                >
                  Add Attendance
                </button>
              </div>
            </form>
          </section>
        )}

        <section className='flex justify-around items-center mt-4'>
          <input type="search" name="search" id="search" onChange={handleSearch} className="w-3/5 ml-4 p-2 border-2 border-cyan-500 bg-cyan-800 outline-0 rounded-2xl " placeholder='Search'/>
           <h3
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            <FaPlus />
          </h3>
          </section>
         <section className=" mt-5 flex  justify-around">
            <section className="w-40 p-4 border-2 border-gray-200 rounded-2xl bg-linear-to-r from-cyan-600 to-gray-500"><h2> Total Present:</h2>
         <p>{presentData}</p>
         </section>
         <section className="w-40 p-4 border-2 border-gray-200 rounded-2xl bg-linear-to-r from-cyan-600 to-gray-500">
            <h2>Total Absent:</h2>
          <p>{absentData}</p>
          </section>
         </section>
         
        <section className="md:flex justify-center overflow-x-auto mt-9">
          <table className="rounded-2xl md:w-11/12 md:mt-4 shadow-stone-950 bg-gray-300 dark:bg-linear-to-r from-cyan-600 to-gray-500 text-black dark:text-white">
            <thead>
              <tr className="text-center border-b-2 border-gray-500">
                <th className="md:p-4">
                  <div className="flex items-center justify-center gap-2">
                    <FaUser />
                    ID
                  </div>
                </th>

                <th className="md:p-4">
                  <div className="flex items-center justify-center gap-2">
                    <FaUser />
                    Employee
                  </div>
                </th>

                <th className="md:p-4">
                  <div className="flex items-center justify-center gap-2">
                    <FaCalendarAlt />
                    Date
                  </div>
                </th>

                <th className="md:p-4">
                  <div className="flex items-center justify-center gap-2">
                    <FaClock />
                    Check-In Time
                  </div>
                </th>
                <th className="md:p-4">
                  <div className="flex items-center justify-center gap-2">
                    <FaCalendarCheck />
                    Status
                  </div>
                </th>
                <th className="md:p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {(filtered.length > 0 ? filtered : attendDetails).map((attend) => (
                <tr
                  key={attend.id}
                  className="text-center border-b border-gray-400"
                >
                  <td className="md:p-3">{attend.id}</td>

                  <td className="md:p-3">{attend.empName}</td>

                  <td className="md:p-3">{attend.date}</td>

                  <td className="md:p-3">{attend.time}</td>

                  <td className="md:p-3">
                    {attend.status === "Present" ? (
                      <span className="badge bg-success text-green-300">Present</span>
                    ) : (
                      <span className="badge bg-danger text-red-200">Absent</span>
                    )}
                  </td>

                  <td className="md:p-3 flex gap-2 justify-center">
                    <button
                      className="md:p-2 text-gray-200 rounded-lg border-2 border-sky-300 bg-sky-500 hover:bg-sky-300 cursor-pointer"
                      onClick={() => {
                        (handleEdit(attend.id), setToggle(true));
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="md:p-2 text-gray-200 rounded-lg border-2 border-red-300 bg-red-500 hover:bg-red-300 cursor-pointer"
                      onClick={() => handleDelete(attend.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

export default Attendance;
