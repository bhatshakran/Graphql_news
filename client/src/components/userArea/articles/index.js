import React, { useReducer, useEffect } from "react";
import UserAreaHOC from "../../HOC/UserAreaHOC";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../../../redux/features/posts/posts";

const Articles = () => {
  const [sort, setSort] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { limit: 3, order: "desc", sortBy: "_id", skip: 0 }
  );

  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    const args = {
      sort,
      prevState: [],
      id: user.user._id,
    };
    dispatch(getUserPosts(args));
  });

  return <UserAreaHOC>articles</UserAreaHOC>;
};

export default Articles;
