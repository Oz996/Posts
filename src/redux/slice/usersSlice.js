import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    name: "test user",
  },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
