import { PlusCircleOutlined } from "@ant-design/icons";
import { Avatar, InputNumber, Popover, Select, Slider, Form, Spin } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignUserTask,
  fetchProjectDetail,
  fetchTaskDetail,
  updateEstimateTime,
  updateStatusTask,
  updateTimeTrackingSpent,
} from "../redux/action";
import ProjectListMembers from "./ProjectListMembers";
import TaskComments from "./TaskComments";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";

const TaskDetail = (props) => {
  const params = useParams();
  //spin loading
  const [loading, setLoading] = useState(false);
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
  }, [taskId]);
  const task = useSelector((state) => state.project.taskDetail);
  // priority
  const priority = () => {
    switch (task.priorityId) {
      case 1:
        return "HIGH";
      case 2:
        return "MEDIUM";
      case 3:
        return "LOW";
      case 4:
        return "LOWEST";

      default:
        break;
    }
  };

  return (
    task && (
      <div className="flex p-5">
        {/* LEFTSIDE */}
        <div className="w-3/5 mr-10">
          {/* name */}
          <h2>{task.taskName}</h2>
          {/* description */}
          <div className="descr">
            <h3>Description</h3>
            <p>{parse(task.description)}</p>
            <p>
              Before you start work on an issue, you can set a time or other
              type of estimate to calculate how much work you believe it'll take
              to resolve it. Once you've started to work on a specific issue,
              log time to keep a record of it. Open the issue and select Time
              tracking Fill in the Time Spent field Fill in the Time Remaining
              field and click Save
            </p>
          </div>
          {/* comments */}
          <div className="comments">
            <TaskComments taskId={taskId} comments={task.lstComment} />
          </div>
        </div>

        {/* RIGHTSIDE */}
        <div className="w-2/5">
          {/* Status */}
          <div>
            <h3>STATUS</h3>
            <Spin spinning={loading}>
              <Form fields={[{ name: "statusId", value: task.statusId }]}>
                <Form.Item name="statusId">
                  <Select
                    onSelect={async (value) => {
                      setLoading(true);
                      const updateValue = { taskId: taskId, statusId: value };
                      await dispatch(updateStatusTask(updateValue));
                      dispatch(fetchProjectDetail(params.id));
                      dispatch(fetchTaskDetail(taskId));
                      setTimeout(() => {
                        setLoading(false);
                      }, 500);
                    }}
                    className="w-32"
                    options={[
                      {
                        value: "1",
                        label: "Backlog",
                      },
                      {
                        value: "2",
                        label: "Selected for Development",
                      },
                      {
                        value: "3",
                        label: "In Progress",
                      },
                      {
                        value: "4",
                        label: "Done",
                      },
                    ]}
                  />
                </Form.Item>
              </Form>
            </Spin>
          </div>
          {/* ASSIGNEES / member */}
          <div>
            <h3>ASSIGNEES</h3>
            <div>
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
              <Avatar>
                <Popover
                  placement="bottom"
                  // key={item.id}
                  content={
                    <Select
                      className="w-52"
                      options={members.map((member) => ({
                        key: member.userId,
                        value: member.userId,
                        label: `${member.name} - ${member.userId}`,
                      }))}
                      onSelect={async (userId) => {
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
            </div>
          </div>
          {/* priority */}
          <div>
            <h3>PRIORITY</h3>
            <p>{priority()}</p>
          </div>
          {/* ORIGINAL ESTIMATE */}
          <div>
            <h3>{`ORIGINAL ESTIMATE (HOURS)`}</h3>

            <Form
              fields={[
                { name: "originalEstimate", value: task.originalEstimate },
              ]}
            >
              <Form.Item name="originalEstimate">
                <InputNumber
                  disabled
                  //API banh xác
                  // onChange={async (value) => {
                  //   setLoading(true);

                  //   const updateValue = {
                  //     taskId: taskId,
                  //     originalEstimate: value,
                  //   };
                  //   if (value) {
                  //     await dispatch(updateEstimateTime(updateValue));
                  //     dispatch(fetchTaskDetail(taskId));
                  //     setTimeout(() => {
                  //       setLoading(false);
                  //     }, 500);
                  //   }
                  //   console.log(updateValue);
                  // }}
                />
              </Form.Item>
            </Form>
          </div>
          {/* TIME TRACKING*/}
          <div>
            <h3>TIME TRACKING</h3>
            <div>
              <Form
                fields={[
                  {
                    name: "timeTrackingSpent",
                    value: task.timeTrackingSpent,
                  },
                ]}
              >
                <div className="flex justify-between">
                  <span>0h</span>
                  <span>{task.originalEstimate}h</span>
                </div>
                <Form.Item name="timeTrackingSpent">
                  <Slider
                    min={0}
                    max={task.originalEstimate}
                    //API BANH XÁC
                    // onChange={(value) => {
                    //   console.log(value);

                    //   const updateValue = {
                    //     taskId: taskId,
                    //     timeTrackingSpent: value,
                    //     timeTrackingRemaining: task.originalEstimate - value,
                    //   };
                    //   dispatch(updateTimeTrackingSpent(updateValue));
                    //   dispatch(fetchTaskDetail(taskId));
                    //   console.log(updateValue);
                    // }}
                  />
                </Form.Item>
              </Form>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    )
  );
};

export default TaskDetail;
