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
      

      const updPost = data.data.updatePost;

      let newState = [...prevState];
      let prevIndex = prevState.indexOf(
        prevState.find((el) => el._id === updPost._id)
      );
      newState.splice(prevIndex, 1);
      newState.splice(prevIndex, 0, updPost);
      toastHandler("Updated post status!", "SUCCESS");
      return newState;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getAllPosts = createAsyncThunk("/getHomePosts", async (args) => {
  const { sort, prevState } = args;

  try {
    const body = {
      query: `query 
      GetPosts ($sort:SortInput, $queryBy:QueryByString){
        getPosts(sort:$sort, queryBy:$queryBy){
          _id
          title
          status
          excerpt
         
          author{
            name
            lastname
          }
        }
      }`,

      variables: {
        queryBy: { key: "status", value: "PUBLIC" },
        sort: sort,
      },
    };

    const { data } = await config({ data: JSON.stringify(body) });

    return data.data.getPosts;
  } catch (err) {
    console.log(err);
  }
});

export const deletePost = createAsyncThunk("/deletepost", async (args) => {
  const { id, prevState } = args;
  try {
    const body = {
      query: `mutation{
        deletePost(id:"${id}")
      }`,
    };

    const { data } = await config({ data: JSON.stringify(body) });
    const returnMessage = data.data.deletePost;

    let newState = [...prevState];

    const prevIndex = prevState.indexOf(prevState.find((el) => el._id === id));
    newState.splice(prevIndex, 1);

    console.log(newState);
    return { newState, returnMessage };
  } catch (err) {
    console.log(err);
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    loading: true,
    message: "",
    userPosts: [],
    post: {},
    allPosts: [],
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
      state.userPosts = action.payload;
    },
    [updatePostStatus.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = "Post updated!";
      state.posts = action.payload;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload.returnMessage;
      state.posts = action.payload.newState;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = "Fetched all Home Posts";
      state.allPosts = action.payload;
    },
  },
});

export default postsSlice.reducer;
