import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios/config";
import toastHandler from "../../../utils/toasts";

export const registerUser = createAsyncThunk("/register", async (userData) => {
  try {
    const { data } = await axios({
      data: {
        query: `mutation {
          signUp(
            fields:{
              email:"${userData.email}"
              password:"${userData.password}"
            }
          ){
            _id
            email
            token
          }
        }`,
      },
    });
    return {
      ...(data.data ? data.data.signUp : null),
      errors: data.errrors,
    };
  } catch (err) {
    console.log(err);
  }
});

export const registerSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    loading: true,
    isAuthenticated: false,
    message: "",
  },

  reducers: {},
  extraReducers: {
    [registerUser.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.message = "Registered succesfully!";
      localStorage.setItem("X-AUTH", state.user.token);
      toastHandler("Welcome", "SUCCESS");
    },
    // [registerUser.rejected]:(state, action) => {
    //   state.isAuthenticated = false;
    //   state.loading = false;

    // }
  },
});

export default registerSlice.reducer;
