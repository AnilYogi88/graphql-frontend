import React, { useState } from "react";
import { Form, Row } from "antd";
import { Link } from "react-router-dom";
import "./Profile.scss";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

export const VIEW_PROFILE = gql`
  query {
    viewProfile {
      name
      email
    }
  }
`;
const Profile = props => {
  const token = localStorage.getItem("token");
  // if(!token) {
  //   alert("jj")
  //   props.history.push("/")
  // }
  const [values, setValues] = useState({});
  const { loading, error, data } = useQuery(VIEW_PROFILE, {
    onError: error => {
      console.log(
        "error",
        error.graphQLErrors,
        error.networkError,
        error.message
      );
    },
    onCompleted: data => {}
  });
  console.log(error);

  // const handleInputChange = event => {
  //   const { value, name } = event.target;
  //   setValues({
  //     ...values,
  //     [name]: value
  //   });
  // };

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   updateUser({
  //     variables: values
  //   });
  // };

  // const displyError = () => {
  //   return error
  //     ? error.graphQLErrors.map((error, index) => {
  //         console.log("errorss", error);
  //         return <div key={index}>{error.message}</div>;
  //       })
  //     : "";
  // };
  return (
    <div className="profile-content-wrapper">
      <div className="login-form-wrapper">
        {/* <div className="error-msg">{displyError()}</div> */}

        <h3>Welcome To Graph App</h3>
        <Form className="update-user-form">
          <Row>
            <Form.Item>
              <label>Name:</label>

              {(data && data.viewProfile && data.viewProfile.name) || ""}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item>
              <label>Email:</label>
              {(data && data.viewProfile && data.viewProfile.email) || ""}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item>
              <Link className="edit-link" to="/dashboard/edit-profile">
                Edit Profile
              </Link>
            </Form.Item>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
