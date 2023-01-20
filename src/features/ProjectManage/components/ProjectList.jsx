import {
  AntDesignOutlined,
  DeleteFilled,
  EditFilled,
  PlusCircleOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
  Avatar,
  Button,
  Collapse,
  Form,
  Input,
  Popover,
  Space,
  Table,
  Tooltip,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProject } from "../redux/action";

const ProjectList = () => {
  const project = useSelector((state) => state.project.allProject);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProject());
  }, []);
  console.log(project);
  //popover
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  //end popover
  const columns = [
    {
      title: "Project ID",
      dataIndex: "projectId",
      key: "projectId",
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Members",
      key: "members",
      dataIndex: "members",
    },

    {
      title: "Action",
      key: "action",
      dataIndex: "action",
    },
  ];
  //table body
  const data = project?.map((item) => {
    return {
      key: item.id,
      projectId: <p>{item.id}</p>,
      projectName: (
        <div>
          <Link>{item.projectName}</Link>
        </div>
      ),
      creator: <p>{item.creator.name}</p>,
      category: <p>{item.categoryName}</p>,
      members: (
        <>
          <Avatar.Group>
            <Popover
              title="List of members"
              placement="bottom"
              key={item.id}
              content={
                <>
                  <Table></Table>
                </>
              }
              trigger="click"
              open={open}
              onOpenChange={() => {
                handleOpenChange();
              }}
            >
              {item.members?.map((member) => {
                console.log(member);
                return (
                  <Avatar
                    src={member.avatar}
                    key={member.userId}
                    style={{
                      backgroundColor: "red",
                    }}
                  ></Avatar>
                );
              })}
            </Popover>
          </Avatar.Group>

          <Avatar>
            <Popover
              placement="bottom"
              key={item.id}
              content={
                <>
                  <Space>
                    <Input
                    // onChange={}
                    />

                    <Button danger onClick={hide}>
                      Cancel
                    </Button>
                    <Button type="primary">Add</Button>
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
        </>
      ),
      action: (
        <div key={item.id}>
          <Space size="middle">
            <Link to={`/detail/${item.id}`}>
              <Button className="bg-sky-800 text-white border-white hover:border-sky-600 hover:text-sky-600 hover:bg-neutral-800">
                <EditFilled />
              </Button>
            </Link>

            <Button className="bg-red-800 text-white border-white hover:border-red-600 hover:text-red-600 hover:bg-neutral-800">
              <DeleteFilled onClick={() => {}} />
            </Button>
          </Space>
        </div>
      ),
    };
  });
  //main render
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ProjectList;
