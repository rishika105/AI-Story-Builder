// AIStoryChatBot.js
import React, { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { genPrompt } from "../services/operations/aiAPI";
import { FaCircleArrowUp } from "react-icons/fa6";
import Sidebar from "../components/Sidebar"

const AIStoryChatBot = () => {
  const [message, setMessage] = useState("");
 
  const [sessionId, setSessionId] = useState(() => {
    return localStorage.getItem('currentSessionId') || `session_${Date.now()}`;
  });

  const { token, userId } = useSelector((state) => state.auth);
  const genre = useSelector((state) => state.genre);
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);

  const [messages, setMessages] = useState(() => {
    // Load messages from localStorage on component mount
    const savedMessages = localStorage.getItem(`chat_${userId}`);
    return savedMessages 
      ? JSON.parse(savedMessages) 
      : [{ text: "Welcome to the chat!", isBot: true }];
  });
  

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`chat_${userId}`, JSON.stringify(messages));
      localStorage.setItem('currentSessionId', sessionId);
    }
  }, [messages, userId, sessionId]);

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

  const createNewSession = () => {
    const newSessionId = `session_${Date.now()}`;
    setSessionId(newSessionId);
    
    // Save current session to session history
    const sessionHistory = JSON.parse(localStorage.getItem(`sessionHistory_${userId}`) || '{}');
    sessionHistory[sessionId] = messages;
    localStorage.setItem(`sessionHistory_${userId}`, JSON.stringify(sessionHistory));
    
    // Start new session
    setMessages([{ text: "Welcome to the chat!", isBot: true }]);
  };

  const loadSession = (targetSessionId) => {
    const sessionHistory = JSON.parse(localStorage.getItem(`sessionHistory_${userId}`) || '{}');
    if (sessionHistory[targetSessionId]) {
      setSessionId(targetSessionId);
      setMessages(sessionHistory[targetSessionId]);
    }
  };

  const handleSend = async () => {
    if (message.trim() === "") return;

    // Add user message
    const userMessage = { 
      text: message, 
      isBot: false,
      timestamp: Date.now(),
      sessionId: sessionId
    };
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
        const botMessage = { 
          text: response.story, 
          isBot: true,
          timestamp: Date.now(),
          sessionId: sessionId
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(response?.message || "Failed to generate story");
      }
    } catch (error) {
      console.error("Story generation error:", error);
      const errorMessage = { 
        text: "Sorry, I couldn't generate the story. Please try again.", 
        isBot: true,
        timestamp: Date.now(),
        sessionId: sessionId
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
      <Sidebar createNewSession= {createNewSession}/>
      <div className="bg-deepblue-800 flex flex-col justify-between  w-[57%] h-[560px] p-4 ml-[385px]">
        <div className="flex justify-between mb-4 ">
        </div>
        
        <div 
          ref={chatContainerRef}
          className="overflow-y-auto space-y-4 h-full scrollbar-hide mb-4"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[80%] ${
                msg.isBot ? "ml-[160px] mt-28" : "ml-auto"
              }`}
            >
              <p className={`text-white p-3 rounded-lg ${
                msg.isBot 
                  ? "text-4xl text-opacity-80" 
                  : "bg-blue-600"
              }`}>
                {msg.text}
              </p>
              <span className="text-xs text-gray-400 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
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