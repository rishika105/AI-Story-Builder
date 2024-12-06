import React from "react";
import { TbCircleLetterAFilled, TbHexagonLetterI } from "react-icons/tb";

const Navbar = () => {
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
          <a
            href="/login"
            className="w-[95px] h-[45px] mt-3 border border-darkgray-300 border-opacity-20 rounded-md flex bg-darkgray-400 bg-opacity-20 text-darkgray-50 font-medium pt-2  pl-6"
          >
           <span> Login</span>
          </a>
          <a
            href="/signup"
            className="w-[95px] h-[45px] mt-3 border border-darkgray-300 border-opacity-20 rounded-md flex bg-darkgray-400 bg-opacity-20 text-darkgray-50 font-medium pt-2  pl-5"
          >
            Sign up
          </a>
        </div>
      </div>

      <div className="opacity-20 bg-darkgray-300 w-full h-[0.05rem]"></div>
    </>
  );
};

export default Navbar;
