import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";

function ShowCounter(props) {
  return (
    <div>
      <h5>
        <p>{props.massage}</p>
      </h5>
      <h1 style={{ marginLeft: "50px" }}> Count: {props.value}</h1>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    value: state.count,
    massage: state.massage,
  };
};
// const mapDispatchToProps = () => {};

export default connect(mapStateToProps, null)(ShowCounter);
