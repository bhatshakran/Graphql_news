import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../../axios/config";

export const createPost = createAsyncThunk("/categories", async (args) => {
  try {
    const body = {
      query: `mutation CreatePost($fields:PostInput!){
                createPost(fields:$fields) {
                    _id
                    title
                }
            }`,
      variables: {
        fields: args,
      },
    };

    const { data } = await config({ data: JSON.stringify(body) });
    console.log(data);
    return data.data.createPost;
  } catch (err) {
    console.log(err);
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    loading: true,
    message: "",
    posts: {},
  },
  reducers: {},
  extraReducers: {},
});

export default postsSlice.reducer;
