import { PlusCircleOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Avatar,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Popover,
  Row,
  Select,
  Slider,
  Space,
} from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { assignUserTask, fetchTaskDetail } from "../redux/action";
import ProjectListMembers from "./ProjectListMembers";

const TaskDetail = (props) => {
  //popover
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  //taskId
  const { taskId, members } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTaskDetail(taskId));
    console.log();
  }, [taskId]);
  const task = useSelector((state) => state.project.taskDetail);

  console.log(props, task);
  return (
    task && (
      <div>
        <Form
          fields={[
            {
              name: "projectId",
              value: taskId,
            },
            {
              name: "taskName",
              value: task.taskName,
            },
            {
              name: "typeId",
              value: `${task.typeId}`,
            },
            {
              name: "statusId",
              value: `${task.statusId}`,
            },
            {
              name: "priorityId",
              value: `${task.priorityId}`,
            },
            {
              name: "description",
              value: task.description,
            },
            {
              name: "originalEstimate",
              value: task.originalEstimate,
            },
            {
              name: "timeSlider",
              value: task.timeTrackingSpent,
            },

            { name: "timeTrackingSpent", value: task.timeTrackingSpent },
            {
              name: "timeTrackingRemaining",
              value: task.timeTrackingRemaining,
            },
          ]}
          onFinish={(value) => {
            console.log(value);
            // dispatch(createTask(value));
            // dispatch(fetchProjectDetail(params.id));
            // setOpenModal(false);
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
          <Form.Item hidden name="projectId" initialValue={"params.id"}>
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
                name="originalEstimate"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tổng thời gian dự kiến",
                  },
                ]}
              >
                <InputNumber
                  max={"inputValue"}
                  style={{ width: "95%" }}
                  onChange={(e) => {
                    // setInputValue({
                    //   ...inputValue,
                    //   originalEstimate: e,
                    // });
                    // setVlSlider(e);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <h4>Time Tracking (hours)</h4>
              <Form.Item name="timeSlider">
                <Slider
                  min={0}
                  max={task.originalEstimate}
                  onChange={(vlSlider) => {
                    // setVlSlider(vlSlider);
                    // setTimeRemain(inputValue.originalEstimate - vlSlider);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <h4>Assignees</h4>
              <Form.Item name="listUserAsign">
                <Avatar.Group>
                  <Popover
                    title="List of members"
                    placement="bottom"
                    // key={item.id}
                    content={
                      <>
                        <ProjectListMembers
                          members={task.assigness}
                          taskId={taskId}
                        />
                      </>
                    }
                    trigger="click"
                    open={open}
                    onOpenChange={() => {
                      handleOpenChange();
                    }}
                  >
                    {task.assigness.map((member) => {
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
              </Form.Item>
              <Avatar>
                <Popover
                  placement="bottom"
                  // key={item.id}
                  content={
                    <Select
                      className="w-52"
                      options={members.map((member) => ({
                        value: member.userId,
                        label: `${member.name} - ${member.userId}`,
                      }))}
                      onSelect={async (userId) => {
                        console.log({ userId, taskId });
                        await dispatch(
                          assignUserTask({
                            userId,
                            taskId,
                          })
                        );
                        dispatch(fetchTaskDetail(taskId));
                      }}
                    ></Select>
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
            <Col span={6}>
              <h4 className="font-normal">Time spent</h4>
              <Form.Item name="timeTrackingSpent">
                <InputNumber
                  min={0}
                  max={"inputValue.originalEstimate"}
                  style={{ width: "95%" }}
                  onChange={(input) => {
                    // setVlSlider(input);
                    // setTimeRemain(inputValue.originalEstimate - input);
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
                  max={"inputValue.originalEstimate - vlSlider"}
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
      </div>
    )
  );
};

export default TaskDetail;
