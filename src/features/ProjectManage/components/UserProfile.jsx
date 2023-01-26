import React from "react";
import {} from "@ant-design/icons";
import { Button, Form, Input, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfileAction } from "../redux/action";
import { loginAction } from "features/Login/redux/action";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  let userProfile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    await dispatch(updateUserProfileAction(values));
    await dispatch(loginAction(values));
    alert("Succesfully Updated");
  };
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
  };
  const handleLogout = () => {
    if (!window.confirm("Logout out?")) return;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/auth/login");
  };
  const [form] = Form.useForm();
  return (
    userProfile && (
      <div className="flex justify-center items-center">
        <div className=" bg-gray-200 rounded-lg px-5 py-10 w-1/3">
          <Form
            className="w-full"
            form={form}
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            fields={[
              {
                name: ["id"],
                value: `${userProfile.id}`,
              },
              {
                name: ["name"],
                value: userProfile.name,
              },
              {
                name: ["email"],
                value: userProfile.email,
              },
              {
                name: ["phoneNumber"],
                value: userProfile.phoneNumber,
              },
            ]}
          >
            {/* UserID */}
            <Form.Item name="id" className="hidden">
              <InputNumber />
            </Form.Item>

            {/* Name */}
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Enter your name" }]}
            >
              <Input />
            </Form.Item>

            {/* Email */}
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Enter your email" }]}
            >
              <Input />
            </Form.Item>

            {/* Phone */}
            <Form.Item
              label="Phone number"
              name="phoneNumber"
              rules={[{ required: true, message: "Enter your phone number" }]}
            >
              <Input />
            </Form.Item>

            {/*  */}
            <Form.Item
              label="Password"
              name="passWord"
              rules={[{ required: true, message: "Enter your Password" }]}
            >
              <Input.Password />
            </Form.Item>

            <div className="text-right">
              <Button type="primary" htmlType="submit">
                Update
              </Button>
              <Button className="ml-3" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </Form>
        </div>
      </div>
    )
  );
};

export default UserProfile;
