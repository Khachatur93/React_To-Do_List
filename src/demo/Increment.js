import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";

function Increment(props) {
  return (
    <>
      {/* <button
        className="btn btn-warning"
        onClick={() => {
          props.saveValue(value);
          setValue("");
        }}
      >
        Sand Value
      </button> */}

      <button
        style={{ marginLeft: "10px" }}
        className="btn btn-success"
        onClick={props.onIncrement}
      >
        Increment +
      </button>
    </>
  );
}
// const mapStateToProps = (state) => {
//   console.log("state", state);
//   return {
//     value: state.count,
//   };
// };
const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => {
      dispatch({ type: "INCREMENT" });
    },
  };
};

export default connect(null, mapDispatchToProps)(Increment);
