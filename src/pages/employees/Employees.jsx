import { useState, useEffect } from "react";
import { FaPlus, FaUser, FaWarehouse, FaPhone } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import {
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from '../../redux/slices/employees/employeeSlice';
function Employees() {
  
  const [formData, setFormData] = useState({
    id: "",
    empName: "",
    department: "",
    brand: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [filtered, setFiltered] = useState([]);
const dispatch = useDispatch();

const empDetails = useSelector(
  (state) => state.employees.empDetails
);
const brandDetails = useSelector((state) => state.brands.brandDetails) || [];
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (isEditing) {
    dispatch(updateEmployee(formData));
    setFormData({
    id: "",
    empName: "",
    department: "",
    brand: "",
    email: "",
    phone: "",
  });
    setIsEditing(false);
  } else {
    if (
      !formData.id ||
      !formData.empName ||
      !formData.department ||
      !formData.brand ||
      !formData.email ||
      !formData.phone
    ) {
      alert("Please fill all fields");
      return;
    }

    dispatch(addEmployee(formData));
  }

  setFormData({
    id: "",
    empName: "",
    department: "",
    brand: "",
    email: "",
    phone: "",
  });
};
  const handleEdit = (id) => {
  const empToEdit = empDetails.find((emp) => emp.id === id);

  if (empToEdit) {
    setFormData(empToEdit);
    setIsEditing(true);
    setToggle(true);
  }
};
  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };
const handleSearch = (e) => {
  const value = e.target.value.toLowerCase();

  if (!value) {
    setFiltered([]);
    return;
  }

  setFiltered(
    empDetails.filter((emp) =>
      emp.empName.toLowerCase().includes(value)||
       emp.brand.toLowerCase().includes(value)||
       emp.department.toLowerCase().includes(value)
    )
  );
};

  return (
    <>
      <main className="w-full ">
        {toggle && (
          <section className="fixed inset-0 w-full  flex  justify-center items-center z-50">
            <form
              onSubmit={handleSubmit}
              className=" flex flex-col md:flex-row md:flex-wrap
    justify-center items-center
    gap-6
    border-2 border-sky-700
    dark:bg-linear-to-r from-cyan-600 to-gray-500
    rounded-xl
    w-[90%] md:w-200
    max-h-[90vh]
    p-6
    relative"
            >
              <button
                type="button"
                onClick={() => setToggle(false)}
                className="absolute top-3 right-3 text-xl font-bold"
              >
                ✕{" "}
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
                <input
                  type="text"
                  id="empName"
                  name="empName"
                  value={formData.empName}
                  onChange={handleChange}
                  className=" p-2 border-2 border-gray-400 bg-gray-100 dark:bg-sky-800 text-black dark:text-white outline-0"
                />
              </div>
              <div className="md:w-80 flex items-center flex-col gap-4 mt-4 ">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className=" p-2 border-2 border-gray-400 bg-gray-100 dark:bg-sky-800 text-black dark:text-white outline-0"
                />
                <label htmlFor="brand">Assigned Brand:</label>
                <select
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className=" p-2 border-2 border-gray-400 bg-gray-100 dark:bg-sky-800 text-black dark:text-white outline-0"
                ><option value="">Select Brand</option>

  {brandDetails.map((brand) => (
  <option key={brand.id} value={brand.brandName}>
    {brand.brandName}
  </option>
))}
</select>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className=" p-2 border-2 border-gray-400 bg-gray-100 dark:bg-sky-800 text-black dark:text-white outline-0"
                />
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className=" p-2 border-2 border-gray-400 bg-gray-100 dark:bg-sky-800 text-black dark:text-white outline-0"
                />
              </div>
              <div className="w-full flex justify-center mt-4 ">
                <button
                  type="submit"
                  className="border-2 border-blue-500 bg-blue-300 p-3 hover:bg-blue-200  "
                >
                  Add Employee
                </button>
              </div>
            </form>
          </section>
        )}

        

        <section className="flex justify-between items-center mt-6">
          <input
            type="search"
            name="search"
            id="search"
            onChange={handleSearch}
            className="w-3/4 ml-4 p-2 border-2 border-cyan-500 bg-cyan-800 outline-0 rounded-2xl "
            placeholder="Search"
          />
          <h3
            className="mr-8"
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            <FaPlus />
          </h3>
        </section>
        <section className="md:flex justify-center overflow-x-auto mt-9">
          <table className="rounded-2xl md:w-2/4 mt-4 shadow-2xl shadow-gray-600 bg-gray-300 dark:bg-linear-to-r from-cyan-600 to-violet-500 text-black dark:text-white">
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
                    Employee Name
                  </div>
                </th>

                <th className="md:p-4">
                  <div className="flex items-center justify-center gap-2">
                    <FaUser />
                    Department
                  </div>
                </th>

                <th className="md:p-4">
                  <div className="flex items-center justify-center gap-2">
                    <FaWarehouse />
                    Assignend Brand
                  </div>
                </th>
                <th className="md:p-4">
                  <div className="flex items-center justify-center gap-2">
                    <FaPhone />
                    Email
                  </div>
                </th>
                <th className="md:p-4">
                  <div className="flex items-center justify-center gap-2">
                    <FaPhone />
                    Phone
                  </div>
                </th>
                <th className="md:p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {(filtered.length > 0 ? filtered : empDetails).map((emp) => (
                <tr
                  key={emp.id}
                  className="text-center border-b border-gray-400"
                >
                  <td className="md:p-3">{emp.id}</td>

                  <td className="md:p-3">{emp.empName}</td>

                  <td className="md:p-3">{emp.department}</td>

                  <td className="md:p-3">{emp.brand}</td>

                  <td className="md:p-3">{emp.email}</td>

                  <td className="md:p-3">{emp.phone}</td>
                  <td className="md:p-3 flex gap-2 justify-center">
                    <button
                      className="md:p-2 text-gray-200 rounded-lg border-2 border-sky-300 bg-sky-500 hover:bg-sky-300 cursor-pointer"
                      onClick={() => {
                        handleEdit(emp.id);
                        setToggle(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="md:p-2 text-gray-200 rounded-lg border-2 border-red-300 bg-red-500 hover:bg-red-300 cursor-pointer"
                      onClick={() => handleDelete(emp.id)}
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

export default Employees;
