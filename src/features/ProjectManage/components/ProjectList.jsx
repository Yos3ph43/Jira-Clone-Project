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
  Modal,
  Popover,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProject, fetchProjectDetail } from "../redux/action";
import TextArea from "antd/es/input/TextArea";

const ProjectList = () => {
  const project = useSelector((state) => state.project.allProject);
  const projectDetail = useSelector((state) => state.project.projectDetail);
  const dispatch = useDispatch();
  // const [selectedItem, setSelectedItem] = useState("");
  // console.log(selectedItem);
  useEffect(() => {
    dispatch(fetchAllProject());
  }, []);
  console.log(project);
  console.log(projectDetail);
  //popover
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  //end popover
  //modal
  const [openModal, setOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpenModal(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      // setOpenModal(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenModal(false);
  };
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
          <Link to={`/detail/${item.id}`}>{item.projectName}</Link>
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
            <Button
              onClick={() => {
                showModal();
                dispatch(fetchProjectDetail(item.id));
                // setSelectedItem(item);
              }}
              className="bg-sky-800 text-white border-white hover:border-sky-600 hover:text-sky-600 hover:bg-neutral-800"
            >
              <EditFilled />
            </Button>

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
      <Modal
        title="Project Edit"
        open={openModal}
        // onOk={handleOk}

        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          onFinish={(value) => {
            console.log(value);
          }}
          initialValues={{
            remember: true,
          }}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          style={{
            maxWidth: 600,
            padding: "1rem 1rem 0 1rem",
          }}
        >
          <Form.Item
            initialValue={projectDetail?.id}
            name="id"
            label="Project ID"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            initialValue={projectDetail?.projectName}
            name="projectName"
            // rules={[
            //   {
            //     required: true,
            //   },
            // ]}
            label="Project Name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={projectDetail?.description}
            label="Description"
          >
            <TextArea rows={6} />
          </Form.Item>
          <Form.Item
            initialValue={projectDetail?.projectCategory.name}
            label="Project Category"
            name="projectCategory"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              direction="bottom"
              rules={[
                {
                  required: true,
                },
              ]}
              style={{
                width: 240,
              }}
              options={[
                {
                  value: "Dự án phần mềm",
                  label: "Software",
                  name: "Dự án phần mềm",
                },
                {
                  value: "Dự án web",
                  label: "Web Application",
                  name: "Dự án web",
                },
                {
                  value: "Dự án di động",
                  label: "Mobile Application",
                  name: "Dự án di động",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 20,
              span: 16,
            }}
            style={{ margin: "3rem 0" }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectList;
