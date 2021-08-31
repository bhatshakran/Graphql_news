import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./components/Home";
import Header from "./components/Header";
import UserAccess from "./components/profile/access";
import { ToastContainer } from "react-toastify";
import AutoSignIn from "./components/HOC/autoSignIn";
import UserArea from "./components/profile/userarea";

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
              <Route path="/user_area" component={UserArea} />
              <Route path="/" component={Home} />
            </Switch>
          </Container>
        </AutoSignIn>
      </BrowserRouter>
    </div>
  );
}

export default App;
