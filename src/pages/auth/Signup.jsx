import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img from '../../assets/images.png'

function Signup() {
    const [form, setForm] = useState({
    fName:'',
    lName:'',
    email: "",
    password: "",
  });
  const navigate=useNavigate()
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [seePass, setSeePass] = useState(false);
  
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
  
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    
  };
  
  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === form.email) {
      setError("Already registered");
      setLoading(false);
      return;
    }

    localStorage.setItem("user", JSON.stringify(form));

    setSuccess(true);
    setMessage("Signed up successfully");

    navigate("/login");

    console.log(form);
  } catch (err) {
    setError(err.message || "Signup failed");
  } finally {
    setLoading(false);
  }
};
    return (
      <>
        <main className="w-full h-screen flex  text-white">
          <section className="w-2/3 h-full ">
            <img src={img} alt="" className="w-full h-full " />
          </section>
          <section className="w-1/2 h-full flex flex-col justify-center items-center  bg-sky-950 border-2 border-gray-400 rounded-2xl">
            <h2 className="text-5xl font-semibold  m-10">Sign Up</h2>
            <form className="w-2/3 h-2/3 flex flex-col justify-center items-center gap-2 " onSubmit={handleSubmit}>
              <div className="flex flex-col m-5 gap-2">
                <label htmlFor="fname">First Name:</label>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  onChange={handleChange}
                  placeholder="Enter you first name"
                  className="outline-0 border-2 border-gray-400 w-62 p-2 rounded-2xl"
                />
                <label htmlFor="lname">Last Name:</label>
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  onChange={handleChange}
                  placeholder="Enter you last name"
                  className="outline-0 border-2 border-gray-400 w-62 p-2 rounded-2xl"
                />
                <label htmlFor="">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  placeholder="Enter you email"
                  className="outline-0 border-2 border-gray-400 w-62 p-2 rounded-2xl"
                />
  
                <label htmlFor="">Password:</label>
                <input
                  type={seePass ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={handleChange}
                  placeholder="***********"
                  className="outline-0 border-2 border-gray-400 w-62 p-2 rounded-2xl "
                />
                <div>
                  <input
                    type="checkbox"
                    name="seePassword"
                    id=""
                    onClick={() => {
                      setSeePass(!seePass);
                    }}
                  />
  
                  <label>{seePass ? "Hide Password" : "Show Password"}</label>
                </div>
              </div>
              <p className={success ? "text-green-500" : "text-red-500"}>
                {success ? message : error}
              </p>
              <button type="submit" className="w-40 p-2 border-2 border-blue-400 bg-blue-500 self-center rounded-2xl text-white hover:bg-blue-300 cursor-pointer">
                Sign up
              </button>
            </form>
          </section>
        </main>
      </>
    );
  }
  
  

export default Signup