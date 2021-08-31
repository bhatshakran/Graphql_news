import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../redux/features/auth/register";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../../redux/features/auth/signIn";

const UserAccess = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [type, setType] = useState(true);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email")
        .required("Sorry the email is required!"),
      password: Yup.string()
        .min(5, "Must be more than 5 characters!")
        .required("Sorry the password is required!"),
    }),
    onSubmit: (values) => {
      onSubmitHandler(values);
    },
  });

  // Switch type handler
  const switchTypeHandler = () => {
    setType(!type);
  };

  // On form submit handler
  const onSubmitHandler = (values) => {
    if (type) {
      // Sign In user
      dispatch(loginUser(values));
      history.push("/user_area");
    } else {
      // Register user
      dispatch(registerUser(values));
      history.push("/user_area");
    }
  };

  // use effect
  useEffect(() => {
    return function cleanup() {
      // dispatch to clear user from the store
    };
  });

  // Return
  return (
    <React.Fragment>
      <Form onSubmit={formik.handleSubmit}>
        <Row className="mb-4">
          <Col>
            <h1>Sign in/Register</h1>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <Alert variant="danger">{formik.errors.email}</Alert>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <Alert variant="danger">{formik.errors.password}</Alert>
          ) : null}
        </Form.Group>
        {type ? (
          <Button variant="primary" type="submit" className="mt-4">
            Sign In
          </Button>
        ) : (
          <Button variant="primary" type="submit" className="mt-4">
            Register
          </Button>
        )}

        <Button
          variant="secondary"
          className="mx-2 mt-4"
          onClick={switchTypeHandler}
        >
          Already {type ? "Signed in" : "Registered"} ? click here
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default UserAccess;
