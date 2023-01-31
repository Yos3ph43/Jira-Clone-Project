import { CheckSquareOutlined, PlusCircleOutlined } from "@ant-design/icons";
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
  Select,
  Slider,
  Space,
  Table,
} from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  assignUserAction,
  createTask,
  fetchProjectDetail,
  fetchSearchUser,
  fetchUserByProject,
} from "../redux/action";
import ProjectListMembers from "./ProjectListMembers";
import TaskDetail from "./TaskDetail";
// const mockVal = (str, repeat = 1) => ({
//   value: str.repeat(repeat),
// });
const ProjectDetail = () => {
  // slider
  const [inputValue, setInputValue] = useState({
    originalEstimate: 0,
  });
  const [vlSlider, setVlSlider] = useState(0);
  const [timeRemain, setTimeRemain] = useState(0);

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
    // dispatch(fetchUserByProject(params.id));
  }, [value]);
  const projectDetail = useSelector((state) => state.project.projectDetail);
  // const userDetail = useSelector((state) => state.project.userByProject);
  const params = useParams();
  console.log(projectDetail);
  // console.log(userDetail);
  return (
    projectDetail && (
      <div>
        <div className="pt-7 pl-7">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/list">Project List</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{projectDetail.projectName}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        {/* Title  */}
        <>
          <h1 className="text-center text-indigo-700 text-3xl font-semibold">
            <span className="text-black text-xl font-extrabold">Project:</span>{" "}
            {projectDetail.projectName}
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
                        members={projectDetail.members}
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
                  {projectDetail.members.map((member) => {
                    return (
                      <Avatar
                        src={member.avatar}
                        key={member.userId}
                        style={{
                          backgroundColor: "red",
                          cursor: "pointer",
                        }}
                      ></Avatar>
                    );
                  })}
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
            {/* {{if (projectDetail.creator===) {
            }}} */}
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
        <div className="site-card-wrapper pt-6">
          <Row gutter={16}>
            {projectDetail &&
              projectDetail.lstTask.map((item) => {
                return (
                  <Col key={item.statusId} className="rounded-b-2xl" span={6}>
                    <Card
                      bodyStyle={{
                        backgroundColor: "#f2f5f7",
                        borderRadius: "0",
                        minHeight: 175,
                      }}
                      className="bg-indigo-300 text-center "
                      title={item.statusName}
                      bordered={true}
                    >
                      {item.lstTaskDeTail.map((task) => {
                        return (
                          <Card
                            size="small"
                            key={task.taskId}
                            className="bg-white"
                            style={{
                              maxWidth: 335,
                              maxHeight: "50rem",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setOpenModal(true);
                            }}
                          >
                            <Row>
                              <Col className="text-left" span={20}>
                                <h4>{task.taskName}</h4>
                                <p>{task.priorityTask.priority}</p>
                              </Col>
                              <Col span={4}>
                                {task.assigness.map((member) => {
                                  return (
                                    <Avatar
                                      key={member.userId}
                                      src={member.avatar}
                                      style={{
                                        backgroundColor: "red",
                                      }}
                                    ></Avatar>
                                  );
                                })}
                              </Col>
                            </Row>
                          </Card>
                        );
                      })}
                    </Card>
                  </Col>
                );
              })}
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
          <TaskDetail
          // taskId={}
          />
        </Modal>
        {/* modal create task  */}
        <Modal
          width="30%"
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
            fields={[
              {
                name: "projectId",
                value: params.id,
              },
              {
                name: "typeId",
                value: "1",
              },
              {
                name: "statusId",
                value: "1",
              },
              {
                name: "priorityId",
                value: "1",
              },
              {
                name: "description",
                value: "",
              },
              { name: "timeTrackingSpent", value: vlSlider },
              { name: "timeTrackingRemaining", value: timeRemain },
            ]}
            onFinish={(value) => {
              dispatch(createTask(value));
              dispatch(fetchProjectDetail(params.id));
              setOpenModal(false);
            }}
            wrapperCol={{
              span: 100,
            }}
            layout="horizontal"
            style={{
              maxWidth: 600,
              padding: "1rem 1rem 0 1rem",
            }}
            autoComplete="off"
          >
            {/* hidden  */}
            <Form.Item hidden name="projectId" initialValue={params.id}>
              <Input hidden disabled />
            </Form.Item>
            {/* hidden  */}

            <h4>Task Name</h4>
            <Form.Item
              name="taskName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên Task",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <h4>Task Type</h4>
            <Form.Item name="typeId">
              <Select
                options={[
                  {
                    value: "1",
                    label: "Bug",
                    name: "1",
                  },
                  {
                    value: "2",
                    label: "New Task",
                    name: "2",
                  },
                ]}
              />
            </Form.Item>
            <Row>
              <Col span={12}>
                <h4>Status</h4>
                <Form.Item name="statusId">
                  <Select
                    style={{
                      width: "95%",
                    }}
                    options={[
                      {
                        value: "1",
                        label: "Backlog",
                        // name: "1",
                      },
                      {
                        value: "2",
                        label: "Selected for Development",
                        // name: "2",
                      },
                      {
                        value: "3",
                        label: "In Progress",
                        // name: "3",
                      },
                      {
                        value: "4",
                        label: "Done",
                        // name: "4",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <h4>Priority</h4>
                <Form.Item name="priorityId">
                  <Select
                    options={[
                      {
                        value: "1",
                        label: "HIGH",
                      },
                      {
                        value: "2",
                        label: "MEDIUM",
                      },
                      {
                        value: "3",
                        label: "LOW",
                      },
                      {
                        value: "4",
                        label: "LOWEST",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <h4>Original Estimate</h4>
                <Form.Item
                  initialValue={inputValue.originalEstimate}
                  name="originalEstimate"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tổng thời gian dự kiến",
                    },
                  ]}
                >
                  <InputNumber
                    max={inputValue}
                    style={{ width: "95%" }}
                    value={inputValue.originalEstimate}
                    onChange={(e) => {
                      setInputValue({
                        ...inputValue,
                        originalEstimate: e,
                      });
                      setVlSlider(e);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <h4>Time Tracking (hours)</h4>
                <Form.Item>
                  <Slider
                    min={0}
                    max={inputValue.originalEstimate}
                    onChange={(vlSlider) => {
                      setVlSlider(vlSlider);
                      setTimeRemain(inputValue.originalEstimate - vlSlider);
                    }}
                    value={vlSlider}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <h4>Assignees</h4>
                <Form.Item name="listUserAsign">
                  <Select
                    style={{ width: "95%" }}
                    mode="multiple"
                    options={
                      projectDetail &&
                      projectDetail.members.map((member) => ({
                        value: member.userId,
                        label: `${member.name} - ${member.userId}`,
                      }))
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <h4 className="font-normal">Time spent</h4>
                <Form.Item name="timeTrackingSpent">
                  <InputNumber
                    min={0}
                    max={inputValue.originalEstimate}
                    style={{ width: "95%" }}
                    onChange={(input) => {
                      setVlSlider(input);
                      setTimeRemain(inputValue.originalEstimate - input);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <h4 className="font-normal">Time remaining</h4>
                <Form.Item name="timeTrackingRemaining">
                  <InputNumber
                    min={0}
                    style={{ width: "95%" }}
                    max={inputValue.originalEstimate - vlSlider}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>
            <h4>Description</h4>
            <Form.Item name="description">
              <ReactQuill
                theme="snow"
                style={{
                  height: "5rem",
                  marginBottom: "2rem",
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
          {/* <TaskCreate /> */}
        </Modal>
      </div>
    )
  );
};

export default ProjectDetail;
