import { useState, useEffect } from "react";
import { FaPlus, FaUser, FaWarehouse, FaPhone } from "react-icons/fa";
import { useSelector,useDispatch } from "react-redux";
import { addTask, deleteTask, updateTask } from "../../redux/slices/task/taskSlice";
function Task() {
  
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    assigned: "",
    priority: "",
    status: "",
    deadline: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const dispatch=useDispatch()
  const employees = useSelector((state) => state.employees.empDetails);
  const taskDetails = useSelector((state) => state.tasks.taskDetails);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!formData.id || !formData.title || !formData.assigned) {
    alert("Please fill all fields");
    return;
  }

  if (isEditing) {
    dispatch(updateTask(formData));
    setFormData({
    id: "",
    title: "",
    assigned: "",
    priority: "",
    status: "",
    deadline: "",
  });
    setIsEditing(false);
  } else {
    dispatch(addTask(formData));
  }

  setFormData({
    id: "",
    title: "",
    assigned: "",
    priority: "",
    status: "",
    deadline: "",
  });

  setToggle(false);
};
  const handleEdit = (id) => {
  const taskToEdit = taskDetails.find((task) => task.id === id);

  if (taskToEdit) {
    setFormData(taskToEdit);
    setIsEditing(true);
    setToggle(true);
  }
};

  const handleDelete = (id) => {
   dispatch(deleteTask(id))
  };
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();

    if (value === "") {
      setFiltered([]);
      return;
    }

    const searchData = taskDetails.filter(
      (task) =>
        task.title.toLowerCase().includes(value) ||
        task.assigned.toLowerCase().includes(value) ||
        task.priority.toLowerCase().includes(value) ||
        task.status.toLowerCase().includes(value),
    );

    setFiltered(searchData);
  };
  return (
    <>
      <main className="w-full">
        {toggle && (
          <section className="fixed inset-0 w-full  flex justify-center items-center z-50">
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
                onClick={() => setToggle(false)}
                className="absolute top-3 right-3 text-xl font-bold"
              >
                ✕{" "}
              </button>
              <div className="md:w-80 flex items-center flex-col gap-4 mt-4 ">
                <label htmlFor="id">ID:</label>
                <input
                  type="number"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  className=" p-2 border-2 border-gray-400 bg-gray-100  dark:bg-sky-800 text-black dark:text-white outline-0"
                />

                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className=" p-2 border-2 border-gray-400 bg-gray-100 dark:bg-sky-800 text-black dark:text-white outline-0"
                />
              </div>
              <div className="md:w-80 flex items-center flex-col gap-4 mt-4 ">
                <label htmlFor="assigned">Assigned To:</label>
               <select
  name="assigned"
  value={formData.assigned}
  onChange={handleChange}
  className="p-2 border-2 border-gray-400 bg-gray-100 dark:bg-sky-800"
>
  <option value="">Select Employee</option>

  {employees?.map((emp) => (
    <option key={emp.id} value={emp.empName}>
      {emp.empName}
    </option>
  ))}
</select>
                <label htmlFor="priority">Priority:</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className=" p-2 border-2 border-gray-400 bg-gray-100 dark:bg-sky-800 text-black dark:text-white outline-0"
                >
                  <option value="">Select </option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <label htmlFor="status">Status:</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className=" p-2 border-2 border-gray-400 bg-gray-100 dark:bg-sky-800 text-black dark:text-white outline-0"
                >
                  <option value="">Select </option>
                  <option value="InProgress">InProgress</option>
                  <option value="Pending">Pending</option>
                  <option value="Complete">Complete</option>
                </select>
                <label htmlFor="deadline">Deadline:</label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className=" p-2 border-2 border-gray-400 bg-gray-100 dark:bg-sky-800 text-black dark:text-white outline-0"
                />
              </div>
              <div className="md:w-1/2 flex items-center flex-col gap-4 mt-4 ">
                <button
                  type="submit"
                  className="border-2 border-blue-500 bg-blue-300 p-3 hover:bg-blue-200  "
                >
                  Add Task
                </button>
              </div>
            </form>
          </section>
        )}

        
        <section className="flex justify-between items-center mt-4">
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
          <table className="rounded-2xl md:w-11/12 mt-4 shadow-2xl shadow-gray-600 bg-gray-300 dark:bg-linear-to-r from-cyan-600 to-violet-500 text-black dark:text-white">
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
                    <FaWarehouse />
                    Title
                  </div>
                </th>

                <th className="md:p-4">
                  <div className="flex items-center justify-center gap-2">
                    <FaUser />
                    Assigned To
                  </div>
                </th>

                <th className="md:p-4">
                  <div className="flex items-center justify-center gap-2">
                    <FaPhone />
                    Priority
                  </div>
                </th>
                <th className="md:p-4">
                  <div className="flex items-center justify-center gap-2">
                    <FaPhone />
                    Status
                  </div>
                </th>
                <th className="md:p-4">
                  <div className="flex items-center justify-center gap-2">
                    <FaPhone />
                    Deadline
                  </div>
                </th>
                <th className="md:p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {(filtered.length > 0 ? filtered : taskDetails).map((task) => (
                <tr
                  key={task.id}
                  className="text-center border-b border-gray-400"
                >
                  <td className="md:p-3">{task.id}</td>

                  <td className="md:p-3">{task.title}</td>

                  <td className="md:p-3">{task.assigned}</td>

                  <td className="md:p-3">{task.priority}</td>

                  <td className="md:p-3">{task.status}</td>

                  <td className="md:p-3">{task.deadline}</td>
                  <td className="md:p-3 flex gap-2 justify-center">
                    <button
                      className="md:p-2 text-gray-200 rounded-lg border-2 border-sky-300 bg-sky-500 hover:bg-sky-300 cursor-pointer"
                      onClick={() => {
                        handleEdit(task.id);
                        setToggle(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="md:p-2 text-gray-200 rounded-lg border-2 border-red-300 bg-red-500 hover:bg-red-300 cursor-pointer"
                      onClick={() => handleDelete(task.id)}
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

export default Task;
