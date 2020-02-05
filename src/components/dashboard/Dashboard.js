import React from "react";
import { Route, withRouter } from "react-router-dom";
import "./Dashboard.scss";
import Profile from "./profile/Profile";
import Navbar from "./navbar/Navbar";
import EditProfile from "./edit-profile/EditProflie";

const Dashboard = props => {
  const token = localStorage.getItem("token");
  if(!token) {
    // alert("jj")
    props.history.push("/")
  }
  return (
    <div>
      <Navbar history={props.history} />
      <div className="dashboard-wrapper">
        <Route path="/dashboard" component={Profile} exact/>
        <Route path="/dashboard/edit-profile" component={EditProfile} />
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
