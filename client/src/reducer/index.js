import { combineReducers } from "redux";
import authReducer from "../slices/authSlice"
import genreReducer from "../slices/genreSlice"

export const rootReducer = combineReducers({
    auth: authReducer,
    genre: genreReducer,
})

