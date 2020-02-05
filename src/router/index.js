import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Auth from "../components/auth/Auth";
import Dashboard from "../components/dashboard/Dashboard";

const Router = props => {
  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    }
    return false;
  };
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/auth" component={Auth} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
