import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { message } from "../../store/actions";
import styles from "./style.module.css";
import { Link } from "react-router-dom";

function Login(props) {
  const [values, setValues] = useState({
    name: "",
    password: "",
  });
  useEffect(() => {
    if (props.messageState) {
      setValues({
        name: "",
        email: "",
        message: "",
      });
    }
  }, [props.messageState]);

  const [error, setError] = useState({
    name: null,
    password: null,
  });
  const saveBut = ({ target: { value, name } }) => {
    setValues({
      ...values,
      [name]: value,
    });
    if (!value) {
      setError({
        ...error,
        [name]: `Filed is required ${name}`,
      });
    } else {
      setError({
        ...error,
        [name]: null,
      });
    }
    if (name === "email" && value) {
      const emailREg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailREg.test(value)) {
        setError({
          email: "invalid email ",
        });
      }
    }
  };
  const handleSubmit = () => {
    props.message(values);
  };
  return (
    <div style={{ padding: "4% 30% 0% 30%" }}>
      <h1 style={{ marginLeft: "30%" }}> Sing in</h1>
      <br />
      <Form>
        <Form.Group controlId="formBasicName">
          <Form.Text className="text-danger">{error.name}</Form.Text>
          <Form.Control
            className={error.name ? styles.invalid : ""}
            type="Text"
            placeholder="Enter your name"
            name="name"
            value={values.name}
            onChange={saveBut}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="formBasicPassword">
          <Form.Text className="text-danger">{error.password}</Form.Text>
          <Form.Control
            className={error.name ? styles.invalid : ""}
            type="password"
            placeholder="Confirm password"
            name="confirm"
            value={values.confirm}
            onChange={saveBut}
          />
        </Form.Group>
        <br />
        <Button variant="success" onClick={handleSubmit}>
          Sing in
        </Button>
      </Form>
      <br />
      <Link to="/login">Already registered? Try to login.</Link>
      <p></p>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    messageState: state.messageState,
  };
};

const mapDespatchToProps = {
  message,
};

export default connect(mapStateToProps, mapDespatchToProps)(Login);
