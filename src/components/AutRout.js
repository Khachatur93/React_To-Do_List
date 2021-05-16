import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getTasks, deleteSelect, deleteTasks } from "../store/actions";

function AutRout({ path, component: Component, type, isAuthentic }) {
  return (
    <Route
      path={path}
      render={(props) => {
        if (isAuthentic && type === "public") {
          return <Redirect to="/" />;
        }
        if (!isAuthentic && type === "public") {
          return <Component />;
        }
        if (
          (isAuthentic && type === "private") ||
          (!isAuthentic && type === "private")
        ) {
          return <Component {...props} />;
        }
      }}
      exact={true}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    modalState: state.modalState,
    deleteTaskSuccess: state.deleteTaskSuccess,
    editTaskSuccess: state.editTaskSuccess,
    isAuthentic: state.isAuthentic,
  };
};

const mapDespatchToProps = {
  getTasks,
  deleteSelect,
  deleteTasks,
};

export default connect(mapStateToProps, mapDespatchToProps)(AutRout);
