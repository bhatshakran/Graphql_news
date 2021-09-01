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

export const getUserPosts = createAsyncThunk("/getposts", async (args) => {
  console.log(args);
  try {
    const { sort, prevState, id } = args;
    const body = {
      query: `query GetUserPosts($sort:SortInput!, $queryBy:QueryByString){
        getPosts(sort:$sort, queryBy:$queryBy) {
          _id
          title
          status
          category{name}
        }
      }`,
      variables: {
        queryBy: { key: "author", value: id },
        sort: sort,
      },
    };

    const { data } = await config({ data: JSON.stringify(body) });
    let newState;
    let newPosts = data.data ? data.data.getPosts : null;
    if (newPosts) {
      newState = [...prevState, ...newPosts];
    }

    console.log(newState);
  } catch (err) {
    console.log(err);
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
