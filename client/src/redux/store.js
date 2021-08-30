import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./features/auth/register";

export default configureStore({
  reducer: {
    user: registerReducer,
  },
});
