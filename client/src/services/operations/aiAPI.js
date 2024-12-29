import toast from "react-hot-toast";
import { AIendpoints } from "../api";
import { apiConnector } from "../apiconnector";

const { GENRES_API, GENERATE_STORY_AI_API } = AIendpoints;

export const getGenres = async (token) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("GET", GENRES_API, null, {
      Authorization: `Bearer ${token}`,
    });

    // The backend sends genres in response.data.genres
    if (!response?.data?.genres) {
      throw new Error("Could not fetch genres");
    }

    // toast.success("Genres loaded successfully");
    return response.data.genres; // Return just the genres array
  } catch (error) {
    console.error("GET GENRES API ERROR..........", error);
    toast.error("Failed to load genres");
    return []; // Return empty array on error
  } finally {
    toast.dismiss(toastId);
  }
};

export const genPrompt = async (userId, newInput, genre, token) => {
  const toastId = toast.loading("Generating story...");
  try {
    const response = await apiConnector(
      "POST",
      GENERATE_STORY_AI_API,
      { userId, newInput, genre }, // Body of the request
      {
        Authorization: `Bearer ${token}`, // Pass the token in headers
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Story generation failed");
    }

    toast.success("Story generated successfully");
    return response.data; // Return the full response
  } catch (error) {
    console.error("Error generating story prompt:", error);
    toast.error(error.message || "Failed to generate story prompt");
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};
