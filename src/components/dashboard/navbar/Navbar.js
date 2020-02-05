import React from "react";
import { Layout, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import "./Navbar.scss"
// const { Header } = Layout;

const Navbar = props => {
  const logout = () => {
    localStorage.clear();
    props.history.push("/")
    console.log(props);
    
  };
  return (
    <Layout className="layout">
      {/* <Menu.Item>Graph App</Menu.Item> */}
      <Menu className="menu-items" mode="horizontal">
        <Menu.Item> <Link to="/dashboard/edit-profile">Edit Profile</Link></Menu.Item>
        <Menu.Item className="logout-btn">
          <Button type="danger" onClick={logout}>
            Logout
          </Button>
        </Menu.Item>
      </Menu>
    </Layout>
  );
};
export default Navbar;
