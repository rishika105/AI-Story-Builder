import toast from "react-hot-toast";
import { AIendpoints } from "../api";
import { apiConnector } from "../apiconnector";


const {
    GENRES_API,
    GENERATE_STORY_AI_API
} = AIendpoints

export const getGenres = async (token) => {
    const toastId = toast.loading("Loading...")
    let result = []
    try{
        const response = await apiConnector("GET", GENRES_API, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });
        if(!response.data.success){
            throw new Error("Could not fetch genres");
        }
        result = response?.data?.data
    }
    catch(error){
        console.log("GET GENRES API ERROR..........", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result
}