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
  }
  catch (error) {
      console.error("GET GENRES API ERROR..........", error);
      toast.error("Failed to load genres");
      return []; // Return empty array on error
  }
  finally {
      toast.dismiss(toastId);
  }
}
// Update the front-end API connector function

// Update the front-end API connector function
export const genPrompt = async (userId, newInput, genre, token, fullStoryContext = "", sessionId = "") => {
  const toastId = toast.loading("Writing...");
  try {
    const response = await apiConnector(
      "POST",
      GENERATE_STORY_AI_API,
      { 
        userId, 
        newInput, 
        genre, 
        fullStoryContext, 
        sessionId 
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    
    if (!response.data.success) {
      throw new Error(response.data.message || "Story generation failed");
    }
    
    toast.success("Story continued");
    return response.data;
  } catch (error) {
    console.error("Error generating story:", error);
    toast.error(error.message || "Failed to continue story");
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};
