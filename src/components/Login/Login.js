import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { login } from "../../store/actions";
import styles from "./style.module.css";
import { Link } from "react-router-dom";

function Login(props) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  // useEffect(() => {
  //   if (props.registerState) {
  //     setValues({
  //       email: "",
  //       password: "",
  //     });
  //   }
  // }, [props.registerState]);

  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const handleSubmit = () => {
    const { email, password } = values;

    setErrors({
      email: email ? null : "Email is required",
      password: password ? null : "Password is required",
    });

    if (email && password) {
      props.login(values);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setValues({
      ...values,
      [name]: value,
    });
    if (!value) {
      setErrors({
        ...errors,
        [name]: `Filed is required ${name}`,
      });
    } else {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
    if (name === "email" && value) {
      const emailREg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailREg.test(value)) {
        setErrors({
          email: "invalid email ",
        });
      }
    }
  };

  return (
    <div style={{ padding: "2% 31% 0% 31%" }}>
      <h1 style={{ marginLeft: "21%" }}> Register page</h1>
      <br />
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Text className="text-danger">{errors.email}</Form.Text>
          <Form.Control
            className={errors.email ? styles.invalid : ""}
            type="email"
            placeholder="Enter email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </Form.Group>
        <br />

        <Form.Group>
          {<Form.Text className="text-danger">{errors.password}</Form.Text>}

          <Form.Control
            className={errors.password ? styles.invalid : ""}
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            name="password"
          />
        </Form.Group>
        <br />

        <Button variant="primary" onClick={handleSubmit}>
          Login
        </Button>
      </Form>
      <p>
        <Link to="/login">If you have not registered? Try to Register.</Link>
      </p>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    loginState: state.loginState,
  };
};

const mapDespatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDespatchToProps)(Login);
