import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserStats } from "../../../redux/features/auth/signIn";
import { Card, CardGroup, Alert } from "react-bootstrap";

const Stats = (props) => {
  let user = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserStats(user.user._id));
  }, [dispatch, user.user._id]);

  return (
    <Fragment>
      {user.stats.stats ? (
        <Fragment>
          <h3>Your stats</h3>
          <CardGroup>
            <Card border="primary">
              <Card.Body>
                <Card.Title>Categories created by you:</Card.Title>
                {user.stats.stats.categories.length === 0 ? (
                  <div>Sorry you dont have any categories</div>
                ) : (
                  user.stats.stats.categories.map((item, idx) => {
                    return (
                      <Alert key={idx} variant="primary">
                        {item.name}
                      </Alert>
                    );
                  })
                )}
              </Card.Body>
            </Card>
            <Card border="info">
              <Card.Body>
                <Card.Title>Last created posts:</Card.Title>
                {user.stats.stats.posts.length === 0 ? (
                  <div>Sorry you dont have any posts</div>
                ) : (
                  user.stats.stats.posts.map((item, idx) => {
                    return (
                      <Alert key={idx} variant="info">
                        -{item.title}
                      </Alert>
                    );
                  })
                )}
              </Card.Body>
            </Card>
          </CardGroup>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default Stats;
