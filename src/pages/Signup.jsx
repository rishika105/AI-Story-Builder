import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignupData } from "../slices/authSlice";
import { sendOtp } from "../services/operations/authAPI";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  //handle input fields when some val changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  //handle form submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
      return;
    }
    //save the details so that only after verifying with otp we will send
    //later to store and register
    dispatch(setSignupData(formData));
    //send otp for verification
    dispatch(sendOtp(formData.email, navigate));

    //reset
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleOnSubmit}
        className="flex justify-center items-center pt-[40px] bg-deepblue-800 p-14"
      >
        <div className="border border-darkgray-300 rounded-md p-10 border-opacity-20 flex flex-col justify-center items-center w-[500px]">
          <h1 className="text-darkgray-5 text-2xl p-3 flex justify-center mb-3">
            Sign up
          </h1>
          <div className="flex flex-col gap-5 justify-between text-white text-md w-[400px]">
            {/* name */}
            <div>
              <label htmlFor="name" className="ml-1">
                Name
              </label>
              <br></br>
              <input
                required
                type="text"
                name="name"
                value={name}
                onChange={handleOnChange}
                placeholder="Enter your full name"
                className="text-darkgray-50 bg-darkgray-800 bg-opacity-40 rounded-md px-2 py-3 border border-darkgray-300 border-opacity-20 mt-1 w-full"
              />
            </div>

            {/* email */}
            <div>
              <label htmlFor="email" className="ml-1">
                Email
              </label>
              <br></br>
              <input
                required
                type="text"
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
                type= {showPassword ? "password" : "text"}
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
             {
                showPassword ? (
                  <AiOutlineEyeInvisible fontSize={18} fill="#AFB2BF"/>
                ) : <AiOutlineEye fontSize={18} fill="#AFB2BF"/>
              }
             </span>
            </div>

            {/* confirmPassword */}
            <div>
              <label htmlFor="confirmPassword" className="ml-1">
                Confirm Password
              </label>
              <br></br>
              <input
                required
                type= {showConfirmPassword ? "password" : "text"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Enter Password again"
                className="text-darkgray-50 bg-darkgray-800 bg-opacity-40 rounded-md px-2 py-3 border border-darkgray-300 border-opacity-20 mt-1 w-full"
              />
              <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute ml-[-30px] mt-5 cursor-pointer"
              >
                {
                  showConfirmPassword ? 
                  <AiOutlineEyeInvisible fontSize={18} fill="#AFB2BF"/> 
                  : <AiOutlineEye fontSize={18} fill="#AFB2BF"/>
                }

              </span>
            </div>
             {/* submit */}
            <button
              type="submit"
              className="px-2 py-2 bg-darkgray-50 bg-opacity-80 mt-1 text-black font-semibold rounded-md"
            >
              Create Account
            </button>
            <p className="text-darkgray-50 text-sm justify-center flex gap-1">
              Already have a account? <a href="/login" className="text-darkgray-200">Login</a>
            </p>
          </div>
        </div>
      </form>

      <Footer />
    </>
  );
};

export default Signup;
