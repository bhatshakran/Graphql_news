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
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    const args = {
      sort,
      prevState: [],
      id: user.user._id,
    };
    dispatch(getUserPosts(args));
  }, []);

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
                    <td className={item.status === "DRAFT" ? "yell" : "green"}>
                      {item.status}
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
    </UserAreaHOC>
  );
};

export default Articles;
