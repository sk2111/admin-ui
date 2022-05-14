import { configureStore } from "@reduxjs/toolkit";
//reducer slice
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
