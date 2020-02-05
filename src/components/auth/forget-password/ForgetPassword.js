import React, { useState } from "react";
import { Form, Row, Input, Icon, Button, message } from "antd";
import { Link } from "react-router-dom";
import "./ForgetPassword.scss";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";

const FORGET_USER_PASSWORD = gql`
  query ForgetPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
const ForgetPassword = () => {
  const [values, setValues] = useState({});
  const [forgotPassword, { error, data }] = useLazyQuery(FORGET_USER_PASSWORD, {
    onError: () => {
        message.error(`User doesn't exists with the given email:${values["email"]}`)

    },
    onCompleted: data => {
      message.success(data.forgotPassword)
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
    forgotPassword({
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
    <div className="forgetPassword-content-wrapper">
      <div className="forgetPassword-form-wrapper">
        <div className="error-msg">{displyError()}</div>
        <h3>Forget Password Form</h3>

        <Form className="forgetPassword-form" onSubmit={handleSubmit}>
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
                // type="email"
                placeholder="E-mail"
                onChange={handleInputChange}
                required
              />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item>
              <Button className="forgetPassword-btn" htmlType="submit">
                Send
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

export default ForgetPassword;
