import { Button, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  DatabaseFilled,
  FileAddFilled,
  LogoutOutlined,
  SettingFilled,
} from "@ant-design/icons";
const navItems = [
  {
    key: "1",
    icon: <DatabaseFilled className="pl-7" />,
    label: <Link to="/list">Project List</Link>,
  },
  {
    key: "2",
    icon: <FileAddFilled className="pl-7" />,
    label: <Link to="/create">Create Project</Link>,
  },
  {
    key: "3",
    icon: <SettingFilled className="pl-7" />,
    label: <Link to="/user">User Profile</Link>,
  },
];
const ProjectManage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const handleLogout = () => {
    if (!window.confirm("Logout out?")) return;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    user && (
      <div>
        <Layout>
          <Header className="header">
            <div className="px-5 flex justify-between">
              <div className="text-gray-200 text-2xl font-semibold">
                Jira logo Placeholder
              </div>
              <div>
                <span className="text-gray-400 text-xl font-semibold">
                  {user.name}
                </span>
                <Button
                  className="ml-2 px-2 bg-red-900 text-white border-transparent  hover:text-neutral-900 hover:bg-red-800 "
                  onClick={handleLogout}
                >
                  <LogoutOutlined />
                </Button>
              </div>
            </div>
          </Header>
          <Layout>
            <Content style={{}}>
              <Layout
                style={{
                  background: "#fff",
                }}
              >
                <Sider
                  className="min-h-screen"
                  style={{
                    background: "#fff",
                  }}
                  width={250}
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
                    className=""
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
        </Layout>
      </div>
    )
  );
};

export default ProjectManage;
