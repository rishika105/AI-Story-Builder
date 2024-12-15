import React from "react";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleOnSubmit}
        className="flex justify-center items-center pt-[100px] bg-deepblue-800 p-[170px]"
      >
        <div className="border border-darkgray-300 rounded-md p-10 border-opacity-20 flex flex-col justify-center items-center w-[500px]">
          <h1 className="text-darkgray-5 text-2xl  flex justify-center mb-3">
            Forgot Password
          </h1>
          <p className="p-3 text-darkgray-5">
            {!emailSent
              ? "We'll email you instrcutions to reset your password."
              : `We have sent email to ${email}`}
          </p>

          {/* email */}
          {!emailSent && (
            <div className="w-full">
              <label htmlFor="email" className="ml-1">
                Email
              </label>
              <br></br>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="text-darkgray-50 bg-darkgray-800 bg-opacity-40 rounded-md px-2 py-3 border border-darkgray-300 border-opacity-20 mt-1 w-full"
              />
            </div>
          )}

          <button
            type="submit"
            className="px-2 py-2 bg-darkgray-50 bg-opacity-80 mt-6 w-full text-black font-semibold rounded-md"
          >
            {!emailSent ? "Submit" : "Resend Email"}
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

export default ForgotPassword;
