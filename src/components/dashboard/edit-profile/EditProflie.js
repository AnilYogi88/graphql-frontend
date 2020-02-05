import React, { useState } from "react";
import { Form, Row, Input, Button, message } from "antd";
import "./EditProfile.scss";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { VIEW_PROFILE } from "../profile/Profile";

const UPDATE_USER = gql`
  mutation UpdateUser($name: String!, $email: String!) {
    updateUser(name: $name, email: $email) {
      name
      email
    }
  }
`;
const EditProfile = props => {
  const [values, setValues] = useState({});

  const { data: profile } = useQuery(VIEW_PROFILE, {
    onCompleted: data => {
      const {
        viewProfile: { name, email }
      } = data;
      console.log("data", data);
      const { setFieldsValue } = props.form;
      setValues({ name, email });
      setFieldsValue({
        name: name,
        email: email
      });
    }
  });

  const [updateUser, { error }] = useMutation(UPDATE_USER, {
    refetchQueries: () => [{ query: VIEW_PROFILE }],
    onError: error => {
      console.log(
        "error",
        error.graphQLErrors,
        error.networkError,
        error.message
      );
    },
    onCompleted: data => {
      message.success("Your Profile Has been updated succesfully");
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
    updateUser({
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
  console.log("values", values);
  const { getFieldDecorator } = props.form;
  return (
    <div className="profile-content-wrapper">
      <div className="login-form-wrapper">
        {/* <div className="error-msg">{displyError()}</div> */}

        <h3>Edit Profile Form</h3>
        <Form className="update-user-form" onSubmit={handleSubmit}>
          <Row>
            <Form.Item>
              <label>Name</label>
              {getFieldDecorator("name", { onChange: handleInputChange })(
                <Input
                  name="name"
                  className="user-name"
                  type="text"
                  placeholder="Name"
                  onChange={handleInputChange}
                  required
                />
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item>
              <label>Email</label>
              {getFieldDecorator("email", { onChange: handleInputChange })(
                <Input
                  name="email"
                  className="user-email"
                  type="email"
                  placeholder="E-mail"
                  //  onChange={handleInputChange}
                  required
                />
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item>
              <Button className="update-btn" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </div>
    </div>
  );
};
const UserEditProfile = Form.create({ name: "EditProfileForm" })(EditProfile);
export default UserEditProfile;
