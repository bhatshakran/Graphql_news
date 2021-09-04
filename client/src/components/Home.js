import React, { Fragment, useEffect, useReducer } from "react";
import { Button } from "react-bootstrap";
import Masonry from "react-masonry-css";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/features/posts/posts";
import CardItem from "./cardItem";

const Home = () => {
  const [sort, setSort] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { limit: 5, order: "desc", sortBy: "_id", skip: 0 }
  );

  const posts = useSelector((state) => state.posts.allPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    const args = {
      sort,
      prevState: [],
    };
    dispatch(getAllPosts(args));
  }, []);

  return (
    <Fragment>
      <Masonry
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid-column"
      >
        {posts
          ? posts.map((post, index) => {
              return <CardItem item={post} key={index} />;
            })
          : null}
      </Masonry>
    </Fragment>
  );
};

export default Home;
