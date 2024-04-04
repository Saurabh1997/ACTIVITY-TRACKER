import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    userName: "",
  },
  reducers: {
    updateUser: (state, action) => {
      state.userName = action.payload;
    },
    removeUser: (state, action) => {
      state.userName = "";
    },
  },
});

export const { updateUser, removeUser } = UserSlice.actions;

export default UserSlice.reducer;
