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

export const autoSign = createAsyncThunk("/login", async () => {
  try {
    const { data } = await config({
      data: {
        query: `
        query{isAuth{_id, email, token}}
        `,
      },
    });
    if (data.errors) localStorage.removeItem("X-AUTH");

    return {
      ...(data.data ? data.data.isAuth : null),
    };
  } catch (err) {
    console.log(err);
  }
});

export const updateUserEmailPass = createAsyncThunk(
  "/update",
  async (values) => {
    try {
      console.log(values);
    } catch (err) {
      console.log(err);
    }
  }
);

export const loginSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    loading: true,
    isAuthenticated: false,
    message: "",
  },
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("X-AUTH");
      state.isAuthenticated = false;
      state.loading = false;
      state.user = {};
      state.message = "Logged out successfully";
    },
  },
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

export const { logoutUser } = loginSlice.actions;

export default loginSlice.reducer;
