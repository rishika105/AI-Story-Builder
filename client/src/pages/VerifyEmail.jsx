import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";
import OTPInput from "react-otp-input";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const { signupData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    //only allow access of this route when user has filled signup form
    if (!signupData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = signupData;

    dispatch(signUp(name, email, password, confirmPassword, otp, navigate));
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleVerifyAndSignup}
        className="flex justify-center items-center pt-[80px] bg-deepblue-800 p-[100px]"
      >
        <div className="border border-darkgray-300 rounded-md p-10 border-opacity-20 flex flex-col justify-center items-center w-[500px]">
          <h1 className="text-darkgray-5 text-2xl  flex justify-center mb-3">
            Verify Email
          </h1>
          <p className="p-3 text-darkgray-5">
            A verification code has been sent to your email. Enter that code
            below.
          </p>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[48px] lg:w-[60px] border-0 text-xl rounded-[0.5rem] text-black font-medium bg-darkgray-400 aspect-square text-center mt-2"
              />
            )}
            containerStyle={{
              justifyContent: "space-between",
              gap: "0 6px",
            }}
          />
          {/* submit */}
          <button
            type="submit"
            className="px-2 py-2 border bg-darkgray-800 bg-opacity-40 border-darkgray-300 border-opacity-20 text-white font-semibold rounded-md w-[95%] mt-9"
          >
            Verify Email
          </button>
          <div className="flex justify-between mt-3 text-darkgray-50 text-sm gap-[180px]">
            <Link to="/signup">
              <p className="flex gap-1">
                <BiArrowBack className="mt-1" /> Back to signup
              </p>
            </Link>

            <button
              onClick={() => dispatch(sendOtp(signupData.email, navigate))}
              className="flex gap-1"
            >
              <RxCountdownTimer className="mt-1" /> Resend Code
            </button>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default VerifyEmail;
