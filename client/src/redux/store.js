import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./features/auth/register";
import loginReducer from "./features/auth/signIn";

export default configureStore({
  reducer: {
    user: registerReducer,
    login: loginReducer,
  },
});
