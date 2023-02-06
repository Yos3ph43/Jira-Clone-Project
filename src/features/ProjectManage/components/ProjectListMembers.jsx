import { DeleteFilled } from "@ant-design/icons";
import { Button, Table } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllProject,
  fetchProjectDetail,
  fetchTaskDetail,
  removeUserProject,
  removeUserTask,
} from "../redux/action";

const ProjectListMembers = (props) => {
  const dispatch = useDispatch();
  const projectId = props.projectId;
  const taskId = props.taskId;
  const data = props.members.map((member) => ({
    id: member.userId,
    name: member.name,
    key: member.userId,
    action: projectId ? (
      <Button
        onClick={async () => {
          await dispatch(
            removeUserProject({
              projectId: projectId,
              userId: member.userId,
            })
          );
          dispatch(fetchProjectDetail(projectId));
        }}
        className="ant-btn css-dev-only-do-not-override-1i9hnpv ant-btn-default bg-red-800 text-white border-white hover:border-red-600 hover:text-red-600 hover:bg-neutral-800"
      >
        <DeleteFilled />
      </Button>
    ) : (
      <Button
        onClick={async () => {
          await dispatch(
            removeUserTask({
              taskId: taskId,
              userId: member.userId,
            })
          );
          dispatch(fetchTaskDetail(taskId));
        }}
        className="ant-btn css-dev-only-do-not-override-1i9hnpv ant-btn-default bg-red-800 text-white border-white hover:border-red-600 hover:text-red-600 hover:bg-neutral-800"
      >
        <DeleteFilled />
      </Button>
    ),
  }));
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Action",
      key: "action",
      dataIndex: "action",
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={data}></Table>
    </div>
  );
};

export default ProjectListMembers;
