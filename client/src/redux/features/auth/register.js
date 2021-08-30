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
    console.log(data);
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
      // state.user = action.payload.values;
      // state.message = action.payload.msg;
    },
  },
});

export default registerSlice.reducer;
