import React, { useEffect, useReducer } from "react";
import { Button } from "react-bootstrap";
import Masonry from "react-masonry-css";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/features/posts/posts";

const Home = () => {
  const [sort, setSort] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { limit: 5, order: "desc", sortBy: "_id", skip: 0 }
  );

  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    const args = {
      sort,
      prevState: [],
    };
    dispatch(getAllPosts(args));
  });

  return <div></div>;
};

export default Home;
