import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/action";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);
    await dispatch(loginAction(values));
    navigate("/list");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="pt-10 px-5">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="passWord"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <p className="text-center">
        Not a member? <NavLink to="/auth/signup">Register here.</NavLink>
      </p>

      <div className="text-slate-400 flex justify-center">
        <div>
          <p className="m-0 p-0">Mail: Amen@jesus.christ </p>
          <p className="m-0 p-0">Pass: 123456 </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
