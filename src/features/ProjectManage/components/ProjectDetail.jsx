import {
  CheckSquareOutlined,
  DeleteFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
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
  Spin,
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
  deleteTask,
  fetchProjectDetail,
  fetchSearchUser,
  fetchUserByProject,
} from "../redux/action";
import ProjectListMembers from "./ProjectListMembers";
import TaskDetail from "./TaskDetail";

const ProjectDetail = () => {
  // loading spin
  const [loading, setLoading] = useState(false);
  // resetFields form
  const [form] = Form.useForm();
  //set Task ID state
  const [taskId, setTaskId] = useState("");
  // slider
  const [inputValue, setInputValue] = useState({
    originalEstimate: 0,
  });
  const [vlSlider, setVlSlider] = useState(0);
  const [timeRemain, setTimeRemain] = useState(0);

  //search user value
  const [value, setValue] = useState("");
  const searchUser = useSelector((state) => state.project.searchUser);
  //default create task
  const [valueForm, setValueForm] = useState({
    typeId: "1",
    statusId: "1",
    priorityId: "1",
  });
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
  const user = useSelector((state) => state.user.profile);
  const params = useParams();

  return (
    projectDetail && (
      <div>
        <div className="pt-7 pl-7">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/list">Home</Link>
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
                    <Space>
                      <AutoComplete
                        className="w-56"
                        onSearch={(value) => {
                          dispatch(fetchSearchUser(value));
                        }}
                        options={
                          searchUser &&
                          searchUser.map((user) => ({
                            key: user.userId,
                            label: `${user.name} (ID: ${user.userId})`,
                            value: `${user.userId}`,
                          }))
                        }
                        value={value}
                        onSelect={async (value, option) => {
                          setValue(option.label);

                          await dispatch(
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
            {/* validate create task button  */}
            {projectDetail.creator.id === user.id ? (
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
            ) : null}
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
                          /* Open Create Task modal */
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
                              setTaskId(task.taskId);
                              setOpenModal(true);
                            }}
                          >
                            <Row>
                              <Col className="text-left" span={20}>
                                <h4>{task.taskName}</h4>
                                <p>{task.priorityTask.priority}</p>
                                <p>
                                  {task.taskTypeDetail.taskType.toUpperCase()}
                                </p>
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
        {/* modal task edit  */}
        <Modal
          className="w-3/5"
          title={taskId}
          open={openModal}
          onCancel={() => {
            setOpenModal(false);
          }}
          footer={[
            <Space>
              <Spin spinning={loading}>
                <Button
                  onClick={async () => {
                    if (!window.confirm("Remove this task?")) return;

                    try {
                      setLoading(true);
                      await dispatch(deleteTask(taskId));
                      dispatch(fetchProjectDetail(params.id));
                      setTimeout(() => {
                        setOpenModal(false);
                        setLoading(false);
                      }, 500);
                    } catch (error) {
                      setLoading(false);
                    }
                  }}
                  danger
                >
                  <DeleteFilled />
                </Button>
              </Spin>

              <Button
                onClick={() => {
                  setOpenModal(false);
                }}
                key="cancel"
              >
                Cancel
              </Button>
            </Space>,
          ]}
        >
          <TaskDetail taskId={taskId} members={projectDetail.members} />
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
          <Spin spinning={loading}>
            <Form
              form={form}
              fields={[
                {
                  name: "projectId",
                  value: params.id,
                },
                {
                  name: "typeId",
                  value: valueForm.typeId,
                },
                {
                  name: "statusId",
                  value: valueForm.statusId,
                },
                {
                  name: "priorityId",
                  value: valueForm.priorityId,
                },
                {
                  name: "description",
                  value: "",
                },
                {
                  name: "listUserAsign",
                  value: [],
                },

                { name: "timeTrackingSpent", value: vlSlider },
                { name: "timeTrackingRemaining", value: timeRemain },
              ]}
              onFinish={async (value) => {
                await dispatch(createTask(value));
                dispatch(fetchProjectDetail(params.id));
                setValueForm({ typeId: "1", statusId: "1", priorityId: "1" });
                setLoading(true);
                setTimeout(() => {
                  setOpenTask(false);
                  form.resetFields();
                  setLoading(false);
                }, 1000);
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
                    message: "Please input Task Name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <h4>Task Type</h4>
              <Form.Item name="typeId">
                <Select
                  onChange={(value) => {
                    setValueForm({ ...valueForm, typeId: value });
                  }}
                  options={[
                    {
                      value: "1",
                      label: "Bug",
                      // name: "1",
                    },
                    {
                      value: "2",
                      label: "New Task",
                      // name: "2",
                    },
                  ]}
                />
              </Form.Item>
              <Row>
                <Col span={12}>
                  <h4>Status</h4>
                  <Form.Item name="statusId">
                    <Select
                      onChange={(value) => {
                        setValueForm({ ...valueForm, statusId: value });
                      }}
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
                      onChange={(value) => {
                        setValueForm({ ...valueForm, priorityId: value });
                      }}
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
                          key: member.userId,
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
          </Spin>

          {/* <TaskCreate /> */}
        </Modal>
      </div>
    )
  );
};

export default ProjectDetail;
