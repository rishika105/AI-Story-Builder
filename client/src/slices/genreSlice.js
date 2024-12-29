import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genre: null, // Initial value for genre
};

const genreSlice = createSlice({
  name: "genre",
  initialState: initialState,
  reducers: {
    setGenre(state, action) {
      state.genre = action.payload; // Access payload from the dispatched action
    },
  },
});

export const { setGenre } = genreSlice.actions;

export default genreSlice.reducer;
