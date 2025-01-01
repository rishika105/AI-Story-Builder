const axios = require("axios");

exports.genres = ["Fantasy", "Science-Fiction", "Mystery", "Horror", "Comedy", "Drama", "Thriller", "Rommance"];

exports.generatePrompt = async (req, res) => {
  const { userId, newInput, genre } = req.body;

  // Validate input
  if (!userId || !newInput || !genre) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  if (!this.genres.includes(genre)) {
    return res.status(400).json({
      success: false,
      message: "Invalid genre or not available",
    });
  }

  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
  const API_KEY = process.env.GEMINI_API_KEY; // Ensure this is properly set in your environment variables

  try {
    // Initialize or continue story session
    if (!storySessions[userId]) {
      storySessions[userId] = newInput;
    } else {
      storySessions[userId] += ` ${newInput}`;
    }

    const currentStory = storySessions[userId];

    // Make the Gemini API request
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Continue this ${genre} story: ${currentStory} within a ${wordLimit}-word limit. Use Indian names and inspirations with simple language.`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Extract generated content
    const generatedContent =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No content generated.";

    // Update the story session
    storySessions[userId] += ` ${generatedContent}`;

    return res.status(200).json({
      success: true,
      story: storySessions[userId],
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
