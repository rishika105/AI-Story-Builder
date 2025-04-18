const axios = require("axios");

// Store story sessions in memory (consider using Redis/DB for production)
const storySessions = new Map();

exports.genres = ["Fantasy", "Science-Fiction", "Mystery", "Horror", "Comedy", "Drama", "Thriller", "Romance"];
// Backend controller function
exports.generatePrompt = async (req, res) => {
  const wordLimit = 150; // Increased word limit for better storytelling
  const { userId, newInput, genre, conversationHistory, sessionId } = req.body;
  
  // Use sessionId as part of the story session key
  const sessionKey = `${userId}_${sessionId}`;
  
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
    // Get or initialize the session data
    let sessionData = storySessions.get(sessionKey) || {
      story: '',
      messages: [],
      lastUpdate: Date.now()
    };
    
    // Add the new message to this session
    sessionData.messages.push({
      role: 'user',
      content: newInput,
      timestamp: Date.now()
    });
    
    // Build prompt with context but without duplicating content
    let promptContext = '';
    
    // If we have conversation history, use that for context
    if (conversationHistory) {
      promptContext = conversationHistory;
    } else if (sessionData.messages.length > 1) {
      // Otherwise use last few messages as context
      promptContext = sessionData.messages
        .slice(-4)
        .map(msg => msg.content)
        .join("\n");
    } else {
      // For first message, just use the input
      promptContext = newInput;
    }
    
    // Make the Gemini API request with improved prompt
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `You are a creative storyteller continuing an interactive ${genre} story. 
            
            Context so far: ${promptContext}
            
            Continue this ${genre} story by adding another segment (${wordLimit} words max). 
            Make it engaging and imaginative with a mix of dialogue and description. 
            Use simple but vivid language. Include Indian cultural elements when appropriate`,
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
    
    // Add AI response to session messages
    sessionData.messages.push({
      role: 'assistant',
      content: generatedContent,
      timestamp: Date.now()
    });
    
    // Update the complete story (for the copy full story feature)
    sessionData.story = sessionData.story 
      ? `${sessionData.story}\n\n${generatedContent}` 
      : generatedContent;
    
    // Update lastUpdate timestamp
    sessionData.lastUpdate = Date.now();
    
    // Save updated session data
    storySessions.set(sessionKey, sessionData);
    
    return res.status(200).json({
      success: true,
      story: sessionData.story, // Full story for context
      prompt: generatedContent, // Just the new content
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
// Add an endpoint to handle story sharing
exports.getSharedStory = async (req, res) => {
  const { shareId } = req.params;
  
  try {
    // Extract userId and sessionId from the shareId
    // In a real app, you'd have a separate database table for shared stories
    const [userId, sessionId] = shareId.split('_');
    const sessionKey = `${userId}_${sessionId}`;
    
    const sessionData = storySessions.get(sessionKey);
    
    if (!sessionData) {
      return res.status(404).json({
        success: false,
        message: "Story not found"
      });
    }
    
    // Return a version suitable for public sharing
    return res.status(200).json({
      success: true,
      title: "Shared Story", // In a real app, get this from the database
      genre: "Fantasy", // In a real app, get this from the database
      story: sessionData.story,
      messages: sessionData.messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    });
    
  } catch (error) {
    console.error("Error sharing story:", error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving shared story"
    });
  }
};


// Add session cleanup to avoid memory issues
setInterval(() => {
  const MAX_SESSION_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  const now = Date.now();
  
  for (const [key, session] of storySessions.entries()) {
    if (now - session.lastUpdate > MAX_SESSION_AGE) {
      storySessions.delete(key);
    }
  }
}, 24 * 60 * 60 * 1000); // Run cleanup daily