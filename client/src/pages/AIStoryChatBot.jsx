import React, { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { genPrompt } from "../services/operations/aiAPI";
import { FaCircleArrowUp, FaRegCopy, FaShare } from "react-icons/fa6";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";

const AIStoryChatBot = () => {
  const [message, setMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [shareLink, setShareLink] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
 
  const [sessionId, setSessionId] = useState(() => {
    return localStorage.getItem('currentSessionId') || `session_${Date.now()}`;
  });

  const [sessionTitle, setSessionTitle] = useState(() => {
    const savedTitle = localStorage.getItem(`title_${sessionId}`);
    return savedTitle || "New Story";
  });

  const { token, userId } = useSelector((state) => state.auth);
  const genre = useSelector((state) => state.genre);
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);

  const [messages, setMessages] = useState(() => {
    // Load messages from localStorage on component mount
    const savedMessages = localStorage.getItem(`chat_${sessionId}`);
    return savedMessages 
      ? JSON.parse(savedMessages) 
      : [{ 
          text: `Welcome to your ${genre.genre || 'Story'} adventure! What would you like to write about today?`, 
          isBot: true,
          timestamp: Date.now(),
          sessionId: sessionId
        }];
  });
  
  // Load session list
  useEffect(() => {
    if (userId) {
      const sessionHistory = JSON.parse(localStorage.getItem(`sessionHistory_${userId}`) || '{}');
      const sessionList = Object.keys(sessionHistory).map(id => {
        const title = localStorage.getItem(`title_${id}`) || "Untitled Story";
        return { id, title };
      });
      setSessions(sessionList);
    }
  }, [userId]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`chat_${sessionId}`, JSON.stringify(messages));
      localStorage.setItem('currentSessionId', sessionId);
      
      // Update session title based on the first user message if not already set
      if (sessionTitle === "New Story" && messages.length > 1 && !messages[0].isBot) {
        const newTitle = messages[0].text.slice(0, 30) + (messages[0].text.length > 30 ? "..." : "");
        setSessionTitle(newTitle);
        localStorage.setItem(`title_${sessionId}`, newTitle);
      }
    }
  }, [messages, userId, sessionId, sessionTitle]);

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
    setSessionTitle("New Story");
    localStorage.setItem(`title_${newSessionId}`, "New Story");
    
    // Save current session to session history
    const sessionHistory = JSON.parse(localStorage.getItem(`sessionHistory_${userId}`) || '{}');
    sessionHistory[sessionId] = messages;
    localStorage.setItem(`sessionHistory_${userId}`, JSON.stringify(sessionHistory));
    
    // Start new session
    setMessages([{ 
      text: `Welcome to your ${genre.genre || 'Story'} adventure! What would you like to write about today?`, 
      isBot: true,
      timestamp: Date.now(),
      sessionId: newSessionId
    }]);
    
    // Update sessions list
    setSessions(prev => [...prev, { id: newSessionId, title: "New Story" }]);
  };

  const loadSession = (targetSessionId) => {
    const sessionHistory = JSON.parse(localStorage.getItem(`sessionHistory_${userId}`) || '{}');
    if (sessionHistory[targetSessionId]) {
      setSessionId(targetSessionId);
      setMessages(sessionHistory[targetSessionId]);
      
      // Load session title
      const title = localStorage.getItem(`title_${targetSessionId}`) || "Untitled Story";
      setSessionTitle(title);
    }
  };

  // Function to update session title
  const updateSessionTitle = (title) => {
    setSessionTitle(title);
    localStorage.setItem(`title_${sessionId}`, title);
    
    // Update sessions list
    setSessions(prev => prev.map(session => 
      session.id === sessionId ? { ...session, title } : session
    ));
  };

  const handleSend = async () => {
    if (message.trim() === "" || isGenerating) return;

    // Add user message
    const userMessage = { 
      text: message, 
      isBot: false,
      timestamp: Date.now(),
      sessionId: sessionId
    };
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsGenerating(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "60px";
    }

    try {
      // Extract conversation history for context without full repetition
      const conversationHistory = messages
        .filter(msg => msg.sessionId === sessionId)
        .slice(-6) // Use last 6 messages for context
        .map(msg => msg.text)
        .join("\n");
      
      // Generate response
      const response = await genPrompt(userId, message, genre.genre, token, conversationHistory, sessionId);
      
      if (response?.success) {
        const botMessage = { 
          text: response.prompt, // Using prompt which has only the new content
          isBot: true,
          timestamp: Date.now(),
          sessionId: sessionId
        };
        setMessages(prev => [...prev, botMessage]);
        
        // Update session title if it's a new conversation
        if (messages.length <= 2 && sessionTitle === "New Story") {
          const newTitle = message.slice(0, 30) + (message.length > 30 ? "..." : "");
          updateSessionTitle(newTitle);
        }
      } else {
        throw new Error(response?.message || "Failed to generate story");
      }
    } catch (error) {
      console.error("Story generation error:", error);
      const errorMessage = { 
        text: "Sorry, I couldn't continue the story. Please try again.", 
        isBot: true,
        timestamp: Date.now(),
        sessionId: sessionId
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Function to copy the full story to clipboard
  const copyFullStory = () => {
    const storyText = messages
      .filter(msg => msg.sessionId === sessionId && msg.isBot)
      .map(msg => msg.text)
      .join("\n\n");
      
    navigator.clipboard.writeText(storyText).then(() => {
      toast.success("Story copied to clipboard!");
    }).catch(err => {
      toast.error("Failed to copy story");
      console.error("Copy failed: ", err);
    });
  };

  // Function to generate a shareable link
  const generateShareLink = () => {
    // In a real app, you'd create an API endpoint to save the chat and return a unique URL
    // For now, we'll simulate it with a local URL and sessionId
    const link = `${window.location.origin}/share/${sessionId}`;
    setShareLink(link);
    setShowShareModal(true);
  };

  // Function to close the share modal
  const closeShareModal = () => {
    setShowShareModal(false);
  };

  return (
    <>
      <Navbar />
      <Sidebar 
        createNewSession={createNewSession} 
        loadSession={loadSession}
        sessions={sessions}
        currentSessionId={sessionId}
      />
      <div className="bg-deepblue-800 flex flex-col justify-between w-[57%] h-[560px] p-4 ml-[385px]">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <h2 className="text-white text-xl font-semibold">{sessionTitle}</h2>
            <div className="ml-4 text-darkgray-50">
              <button 
                onClick={copyFullStory} 
                className="mr-3 hover:text-white transition-colors tooltip"
                data-tooltip="Copy story"
              >
                <FaRegCopy className="text-xl" />
              </button>
              <button 
                onClick={generateShareLink}
                className="hover:text-white transition-colors tooltip"
                data-tooltip="Share story"
              >
                <FaShare className="text-xl" />
              </button>
            </div>
          </div>
          <div className="text-white opacity-70">
            {genre.genre} Story
          </div>
        </div>
        
        <div 
          ref={chatContainerRef}
          className="overflow-y-auto space-y-4 h-full scrollbar-hide mb-4"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${
                msg.isBot ? "max-w-[85%]" : "max-w-[75%] ml-auto"
              }`}
            >
              <div className={`p-3 rounded-lg ${
                msg.isBot 
                  ? "bg-deepblue-700 text-white" 
                  : "bg-blue-600 text-white"
              }`}>
                <p className={`${
                  msg.isBot 
                    ? "text-lg leading-relaxed" 
                    : "text-md"
                }`}>
                  {msg.text}
                </p>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-400">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {msg.isBot && (
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(msg.text);
                      toast.success("Copied to clipboard!");
                    }}
                    className="text-gray-400 hover:text-white text-xs flex items-center"
                  >
                    <FaRegCopy className="mr-1" /> Copy
                  </button>
                )}
              </div>
            </div>
          ))}
          {isGenerating && (
            <div className="max-w-[85%]">
              <div className="bg-deepblue-700 text-white p-3 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex relative">
          <textarea
            ref={textareaRef}
            className="bg-darkgray-400 bg-opacity-20 h-[60px] w-full mx-auto rounded-2xl p-4 pr-12 text-white focus:outline-none max-h-[200px] resize-none overflow-y-auto scrollbar-hide"
            placeholder={isGenerating ? "Generating story..." : "Continue the story..."}
            value={message}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            disabled={isGenerating}
          />
          <button 
            className={`absolute right-4 top-1/2 -translate-y-1/2 ${
              isGenerating || !message.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:text-white'
            }`}
            onClick={handleSend}
            disabled={isGenerating || !message.trim()}
          >
            <FaCircleArrowUp className="text-2xl text-darkgray-50 transition-colors" />
          </button>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-deepblue-700 p-6 rounded-lg w-96">
            <h3 className="text-white text-xl mb-4">Share Your Story</h3>
            <div className="flex mb-4">
              <input 
                type="text" 
                value={shareLink} 
                readOnly 
                className="bg-deepblue-800 text-white p-2 rounded-l-lg w-full"
              />
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(shareLink);
                  toast.success("Link copied to clipboard!");
                }}
                className="bg-blue-600 text-white p-2 rounded-r-lg"
              >
                Copy
              </button>
            </div>
            <div className="flex justify-end">
              <button 
                onClick={closeShareModal}
                className="bg-darkgray-400 text-white py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add some simple CSS for tooltips */}
      <style jsx>{`
        .tooltip {
          position: relative;
        }
        .tooltip:hover::after {
          content: attr(data-tooltip);
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: #333;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default AIStoryChatBot;