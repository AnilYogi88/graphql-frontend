import React from "react";
import { Route, withRouter } from "react-router-dom";
import "./Auth.scss";
import Login from "./login/Login";
import Register from "./register/Register";
import ForgetPassword from "./forget-password/ForgetPassword";
import ResetPassword from "./reset-password/ResetPassword";

const Auth = props => {
  const token = localStorage.getItem("token");
  if (token) {
    props.history.push("/dashboard");
  }
  return (
    <div className="auth-wrapper">
      <Route path="/" component={Login} exact />
      <Route path="/auth/register" component={Register} />
      <Route path="/auth/forget-password" component={ForgetPassword} />
      <Route path="/auth/reset-password/:token" component={ResetPassword} />
    </div>
  );
};

export default withRouter(Auth);
