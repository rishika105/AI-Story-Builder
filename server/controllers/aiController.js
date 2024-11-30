const axios = require("axios");

exports.genres = [
  "Fantasy",
  "Science-Fiction",
  "Mystery",
  "Horror",
  "Comedy",
  "Drama",
];

exports.generatePrompt = async (req, res) => {
  const { currentStory, genre, wordLimit } = req.body;

  if (!currentStory || !genre || !wordLimit) {
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

  const API_URL = "https://api-inference.huggingface.co/models/gpt2";
  const API_KEY = process.env.HUGGINGFACE_API_KEY;

  try {
    const response = await axios.post(
      API_URL,
      {
        inputs: `Continue this ${genre} story: ${currentStory}`,
        parameters: { 
          max_length: 50, // Reduced to handle token vs word limits
          no_repeat_ngram_size: 2,
          early_stopping: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    console.log("Hugging Face Response:", response.data);

    // Safely access and truncate text
    const generatedText = response.data[0]?.generated_text || "No text generated.";
    const truncatedText = generatedText.split(" ").slice(0, wordLimit).join(" ");

    return res.status(200).json({
      success: true,
      prompt: truncatedText,
    });
  } catch (error) {
    console.error("Error from Hugging Face API:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Error generating prompt",
      details: error.message,
    });
  }
};
