import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardItem from "./cardItem";
import { CardGroup } from "react-bootstrap";
import { getPost } from "../redux/features/posts/posts";

const Article = (props) => {
  const post = useSelector((state) => state.posts.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.match.params.id) {
      dispatch(getPost(props.match.params.id));
    }
  }, [dispatch]);

  return (
    <Fragment>
      {Object.keys(post).length > 0 ? (
        <Fragment>
          <h1>{post.title}</h1>
          <small>
            Created by {post.author.name}
            {post.author.lastname}
          </small>
          <hr />
          <div>{post.content}</div>
          <hr />
          <h3>Related Posts</h3>
          <CardGroup>
            {post.related
              ? post.related.map((item, index) => {
                  return <CardItem item={item} key={index} />;
                })
              : null}
          </CardGroup>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default Article;
