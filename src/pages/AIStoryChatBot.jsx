import React from "react";
import Navbar from "../components/Navbar";

const AIStoryChatBot = () => {
  return (
    <>
      <Navbar />
      <div className="bg-deepblue-600 flex relative justify-center items-center mx-auto w-[70%] h-[90vh]">
        {/* chat section */}
       <div className=" overflow-y overflow-auto h-[40%]">

       </div>
      
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
