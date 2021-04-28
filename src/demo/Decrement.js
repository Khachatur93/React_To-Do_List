import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";

function Decrement(props) {
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
        className="btn btn-danger"
        onClick={props.onDecrement}
        style={{ marginLeft: "10px" }}
      >
        Decrement -
      </button>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDecrement: () => {
      dispatch({ type: "DECREMENT" });
    },
    saveValue: (val) => {
      dispatch({ type: "SAND_VALUE", massage: val });
    },
  };
};

export default connect(null, mapDispatchToProps)(Decrement);
