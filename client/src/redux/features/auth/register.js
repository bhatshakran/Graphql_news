import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios/config";

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
      localStorage.setItem("X-AUTH", state.user.token);
      state.message = "Registered succesfully!";
    },
  },
});

export default registerSlice.reducer;
