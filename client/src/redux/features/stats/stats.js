import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../../axios/config";

export const getCategories = createAsyncThunk("/categories", async () => {
  try {
    const body = {
      query: `query{
                getCategories{
                    _id
                    name
                }
            }`,
    };

    const { data } = await config({ data: JSON.stringify(body) });
    console.log(data);
    return data.data.getCategories;
  } catch (err) {
    console.log(err);
  }
});

export const statsSlice = createSlice({
  name: "stats",
  initialState: {
    loading: true,
    message: "",
    data: {},
  },
  reducers: {},
  extraReducers: {
    [getCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = "Fetched categories";
      state.data = action.payload;
    },
  },
});

export default statsSlice.reducer;
