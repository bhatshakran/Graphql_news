import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../../axios/config";

export const getCategories = createAsyncThunk("/categories", async () => {
  try {
    const body = {
      query: `query{
                categories{
                    _id
                    name
                }
            }`,
    };

    const { data } = await config({ data: JSON.stringify(body) });
    console.log(data);
    // return data;
  } catch (err) {
    console.log(err);
  }
});

export const statsSlice = createSlice({
  name: "stats",
  initialState: {
    loading: true,
    isAuthenticated: false,
    message: "",
    data: {},
  },
  reducers: {},
  extraReducers: {},
});

export default statsSlice.reducer;
