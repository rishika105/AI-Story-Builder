import React from "react";
import { FaPlus, FaHistory, FaTimes, FaPen } from "react-icons/fa";

const Sidebar = ({ createNewSession, loadSession, sessions, currentSessionId }) => {
  const [showSessions, setShowSessions] = React.useState(true);
  const [editingId, setEditingId] = React.useState(null);
  const [editTitle, setEditTitle] = React.useState("");

  const handleEditStart = (session) => {
    setEditingId(session.id);
    setEditTitle(session.title);
  };

  const handleEditSave = () => {
    if (editTitle.trim()) {
      // In a real implementation, you'd update the title in localStorage
      localStorage.setItem(`title_${editingId}`, editTitle);
      // Update the session list UI (would be handled by parent component in real app)
    }
    setEditingId(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEditSave();
    } else if (e.key === "Escape") {
      handleEditCancel();
    }
  };

  return (
    <div className="fixed left-0 top-16 h-full w-80 bg-deepblue-900 p-4 overflow-y-auto">
      <div className="mb-6">
        <button
          onClick={createNewSession}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center transition-colors"
        >
          <FaPlus className="mr-2" /> New Story
        </button>
      </div>

      <div className="mb-4">
        <div
          className="flex items-center justify-between text-white cursor-pointer mb-2"
          onClick={() => setShowSessions(!showSessions)}
        >
          <div className="flex items-center">
            <FaHistory className="mr-2" />
            <h3 className="font-medium">Story History</h3>
          </div>
          <span>{showSessions ? "▼" : "►"}</span>
        </div>

        {showSessions && (
          <div className="space-y-2 mt-3">
            {sessions.length === 0 ? (
              <p className="text-gray-400 text-sm italic">No stories yet</p>
            ) : (
              sessions.map((session) => (
                <div
                  key={session.id}
                  className={`py-2 px-3 rounded-lg flex justify-between items-center cursor-pointer ${
                    currentSessionId === session.id
                      ? "bg-deepblue-700 text-white"
                      : "text-gray-300 hover:bg-deepblue-800"
                  }`}
                >
                  {editingId === session.id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onBlur={handleEditSave}
                      onKeyDown={handleKeyDown}
                      className="bg-deepblue-600 text-white p-1 rounded w-full mr-2"
                      autoFocus
                    />
                  ) : (
                    <div
                      className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
                      onClick={() => loadSession(session.id)}
                    >
                      {session.title}
                    </div>
                  )}

                  {editingId !== session.id && (
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditStart(session);
                        }}
                        className="text-gray-400 hover:text-white"
                      >
                        <FaPen size={12} />
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;