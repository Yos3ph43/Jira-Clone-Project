import { Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  DatabaseFilled,
  FileAddFilled,
  SettingFilled,
} from "@ant-design/icons";
const navItems = [
  {
    key: "1",
    icon: <DatabaseFilled />,
    label: <Link to="/list">Project List</Link>,
  },
  {
    key: "2",
    icon: <FileAddFilled />,
    label: <Link to="/create">Create Project</Link>,
  },
  {
    key: "3",
    icon: <SettingFilled />,
    label: <Link to="/user">User Profile</Link>,
  },
];
const ProjectManage = () => {
  return (
    <>
      <Layout>
        <Content style={{}}>
          <Layout
            style={{
              background: "#fff",
            }}
          >
            <Sider
              style={{
                background: "#fff",
              }}
              width={200}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                theme="dark"
                style={{
                  height: "100%",
                  padding: "24px 0",
                }}
                items={navItems}
              />
            </Sider>
            <Content
              style={{
                padding: "24px 24px",
                minHeight: 280,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Content>
      </Layout>
      <Link to="/auth/login">Temp link to login</Link>
    </>
  );
};

export default ProjectManage;
