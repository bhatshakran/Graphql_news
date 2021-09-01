import React, { useState, useEffect } from "react";
import UserAreaHOC from "../../HOC/UserAreaHOC";
import { useFormik } from "formik";
import * as Yup from "yup";
import toastHandler from "../../../utils/toasts";
import { useDispatch } from "react-redux";
import { Form, Button, Alert } from "react-bootstrap";

const Create = () => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      excerpt: "",
      content: "",
      status: "",
      category: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("This field is required!"),
      excerpt: Yup.string().required("This field is required!"),
      content: Yup.string().required("This field is required!"),
      status: Yup.string()
        .required("This field is required!")
        .matches(/DRAFT|PUBLIC/, {
          message: "It should be DRAFT or PUBLIC!",
          excludeEmptyString: true,
        }),
      category: Yup.string().required("This field is required!"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <UserAreaHOC>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add a title"
            id="title"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <Alert variant="danger">{formik.errors.title}</Alert>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label>Excerpt</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Add a excerpt"
            id="excerpt"
            name="excerpt"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.excerpt}
          />
          {formik.touched.excerpt && formik.errors.excerpt ? (
            <Alert variant="danger">{formik.errors.excerpt}</Alert>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Add a content"
            id="content"
            name="content"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
          />
          {formik.touched.content && formik.errors.content ? (
            <Alert variant="danger">{formik.errors.content}</Alert>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            id="status"
            name="status"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.status}
          >
            <option value=""></option>
            <option value="DRAFT">DRAFT</option>
            <option value="PUBLIC">PUBLIC</option>
          </Form.Control>
          {formik.touched.status && formik.errors.status ? (
            <Alert variant="danger">{formik.errors.status}</Alert>
          ) : null}
        </Form.Group>
      </Form>
    </UserAreaHOC>
  );
};

export default Create;
