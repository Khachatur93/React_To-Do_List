import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Todo from "./components/Todo/Todo";
import Contacts from "./Contacts/Contacts";
import About from "../src/About/About";
import Error404 from "./components/404/404";
import NavMenu from "./components/NavMenu/NavMenu";
import SingleTask from "../src/components/SingleTask/SingleTask";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavMenu />
        <Switch>
          <Route path="/" component={Todo} exact={true} />
          <Route path="/About" component={About} exact={true} />
          <Route path="/Contacts" component={Contacts} exact={true} />
          <Route path="/task/:taskId" component={SingleTask} exact={true} />
          <Route path="/error-404" component={Error404} exact={true} />
          <Redirect to="/error-404" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
