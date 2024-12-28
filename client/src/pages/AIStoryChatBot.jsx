import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { genPrompt } from "../services/operations/aiAPI";
import { IoArrowUpCircle } from "react-icons/io5";
import { FaCircleArrowUp } from "react-icons/fa6";

const AIStoryChatBot = () => {
  const [message, setMessage] = useState("");
  const {token} = useSelector((state) => state.auth);

  // Adjust the height dynamically based on content
  const handleInput = (e) => {
    e.target.style.height = "60px"; // Reset to initial height
    e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height based on content
    setMessage(e.target.value); // Update message state
  };

  const [messages, setMessages] = useState([
    { text: "Welcome to the chat!", isBot: true },
  ]);

  const genre = useSelector((state) => state.genre);

  const handleSend = async () => {
    if (message.trim() === "") return;

    const userMessage = { text: message, isBot: false };
    setMessages([...messages, userMessage]);
    setMessage("");

    const response = await genPrompt(null, message, genre, token);

    if (response) {
      const botMessage = { text: response.story, isBot: true };
      setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-deepblue-800 flex flex-col justify-between mx-auto w-[70%] h-[560px] p-4">
        {/* Chat section */}
        <div className="overflow-y-scroll space-y-4 h-full scrollbar-hide">
          {messages.map((msg, index) => (
            <p
              key={index}
              className={`text-white ${msg.isBot ? "text-left" : "text-right"}`}
            >
              {msg.text}
            </p>
          ))}
        </div>

        {/* Send message */}
        <div className="flex">
          <textarea
            className="bg-darkgray-400 bg-opacity-20 h-[60px] w-[80%] mx-auto rounded-2xl p-4 text-white focus:outline-none resize-none overflow-y-scroll relative scrollbar-hide mt-4 placeholder:pb-2"
            placeholder="Send message"
            value={message}
            onInput={handleInput}
          />
          <button className="absolute right-80 mt-8 p-1 pr-2 " onClick={handleSend}>
            {" "}
            <FaCircleArrowUp className="text-2xl rounded-full text-darkgray-50 cursor-pointer" />
          </button>
        </div>
      </div>
    </>
  );
};

export default AIStoryChatBot;
