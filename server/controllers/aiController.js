const axios = require("axios");

exports.genres = ["Fantasy", "Science-Fiction", "Mystery", "Horror", "Comedy", "Drama", "Thriller", "Rommance"];
exports.wordLimit = ["small", "medium", "long"];

exports.generatePrompt = async (req, res) => {
  const { currentStory, genre, wordLimit } = req.body;

  if (!currentStory || !genre || !wordLimit) {
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
  const API_KEY = process.env.GEMINI_API_KEY;

  try {
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Continue this ${genre} story: ${currentStory} with this ${wordLimit} word limit only
                .Keep it more Like Indian names and some indian inspirations lines of the ${genre}. Don't use very difficult words. Be a little simple`,
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

    // Extract generated text
    const generatedContent =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No content generated.";

    return res.status(200).json({
      success: true,
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
