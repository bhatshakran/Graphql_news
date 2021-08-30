import React from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserAccess = () => {
  return (
    <React.Fragment>
      <Form>
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
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            id="password"
            name="password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default UserAccess;
