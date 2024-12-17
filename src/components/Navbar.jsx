import React, { useEffect, useState } from "react";
import { TbCircleLetterAFilled, TbHexagonLetterI } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const [showConfirmationModel, setShowConfirmationModel] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Prevent scrolling when confirmation modal is shown
  useEffect(() => {
    if (showConfirmationModel) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }
  });

  function handleLogout() {
    dispatch(logout(navigate));
  }

  return (
    <>
      <div className="bg-deepblue-800 w-full h-[70px] flex relative justify-between">
        <a
          href="/"
          className="text-white font-semibold  flex pt-6 pl-8 gap-[0.3px] text-lg"
        >
          <TbCircleLetterAFilled className=" text-2xl" />{" "}
          <TbHexagonLetterI className=" text-2xl" />
          <span className="mt-[-2px]"> &nbsp;Story Builder</span>
        </a>

        <div className="flex gap-2 text-white mr-12">
          {token == null && (
            <a
              href="/login"
              className="w-[95px] h-[45px] mt-3 border border-darkgray-300 border-opacity-20 rounded-md flex bg-darkgray-400 bg-opacity-20 text-darkgray-50 font-medium pt-2  pl-6"
            >
              <span> Login</span>
            </a>
          )}
          {token == null && (
            <a
              href="/signup"
              className="w-[95px] h-[45px] mt-3 border border-darkgray-300 border-opacity-20 rounded-md flex bg-darkgray-400 bg-opacity-20 text-darkgray-50 font-medium pt-2  pl-5"
            >
              Sign up
            </a>
          )}
          {token != null && (
            <button
              onClick={() => setShowConfirmationModel(true)}
              className="w-[95px] h-[45px] mt-3 border border-darkgray-300 border-opacity-20 rounded-md flex bg-darkgray-400 bg-opacity-20 text-darkgray-50 font-medium pt-2 pl-5"
            >
              Log out
            </button>
          )}
        </div>
      </div>

      <div className="opacity-20 bg-darkgray-300 w-full h-[0.05rem]"></div>
      {showConfirmationModel ? (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {/* Blur Effect on Background Only */}
          <div className="absolute inset-0 backdrop-filter backdrop-blur-sm bg-black bg-opacity-20"></div>

          {/* Modal Content */}
          <div className="relative w-[350px] h-[180px] mt-3 border border-darkgray-300 border-opacity-20 rounded-md flex bg-darkgray-700 text-darkgray-50 font-medium pt-2 pl-6 z-30">
            <div>
              <div className="flex ml-2 p-2 pt-2 text-lg">
                Are you sure you want to Logout?
              </div>
              <p className="text-sm pl-12 p-1 font-normal">
                Then your token will expire.
              </p>
              <div className="gap-8 flex justify-center pt-4">
                <button
                  className="px-4 py-2 bg-darkgray-50 bg-opacity-80 mt-1 text-black font-semibold rounded-md"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <button
                  className="px-4 py-2 bg-darkgray-50 bg-opacity-80 mt-1 text-black font-semibold rounded-md"
                  onClick={() => setShowConfirmationModel(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Navbar;
