import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./components/Home";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Container className="mt-4">
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
