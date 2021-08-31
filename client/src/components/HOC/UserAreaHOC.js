import React from "react";
import { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const UserAreaHOC = (props) => {
  return (
    <Fragment>
      <Navbar bg="light" variant="light">
        <Nav className="mr-auto">
          <LinkContainer to="/user_area/profile">
            <Nav.Link>Profile</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/user_area/profile">
            <Nav.Link>Articles</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/user_area/profile">
            <Nav.Link>Create</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>
      <div>{props.children}</div>
    </Fragment>
  );
};

export default UserAreaHOC;
