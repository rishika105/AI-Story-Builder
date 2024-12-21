import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genre: null,
};

const genreSlice = createSlice({
  name: "genre",
  initialState: initialState,
  reducers: {
    setGenre(state, value) {
      state.genre = value.payload;
    },
  },
});

export const { setGenre } = genreSlice.actions;

export default genreSlice.reducer;
