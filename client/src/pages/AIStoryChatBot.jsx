import React, { useState } from "react";
import Navbar from "../components/Navbar";

const AIStoryChatBot = () => {
  const [message, setMessage] = useState("");

  // Adjust the height dynamically based on content
  const handleInput = (e) => {
    e.target.style.height = "60px"; // Reset to initial height
    e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height based on content
    setMessage(e.target.value); // Update message state
  };

  return (
    <>
      <Navbar />
      <div className="bg-deepblue-800 flex flex-col justify-between mx-auto w-[70%] h-[560px] p-4">
        {/* Chat section */}
        <div className="overflow-y-scroll space-y-4 h-full scrollbar-hide">
          {/* Messages go here */}
          <p className="text-white">Welcome to the chat!</p>
          
        </div>

        {/* Send message */}
        <textarea
          className="bg-darkgray-400 bg-opacity-20 min-h-[60px] w-[80%] mx-auto rounded-2xl p-4 text-white focus:outline-none resize-none overflow-y-scroll scrollbar-hide mt-4"
          placeholder="Send message"
          value={message}
          onInput={handleInput}
        />
      </div>
    </>
  );
};

export default AIStoryChatBot;
