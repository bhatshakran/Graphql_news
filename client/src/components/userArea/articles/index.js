import React, { useReducer, useEffect } from "react";
import UserAreaHOC from "../../HOC/UserAreaHOC";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getUserPosts,
  updatePostStatus,
} from "../../../redux/features/posts/posts";
import { useHistory } from "react-router";

const Articles = () => {
  const [sort, setSort] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { limit: 3, order: "desc", sortBy: "_id", skip: 0 }
  );

  const history = useHistory();
  const user = useSelector((state) => state.login);
  const posts = useSelector((state) => state.posts.userPosts);
  const dispatch = useDispatch();

  const userArgs = {
    sort,
    prevState: [],
    id: user.user._id,
  };
  const updateStatusHandler = async (item) => {
    const status = item.status === "DRAFT" ? "PUBLIC" : "DRAFT";
    const args = {
      status,
      postId: item._id,
      prevState: posts,
    };
    await dispatch(updatePostStatus(args));
  };

  const deletePostHandler = async (item) => {
    const args = {
      id: item._id,
      prevState: posts,
    };
    await dispatch(deletePost(args));
  };

  useEffect(() => {
    dispatch(getUserPosts(userArgs));
  }, [dispatch]);

  return (
    <UserAreaHOC>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {posts
            ? posts.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.category.name}</td>
                    <td
                      onClick={() => {
                        updateStatusHandler(item);
                      }}
                    >
                      {item.status}
                    </td>
                    <td
                      className="remove_btn"
                      onClick={() => {
                        deletePostHandler(item);
                      }}
                    >
                      Remove
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>

      <Button
        onClick={async () => {
          let skip = sort.skip + sort.limit;
          let args = {
            sort: { ...sort, skip: skip },
            prevState: posts,
            id: user.user._id,
          };
          await dispatch(getUserPosts(args));
          setSort({ skip: skip });
        }}
      >
        Load More
      </Button>

      <Button
        className="mx-2"
        variant="outline-info"
        onClick={() => {
          history.push("/user_area/create");
        }}
      >
        Create New Article
      </Button>
    </UserAreaHOC>
  );
};

export default Articles;
