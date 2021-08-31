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

    toastHandler("Logged In!", "SUCCESS");
    console.log(data);
    return {
      ...data.data.loginUser,
    };
  } catch (err) {
    console.log(err);
    toastHandler(err, "ERROR");

    return { errors: err };
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
      localStorage.setItem("X-AUTH", state.user.token);
    },
  },
});

export default loginSlice.reducer;
