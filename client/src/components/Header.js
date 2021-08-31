import React, { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../redux/features/auth/signIn";

const Header = (props) => {
  const history = useHistory();
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push("/");
  };

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
              <Nav.Link onClick={handleLogout}>Log out</Nav.Link>

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
