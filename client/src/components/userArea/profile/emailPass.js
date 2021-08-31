import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button, Alert } from "react-bootstrap";
import toastHandler from "../../../utils/toasts";
import { useDispatch, useSelector } from "react-redux";
import { updateUserEmailPass } from "../../../redux/features/auth/signIn";

const EmailPass = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user.email,
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email"),

      password: Yup.string().min(5, "Must be more than 5 characters!"),
    }),
    onSubmit: (values) => {
      onSubmitHandler(values);
    },
  });
  //   On submit handler
  const onSubmitHandler = (values) => {
       values = { ...values, id: user._id };
    dispatch(updateUserEmailPass(values));
  };

  return (
    <div className="mt-3">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Update your email"
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
            placeholder="Update your password"
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

        <Button variant="primary" type="submit" className="mt-4">
          Update email or password
        </Button>
      </Form>
    </div>
  );
};

export default EmailPass;
