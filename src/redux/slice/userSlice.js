import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: "",
  uid: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      const { email, uid } = action.payload;
      state.isLoggedIn = true;
      (state.email = email), (state.uid = uid);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.email = null;
      state.uid = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectEmail = (state) => state.user.email;

export default userSlice.reducer;
