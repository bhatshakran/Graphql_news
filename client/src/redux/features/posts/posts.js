import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../../axios/config";
import toastHandler from "../../../utils/toasts";

export const createPost = createAsyncThunk("/createpost", async (args) => {
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
    toastHandler("Post created", "SUCCESS");

    return data.data.createPost;
  } catch (err) {
    console.log(err);
    toastHandler(["Failed to create the post", "Try again!"], "SUCCESS");
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    loading: true,
    message: "",
    posts: [],
    post: {},
  },
  reducers: {},
  extraReducers: {
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = "Post added to the DB!";
      state.post = action.payload;
    },
  },
});

export default postsSlice.reducer;
