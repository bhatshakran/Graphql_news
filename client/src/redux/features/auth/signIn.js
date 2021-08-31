import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../../axios/config";
import toastHandler from "../../../utils/toasts";

export const loginUser = createAsyncThunk("/login", async (userData) => {
  try {
    const { data } = await config({
      data: {
        query: `mutation{
                loginUser(
                    fields:{
                    email:"${userData.email}"
                    password:"${userData.password}"
                }){
                    _id
                    email
                    token
                }
            }`,
      },
    });

    return {
      ...data.data.loginUser,
      errors: data.errors,
    };
  } catch (err) {
    throw err;
  }
});

export const loginSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    loading: true,
    isAuthenticated: false,
    message: "",
  },
  reducers: {},
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      console.log("done");
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.message = "Logged in succesfully!";
      localStorage.setItem("X-AUTH", action.payload.token);
      toastHandler("Logged In!", "SUCCESS");
    },
    [loginUser.rejected]: (state, action) => {
      const errors = [
        "Sorry something went wrong",
        "Check your email and password!",
      ];

      toastHandler(errors, "ERROR");
    },
  },
});

export default loginSlice.reducer;
