import React, { useState, useEffect } from "react";
import { Form, Row, Input, Icon, Button, message } from "antd";
// import { Link } from "react-router-dom";
import "./ResetPassword.scss";
import gql from "graphql-tag";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";

const RESET_USER_PASSWORD = gql`
  mutation UpdatePassword(
    $password: String!
    $confirmPassword: String!
    $token: String!
  ) {
    updatePassword(
      password: $password
      confirmPassword: $confirmPassword
      token: $token
    )
  }
`;

const VALIDATE_RESET_PASSWORD_TOKEN = gql`
  query($token: String!) {
    validateToken(token: $token)
  }
`;
const ResetPassword = props => {
  const [values, setValues] = useState({});

  const [validateToken, { error }] = useLazyQuery(
    VALIDATE_RESET_PASSWORD_TOKEN,
    {
      onError: error => {
        console.log("error", error);
        message.error("Invalid token");
        props.history.push("/auth/forget-password");
      },
      onCompleted: data => {
        console.log("data", data);
      }
    }
  );

  const [updatePassword] = useMutation(RESET_USER_PASSWORD, {
    onError: error => {
      console.log("error", error.graphQLErrors);
    },
    onCompleted: data => {
      message.success(data.updatePassword);
      props.history.push("/");
    }
  });

  useEffect(() => {
    const token = props.match && props.match.params && props.match.params.token;
    if (token) {
      validateToken({
        variables: { token: token }
      });
    }
  }, []);
  console.log("props", props);
  const handleInputChange = event => {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const token = props.match && props.match.params && props.match.params.token;
    updatePassword({
      variables: { ...values, token }
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
    <div className="resetPassword-content-wrapper">
      <div className="resetPassword-form-wrapper">
        <div className="error-msg">{displyError()}</div>

        <h3>Reset Password Form</h3>
        <Form className="resetPassword-form" onSubmit={handleSubmit}>
          <Row>
            <Form.Item>
              <Input
                prefix={
                  <Icon
                    type="user"
                    style={{ color: "rgba(255,255,255, 0.4)" }}
                  />
                }
                name="password"
                className="user-email"
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
                prefix={
                  <Icon
                    type="user"
                    style={{ color: "rgba(255,255,255, 0.4)" }}
                  />
                }
                name="confirmPassword"
                className="user-email"
                type="password"
                placeholder="Confirm Password"
                onChange={handleInputChange}
                required
              />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item>
              <Button className="resetPassword-btn" htmlType="submit">
                Reset
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
