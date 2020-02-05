import React, { useState } from "react";
import { Form, Row, Input, Icon, Button, message } from "antd";
import { Link } from "react-router-dom";
import "./Login.scss";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";

const LOGIN_USER = gql`
  query LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
    }
  }
`;
const Login = props => {
  const [values, setValues] = useState({});
  const [login, { error }] = useLazyQuery(LOGIN_USER, {
    onError: error => {
      message.error("Invalid username or password")
      // console.log("error", error, error.graphQLErrors,error.networkError)
    },
    onCompleted: data => {
      localStorage.setItem("token", data.login.token);
      props.history.push("/dashboard");
    }
  });
  console.log(error);

  const handleInputChange = event => {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    login({
      variables: values
    });
  };

  // const displyError = () => {
  //   return error
  //     ? error.graphQLErrors.map((error, index) => {
  //         console.log("errorss", error);
  //         return <div key={index}>{error.message}</div>;
  //       })
  //     : "";
  // };
  return (
    <div className="login-content-wrapper">
      <div className="login-form-wrapper">
        {/* <div className="error-msg">{displyError()}</div> */}

        <h3>Login Form</h3>
        <Form className="login-form" onSubmit={handleSubmit}>
          <Row>
            <Form.Item>
              <Input
                prefix={
                  <Icon
                    type="user"
                    style={{ color: "rgba(255,255,255, 0.4)" }}
                  />
                }
                name="email"
                className="user-email"
                type="email"
                placeholder="E-mail"
                onChange={handleInputChange}
                required
              />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item>
              <Input
                prefix={
                  <Icon
                    type="lock"
                    style={{ color: "rgba(255,255,255, 0.4)" }}
                  />
                }
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
              <Button className="login-btn" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Row>
        </Form>
        <Link className="forgot-password-link" to="/auth/forget-password">
          Forgot Password
        </Link>
        <p className="question">
          Don't have an Account?
          <Link className="register-link" to="/auth/register">
            Register!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
