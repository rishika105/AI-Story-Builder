import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AIStoryChatBot = () => {
  return (
    <>
      <Navbar />
      <div className="bg-deepblue-800 overflow-auto overflow-y h-[490px] w-[70%] flex relative justify-center items-center mx-auto"></div>
      <div className="bg-deepblue-800 relative">
        {/* send message */}
        <input
          className="bg-darkgray-400 bg-opacity-20 h-[65px] w-[70%] rounded-md bottom-0 flex absolute pl-4 text-white focus:outline-none mb-[-300px]"
          placeholder="Send message"
        ></input>
      </div>
    </>
  );
};

export default AIStoryChatBot;
