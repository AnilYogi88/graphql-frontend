import React, { useState } from "react";
import { Form, Row, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import "./Register.scss";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const REGISTER_USER = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    createUser(
      userInput: {
        name: $name
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      name
      email
    }
  }
`;

const Register = props => {
  const [values, setValues] = useState({});
  const [createUser, { error }] = useMutation(REGISTER_USER, {
    onError: error => {
      console.log("error", error.graphQLErrors);
    },
    onCompleted: () => {
      message.success("Your account has been successfully created");
      props.history.push("/");
    }
  });

  const handleInputChange = event => {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    createUser({
      variables: values
    });
  };

  const displyError = () => {
    return error
      ? error.graphQLErrors.map((error, index) => {
          console.log("errorss", error);
          return <div key={index}>{error.message}</div>;
        })
      : "";
  };

  return (
    <div className="register-content-wrapper">
      <div className="register-form-wrapper">
        <div className="error-msg">{displyError()}</div>
        <h3>Register Form</h3>
        <Form className="register-form" onSubmit={handleSubmit}>
          <Row>
            <Form.Item>
              <Input
                name="name"
                className="full-name"
                type="text"
                placeholder="Full Name"
                onChange={handleInputChange}
                required
              />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item>
              <Input
                name="email"
                className="user-email"
                type="email"
                placeholder="E-mail"
                onChange={handleInputChange}
              />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item>
              <Input
                name="password"
                className="user-password"
                type="password"
                placeholder="Password"
                onChange={handleInputChange}
                required
              />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item>
              <Input
                name="confirmPassword"
                className="confirm-password"
                type="password"
                placeholder="Confirm Password"
                onChange={handleInputChange}
                required
              />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item>
              <Button className="register-btn" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Row>
        </Form>
        <Link className="login-link" to="/">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
