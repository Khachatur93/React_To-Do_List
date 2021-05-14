import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { register } from "../../store/actions";
import styles from "./style.module.css";
import { Link } from "react-router-dom";

function Register(props) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    surName: "",
  });

  useEffect(() => {
    if (props.registerState) {
      setValues({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        surName: "",
      });
    }
  }, [props.registerState]);

  const [errors, setErrors] = useState({
    email: null,
    password: null,
    confirmPassword: null,
    name: null,
    surname: null,
  });

  const handleSubmit = () => {
    const { email, password, confirmPassword, name, surName } = values;
    let valid = true;

    let passwordMessage = null;
    if (!confirmPassword) {
      passwordMessage = "Password is required";
      valid = false;
    } else if (password !== confirmPassword) {
      passwordMessage = "Passwords didn't match";
      valid = false;
    } else if (password.length < 6) {
      passwordMessage = "password must be at least 6 characters ";
      valid = false;
    }

    setErrors({
      email: email ? null : "Email is required",
      name: name ? null : "Name is required",
      surName: surName ? null : "Surname is required",
      confirmPassword: confirmPassword ? null : "Confirm is required",

      password: passwordMessage,
      // password: password ? null : "Password is required",
    });

    if (valid) {
      props.register(values);
      console.log(values);
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
        <Form.Group controlId="formBasicName">
          <Form.Text className="text-danger">{errors.name}</Form.Text>
          <Form.Control
            className={errors.name ? styles.invalid : ""}
            type="Text"
            placeholder="Enter your name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="formBasicSurName">
          <Form.Text className="text-danger">{errors.surName}</Form.Text>
          <Form.Control
            className={errors.surName ? styles.invalid : ""}
            type="Text"
            placeholder="Enter your surname"
            name="surName"
            value={values.surName}
            onChange={handleChange}
          />
        </Form.Group>
        <br />
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
        <Form.Text className="text-danger">{errors.confirmPassword}</Form.Text>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            className={errors.confirmPassword ? styles.invalid : ""}
            type="password"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
          />
        </Form.Group>
        <br />
        <Button variant="primary" onClick={handleSubmit}>
          Register
        </Button>
      </Form>
      <br />
      <p>
        <Link to="/login">Already registered? Try to login.</Link>
      </p>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    registerState: state.registerState,
  };
};

const mapDespatchToProps = {
  register,
};

export default connect(mapStateToProps, mapDespatchToProps)(Register);
