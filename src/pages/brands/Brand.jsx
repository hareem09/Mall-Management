import { useState, useEffect } from "react";
import { FaPlus, FaUser, FaWarehouse, FaPhone } from "react-icons/fa";
import { useDispatch,useSelector } from "react-redux";
import { addBrand, deleteBrand } from "../../redux/slices/brand/brandSlice";

function Brand() {
  
  const [formData, setFormData] = useState({
    id: "",
    brandName: "",
    owner: "",
    contact: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const dispatch=useDispatch()

  const brandDetails = useSelector(
  (state) => state.brands.brandDetails
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
      dispatch(addBrand(formData))
      setFormData({
        id: "",
    brandName: "",
    owner: "",
    contact: "",
      });
      setIsEditing(false);
    } else {
      if (
        !formData.id ||
        !formData.brandName ||
        !formData.owner ||
        !formData.contact
      ) {
        alert("Please fill all the fields");
        return;
      }
      dispatch(addBrand(formData))
      setFormData({
        id: "",
        brandName: "",
        owner: "",
        contact: "",
      });
    }
  };
  const handleEdit = (id) => {
    const brandToEdit = brandDetails.find((brand) => brand.id === id);
    if (brandToEdit) {
      setFormData(brandToEdit);
      setIsEditing(true);
      setToggle(true)
    }
  };
  
  const handleDelete = (id) => {
   dispatch(deleteBrand(id))
  };
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();

    if (value === "") {
      setFiltered([]);
      return;
    }

    const searchData = brandDetails.filter(
      (brand) =>
        brand.brandName.toLowerCase().includes(value) ||
        brand.owner.toLowerCase().includes(value),
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
              className=" flex border-2 border-sky-700 dark:bg-linear-to-r from-cyan-600 to-gray-500 flex-col md:justify-center md:items-center flex-wrap rounded-xl w-[90%] md:w-100 relative"
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

                <label htmlFor="brandName">Brand Name:</label>
                <input
                  type="text"
                  id="brandName"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  className=" p-2 border-2 border-gray-400 bg-gray-100 dark:bg-sky-800 text-black dark:text-white outline-0"
                />
              </div>
              <div className="md:w-80 flex items-center flex-col gap-4 mt-4 ">
                <label htmlFor="owner">Owner</label>
                <input
                  type="text"
                  id="owner"
                  name="owner"
                  value={formData.owner}
                  onChange={handleChange}
                  className=" p-2 border-2 border-gray-400 bg-gray-100 dark:bg-sky-800 text-black dark:text-white outline-0"
                />
                <label htmlFor="contact">Contact:</label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className=" p-2 border-2 border-gray-400 bg-gray-100 dark:bg-sky-800 text-black dark:text-white outline-0"
                />
              </div>
              <div className="md:w-1/2 flex items-center flex-col gap-4 mt-4 ">
                <button
                  type="submit"
                  className="border-2 border-blue-500 bg-blue-300 p-3 hover:bg-blue-200  "
                >
                  Add Brand
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="flex justify-between items-center mt-8">
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
          <table className="rounded-2xl md:w-3/4 mt-4 shadow-2xl shadow-gray-600 bg-gray-300 dark:bg-linear-to-r from-cyan-600 to-indigo-500 text-black dark:text-white">
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
                    Brand Name
                  </div>
                </th>

                <th className="md:p-4">
                  <div className="flex items-center justify-center gap-2">
                    <FaUser />
                    Owner
                  </div>
                </th>

                <th className="md:p-4">
                  <div className="flex items-center justify-center gap-2">
                    <FaPhone />
                    Contact
                  </div>
                </th>

                <th className="md:md:p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {(filtered.length > 0 ? filtered : brandDetails).map((brand) => (
                <tr
                  key={brand.id}
                  className="text-center border-b border-gray-400"
                >
                  <td className="md:p-3">{brand.id}</td>

                  <td className="md:p-3">{brand.brandName}</td>

                  <td className="md:p-3">{brand.owner}</td>

                  <td className="md:p-3">{brand.contact}</td>

                  <td className="md:p-3 flex gap-2 justify-center">
                    <button
                      className="md:p-2 text-gray-200 rounded-lg border-2 border-sky-300 bg-sky-500 hover:bg-sky-300 cursor-pointer"
                      onClick={() => {
                        (handleEdit(brand.id), setToggle(true));
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="md:p-2 text-gray-200 rounded-lg border-2 border-red-300 bg-red-500 hover:bg-red-300 cursor-pointer"
                      onClick={() => handleDelete(brand.id)}
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

export default Brand;
