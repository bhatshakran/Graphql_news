import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
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
    return newState;
  } catch (err) {
    console.log(err);
  }
});

export const updatePostStatus = createAsyncThunk(
  "/updatestatus",
  async (args) => {
    try {
      const { status, postId, prevState } = args;

      const body = {
        query: `mutation 
        UpdatePost($fields:PostInput!, $postId:ID!){
        updatePost(fields:$fields, postId:$postId){
          _id
          title
          status
          category{name}
        }
      }`,
        variables: {
          postId,
          fields: { status },
        },
      };

      const { data } = await config({ data: JSON.stringify(body) });

      let newState = [];
      let updPost = data.data ? data.data.updatePost : null;

      prevState.map((post) => {
        if (post._id !== updPost._id) {
          newState.push(post);
        }
      });
      newState.push(updPost);
      return newState;
    } catch (err) {
      console.log(err);
    }
  }
);

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
    [getUserPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = "Posts loaded!";
      state.posts = action.payload;
    },
    [updatePostStatus.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = "Post updated!";
      state.posts = action.payload;
    },
  },
});

export default postsSlice.reducer;
