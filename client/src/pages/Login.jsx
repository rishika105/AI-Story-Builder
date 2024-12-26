import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/operations/authAPI";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const { email, password } = formData;

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleOnSubmit}
        className="flex justify-center items-center pt-[70px] bg-deepblue-800 p-20"
      >
        <div className="border border-darkgray-300 rounded-md p-10 border-opacity-20 flex flex-col justify-center items-center w-[500px]">
          <h1 className="text-darkgray-5 text-2xl flex justify-center mb-3">
            Login
          </h1>
          <div className="flex flex-col gap-5 justify-between text-white text-md w-[400px]">
            {/* email */}
            <div>
              <label htmlFor="email" className="ml-1">
                Email
              </label>
              <br></br>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={handleOnChange}
                placeholder="Enter your email"
                className="text-darkgray-50 bg-darkgray-800 bg-opacity-40 rounded-md px-2 py-3 border border-darkgray-300 border-opacity-20 mt-1 w-full"
              />
            </div>

            {/* password */}
            <div>
              <label htmlFor="password" className="ml-1">
                Password
              </label>
              <br></br>
              <input
                required
                type={showPassword ? "password" : "text"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="text-darkgray-50 bg-darkgray-800 bg-opacity-40 rounded-md px-2 py-3 border border-darkgray-300 border-opacity-20 mt-1 w-full"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute ml-[-30px] mt-5 cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={18} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={18} fill="#AFB2BF" />
                )}
              </span>
            </div>

            {/* forgot password */}
            <Link to="/forgot-password">
              <p className="ml-auto max-w-max text-sm text-darkgray-50">
                Forgot Password?
              </p>
            </Link>

            {/* submit */}
            <button
              type="submit"
              className="px-2 py-2 bg-darkgray-50 bg-opacity-80 mt-1 text-black font-semibold rounded-md"
            >
              Login
            </button>
            <p className="text-darkgray-50 text-sm justify-center flex gap-1">
              Don't have an account?{" "}
              <a href="/signup" className="text-darkgray-200">
                Signup
              </a>
            </p>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default Login;
