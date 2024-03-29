import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../../axios/config";
import toastHandler from "../../../utils/toasts";

export const registerUser = createAsyncThunk("/register", async (userData) => {
  try {
    const { data } = await config({
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

    toastHandler("Welcome", "SUCCESS");

    return {
      ...(data.data ? data.data.signUp : null),
    };
  } catch (err) {
    console.log(err);
    toastHandler(err, "ERROR");

    return { errors: err };
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
    },
  },
});

export default registerSlice.reducer;
