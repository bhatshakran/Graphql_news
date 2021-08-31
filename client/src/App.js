import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./components/Home";
import Header from "./components/Header";
import UserAccess from "./components/userArea/access";
import { ToastContainer } from "react-toastify";
import AutoSignIn from "./components/HOC/autoSignIn";
import UserArea from "./components/userArea";
import Profile from "./components/userArea/profile/index";
import Create from "./components/userArea/articles/create";
import Articles from "./components/userArea/articles/index";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AutoSignIn>
          <ToastContainer />
          <Header />
          <Container className="mt-4">
            <Switch>
              <Route path="/sign_in" component={UserAccess} />
              <Route exact path="/user_area" component={UserArea} />
              <Route exact path="/user_area/profile" component={Profile} />
              <Route exact path="/user_area/create" component={Create} />
              <Route exact path="/user_area/articles" component={Articles} />
              <Route exact path="/" component={Home} />
            </Switch>
          </Container>
        </AutoSignIn>
      </BrowserRouter>
    </div>
  );
}

export default App;
