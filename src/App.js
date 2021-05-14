import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import Counter from "./demo/Counter";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import Todo from "./components/Todo/Todo";
import Contacts from "./components/Contacts/Contacts";
import About from "./components/About/About";
import Error404 from "./components/404/404";
import NavMenu from "./components/NavMenu/NavMenu";
import SingleTask from "../src/components/SingleTask/SingleTask";
import Spinner from "../src/components/Spinner/Spinner";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { history } from "./helpers/history";
import Register from "../src/components/Register/Register";
import Login from "../src/components/Login/Login";
function App({ loading, successMessage, errorMessage }) {
  useEffect(() => {
    if (successMessage) {
      toast.success(`${successMessage} `, {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    if (errorMessage) {
      toast.error(`${errorMessage} `, {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="App">
      <Router history={history}>
        <NavMenu />
        <Switch>
          <Route path="/" component={Todo} exact={true} />
          <Route path="/About" component={About} exact={true} />
          <Route path="/Contacts" component={Contacts} exact={true} />
          <Route path="/task/:taskId" component={SingleTask} exact={true} />
          <Route path="/error-404" component={Error404} exact={true} />
          <Route path="/Register" component={Register} exact={true} />
          <Route path="/Login" component={Login} exact={true} />

          <Redirect to="/error-404" />
        </Switch>
      </Router>
      {loading && <Spinner />}

      <ToastContainer />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    successMessage: state.successMessage,
    errorMessage: state.errorMessage,
  };
};

export default connect(mapStateToProps, null)(App);
