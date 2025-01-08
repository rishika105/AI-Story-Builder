const axios = require("axios");

// Store story sessions in memory (consider using Redis/DB for production)
const storySessions = new Map();

exports.genres = ["Fantasy", "Science-Fiction", "Mystery", "Horror", "Comedy", "Drama", "Thriller", "Romance"];

exports.generatePrompt = async (req, res) => {
 
  const wordLimit = 50;

  const { userId, newInput, genre, sessionId } = req.body;
  
  // Use sessionId as part of the story session key
  const sessionKey = `${userId}_${sessionId}`;
  let currentStory = storySessions.get(sessionKey) || '';
  
  // Rest of your existing code...
  


  // Input validation
  if (!userId || !newInput || !genre) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  if (!exports.genres.includes(genre)) {
    return res.status(400).json({
      success: false,
      message: "Invalid genre or not available",
    });
  }

  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
  const API_KEY = process.env.GEMINI_API_KEY;

  try {
    // Initialize or continue story session
    let currentStory = storySessions.get(userId) || '';
    currentStory = currentStory ? `${currentStory} ${newInput}` : newInput;

    // Make the Gemini API request
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Continue this ${genre} story: ${currentStory} within a ${wordLimit}-word limit. Use Indian names and inspirations with simple language.`,
          }],
        }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Extract generated content
    const generatedContent = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No content generated.";

    // Update the story session
    currentStory = `${currentStory} ${generatedContent}`;
     // Update session storage with sessionId
     storySessions.set(sessionKey, currentStory);

    return res.status(200).json({
      success: true,
      story: currentStory,
      prompt: generatedContent,
    });
  } catch (error) {
    console.error("Error from Gemini API:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Error generating prompt",
      details: error.message,
    });
  }
};

// Add a cleanup function to remove old sessions (optional)
exports.cleanupSessions = (maxAge = 24 * 60 * 60 * 1000) => {
  const now = Date.now();
  for (const [userId, session] of storySessions.entries()) {
    if (now - session.timestamp > maxAge) {
      storySessions.delete(userId);
    }
  }
};