import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../../axios/config";
import toastHandler from "../../../utils/toasts";

export const autoSign = createAsyncThunk("/autosignin", async () => {
  try {
    const { data } = await config({
      data: {
        query: `query{
          isAuth{
            _id 
            email
            token
          }
          }
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
      const { email, password, id } = values;
      console.log(id);
      const { data } = await config({
        data: {
          query: `mutation{
            updateUserEmailPass(
          email:"${email}"
          password:"${password}"
          id:"${id}"
        ){
          _id
          token
          email
        }}`,
        },
      });
      if (data.errors) {
        return { errors: data.errors };
      } else {
        localStorage.setItem("X-AUTH", data.data.updateUserEmailPass.token);
      }

      return data.data.updateUserEmailPass;
    } catch (err) {
      console.log(err);
    }
  }
);
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

export const getUserStats = createAsyncThunk("/getuserstats", async (id) => {
  try {
    const body = {
      query: `query User($id:ID!, $sort: SortInput){
        getUser(id:$id){
          name
          lastname
          posts(sort:$sort){
            title
            content
          }
          categories{
            name
          }
        }
      }`,
      variables: {
        id: id,
        sort: {
          sortBy: "_id",
          order: "desc",
          limit: 3,
        },
      },
    };

    const { data } = await config({
      data: JSON.stringify(body),
    });

    return {
      stats: data.data ? data.data.getUser : null,
    };
  } catch (err) {
    console.log(err);
  }
});

export const loginSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    loading: true,
    isAuthenticated: false,
    message: "",
    stats: {},
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
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.message = "Logged in succesfully!";
      localStorage.setItem("X-AUTH", action.payload.token);
      toastHandler("Logged In!", "SUCCESS");
    },
    [loginUser.rejected]: (state, action) => {
      state.isAuthenticated = false;
      const errors = [
        "Sorry something went wrong",
        "Check your email and password!",
      ];

      toastHandler(errors, "ERROR");
    },
    [autoSign.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.message = "Logged in succesfully!";
      localStorage.setItem("X-AUTH", action.payload.token);
    },
    [updateUserEmailPass.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.message = "Updated email/password!";
      localStorage.setItem("X-AUTH", action.payload.token);
      toastHandler("Updated email/password!", "SUCCESS");
    },
    [getUserStats.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.stats = action.payload.stats;
      state.message = "Fetched user stats!";
    },
  },
});

export const { logoutUser } = loginSlice.actions;

export default loginSlice.reducer;
