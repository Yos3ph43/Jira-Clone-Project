import { PlusCircleOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Popover,
  Row,
  Slider,
  Space,
  Table,
} from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  assignUserAction,
  fetchProjectDetail,
  fetchSearchUser,
} from "../redux/action";
import ProjectListMembers from "./ProjectListMembers";
import TaskDetail from "./TaskDetail";

const ProjectDetail = () => {
  // slider
  const [inputValue, setInputValue] = useState(0);
  const onChange = (newValue) => {
    setInputValue(newValue);
  };
  //search user value
  const [value, setValue] = useState("");
  const searchUser = useSelector((state) => state.project.searchUser);

  //popover
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  //modal project edit
  const [openModal, setOpenModal] = useState(false);
  //modal create task
  const [openTask, setOpenTask] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProjectDetail(params.id));
  }, []);
  const projectDetail = useSelector((state) => state.project.projectDetail);
  const params = useParams();
  console.log(projectDetail);
  console.log(params);
  return (
    <div>
      <div className="pt-7 pl-7">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/list">Project List</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Project Detail</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {/* Title  */}
      <>
        <h1 className="text-center text-indigo-700 text-3xl font-semibold">
          <span className="text-black text-xl font-extrabold">Project:</span>{" "}
          {projectDetail?.projectName}
        </h1>
      </>
      {/* Avatar getUser về map */}
      <div>
        <Row>
          <Col span={18}>
            <Avatar.Group>
              <Popover
                title="List of members"
                placement="bottom"
                // key={item.id}
                content={
                  <>
                    <ProjectListMembers
                      members={projectDetail?.members}
                      projectId={params.id}
                    />
                  </>
                }
                trigger="click"
                open={open}
                onOpenChange={() => {
                  handleOpenChange();
                }}
              >
                {/* {item.members?.map((member) => {
            return (
              <Avatar
                src={member.avatar}
                key={member.userId}
                style={{
                  backgroundColor: "red",
                }}
              ></Avatar>
            );
          })} */}
              </Popover>
            </Avatar.Group>

            <Avatar>
              <Popover
                placement="bottom"
                // key={item.id}
                content={
                  <>
                    <Space>
                      <AutoComplete
                        className="w-56"
                        onSearch={(value) => {
                          console.log(value);
                          dispatch(fetchSearchUser(value));
                        }}
                        options={
                          searchUser &&
                          searchUser.map((user) => ({
                            label: `${user.name} (ID: ${user.userId})`,
                            value: `${user.userId}`,
                          }))
                        }
                        value={value}
                        onSelect={(value, option) => {
                          setValue(option.label);

                          dispatch(
                            assignUserAction({
                              projectId: params.id,
                              userId: option.value,
                            })
                          );
                          dispatch(fetchProjectDetail(params.id));
                          hide();
                          setValue("");
                        }}
                        onChange={(txt) => {
                          setValue(txt);
                        }}
                      />

                      <Button
                        danger
                        onClick={() => {
                          hide();
                          setValue("");
                        }}
                      >
                        Cancel
                      </Button>
                    </Space>
                  </>
                }
                trigger="click"
                open={open}
                onOpenChange={() => {
                  handleOpenChange();
                }}
              >
                <PlusCircleOutlined />
              </Popover>
            </Avatar>
          </Col>
          <Col className="text-right" span={6}>
            {" "}
            <Button
              onClick={() => {
                setOpenTask(true);
              }}
              type="primary"
            >
              Create Task
            </Button>
          </Col>
        </Row>
      </div>
      {/* Card  */}
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col className="rounded-b-2xl" span={6}>
            <Card
              bodyStyle={{
                backgroundColor: "#f2f5f7",
                borderRadius: "0",
              }}
              className="bg-indigo-300 text-center "
              title="Card title"
              bordered={true}
            >
              <Card
                className="bg-white"
                style={{ width: 335, cursor: "pointer" }}
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                <p>ABC</p>
              </Card>
            </Card>
          </Col>
        </Row>
      </div>
      {/* modal project edit  */}
      <Modal
        width="40rem"
        title="Project Edit"
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
        }}
        footer={[
          <Button
            onClick={() => {
              setOpenModal(false);
            }}
            key="cancel"
          >
            Cancel
          </Button>,
        ]}
      >
        <TaskDetail />
      </Modal>
      {/* modal create task  */}
      <Modal
        width="40%"
        title="Create Task"
        open={openTask}
        onCancel={() => {
          setOpenTask(false);
        }}
        footer={[
          <Button
            onClick={() => {
              setOpenTask(false);
            }}
            key="cancel"
          >
            Cancel
          </Button>,
        ]}
      >
        <Form
          initialValues={{
            remember: true,
          }}
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 10,
          }}
          layout="horizontal"
          style={{
            maxWidth: 600,
            padding: "1rem 1rem 0 1rem",
          }}
          fields={[
            {
              name: ["id"],
              value: projectDetail?.id,
            },

            {
              name: ["projectName"],
              value: projectDetail?.projectName,
            },

            {
              name: ["description"],
              value: projectDetail?.description,
            },
            {
              name: ["categoryId"],
              value: projectDetail?.projectCategory.id,
            },
            {
              name: ["creator"],
              value: projectDetail?.creator.id,
            },
          ]}
        >
          <Form.Item label="Task Name" name="">
            <Input />
          </Form.Item>
          <Form.Item label="Task Type" name="">
            <Input />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item label="Status">
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Priority">
                <Input></Input>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                wrapperCol={{
                  offset: 6,
                  // span: 20,
                }}
                label="Original Estimate"
              >
                <InputNumber
                  value={inputValue}
                  onChange={onChange}
                ></InputNumber>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Time Tracking (hours)">
                <Slider max={inputValue} value={inputValue} />{" "}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectDetail;
