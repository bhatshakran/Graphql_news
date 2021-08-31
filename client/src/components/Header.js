import React, { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  const user = useSelector((state) => state.login.user);
  console.log(user);
  return (
    <React.Fragment>
      <Navbar className="bg-custom" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand>Graph news</Navbar.Brand>
        </LinkContainer>
      </Navbar>
      <Navbar className="bg-custom-small" variant="dark">
        <Nav>
          {user.email ? (
            <Fragment>
              <Nav.Link>Log out</Nav.Link>

              <LinkContainer to="/user_area">
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>
            </Fragment>
          ) : (
            <LinkContainer to="/sign_in">
              <Nav.Link>Sign In</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar>
    </React.Fragment>
  );
};

export default Header;
