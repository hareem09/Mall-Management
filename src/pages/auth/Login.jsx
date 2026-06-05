import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN } from "../../redux/action/action";
import img from "../../assets/images.png";
import { useNavigate } from "react-router-dom";
function Login() {
  const [form, setForm] = useState({
  email: "",
  password: "",
});
const dispatch = useDispatch();
const [success, setSuccess] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [message, setMessage] = useState("");
const [seePass, setSeePass] = useState(false);
const navigate=useNavigate()
const [user, setUser] = useState(null);

// Load user from localStorage
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
    if (!user) {
      setError("No registered user found");
      return;
    }

    // validation
    if (
      form.email !== user.email ||
      form.password !== user.password
    ) {
      setError("Invalid credentials");
      return;
    }

    // success
   dispatch(login(form))
  localStorage.setItem(
    "USER",
    JSON.stringify(form)
  );

    setSuccess(true);
    setMessage("Logged successfully");
    navigate('/dashboard')
    console.log(form);

  } catch (err) {
    setError(err.message || "Login failed");
  } finally {
    setLoading(false);
  }
};
  return (
    <>
      <main className="w-full h-screen md:flex  text-white">
        <section className="md:w-2/3 md:h-full ">
          <img src={img} alt="" className="w-full h-full " />
        </section>
        <section className="md:w-1/2 h-full flex flex-col justify-center items-center  bg-sky-950 border-2 border-gray-400 rounded-2xl">
          <h2 className="text-5xl font-semibold  m-10">Login</h2>
          <form className="w-2/3 h-2/3 flex flex-col justify-center items-center gap-10 " onSubmit={handleSubmit}>
            <div className="flex flex-col m-5 gap-4">
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
            <button type='submit' className="w-40 p-2 border-2 border-blue-400 bg-blue-500 self-center rounded-2xl text-white hover:bg-blue-300 cursor-pointer">
              Login
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default Login;
