import React from "react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const resetToken = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, resetToken, navigate));
    setFormData({
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleOnSubmit}
        className="flex justify-center items-center pt-[80px] bg-deepblue-800 p-20"
      >
        <div className="border border-darkgray-300 rounded-md p-10 border-opacity-20 flex flex-col justify-center items-center w-[500px]">
          <h1 className="text-darkgray-5 text-2xl p-3 flex justify-center mb-3">
            Enter New Password
          </h1>
          {/* password */}
          <div className="w-full">
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

          {/* confirmPassword */}
          <div className="w-full">
            <label htmlFor="confirmPassword" className="ml-1">
              Confirm Password
            </label>
            <br></br>
            <input
              required
              type={showConfirmPassword ? "password" : "text"}
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
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={18} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={18} fill="#AFB2BF" />
              )}
            </span>
          </div>
          {/* submit */}
          <button
            type="submit"
            className="px-2 py-2 bg-darkgray-50 bg-opacity-80  text-black font-semibold rounded-md w-full mt-6"
          >
            Reset Password
          </button>
          <Link to="/login">
            <p className="flex gap-1 text-sm mt-2 ml-[-210px] text-darkgray-50">
              <BiArrowBack className="mt-1" />
              Back to Login
            </p>
          </Link>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default UpdatePassword;
