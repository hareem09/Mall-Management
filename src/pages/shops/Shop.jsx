import { useState, useEffect } from "react";
import { FaPlus, FaUser, FaWarehouse, FaPhone } from "react-icons/fa";
import { useSelector,useDispatch } from "react-redux";
import {
  addShop,
  updateShop,
  deleteShop
} from '../../redux/slices/shops/shopSlice' 
function Shop() {
  
  const [formData, setFormData] = useState({
    id: "",
    shopName: "",
    floor: "",
    category: "",
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const dispatch=useDispatch()
  const shopDetails = useSelector(
  (state) => state.shops.shopDetails
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
      dispatch(updateShop(formData));
      setFormData({
        id: "",
        shopName: "",
        floor: "",
        category: "",
        status: "",
      });
      setIsEditing(false);
    } else {
      if (
        !formData.id ||
        !formData.shopName ||
        !formData.floor ||
        !formData.category ||
        !formData.status
      ) {
        alert("Please fill all the fields");
      }
     dispatch(addShop(formData))
      setFormData({
        id: "",
        shopName: "",
        floor: "",
        category: "",
        status: "",
      });
    }
  };
 const handleEdit = (id) => {
  const shopToEdit = shopDetails.find(
    (shop) => shop.id === id
  );

  if (shopToEdit) {
    setFormData(shopToEdit);
    setIsEditing(true);
    setToggle(true);
  }
};

 

  const handleDelete = (id) => {
   dispatch(deleteShop(id))
  };
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();

    if (value === "") {
      setFiltered([]);
      return;
    }

    const searchData = shopDetails.filter(
      (shop) =>
        shop.shopName.toLowerCase().includes(value) ||
        shop.category.toLowerCase().includes(value) ||
        shop.floor.toLowerCase().includes(value) ||
        shop.status.toLowerCase().includes(value),
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

                <label htmlFor="shopName">Shop Name:</label>
                <input
                  type="text"
                  id="shopName"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  className=" p-2 border-2 border-gray-400 bg-gray-100 dark:bg-sky-800 text-black dark:text-white outline-0"
                />
              </div>
              <div className="md:w-80 flex items-center flex-col gap-4 mt-4 ">
                <label htmlFor="floor">Floor</label>
                <input
                  type="text"
                  id="floor"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  className=" p-2 border-2 border-gray-400 bg-gray-100 dark:bg-sky-800 text-black dark:text-white outline-0"
                />
                <label htmlFor="category">Category:</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
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
              <div className="md:w-1/2 flex items-center flex-col gap-4 mt-4 ">
                <button
                  type="submit"
                  className="border-2 border-blue-500 bg-blue-300 p-3 hover:bg-blue-200  "
                >
                  Add Shop
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
                    Shop Name
                  </div>
                </th>

                <th className="md:p-4">
                  <div className="flex items-center justify-center gap-2">
                    <FaUser />
                    Floor
                  </div>
                </th>

                <th className="md:p-4">
                  <div className="flex items-center justify-center gap-2">
                    <FaPhone />
                    Category
                  </div>
                </th>
                <th className="md:p-4">
                  <div className="flex items-center justify-center gap-2">
                    <FaPhone />
                    Status
                  </div>
                </th>

                <th className="md:p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {(filtered.length > 0 ? filtered : shopDetails).map((shop) => (
                <tr
                  key={shop.id}
                  className="text-center border-b border-gray-400"
                >
                  <td className="md:p-3">{shop.id}</td>

                  <td className="md:p-3">{shop.shopName}</td>

                  <td className="md:p-3">{shop.floor}</td>

                  <td className="md:p-3">{shop.category}</td>

                  <td className="md:p-3">{shop.status}</td>
                  <td className="md:p-3 flex gap-2 justify-center">
                    <button
                      className="md:p-2 text-gray-200 rounded-lg border-2 border-sky-300 bg-sky-500 hover:bg-sky-300 cursor-pointer"
                      onClick={() => {
                        (handleEdit(shop.id), setToggle(true));
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="md:p-2 text-gray-200 rounded-lg border-2 border-red-300 bg-red-500 hover:bg-red-300 cursor-pointer"
                      onClick={() => handleDelete(shop.id)}
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

export default Shop;
