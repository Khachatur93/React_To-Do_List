import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import styles from "./style.module.css";
import { connect } from "react-redux";
import { message } from "../../store/actions";
function Contact(props) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
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
    message: null,
    email: null,
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
    const errorArr = Object.values(error);
    const errorExist = !errorArr.every((el) => el === null);
    const valuesArr = Object.values(values);
    const valuesExist = !valuesArr.some((el) => el === "");

    if (valuesExist && !errorExist) {
      props.message(values);

      return;
    }
    if (!valuesExist && !errorExist) {
      setError({
        ...error,
        name: "Filed is required",
        email: "Filed is required",
        message: "Filed is required",
      });
    }
  };
  return (
    <div style={{ padding: "8% 20% 0% 20%" }}>
      <h1 style={{ marginLeft: "30%" }}> Contact us</h1>
      <br />
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="text-danger">{error.name}</Form.Label>
          <Form.Control
            className={error.name ? styles.invalid : ""}
            type="Text"
            placeholder="Enter Name"
            name="name"
            value={values.name}
            onChange={saveBut}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="text-danger">{error.email}</Form.Label>
          <Form.Control
            className={error.email ? styles.invalid : ""}
            type="email"
            placeholder="Enter email"
            name="email"
            value={values.email}
            onChange={saveBut}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label className="text-danger">{error.message}</Form.Label>
          <Form.Control
            className={error.message ? styles.invalid : ""}
            as="textarea"
            placeholder="Your message"
            rows={5}
            value={values.message}
            name="message"
            onChange={saveBut}
          />
        </Form.Group>
        <br />
        <Button variant="primary" onClick={handleSubmit}>
          Send message
        </Button>
      </Form>
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

export default connect(mapStateToProps, mapDespatchToProps)(Contact);
