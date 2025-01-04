import React, { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { genPrompt } from "../services/operations/aiAPI";
import { FaCircleArrowUp } from "react-icons/fa6";

const AIStoryChatBot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Welcome to the chat!", isBot: true }
  ]);
  const { token, userId } = useSelector((state) => state.auth);
  const genre = useSelector((state) => state.genre);
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "60px";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    if (message.trim() === "") return;

    // Add user message
    const userMessage = { text: message, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setMessage("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "60px";
    }

    try {
      // Generate response
      const response = await genPrompt(userId, message, genre.genre, token);
      
      if (response?.success) {
        const botMessage = { text: response.story, isBot: true };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(response?.message || "Failed to generate story");
      }
    } catch (error) {
      console.error("Story generation error:", error);
      const errorMessage = { 
        text: "Sorry, I couldn't generate the story. Please try again.", 
        isBot: true 
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-deepblue-800 flex flex-col justify-between mx-auto w-[70%] h-[560px] p-4">
        <div 
          ref={chatContainerRef}
          className="overflow-y-auto space-y-4 h-full scrollbar-hide mb-4"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[80%] ${
                msg.isBot ? "ml-0" : "ml-auto"
              }`}
            >
              <p className={`text-white p-3 rounded-lg ${
                msg.isBot 
                  ? "bg-darkgray-400 bg-opacity-20" 
                  : "bg-blue-600"
              }`}>
                {msg.text}
              </p>
            </div>
          ))}
        </div>

        <div className="flex relative">
          <textarea
            ref={textareaRef}
            className="bg-darkgray-400 bg-opacity-20 h-[60px] w-full mx-auto rounded-2xl p-4 pr-12 text-white focus:outline-none max-h-[200px] resize-none overflow-y-auto scrollbar-hide"
            placeholder="Send message"
            value={message}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
          />
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onClick={handleSend}
          >
            <FaCircleArrowUp className="text-2xl text-darkgray-50 hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </>
  );
};

export default AIStoryChatBot;