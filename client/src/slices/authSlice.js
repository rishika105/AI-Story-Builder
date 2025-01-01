import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  userId: localStorage.getItem("userId")
    ? JSON.parse(localStorage.getItem("userId"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setUserId(state, value) {
      state.userId = value.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken, setUserId } = authSlice.actions;

export default authSlice.reducer;
