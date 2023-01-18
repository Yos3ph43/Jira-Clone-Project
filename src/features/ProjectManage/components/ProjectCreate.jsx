import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Form, Input, InputNumber, Select, Switch } from "antd";

const ProjectCreate = () => {
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
  };
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div>
      <div className="w-5/6">
        <Form
          className=""
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
        >
          {/* Name */}
          <Form.Item
            label="Project name"
            name="name"
            rules={[{ required: true, message: "Enter project name" }]}
          >
            <Input />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Description"
            name="email"
            rules={[
              { required: true, message: "Project description required" },
            ]}
          >
            <ReactQuill theme="snow" />
          </Form.Item>

          {/* Phone */}
          <Form.Item
            label="Project Category"
            name="phoneNumber"
            rules={[{ required: true, message: "Select project catergory" }]}
          >
            <Select
              options={[
                { label: "Software", value: "" },
                { label: "Web Application", value: "" },
                { label: "Mobile Application", value: "" },
              ]}
            />
          </Form.Item>

          <div className="text-center">
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ProjectCreate;
