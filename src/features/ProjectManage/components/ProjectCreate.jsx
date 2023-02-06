import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Form, Input, InputNumber, Select, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../redux/action";
import { useNavigate } from "react-router-dom";

const ProjectCreate = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  return (
    <div>
      <div className="w-5/6">
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 14,
          }}
          onFinish={(value) => {
            dispatch(createProject(value));
            navigator("/list");
          }}
        >
          {/* Project name */}
          <Form.Item
            label="Project name"
            name="projectName"
            rules={[{ required: true, message: "Enter project name" }]}
          >
            <Input />
          </Form.Item>

          {/* description */}
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Enter project description" }]}
          >
            <ReactQuill theme="snow" />
          </Form.Item>

          {/* categoryId */}
          <Form.Item
            label="Project Category"
            name="categoryId"
            rules={[{ required: true, message: "Select project catergory" }]}
          >
            <Select
              options={[
                { label: "Software", value: "2" },
                { label: "Web Application", value: "1" },
                { label: "Mobile Application", value: "3" },
              ]}
            />
          </Form.Item>
          {/* hidden  */}
          <Form.Item hidden name="alias" initialValue="">
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 20,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ margin: "3rem 0" }}
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ProjectCreate;
