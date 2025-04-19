const axios = require("axios");

// Store story sessions in memory (consider using Redis/DB for production)
const storySessions = new Map();

exports.genres = ["Fantasy", "Science-Fiction", "Mystery", "Horror", "Comedy", "Drama", "Thriller", "Romance"];
// Backend controller function
exports.generatePrompt = async (req, res) => {
  const MAX_CONTENT_LENGTH = 100; // Shorter responses
  const { userId, newInput, genre, fullStoryContext, sessionId } = req.body;
  
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
      fullContext: fullStoryContext || newInput,
      messages: [],
      lastUpdate: Date.now()
    };
    
    // Add the new message to this session
    sessionData.messages.push({
      role: 'user',
      content: newInput,
      timestamp: Date.now()
    });
    
    // If we have full context, use that; otherwise use only input
    const promptContext = fullStoryContext || newInput;
    
    // Make the Gemini API request with improved prompt
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `You are continuing an interactive ${genre} story. Your job is to write the next part based on the user's input.

Full story context so far: 
${promptContext}

User's latest input: ${newInput}

Write a direct continuation (${MAX_CONTENT_LENGTH} words maximum) that picks up exactly where the story left off.
Use simple but vivid language with some Indian cultural elements when appropriate.
Keep your response short and focused.
DO NOT repeat what has already been written.
DO NOT summarize the story so far.
Just continue the narrative naturally as if you're the next writer in a collaborative storytelling session.`,
          }],
        }],
        generationConfig: {
          maxOutputTokens: 200,  // Limit the response length
          temperature: 0.7,      // More focused responses
          topP: 0.8,             // More focused responses
          topK: 40               // More deterministic
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    // Extract generated content
    const generatedContent = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No content generated.";
    
    // Clean up the response to remove any unwanted prefixes/suffixes
    const cleanedContent = generatedContent
      .replace(/^(As the story continues:|Continuing the story:|Here's what happens next:|The story continues:)/i, '')
      .trim();
    
    // Add AI response to session messages
    sessionData.messages.push({
      role: 'assistant',
      content: cleanedContent,
      timestamp: Date.now()
    });
    
    // Update the complete story context
    sessionData.fullContext = fullStoryContext 
      ? `${fullStoryContext}\n${newInput}\n${cleanedContent}`
      : `${newInput}\n${cleanedContent}`;
    
    // Update lastUpdate timestamp
    sessionData.lastUpdate = Date.now();
    
    // Save updated session data
    storySessions.set(sessionKey, sessionData);
    
    return res.status(200).json({
      success: true,
      story: sessionData.fullContext, // Full story for context
      prompt: cleanedContent, // Just the new content
    });
  } catch (error) {
    console.error("Error from Gemini API:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Error generating story content",
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
const SESSION_EXPIRY = 60 * 24 * 60 * 60 * 1000; // 60 days in milliseconds

// Add session cleanup to avoid memory issues
setInterval(() => {
  const now = Date.now();
  
  for (const [key, session] of storySessions.entries()) {
    if (now - session.lastUpdate > SESSION_EXPIRY) {
      storySessions.delete(key);
    }
  }
}, 24 * 60 * 60 * 1000); // Run cleanup daily