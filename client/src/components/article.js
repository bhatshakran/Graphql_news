import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardItem from "react-bootstrap";
import { CardGroup } from "react-bootstrap";
import { getPost } from "../redux/features/posts/posts";

const Article = (props) => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.match.params.id) {
      dispatch(getPost(props.match.params.id));
    }
  }, []);

  return <div>article here</div>;
};

export default Article;
